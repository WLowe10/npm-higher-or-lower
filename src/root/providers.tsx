import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@constants/theme";
import { GameProvider } from "@services/game/providers";
import type { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <GameProvider>
            <ChakraProvider theme={theme}>
                {
                    children
                }
            </ChakraProvider>
        </GameProvider>
    )
};