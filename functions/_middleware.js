const COOKIE = "cp_gate";
const SESSION_TTL = 60 * 60 * 24 * 30;

function parseCookie(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const cut = part.indexOf("=");
    if (cut === -1) continue;
    const key = part.slice(0, cut).trim();
    const value = part.slice(cut + 1).trim();
    if (key) out[key] = value;
  }
  return out;
}

function timingSafeEqual(a, b) {
  const encoder = new TextEncoder();
  const left = encoder.encode(String(a ?? ""));
  const right = encoder.encode(String(b ?? ""));
  const length = Math.max(left.length, right.length);
  let diff = left.length ^ right.length;
  for (let i = 0; i < length; i += 1) {
    diff |= (left[i] || 0) ^ (right[i] || 0);
  }
  return diff === 0;
}

async function sign(secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode("patrice-ok"),
  );
  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function withNoIndex(response) {
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function loginPage(failed) {
  const html = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <title>Aperçu protégé</title>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: Georgia, "Times New Roman", serif;
        background: #f2efe6;
        color: #20231e;
      }
      form {
        width: min(28rem, calc(100vw - 2rem));
        padding: 1.75rem 1.5rem 1.5rem;
        background: #faf8f2;
        border: 1px solid #cec8ba;
      }
      h1 {
        margin: 0 0 0.35rem;
        font-size: 1.25rem;
        font-weight: 500;
      }
      p {
        margin: 0 0 1.25rem;
        color: #5a5e55;
        font-size: 0.95rem;
      }
      label {
        display: block;
        margin-bottom: 0.4rem;
        font-size: 0.9rem;
      }
      input {
        width: 100%;
        padding: 0.7rem 0.75rem;
        border: 1px solid #cec8ba;
        background: #fff;
        font: inherit;
      }
      button {
        margin-top: 1rem;
        width: 100%;
        padding: 0.75rem;
        border: 0;
        background: #171a15;
        color: #f1ede2;
        font: inherit;
        cursor: pointer;
      }
      .erreur {
        margin: 0 0 1rem;
        color: #7a2e2e;
        font-size: 0.9rem;
      }
    </style>
  </head>
  <body>
    <form method="post" action="/">
      <h1>Aperçu protégé</h1>
      <p>Ce site n’est pas public. Entrez le mot de passe pour continuer.</p>
      ${failed ? '<p class="erreur" role="alert">Mot de passe incorrect.</p>' : ""}
      <label for="password">Mot de passe</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required autofocus />
      <button type="submit">Entrer</button>
    </form>
  </body>
</html>`;
  return withNoIndex(
    new Response(html, {
      status: failed ? 401 : 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    }),
  );
}

export async function onRequest(context) {
  const password = context.env.SITE_PASSWORD;
  if (!password) {
    return withNoIndex(
      new Response("Protection non configurée.", {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }),
    );
  }

  const url = new URL(context.request.url);
  const token = await sign(password);

  if (url.pathname === "/__logout") {
    return withNoIndex(
      new Response(null, {
        status: 303,
        headers: {
          Location: "/",
          "Set-Cookie": `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
        },
      }),
    );
  }

  const cookies = parseCookie(context.request.headers.get("Cookie") || "");
  if (cookies[COOKIE] && timingSafeEqual(cookies[COOKIE], token)) {
    return withNoIndex(await context.next());
  }

  if (context.request.method === "POST") {
    const contentType = context.request.headers.get("content-type") || "";
    if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const form = await context.request.formData();
      const given = String(form.get("password") || "");
      if (timingSafeEqual(given, password)) {
        const nextPath = url.pathname === "/" ? "/" : url.pathname + url.search;
        return withNoIndex(
          new Response(null, {
            status: 303,
            headers: {
              Location: nextPath,
              "Set-Cookie": `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL}`,
            },
          }),
        );
      }
    }
    return loginPage(true);
  }

  return loginPage(false);
}
