import { Card, CloseButton, IconButton, Stack, Text, useToken } from "@chakra-ui/react"
import { useGame } from "@services/game/hooks";
import { IconCheck, IconTrophyFilled } from "@tabler/icons-react";

export const GameStats = () => {
    const { state: gameState, controls: gameControls } = useGame();
    const { score, highScore } = gameState;
    const [green] = useToken("colors", ["green.200"]);

    return (
        <Card 
            position={"fixed"} 
            top={"50%"} 
            left={"50%"} 
            transform={"translate(-50%, -50%)"} 
            bg={"gray.900"} 
            p={"4"} 
            borderRadius={"md"}
            border={"1px"}
            borderColor={gameState.state == "fail" ? "red.400" : gameState.state == "success" ? green : "gray.400"}
        >
            <Stack alignItems={"center"} direction={["row", "column"]}>
                <Stack direction={"row"}>
                    <Text>
                        {
                            score
                        }
                    </Text>
                    <IconCheck color={green}/>
                </Stack>
                <Stack direction={"row"}>
                    <Text>
                        {
                            score > highScore ? score : highScore
                        }
                    </Text>
                    <IconTrophyFilled />
                </Stack>
                <CloseButton onClick={gameControls.end} />
            </Stack>
        </Card>
    )
}