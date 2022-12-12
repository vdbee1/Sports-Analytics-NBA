import { Button, Circle, HStack, Icon, Spacer, Stack, Text } from "@chakra-ui/react";
import { GiMoneyStack } from "react-icons/gi";

import { Player } from "../types/Player";
import Money from "./styled_components/Money";
interface PlayerDataDisplayProps {
  player: Player,
}
const PlayerStatsDisplay = ({ player }: PlayerDataDisplayProps) => {
  return (
    <>
      <Stack
        bg={"orange.400"}
        padding={2}
        borderRadius={10}
        color={"white"}>

        <Text
          fontWeight={"bold"}>
          Shooting Averages:
        </Text>
        <Text>
          Two Pointers: {player.TwoP.toFixed(2)}
        </Text>
        <Text>
          Three Pointers: {player.ThreeP.toFixed(2)}
        </Text>
        <Text>
          Free Throws: {player.FT.toFixed(2)}
        </Text>
      </Stack>
      <Stack
        bg={"orange.400"}
        padding={2}
        borderRadius={10}
        color={"white"}>

        <Text
          fontWeight={"bold"}>
          Shooting Percentages:
        </Text>
        <Text>
          Two Pointer: {(player.TwoPcent * 100).toFixed(2)}%
        </Text>
        <Text>
          Three Pointer: {(player.ThreePcent * 100).toFixed(2)}%
        </Text>
        <Text>
          Free Throws: {(player.FTcent * 100).toFixed(2)}%
        </Text>
      </Stack>

      <Stack
        height={"100%"}
        bg={"orange.400"}
        padding={2}
        borderRadius={10}
        color={"white"}>

        <Text
          fontWeight={"bold"}>
          Rebounds:
        </Text>
        <Text>
          Offensive Rebounds: {player.ORB.toFixed(2)}
        </Text>
        <Text>
          Defensive Rebounds {player.DRB.toFixed(2)}
        </Text>
        <Text>
          Total Rebounds {player.TRB.toFixed(2)}
        </Text>
      </Stack>

      <Stack
        bg={"orange.400"}
        padding={2}
        borderRadius={10}
        color={"white"}>

        <Text
          fontWeight={"bold"}>
          Defense:
        </Text>
        <Text>
          Steals: {player.STL.toFixed(2)}
        </Text>
        <Text>
          Blocks: {player.BLK.toFixed(2)}
        </Text>
        <Text>
          Personal Fouls: {player.PF.toFixed(2)}
        </Text>
      </Stack>
    </>
  )
}

export default PlayerStatsDisplay