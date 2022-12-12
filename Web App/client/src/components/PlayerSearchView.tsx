import { Button, Icon, Heading, HStack, Text, useToast, Stack, Spacer } from "@chakra-ui/react"
import PlayerSearchDisplay from "./drafting/PlayerSearchDisplay"
import SearchBar from "./drafting/SearchBar"
import { useFantasyTeam } from "../contexts/FantasyTeamContext"
import Money from "./styled_components/Money"
import { useState } from "react"
import { Player } from "../types/Player"
import { SQLsearchterm } from "../types/QueryRequest"
import { PlayerQueryResponse } from "../types/PlayerQueryResponse"
import { tryFindPlayer } from "../utils/DataUtils"
import { MdPersonSearch } from "react-icons/md"
import { currentBudget } from "../utils/DataUtils"
import IconHeader from "./styled_components/IconHeader"
import SearchPlayerByStat from "./drafting/SearchPlayerByStat"
import { type } from "os"
const PlayerSearchView = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { team, addPlayer, viewPlayer, checkAvailability } = useFantasyTeam();
  const [queriedPlayers, setQueriedPlayers] = useState<Player[]>([])
  const [queriedPlayerMetas, setQueriedPlayerMetas] = useState<Player[]>([])

  const toast = useToast();
  const submitSearch = async (search: SQLsearchterm) => {
    console.log("Searching! ")

    console.log(search)
    const res: PlayerQueryResponse = await tryFindPlayer(
      search
    )
    console.log(res)
    if (res.status === "error") {
      toast({
        status: "error",
        title: res.title,
        description: res.text,
      })
    }
    else {
      toast({
        status: "success",
        title: res.title,
        description: res.text,
      })
      setQueriedPlayers(res.players)
      setQueriedPlayerMetas(res.playerMetas)
    }
  }
  function findPlayerMeta(player: Player): Player {
    //TODO hacky method of including player meta data. Will consider changing if we keep this app longer
    for (var i = 0; i < queriedPlayerMetas.length; i++) {
      if (queriedPlayerMetas[i].PlayerName == player.PlayerName) {
        return queriedPlayerMetas[i]
      }
    }
    //FALL BACK is to return the player himself...
    return player
  }



  return (
    <Stack>
      <IconHeader
        setCollapsed={() => {
          setCollapsed(collapsed ? false : true);
        }}
        icon={MdPersonSearch}
        headerText={`Search For Players`}
        collapsed={collapsed}
      />
      {collapsed ? <></> : <>

        <HStack>
          <SearchBar
            search={submitSearch}
            type="Player" />
          <SearchPlayerByStat
            search={submitSearch} />
        </HStack>
        <PlayerSearchDisplay
          queriedPlayers={queriedPlayers}
          checkAvailability={checkAvailability}
          addPlayer={(player: Player) => {
            addPlayer(player, findPlayerMeta(player))
          }}
          viewPlayer={viewPlayer}
        />
        <HStack>
          <HStack

            padding={2}
            fontSize={20}>
            {team ?
              <Money
                label={"Budget: "}
                value={currentBudget(team)} /> : <></>}
          </HStack>
        </HStack>
      </>}
    </Stack>

  )
}
export default PlayerSearchView