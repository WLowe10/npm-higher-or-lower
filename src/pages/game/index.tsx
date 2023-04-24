import { useEffect } from "react";
import { Alert, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Divider, Flex, Heading, Stack, Text, Link, useToken, Fade } from "@chakra-ui/react";
import { GameSection, GameStats } from "@services/game/components";
import { useGame, useHighScore } from "@services/game/hooks";
import { IconCheck, IconTrophyFilled, IconBrandNpm, IconExternalLink } from "@tabler/icons-react"
import { Intro } from "./components";
import type { PackageType } from "@services/game/types";

export const Game = () => {
    const { state: gameState, controls: gameControls } = useGame();
    const { score, highScore } = gameState;
    const packages = [gameState.comparisonPackage, gameState.targetPackage];
    const loading = gameState.state == "loading";

    return (
        <Flex height={"100vh"} bg={"blackAlpha.600"} justifyContent={"center"} alignItems={"center"}>
            {
                gameState.state == null || loading ? (
                    <Intro />
                ) : (
                    <Flex height={"100vh"} flex={1} direction={["column", "row"]}>
                        {
                            packages.map((pkg, idx) => (
                                <Flex flex={1} key={pkg!.name} bg={!!idx ? "blue.800" : undefined}>
                                    <GameSection {...pkg as PackageType} target={!!idx}/>
                                </Flex>
                            ))
                        }
                        <GameStats />
                    </Flex>
                )
            }
        </Flex>
    )
};