import { Player } from "./Player"
export type Team = {
  roster: Player[],
  rosterMetaData: Player[],
  name: string,
  budget: number,
  year: number,
  owner: string,
}
