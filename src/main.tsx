import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './queryClient.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// bọc ứng dụng React bằng QueryClientProvider
// để cung cấp cho component con truy cập vào query client thông qua React Context
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </React.StrictMode>
)
