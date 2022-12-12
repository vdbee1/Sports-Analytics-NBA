import { Alert, Box, Button, ButtonGroup, Heading, HStack, Stack, Text, List, useStatStyles, Icon, Spacer, Tooltip, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useToast } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { useRef, useState } from "react";
import { Player } from "../../types/Player";
import { useFantasyTeam } from "../../contexts/FantasyTeamContext";
import PlayerStatsDisplay from "../PlayerStatsDisplay";
//import background from "src/backgrounds/basketball_players_silhouette.jpeg"
import { GiBasketballJersey } from "react-icons/gi"
import IconHeader from "../styled_components/IconHeader";
import PerPlayerRosterDisplay from "./PerPlayerRosterDisplay";
import { currentBudget } from "../../utils/DataUtils";
const RosterView: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { team, removePlayer, saveTeam } = useFantasyTeam();
  const [selected, setSelected] = useState<Player | null>(null);
  const [teamIsValid, setTeamIsValid] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)
  function selectPlayer(player: Player) {
    console.log(`Selected ${player.PlayerName}`)
    setSelected(player)
  }
  function renderTeam() {
    if (team && team.roster.length > 0) {
      return (
        team?.roster.map((player) => {
          const index = team.roster.indexOf(player);
          return (<PerPlayerRosterDisplay
            index={index + 1}
            key={index}
            player={player}
            select={selectPlayer} />
          )
        }))
    }
    else return (<Alert
      variant={"subtle"}
      status={"warning"}>Draft between 10-12 players to get started</Alert>)
  }

  function checkValidTeam(): boolean {
    if (team && team?.roster.length >= 10 && currentBudget(team) > 0) {
      setTeamIsValid(true)
      return true
    }
    else {
      setTeamIsValid(false)
      return false;
    }
  }
  return <Stack

  >
    <IconHeader
      setCollapsed={() => {
        setCollapsed(collapsed ? false : true);
      }}
      icon={GiBasketballJersey}
      headerText={`${team?.name} Roster`}
      collapsed={collapsed}
    />
    {collapsed ? <></> : <>

      {team && team.roster.length > 10 ? <Alert
        variant={"solid"}
        status={"warning"}>While it's possible to have up to 15 players per NBA team, we suggest a maximum of ten for the simulations!</Alert> : <></>}
      <Stack
        //borderWidth={10}
        borderRadius={20}
        boxShadow={"2xl"}
        borderColor={"orange.600"}
        //backgroundImage={`url(${background})`}
        backgroundPosition="top"
        backgroundAttachment={"fixed"}
        //padding={2}
        maxH={"500px"}
        overflowY={"scroll"}
        alignContent="start"
      >
        {renderTeam()}
      </Stack>

      <ButtonGroup
        colorScheme={"orange"}>

        <Button
          onClick={() => {
            if (selected) {
              removePlayer(selected)
              console.log(`Removing ${selected.PlayerName}`)
              setSelected(null)
            }
          }}>
          Remove Player
        </Button>
        <Tooltip
          label={teamIsValid ? 'Save your team and see how it does!' : `Your team either doesn't have enough players or you're over budget!`} >

          <Button
            colorScheme={"green"}
            onClick={() => {
              if (checkValidTeam()) {
                onOpen()
              }
              //TODO Save changes to team
            }
            }>
            Save Changes
          </Button>
        </Tooltip>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent
              bg={"white"}>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Commit to this team?
              </AlertDialogHeader>

              <AlertDialogBody>
                You'll be submitting this team into the offical MDSA tournament!
              </AlertDialogBody>

              <AlertDialogFooter
                alignContent={"center"}>
                <Button
                  colorScheme={"red"}
                  ref={cancelRef} onClick={onClose}>
                  I'm not ready...
                </Button>
                <Button colorScheme='green' onClick={() => {
                  saveTeam();

                  onClose()
                }} ml={3}>
                  Game on!
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </ButtonGroup></>}
  </Stack>
}

export default RosterView