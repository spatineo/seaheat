import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './query/query'

const theme = extendTheme({
  styles: {
    global: {
      html: {
        boxSizing: "border-box"
      },
      body: {
        width: "100vw"

      },
      '*': {
        boxSizing: 'border-box',
        padding: "0px",
        margin: "0px"
      },
      '#root': {
        height: "100vh",
        overflow: "hidden"
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
