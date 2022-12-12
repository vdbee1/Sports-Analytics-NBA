
import {
  AlertDialog, AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure, Box, Button, ButtonGroup, Heading, HStack, Input, Stack, Text, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, PopoverFooter, Container, Center, Spacer
} from "@chakra-ui/react";
import RosterView from "./team_components/RosterView";
import GameSimulatorView from "./simulator/GameSimulatorView";
import { useFantasyTeam } from "../contexts/FantasyTeamContext";
import { useUserContext } from "../contexts/UserContext";
import { useRef, useState } from "react";
import PlayerSearchView from "./PlayerSearchView";
import generateTeamName from "../utils/TeamNameGenerator";
const TeamView: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLInputElement>(null);
  const { team, budget: budgetLeft, createNewTeam } = useFantasyTeam();
  const [teamName, setTeamName] = useState<string>("");
  const { user } = useUserContext();
  return (
    team ?
      <Box>
        <Stack>
          <PlayerSearchView />
          <RosterView />
        </Stack>
      </Box> :
      <>
        {!teamName ? setTeamName(generateTeamName()) : <></>}
        <Center h={"70vh"}>
          <Container
            h={"80%"}
            pt={10}
            color='white' bg='blackAlpha.800' borderColor='blue.800'>
            <Container
              h={"60%"}>
              <Heading pt={4} fontWeight='bold' border='0'>
                Your team will be:
              </Heading>
              <Heading fontSize={60} display={"inline-flex"}>{teamName}</Heading>
            </Container>



            <Stack
              display='block'
              alignItems='center'
              justifyContent='space-between'
              pb={4}
              width={"100%"}>
              <Text>
                If you're happy with this name, let's get to drafting. Otherwise, you can still change it.
              </Text>
              <Spacer />
              <Button
                width={"100%"}
                padding={1}
                colorScheme={"green"}
                onClick={() => {
                  if (teamName) {
                    createNewTeam(teamName);
                  }
                }}>
                {user?.name}'s {teamName} it is!
              </Button>
              <Button
                width={"100%"}
                padding={1}
                onClick={() => {
                  setTeamName(generateTeamName());
                }}
                colorScheme='blue'>
                Let's try a different name...
              </Button>
            </Stack>
          </Container>
        </Center>


      </>
  );
}

export default TeamView;