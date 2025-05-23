import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { MakeMetrics } from '@/main/factories/pages/metrics/MakeMetrics'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MakeMetrics />
    </QueryClientProvider>
  </StrictMode>,
)
