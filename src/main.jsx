import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#e60000",
    800: "#ff3333",
    700: "#cc0000",
  },
  dark: {
    50: "#e0e0e0",
    100: "#c2c2c2",
    200: "#a3a3a3",
    300: "#858585",
    400: "#666666",
    500: "#4d4d4d",
    600: "#343434",
    700: "#1f1f1f",
    800: "#0a0a0a",
    900: "#000000",
  },
};

const theme = extendTheme({
  colors,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
