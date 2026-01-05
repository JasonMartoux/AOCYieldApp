import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "@getpara/react-sdk/styles.css";
import { router } from "./router";
import { ParaProvider } from "./components/ParaProvider";
import { ZyfaiProvider } from "./contexts/ZyfaiContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParaProvider>
      <ZyfaiProvider>
        <RouterProvider router={router} />
      </ZyfaiProvider>
    </ParaProvider>
  </StrictMode>
);