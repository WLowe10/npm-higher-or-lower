import { useState, useEffect } from "react";

export const useHighScore = (): [number, React.Dispatch<React.SetStateAction<number>>] => {
    const [highScore, setHighScore] = useState<number>(0);

    useEffect(() => {
        const savedHighScore = Number(localStorage.getItem("highScore"));
        if (!isNaN(savedHighScore)) {
            setHighScore(savedHighScore)
        };
    }, [])

    return [highScore, setHighScore];
}