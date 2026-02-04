import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Log the API URL for debugging
console.log("VITE_API_HOST: ", import.meta.env.VITE_API_HOST);
console.log("VITE_API_PORT: ", import.meta.env.VITE_API_PORT);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
