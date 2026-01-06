import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "@getpara/react-sdk/styles.css";
import { router } from "./router";
import { ParaProvider } from "./components/ParaProvider";
import { ZyfaiProvider } from "./contexts/ZyfaiContext";
import { defineCustomElements } from "@getpara/core-components";

// CRITICAL: Initialize Stencil web components BEFORE React renders
// This fixes "Couldn't find host element for cpsl-auth-modal" errors
defineCustomElements(window);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParaProvider>
      <ZyfaiProvider>
        <RouterProvider router={router} />
      </ZyfaiProvider>
    </ParaProvider>
  </StrictMode>
);