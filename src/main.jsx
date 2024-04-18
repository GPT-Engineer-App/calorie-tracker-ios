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
    50: "#ffffff",
    100: "#f0f0f0",
    200: "#d9d9d9",
    300: "#c2c2c2",
    400: "#ababab",
    500: "#949494",
    600: "#7d7d7d",
    700: "#666666",
    800: "#4f4f4f",
    900: "#383838",
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
