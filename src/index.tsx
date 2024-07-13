import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

root.render(
  // import.meta.env.DEV ? (
  //   <StrictMode>
  //     <App />
  //   </StrictMode>
  // ) : (
  //   <App />
  // )
  <App />
);
