import React, { createContext, useState, useContext, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Player } from "../types/Player"
import { Team } from "../types/Team"
import { useToast } from "@chakra-ui/react"
import { trySaveTeam, tryLoadTeam } from "../utils/DataUtils"
import generateTeamName from "../utils/TeamNameGenerator"
import { useUserContext } from "./UserContext";
interface ContextType {
  team: Team | null;
  createNewTeam: (name?: string | null) => void;
  saveTeam: () => void;
  loadTeam: (team_id: string) => Promise<Team | null>;
  clearTeam: () => void;
  checkBudget: (cost: number) => boolean;
  budget: number;
  addPlayer: (player: Player, meta: Player) => void;
  removePlayer: (player: Player) => void;
  viewPlayer: (player: Player) => void;
  checkAvailability: (playerName: Player) => "unavailable" | "nobudget" | "available";

}

export const FantasyTeamContext = createContext<ContextType>({
  team: null,
  createNewTeam: () => { },
  saveTeam: () => { },
  loadTeam: async () => { return null },
  clearTeam: () => { },
  checkBudget: () => { return false },
  budget: 0,
  addPlayer: () => { },
  removePlayer: () => { },
  viewPlayer: () => { },
  checkAvailability: () => { return "unavailable" },

});

export const FantasyTeamProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [team, setTeam] = useState<Team | null>(null);
  const { user } = useUserContext();
  const toast = useToast();
  const [budget, setBudget] = useState<number>(0)
  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (savedTeam) {
      const foundTeam = JSON.parse(savedTeam);
      setTeam(foundTeam)
    }
  }, [])
  function createNewTeam(name?: string | null) {
    if (user) {
      const newTeam: Team = {
        name: name ? name : generateTeamName(),
        roster: [],
        rosterMetaData: [],
        budget: 140000000,
        year: 2022,
        owner: user ? user.name : "None"
      }
      setTeam(newTeam)
      setBudget(newTeam.budget)
    }

    else {
      toast({
        status: "error",
        title: "Cannot create a new team without a user!"
      })
    }
  }
  async function saveTeam() {
    if (team && user) {
      const result = await trySaveTeam(team, user.email)
      toast({
        status: result.status,
        title: result.title,
        description: result.text
      })
    }
    else {
      toast({
        status: "error",
        title: "User has no team!",
        description: "This is an unusual issue... sorry!"
      })
    }
  }

  async function loadTeam(team_id: string): Promise<Team | null> {
    const result = await tryLoadTeam(team_id)
    toast({
      status: result.status,
      title: result.title,
      description: result.text
    })
    if (result.team) {
      setTeam(result.team)
      setBudget(result.team.budget)
      return result.team
    }
    else return null
  }
  function clearTeam() {
    setTeam(null)
  }
  function checkBudget(cost: number): boolean {
    if (budget - cost <= 0) {
      return false;
    }
    else return true;
  }



  function checkAvailability(player: Player): "available" | "unavailable" | "nobudget" {

    if (!checkBudget(player.ContractPrice)) {
      return "nobudget"
    }
    if (team) {
      for (var i = 0; i < team.roster.length; i++) {
        if (team.roster[i].PlayerName === player.PlayerName) {
          return "unavailable"
        }
      }
      return "available"
    }
    else return "available"

  }
  function viewPlayer(player: Player) {

  }
  function addPlayer(player: Player, meta: Player) {
    if (team) {
      setTeam({ ...team, roster: [...team.roster, player], rosterMetaData: [...team.rosterMetaData, meta] })
    }
  }

  function removePlayer(player: Player) {
    //console.log(`trying to remove ${player.PlayerName}`)
    if (team) {
      const index = team.roster.indexOf(player)
      if (index > -1) {
        team.roster.splice(index, 1)
        team.rosterMetaData.splice(index, 1)
        setTeam({ ...team })
      }
    }
  }
  return (
    <FantasyTeamContext.Provider
      value={{
        team,
        createNewTeam,
        saveTeam,
        loadTeam,
        clearTeam,
        checkBudget,
        budget,
        addPlayer,
        removePlayer,
        checkAvailability,
        viewPlayer,
      }}
    >
      {children}
    </FantasyTeamContext.Provider>
  );
};

export const useFantasyTeam = () => {
  const context = useContext(FantasyTeamContext);
  if (context === undefined) {
    throw new Error(
      "useFantasyTeam must be used within a FantasyTeamProvider"
    );
  }
  return context;
};