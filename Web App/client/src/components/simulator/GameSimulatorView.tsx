import {
  AlertDialog, AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box, Button, ButtonGroup, Icon, Heading, HStack, Stack, Text,
  useDisclosure,
  Container,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { adjustGameOutcomeByMP, predictNegativePoints, predictPositivePoints, randomGameStats } from "../../utils/SimulationMethods";
import { useFantasyTeam } from "../../contexts/FantasyTeamContext";
import Court from "../Court";
import { BsPlayCircle } from "react-icons/bs"
import { Team } from "../../types/Team";
import { GameOutcome } from "../../types/GameOutcome";
import AllTeamsDisplay from "../team_components/AllTeamsDisplay";
import { SaveTeamFormat } from "../../types/SaveTeamFormat";
import { collectPlayerNames, currentBudget, currentContractPrices, getTeamID, tryLoadTeam } from "../../utils/DataUtils";
import { Player } from "../../types/Player";
import GameOutcomeDisplay from "./GameOutcomeDisplay";
import Money from "../styled_components/Money";
import IconHeader from "../styled_components/IconHeader";
const GameSimulatorView: React.FC = () => {
  //const [PP, setPP] = useState();
  //const [NP, setNP] = useState();
  const [userOutcomes, setUserOutcomes] = useState<GameOutcome[]>([]);
  const [opponentTeam, setOpponentTeam] = useState<Team | null>(null);
  const [opponentTeamFormat, setOpponentTeamFormat] = useState<SaveTeamFormat | null>(null);
  const [opponentOutcomes, setOpponentOutcomes] = useState<GameOutcome[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { team } = useFantasyTeam();
  const [isThrottled, setThrottled] = useState<boolean>(false);
  const [secondsWaiting, setSecondsWaiting] = useState(0);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [predictedValues, setPredictedValues] = useState<{ key: string, value: number }[]>([])
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (secondsWaiting > 0) {
        setSecondsWaiting(secondsWaiting - 1);
      }
      if (secondsWaiting === 0) {
        clearInterval(myInterval)
        setThrottled(false)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });


  const toast = useToast();
  const cancelRef = useRef<HTMLButtonElement>(null)

  async function simulateGameResults() {
    if (opponentTeamFormat) {
      const oppTeam = await loadOpponentTeam(opponentTeamFormat);
      setOpponentTeam(oppTeam)
      if (oppTeam && team) {
        const firstRunUser = simulateGameResultsForTeam(team);
        const firstRunOpponent = simulateGameResultsForTeam(oppTeam);
        const userMPfactor = 1 / ((firstRunUser.reduce((partialSum, a) => partialSum + a.MP, 0)) / 240);
        const opponentMPfactor = 1 / ((firstRunOpponent.reduce((partialSum, a) => partialSum + a.MP, 0)) / 240);


        const userAdjusted = firstRunUser.map((outcome) => adjustGameOutcomeByMP(outcome, userMPfactor));
        setUserOutcomes(userAdjusted);
        const opponentAdjusted = firstRunOpponent.map((outcome) => adjustGameOutcomeByMP(outcome, opponentMPfactor));

        setOpponentOutcomes(opponentAdjusted);

        let userFinalScore = userAdjusted.reduce((partialSum, a) => partialSum + a.PTS, 0);
        let opponentFinalScore = opponentAdjusted.reduce((partialSum, a) => partialSum + a.PTS, 0)
        if (userFinalScore == opponentFinalScore) {
          Math.random() >= 0.5 ? userAdjusted[0].TwoP = userAdjusted[0].TwoP + 1 : opponentAdjusted[0].TwoP = opponentAdjusted[0].TwoP + 1
        }

        userFinalScore = userAdjusted.reduce((partialSum, a) => partialSum + a.PTS, 0);
        opponentFinalScore = opponentAdjusted.reduce((partialSum, a) => partialSum + a.PTS, 0)

        const teamWon = userFinalScore > opponentFinalScore ? getTeamID(team) : getTeamID(oppTeam)
        const teamLost = userFinalScore < opponentFinalScore ? getTeamID(team) : getTeamID(oppTeam)
        try {
          const res = await fetch("/saverecord", {
            method: 'Post',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ teamWon: teamWon, teamLost: teamLost })
          });
          const resJson = await res.json();
          toast({
            status: "success",
            title: resJson.title,
            description: resJson.text,

          })
        }
        catch (err) {
          console.log(err)
          toast({ "status": "error", "title": `Failed to load team`, "description": `${err}` })
        }
      }
    }

    else {
      toast({
        position: "top-left",
        status: "error",
        title: `Your team or opponent team is missing data!`,
        description: `This is probably an error on our end...`
      })

    }
  }

  function simulateGameResultsForTeam(team: Team): GameOutcome[] {
    const outcomes: GameOutcome[] = []
    for (var player of team.roster) {
      let playerMeta;
      for (var meta of team.rosterMetaData) {
        if (meta.PlayerName == player.PlayerName) {
          playerMeta = meta;
          break;
        }
      }
      if (playerMeta) {
        outcomes.push(randomGameStats(player, playerMeta, true,));
      }
      else {
        toast({
          position: "top-left",
          status: "error",
          title: `No meta-data associated with ${player.PlayerName}.`,
          description: `This can happen if the minutes played this season is too low to draw meaningful statistical inferences from. Average Minutes Played: ${player.MP}`
        })
      }
    }
    return outcomes;
  }

  //TODO add a play by play function
  function playByPlay() {
    const outcomes = team?.roster.map((player) => {
      for (var i = 0; i < team.rosterMetaData.length; i++) {
        if (team.rosterMetaData[i].PlayerName == player.PlayerName) {
          return <Text>AST: {randomGameStats(player, team.rosterMetaData[i], true).AST}</Text>
        }
      }
    });
    return outcomes;

  }

  async function loadOpponentTeam(teamFormat: SaveTeamFormat): Promise<Team> {
    console.log(teamFormat.team_id)
    const result = await tryLoadTeam(teamFormat.team_id)

    console.log(result.team)
    let team: Team | null = null;
    if (result.team) {
      team = result.team;
      return team;
    }
    toast({
      status: result.status,
      title: result.title,
      description: result.text,
    });
    throw new Error(`Opponent Team could not be loaded! ${result.text}`)
  }

  function checkReadyToSimulate(): boolean {
    if (opponentTeamFormat && team) {
      console.log(team.name)
      return true
    }
    else return false;
  }

  //TODO added checks for opponent team 'validity'
  function checkValidTeamSelection(opponent: SaveTeamFormat) {
    const playerNames = collectPlayerNames(opponent)
    if (team) {
      if (Math.abs(playerNames.length - team?.roster.length) <= 2 && playerNames.length > 9) {
        return false
      }
    }
    return true;
  }
  return (<Box>
    <AllTeamsDisplay
      selectTeam={(teamFormat) => {
        setOpponentTeamFormat(teamFormat)
        console.log(teamFormat)
      }} />
    <Stack>

      <IconHeader
        icon={BsPlayCircle}
        headerText="Game Simulator"
        collapsed={collapsed}
        setCollapsed={() => { setCollapsed(collapsed => !collapsed) }}
      />
      {collapsed ? <></> :
        <>
          <ButtonGroup
            colorScheme={"whatsapp"}
            size={"lg"}
            justifyContent={"center"}>
            <Button
              disabled={isThrottled}
              onClick={() => {
                if (checkReadyToSimulate()) {
                  setThrottled(true)
                  setSecondsWaiting(10)
                  simulateGameResults()
                }
                else {
                  toast({
                    status: "warning",
                    title: "Make sure you've selected an opponent team"
                  })
                }
              }
              }>
              {isThrottled ? `Simulate Again in ${secondsWaiting}s` : `Simulate one game`}
            </Button>
            <Button
              disabled={true}
              onClick={() => {
                if (checkReadyToSimulate()) {
                  setThrottled(true)
                  setSecondsWaiting(10)
                  //TODO simulateGameResults() for 7 games
                }
                else {
                  toast({
                    status: "warning",
                    title: "Make sure youv'e selected an opponent team"
                  })
                }
              }
              }>
              {isThrottled ? `Simulate Again in ${secondsWaiting}s` : `Simulate playoff series`}
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent
                  bg={"white"}>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Add Player
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Use your draft pick?
                  </AlertDialogBody>

                  <AlertDialogFooter
                    alignContent={"center"}>
                    <Button ref={cancelRef} onClick={onClose}>
                      On second thought...
                    </Button>
                    <Button colorScheme='green' onClick={() => {
                      //TODO add function
                      onClose()
                    }} ml={3}>
                      Draft!
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </ButtonGroup>
          <HStack
            justifyContent={"center"}>
            {team ? <Money label={`${team?.name} Expenses`} value={team ? currentContractPrices(team) : 0} /> : <></>}
            {opponentTeam ? <Money label={`${opponentTeam?.name} Expenses`} value={opponentTeam ? currentContractPrices(opponentTeam) : 0} /> : <></>}
          </HStack>

          {userOutcomes.length > 0 && opponentOutcomes.length > 0 ?
            <GameOutcomeDisplay
              userTeamName={team ? team.name : ""}
              opponentTeamName={opponentTeam ? opponentTeam.name : ""}
              userOutcomes={userOutcomes}
              opponentOutcomes={opponentOutcomes}
            /> : opponentTeamFormat ? <Alert
              status="info">
              <AlertIcon /> Simulate when you're ready!
            </Alert> : <Alert
              status="warning">
              <AlertIcon /> You need to make a team and pick an opponent team
            </Alert>}
        </>}

    </Stack>
  </Box>)
}

export default GameSimulatorView