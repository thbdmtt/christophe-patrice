import { useLanguage } from "../i18n";

export default function ContactForm() {
  const { t } = useLanguage();
  const form = t.visit.form;

  function prepareEmail(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `${form.bodyLabels[0]} : ${data.get("name")}`,
      `${form.bodyLabels[1]} : ${data.get("email")}`,
      `${form.bodyLabels[2]} : ${data.get("phone") || "—"}`,
      "",
      `${form.bodyLabels[3]} :`,
      data.get("message"),
    ].join("\n");

    window.location.href =
      `mailto:christophe.patrice@orange.fr?subject=${encodeURIComponent(form.subject)}` +
      `&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="contact-form" onSubmit={prepareEmail}>
      <div className="contact-fields">
        <label>
          <span>{form.name}</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          <span>{form.email}</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          <span>{form.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="message-field">
          <span>{form.message}</span>
          <textarea name="message" rows="5" placeholder={form.placeholder} required />
        </label>
      </div>
      <div className="contact-submit">
        <button className="btn" type="submit">{form.submit}</button>
        <small>{form.helper}</small>
      </div>
    </form>
  );
}
