import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// 1. Gerekli kütüphaneleri import et
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. Bir QueryClient (Veri Merkezi) oluştur
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 3. Tüm uygulamayı bu Provider ile sarmala */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)