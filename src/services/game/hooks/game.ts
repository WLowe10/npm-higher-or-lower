import { useContext } from "react";
import { GameContext } from "../context";
import type { GameContextType } from "../context";

export const useGame = () => {
    return useContext(GameContext) as GameContextType;
}