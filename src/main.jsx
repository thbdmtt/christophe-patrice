import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LanguageProvider } from "./i18n.jsx";
import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/base.css";
import "./styles/captions.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
