import { Plays } from "./Plays"
export type GameOutcome = {
  PlayerName: string,
  GS: 1 | 0,
  MP: number,
  ThreeP: number,
  ThreePA: number,
  TwoP: number,
  TwoPA: number,
  FT: number,
  FTA: number,
  ORB: number,
  DRB: number,
  TRB: number,
  AST: number,
  STL: number,
  BLK: number,
  TOV: number,
  PF: number,
  PTS: number,
  PTS_diff: number,
  //plays: Plays[]
  plays: string[]
}