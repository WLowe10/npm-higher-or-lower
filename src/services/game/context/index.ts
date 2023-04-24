import { PackageType } from "@services/game/types";
import { createContext } from "react";

export type GameContextType = {
    state: {
        comparisonPackage: PackageType | null,
        targetPackage: PackageType | null,
        state: "loading" | "ready" | "neutral" | "success" | "fail" | null,
        score: number,
        highScore: number
    },
    controls: {
        start: () => void,
        submitGuess: (guess: "higher" | "lower") => any,
        end: () => void,
    }
};

export const GameContext = createContext<GameContextType | null>(null);