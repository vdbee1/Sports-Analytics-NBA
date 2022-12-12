import { Button, Circle, HStack, Icon, Spacer, Stack, Text } from "@chakra-ui/react";
import { GiMoneyStack } from "react-icons/gi";

import { Player } from "../../types/Player";
import PlayerStatsDisplay from "../PlayerStatsDisplay";
import Money from "../styled_components/Money";
interface PerPlayerRosterDisplayProps {
  index: number,
  player: Player,
  select: (player: Player) => void
}
const PerPlayerRosterDisplay = ({ index, player, select }: PerPlayerRosterDisplayProps) => {
  return (
    <Button
      alignSelf={"left"}
      height={"fit-content"}
      width={"full"}
      padding={2}
      borderRadius={10}
      bg={"whiteAlpha.700"}
      _hover={{
        background: "orange"
      }}
      key="{player}"
      onClick={() => {
        select(player)
      }}>
      <Stack
        alignSelf={"start"}
        direction={"row"}
      >
        <Circle
          size={"100px"}
          bg={"orange"}
        >
          <Text

            fontSize={50}>
            {index}
          </Text>
        </Circle>

        <Spacer
          width={"15px"} />
        <Stack
          alignContent={"center"}>
          <Text
            fontWeight={"extrabold"}
            fontSize={20}
            textAlign={"center"}>
            {player.PlayerName}
          </Text>
          <Text
            textAlign={"center"}>
            {player.Pos}
          </Text>
          <Text
            textAlign={"center"}>
            Mintues Played: {player.MP}
          </Text>
          <Money
            value={+player.ContractPrice}
          />
        </Stack>
        <PlayerStatsDisplay
          player={player} />
      </Stack>
    </Button>
  )
}

export default PerPlayerRosterDisplay