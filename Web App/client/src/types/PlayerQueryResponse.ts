import { Player } from "./Player"
export type PlayerQueryResponse = {
  status: string,
  title: string,
  text: string,
  players: Player[],
  playerMetas: Player[],
}