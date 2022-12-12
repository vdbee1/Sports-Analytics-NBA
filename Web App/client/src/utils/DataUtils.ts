import { User } from "../types/User";
import { UserQueryResponse } from "../types/UserQueryResponse"
import { PlayerQueryResponse } from "../types/PlayerQueryResponse";
import { SaveTeamFormat } from "../types/SaveTeamFormat"
import { SQLsearchterm } from "../types/QueryRequest"
import { Team } from "../types/Team";
import { Player } from "../types/Player";
export const getTeamID = (team: Team): string => {
  return team.name + "-" + team.owner
}

export const tryGetUser = async (
  url: string,
  email: string,
  password: string
)
  : Promise<UserQueryResponse> => {
  try {
    const res = await fetch(url, {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    return await res.json();
  }
  catch (err) {
    console.log(err)
    return ({ "status": "error", "title": `Server is likely down`, "text": `${err}`, "user": null })
  }
}

export const tryCreateNewUser = async (
  url: string,
  user: User
)
  : Promise<UserQueryResponse> => {
  try {
    const res = await fetch(url, {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    return await res.json();
  }
  catch (err) {
    console.log(err)
    return ({ "status": "error", "title": `Server is likely down`, "text": `${err}`, "user": null })
  }
}

interface FindRoomResponse {
  status: "success" | "error",
  title: string,
  text: string,
  roomCode: string | null,
}
export const tryFindRoom = async (
  url: string,
  roomCode: string,
  email: string
)
  : Promise<FindRoomResponse> => {
  try {
    const res = await fetch(url, {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ roomCode, email })
    });

    return await res.json();
  }
  catch (err) {
    console.log(err)
    return ({ "status": "error", "title": `Server is likely down`, "text": `${err}`, "roomCode": null })
  }
}

export const tryFindPlayer = async (
  search: SQLsearchterm
)
  : Promise<PlayerQueryResponse> => {
  const { type, term, comparator, value } = search;
  console.log(search)
  try {
    const messageBody = { type: type, term: term, comparator: comparator.toString(), value: value }

    const res = await fetch("/search", {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(messageBody)
    });
    return await res.json();
  }
  catch (err) {
    console.log(err)
    return ({ "status": "error", "title": `Search Failed`, "text": `${err}`, "players": [], "playerMetas": [] })
  }
}
export const tryFindTeamFormats = async (search: SQLsearchterm): Promise<{ status: "success" | "error", title: string, text: string, teams: SaveTeamFormat[] }> => {
  const { type, term, comparator, value } = search;
  console.log(search)
  try {
    const messageBody = { type: type, term: term, comparator: comparator.toString(), value: value }

    const res = await fetch("/search", {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(messageBody)
    });
    return await res.json();
  }
  catch (err) {
    console.log(err)
    return ({ "status": "error", "title": `Search Failed`, "text": `${err}`, teams: [], })
  }
}
export const trySaveTeam = async (
  team: Team,
  email: string,
): Promise<{ status: "error" | "success", title: string, text: string }> => {
  try {
    const teamString = JSON.stringify(team)
    const contents = { team, email }
    console.log(contents)
    const res = await fetch("/saveteam", {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(contents)
    });
    console.log("package away 2")
    return await res.json();
  }
  catch (err) {
    console.log(err)
    return ({ "status": "error", "title": `Failed to save team`, "text": `${err}` })
  }
}

export const tryLoadTeam = async (
  team_id: string
): Promise<{ status: "error" | "success", title: string, text: string, team: Team | null }> => {
  try {
    const res = await fetch("/loadteam", {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ team_id })
    });

    return await res.json();
  }
  catch (err) {
    console.log(err)
    return ({ "status": "error", "title": `Failed to load team`, "text": `${err}`, team: null })
  }
}

export const getAllTeams = async (): Promise<{ status: "error" | "success", title: string, text: string, teams: SaveTeamFormat[] }> => {
  try {
    const res = await fetch("/allteams", {
      method: 'Get',
      headers: {
        'Content-type': 'application/json'
      },
    });

    return await res.json();
  }
  catch (err) {
    console.log(err)
    return ({ "status": "error", "title": `Failed to load teams`, "text": `${err}`, teams: [] })
  }
}

export const searchTeams = async (): Promise<{ status: "error" | "success", title: string, text: string, teams: SaveTeamFormat[] }> => {
  try {
    const res = await fetch("/search", {
      method: 'Post',
      headers: {
        'Content-type': 'application/json'
      },
    });

    return await res.json();
  }
  catch (err) {
    console.log(err)
    return ({ "status": "error", "title": `Failed to load teams searching for `, "text": `${err}`, teams: [] })
  }
}

export const collectPlayerNames = (team: SaveTeamFormat): string[] => {
  const playerNames: string[] = [];

  if (team.player1 && team.player1 !== "NULL")
    playerNames.push(team.player1);
  if (team.player2 && team.player2 !== "NULL")
    playerNames.push(team.player2);
  if (team.player3 && team.player3 !== "NULL")
    playerNames.push(team.player3);
  if (team.player4 && team.player4 !== "NULL")
    playerNames.push(team.player4);
  if (team.player5 && team.player5 !== "NULL")
    playerNames.push(team.player5);
  if (team.player6 && team.player6 !== "NULL")
    playerNames.push(team.player6);
  if (team.player7 && team.player7 !== "NULL")
    playerNames.push(team.player7);
  if (team.player8 && team.player8 !== "NULL")
    playerNames.push(team.player8);
  if (team.player9 && team.player9 !== "NULL")
    playerNames.push(team.player9);
  if (team.player10 && team.player10 !== "NULL")
    playerNames.push(team.player10);
  if (team.player11 && team.player11 !== "NULL")
    playerNames.push(team.player11);
  if (team.player12 && team.player12 !== "NULL")
    playerNames.push(team.player12);
  if (team.player13 && team.player13 !== "NULL")
    playerNames.push(team.player13);
  if (team.player14 && team.player14 !== "NULL")
    playerNames.push(team.player14);
  if (team.player15 && team.player15 !== "NULL")
    playerNames.push(team.player15);
  return playerNames;
}

export function currentBudget(team: Team): number {
  if (team) {
    let price: number = 0;
    for (var player of team.roster) {
      price = price + +player.ContractPrice;
    }
    return team.budget - price;
  }
  else return 0;
}

export function currentContractPrices(team: Team): number {
  if (team) {
    let price: number = 0
    for (var player of team.roster) {
      price = price + +player.ContractPrice
    }

    return price;
  }
  else return 0
}