import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
const queryClient = new QueryClient()
import { Theme } from '@radix-ui/themes'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <App />
        <Toaster />
      </Theme>
    </QueryClientProvider>
  </StrictMode>,
)
