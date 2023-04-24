import { Alert, Box, Card, CardBody, CardFooter, CardHeader, Container, Fade, Heading, Link, Stack, Button } from "@chakra-ui/react";
import { useGame } from "@services/game/hooks";
import { IconCheck, IconTrophyFilled, IconBrandNpm, IconExternalLink, IconList } from "@tabler/icons-react"

export const Intro = () => {
    const { state: { highScore, ...gameState }, controls: gameControls } = useGame();
    const loading = gameState.state == "loading";

    return (
        <Fade in={!!highScore}>
            <Box p={"4"}>
                <Card variant={"outline"} bg={"gray.900"}>
                    <CardHeader>
                        <Heading fontSize={"2xl"}>
                            <IconBrandNpm />
                            Higher or lower
                        </Heading>
                        <Heading fontSize={"md"} color={"gray.600"}>
                            How well do you know your Node Modules?
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Alert variant={"left-accent"} status={"info"}>
                            <Container>
                                The Rules are simple. In fact, there is only one. Guess whether the following NPM package receives more or less weekly downloads than the former.
                            </Container>
                        </Alert>
                        {
                            highScore ? (
                                <Alert variant={"left-accent"} status={"success"}>
                                    <IconTrophyFilled />
                                    <Container>
                                        Your current high score is { highScore }
                                    </Container>
                                </Alert>
                            ) : null
                        }
                    </CardBody>
                    <CardFooter justifyContent={"center"} alignItems={"center"}>
                        <Stack>
                            <Button onClick={gameControls.start} isLoading={loading}>
                                Start Game
                            </Button>
                            <Link href={"https://wlowe.dev"} target={"_blank"}>
                                Made By Wes Lowe
                            </Link>
                        </Stack>
                    </CardFooter>
                </Card>
            </Box>
        </Fade>
    )
};