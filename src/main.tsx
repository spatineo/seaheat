import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme  } from "@chakra-ui/react";
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
        maxHeight: "inherit",
       
      },
      "#root": {
        padding: "0",
        margin: "0",
        boxSizing: "border-box",
        height: "100vh",
        width: "100%",
       
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
