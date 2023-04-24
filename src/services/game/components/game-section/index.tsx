import { Box, Button, Card, Flex, Heading, Stack, Text, useToken, useDisclosure, Link, IconButton } from "@chakra-ui/react";
import { useGame, useRegistry } from "@services/game/hooks";
import { IconCaretUp, IconCaretDown, IconBrandGithub, IconBrandNpm, IconQuestionMark, IconAnalyze } from "@tabler/icons-react";
import { capitalize } from "@utils/index";
import { DescriptionModal } from "@services/game/modals";
import CountUp from "react-countup";
import type { PackageType } from "@services/game/types/index";

type Props = {
    target: boolean
} & PackageType;

export const GameSection = ({ name, downloads, target }: Props) => {
    const { controls: gameControls, state: gameState } = useGame();
    const [green, red] = useToken("colors", ["green.300", "red.300"]);
    const { description, repository } = useRegistry(name);
    const capitalizedName = capitalize(name);
    const modalState = useDisclosure()

    const handleGuess = async (guess: "higher" | "lower") => {
        gameControls.submitGuess(guess);
    };

    const answered = gameState.state == "success" || gameState.state == "fail";

    return (
        <>
        <Flex flex={1} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} p={"4"}>
            <Stack justifyContent={"center"} alignItems={"center"}>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} spacing={"4"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        { 
                            capitalizedName
                        }
                        <IconButton aria-label={"view-description"} onClick={modalState.onOpen} ml={"2"}>
                            <IconAnalyze />
                        </IconButton>
                    </Heading>
                    <Text color={"gray.400"}>
                        has 
                    </Text>
                        {
                            !target && (
                                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                                    <Text fontSize={"2xl"}>
                                        {
                                            downloads && downloads.toLocaleString()
                                        }
                                    </Text>
                                    <Text color={"gray.400"}>
                                        weekly downloads
                                    </Text>
                                    <Stack direction={"row"} spacing={"4"} bg={"blackAlpha.400"} p={"2"} borderRadius={"md"}>
                                        <Link href={`https://www.npmjs.com/package/${name}`} target={"_blank"}>
                                            <IconBrandNpm />
                                        </Link>
                                        {
                                            repository && (
                                                <Link href={repository} target={"_blank"}>
                                                    <IconBrandGithub />
                                                </Link>
                                            )
                                        }
                                    </Stack>
                                </Stack>
                            ) 
                        }
                </Stack>
                {
                    target && (
                        <Stack direction={"column"} alignItems={"center"}>
                            {
                                !answered ? (
                                    <Stack direction={"column"} align={"center"}>
                                    <Button onClick={() => handleGuess("higher")}>
                                        <Stack direction={"row"} justify={"space-between"}>
                                            <Text>
                                                Higher
                                            </Text>
                                            <IconCaretUp />
                                        </Stack>
                                    </Button>
                                    <Button onClick={() => handleGuess("lower")}>
                                        <Stack direction={"row"} justify={"space-between"}>
                                            <Text>
                                                Lower
                                            </Text>
                                            <IconCaretDown />
                                        </Stack>
                                    </Button>
                                    <Text color={"gray.400"}>
                                        weekly downloads than { capitalize(gameState.comparisonPackage!.name) } 
                                    </Text>
                                    <Stack direction={"row"} spacing={"4"} bg={"blackAlpha.400"} p={"2"} borderRadius={"md"}>
                                        <IconQuestionMark />
                                        <IconQuestionMark />
                                    </Stack>
                                    </Stack>
                                ) : (
                                    <>
                                        <Text fontSize={"2xl"}>
                                            <CountUp duration={1.5} end={downloads}/>
                                        </Text>
                                        <Text color={"gray.500"}>
                                            weekly downloads
                                        </Text>
                                        <Stack direction={"row"} spacing={"4"} bg={"blackAlpha.400"} p={"2"} borderRadius={"md"}>
                                            <IconQuestionMark />
                                            {
                                                repository && (
                                                    <IconQuestionMark />
                                                )
                                            }
                                        </Stack>
                                    </>
                                )
                            }

                        </Stack>
                    )
                }
            </Stack>
        </Flex>

        <DescriptionModal name={capitalizedName} description={description} open={modalState.isOpen} onClose={modalState.onClose}/>
        </>
    );
};