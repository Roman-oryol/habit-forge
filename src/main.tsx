import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { authToken } from "@/lib/auth-token";
import "./index.css";

const queryClient = new QueryClient();

authToken.subscribe(() => {
  if (!authToken.get()) queryClient.clear();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
