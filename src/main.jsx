import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#5C67F2",
    800: "#6A82FB",
    700: "#7F8FF4",
  },
  dark: {
    50: "#f4f4f4",
    100: "#e9e9e9",
    200: "#d9d9d9",
    300: "#c4c4c4",
    400: "#a8a8a8",
    500: "#8c8c8c",
    600: "#707070",
    700: "#545454",
    800: "#383838",
    900: "#1c1c1c",
  },
};

const theme = extendTheme({
  colors,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  radii: {
    base: "1rem",
  },
  styles: {
    global: {
      "button:hover, input:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
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
