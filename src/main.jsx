import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a202c",
    800: "#2d3748",
    700: "#4a5568",
  },
  dark: {
    50: "#f7fafc",
    100: "#edf2f7",
    200: "#e2e8f0",
    300: "#cbd5e0",
    400: "#a0aec0",
    500: "#718096",
    600: "#4a5568",
    700: "#2d3748",
    800: "#1a202c",
    900: "#171923",
  },
};

const theme = extendTheme({
  colors,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  radii: {
    base: "1.5rem",
  },
  styles: {
    global: {
      "button:hover, input:hover": {
        transform: "scale(1.05) rotate(-1deg)",
        boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s, box-shadow 0.3s",
      },
    },
  },
  fonts: {
    heading: "sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
