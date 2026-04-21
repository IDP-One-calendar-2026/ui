import { StrictMode } from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./pages"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import Layout from "./pages/_layout";
import AuthCallback from "./pages/callback/auth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<App />} />
            <Route path="callback/auth" element={<AuthCallback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
