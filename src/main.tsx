import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@getpara/react-sdk/styles.css";
import App from "./App.tsx";
import { ParaProvider } from "./components/ParaProvider";
import { ZyfaiProvider } from "./contexts/ZyfaiContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParaProvider>
      <ZyfaiProvider>
        <App />
      </ZyfaiProvider>
    </ParaProvider>
  </StrictMode>
);