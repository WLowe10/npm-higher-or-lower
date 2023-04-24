import { Game } from "../pages";
import { Providers } from "./providers";

export const Root = () => {
    return (
        <Providers>
            <Game />
        </Providers>
    )
}