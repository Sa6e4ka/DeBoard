import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <React.StrictMode>
      <ThirdwebProvider>
        <App />
      </ThirdwebProvider>
    </React.StrictMode>
  </ChakraProvider>
);
