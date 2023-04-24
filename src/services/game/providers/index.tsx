import { useState, useRef, useEffect } from "react";
import { GameContext } from "../context";
import { PackageType } from "@services/game/types";
import { useRepeatableList } from "@hooks/index";
import { useHighScore } from "../hooks";
import packages from "../constants/packages.json";
import type { ReactNode } from "react";

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [comparisonPkg, setComparisonPkg] = useState<PackageType | null>(null);
    const [targetPkg, setTargetPkg] = useState<PackageType | null>(null);
    const [gameState, setGameState] = useState<"loading" | "ready" | "neutral" | "success" | "fail" | null>(null);
    const [score, setScore] = useState<number>(0);
    const [highScore, setHighScore] = useHighScore();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const getRandomPackage = useRepeatableList(packages);

    const handleSubmitGuess = (guess: "higher" | "lower") => {
        if (!targetPkg || ! comparisonPkg) return;

        if (comparisonPkg.downloads == targetPkg.downloads) {
            setScore(prev => prev + 1);
            return setGameState("success")
        };

        if (guess == "lower") {
            if (targetPkg?.downloads < comparisonPkg?.downloads) {
                setScore(prev => prev + 1);
                return setGameState("success")
            };
        } else if (guess == "higher") {
            if (targetPkg?.downloads > comparisonPkg?.downloads) {
                setScore(prev => prev + 1);
                return setGameState("success")
            };
        };

        return setGameState("fail");
    };

    const loadPackage = async (name: string) => {
        const response = await fetch(`https://api.npmjs.org/downloads/point/last-week/${name}`, {
            method: "GET"
        });

        const { downloads } = await response.json();
        return downloads;
    };

    const getNextPackage = async () => {
        try {
            const pkg = getRandomPackage();
            const data = await loadPackage(pkg);

            return {
                name: pkg,
                downloads: data,
            };
        } catch {
            handleAbortGame("Unable to load package");
        }
    };

    const handleNext = async () => {
        const nextTarget = await getNextPackage();
        if (!nextTarget) return;

        setComparisonPkg(targetPkg);
        setTargetPkg(nextTarget);

        setGameState("neutral");
    };

    const handleInitGame = async () => {
        setGameState("loading");

        const comparison = await getNextPackage();
        const target = await getNextPackage();
        if (!target || !comparison) return;

        setComparisonPkg(comparison);
        setTargetPkg(target);

        setGameState("ready");
    };

    const handleEndGame = () => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("highScore", score.toString());
        };

        setScore(0);
        setGameState(null);
    };

    const handleAbortGame = (message: string) => {
        handleEndGame();
        setErrorMessage(message);
    };

    useEffect(() => {
        if (!gameState) return;

        const stateMap: Record<string, () => void> = {
            success: () => { 
                setTimeout(handleNext, 2000)
            },
            fail: () => {
                setTimeout(handleEndGame, 2000)
            }
        };

        const handler = stateMap[gameState];
        typeof handler == "function" && handler();
    }, [gameState])

    return (
        <GameContext.Provider value={{
            state: {
                comparisonPackage: comparisonPkg,
                targetPackage: targetPkg,
                state: gameState,
                score: score,
                highScore: highScore
            },
            controls: {
                start: handleInitGame,
                end: handleEndGame,
                submitGuess: handleSubmitGuess,
            }
        }}>
            {
                children
            }
        </GameContext.Provider>
    )
};