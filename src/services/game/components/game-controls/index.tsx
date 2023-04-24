import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { useGame } from "@services/game/hooks";
import { IconCaretUp, IconCaretDown } from "@tabler/icons-react";

export const GameControls = () => {
    const { controls: gameControls } = useGame();

    return (
        <Stack direction={"column"}>
            <Button onClick={() => gameControls.submitGuess("higher")}>
                <Stack direction={"row"} justify={"space-between"}>
                    <Text>
                        Higher
                    </Text>
                    <IconCaretUp />
                </Stack>
            </Button>
            <Button onClick={() => gameControls.submitGuess("lower")}>
                <Stack direction={"row"} justify={"space-between"}>
                    <Text>
                        Lower
                    </Text>
                    <IconCaretDown />
                </Stack>
            </Button>
        </Stack>
    )
};