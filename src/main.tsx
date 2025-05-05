import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import DialogModalProvider from "./components/ui/modal/providers/Provider.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <DialogModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DialogModalProvider>
    </ThemeProvider>
  </StrictMode>
);
