import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./sass/base/_reset.module.scss";
import "./sass/style.module.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer newestOnTop />
  </StrictMode>
);
