import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { Toaster } from "@/components/ui/toast";
import { authToken } from "@/lib/auth-token";
import { queryClient } from "@/lib/query-client";
import "./index.css";

authToken.subscribe(() => {
  if (!authToken.get()) queryClient.clear();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
