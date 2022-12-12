import { Player } from "../../types/Player"
import { Team } from "../../types/Team"

export const simulatePlayerPerformance = () => {

}

export const plusMinuseSimualtion = (team1: Team, team2: Team) => {

}

function positivePoints(player: Player): number {
  const { MP, ThreeP, TwoP, DRB, AST, TOV } = player
  const val = 1.182965 + 0.164520 * MP + 1.058200 * ThreeP + 0.393399 * TwoP + 1.085329 * DRB + 1.486653 * AST - 0.411815 * TOV + 0.058070 * DRB * AST - 0.131127 * ThreeP * TOV - 0.043513 * MP * AST - 0.033444 * MP * DRB
  return val
}
