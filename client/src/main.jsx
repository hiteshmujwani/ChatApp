import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { SocketProvider } from "./context/socket.jsx";

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
      <SocketProvider>
      <App />
  </SocketProvider>
    </ChakraProvider>
);
