import React from "react";
import ReactDOM from "react-dom/client";
import { Root } from "@root/index";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "@constants/theme";

//!add strict mode when having button to start game, right now is using the useeffect
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Root />
  </React.StrictMode>
)
