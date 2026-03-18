import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import App from './App.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    <Toaster position="top-center" richColors />
  </StrictMode>,
)
