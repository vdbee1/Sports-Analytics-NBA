import {
  AlertDialog, AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button, IconButton,

  ButtonProps as ChakraButtonProps, forwardRef, HStack, Stack, Spacer, Text, ButtonGroup, Icon, Tooltip, Alert, Container
} from "@chakra-ui/react";
import { Player } from "../../types/Player";
import { useFantasyTeam } from "../../contexts/FantasyTeamContext";
import { AiOutlineUserAdd } from "react-icons/ai"
import { GiMoneyStack } from "react-icons/gi";
import { ImStatsDots } from "react-icons/im"
import { useState, useRef } from "react";
import Money from "../styled_components/Money";
import PlayerStatsDisplay from "../PlayerStatsDisplay";
// "available" | "unavailable" | "nobudget"
export type DraftPlayerButtonProps = ChakraButtonProps & {
  player: Player;
  status: "success" | "error" | "warning" | "info"
  statusText: string
  addPlayer: (player: Player) => void
  viewPlayer: (player: Player) => void
};
const DraftPlayerButton: React.FC<DraftPlayerButtonProps> = ({ player, statusText, status, addPlayer, viewPlayer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [viewStats, setViewStats] = useState<boolean>(false)
  return <Stack><HStack
    borderRadius={10}
    bg="#ff9933"
    padding={2}
    width={"100%"}>


    <Alert
      variant={"left-accent"}
      status={status}
      width={"8%"}
      minWidth={"90px"}
    >{statusText}
    </Alert>

    <Text
      color={"white"}
      bg="orange.500"
      padding={2}
      borderRadius={10}
      width={"15%"}
      minWidth={"100px"}
      textAlign={"center"}
    >{player.PlayerName}</Text>
    <Spacer />
    <Money
      fontSize={20}
      minWidth={"fit-content"}
      maxWidth={"20%"}
      value={+player.ContractPrice}
    />

    <ButtonGroup width={"12%"}
      minWidth={"100px"}
      spacing={.5}
      alignSelf={"right"}
      colorScheme={"orange"}>
      <Tooltip
        label={status === "success" ? "Add Player to your team" : "Player Unavaiable"}
      >
        <IconButton
          disabled={status !== "success"}
          fontSize={'25px'}
          aria-label="Add Player"
          icon={<AiOutlineUserAdd />}
          onClick={() => {
            onOpen()
          }}
        >
        </IconButton>
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
                console.log(`Adding ${player.PlayerName}`)
                addPlayer(player);
                onClose()
              }} ml={3}>
                Draft!
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Tooltip label="View Player's Stats">
        <IconButton
          fontSize={'25px'}
          aria-label="View Player Stats"
          icon={<ImStatsDots />}
          onClick={() => {
            setViewStats(viewStats => !viewStats)
            console.log(`Viewing ${player.PlayerName}`)
          }}
        />
      </Tooltip>
    </ButtonGroup>
  </HStack >
    {viewStats ? <HStack>
      <PlayerStatsDisplay player={player} />
    </HStack> : <></>}
  </Stack>
}

export default DraftPlayerButton;