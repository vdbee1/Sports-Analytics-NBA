import { Player } from "../types/Player"
import { GameOutcome } from "../types/GameOutcome"
import { Team } from "../types/Team"
export function predictPositivePoints(player: Player): number {
  const { MP, ThreeP, TwoP, DRB, AST, TOV } = player
  const val = 1.182965 + 0.164520 * MP + 1.058200 * ThreeP + 0.393399 * TwoP + 1.085329 * DRB + 1.486653 * AST - 0.411815 * TOV + 0.058070 * DRB * AST - 0.131127 * ThreeP * TOV - 0.043513 * MP * AST - 0.033444 * MP * DRB
  return Math.round(val)
}

export function predictNegativePoints(player: Player): number {
  const { GS, MP, ThreePA, TwoP, TwoPA, DRB, AST, BLK, TOV, ThreeP } = player
  const val = -2.957266 - 4.356233 * GS - 0.271290 * MP - 0.179994 * ThreePA + 0.399125 * TwoP - 0.906246 * TwoPA + 0.412483 * DRB + 0.161072 * AST + 0.035350 * BLK - 0.382476 * TOV + 0.239528 * GS * MP - 0.575765 * GS * TwoPA - 0.300584 * DRB * GS + 0.033754 * MP * TwoPA - 0.050902 * AST * ThreeP + 0.098252 * ThreePA * BLK
  return Math.round(val)
}


export function simulatePosCap(team: Team) {
  const pp = team?.roster.map((player) => {
    return { player: player.PlayerName, value: predictPositivePoints(player) }
  })
  return pp
}

export function simulateNegCap(team: Team) {
  const pp = team?.roster.map((player) => {
    return { player: player.PlayerName, value: predictNegativePoints(player) }
  })
  return pp
}
/**
 * 
 * @param p 
 * @param m 
 * @param checks Should we check for whether these values are 'real' or not
 * @returns 
 */
export function randomGameStats(p: Player, m: Player, checks: boolean): GameOutcome {

  function sim(mean: number, std: number) {
    return Math.round(randomSkewNormal(Math.random, mean, std, 0))
  }
  //free throws
  var FT = Math.round(randomSkewNormal(Math.random, p.FT, m.FT, 0))
  if (checks && FT < 0) {
    FT = 0
  }
  var FTA = Math.round(randomSkewNormal(Math.random, p.FTA, m.FTA, 0))
  if (checks && FT > FTA) {
    //check free throws
    FTA = FT
  }
  var TwoP = Math.round(randomSkewNormal(Math.random, p.TwoP, m.TwoP, .25))
  if (TwoP < 0) {
    TwoP = 0
  }
  var TwoPA = Math.round(randomSkewNormal(Math.random, p.TwoPA, m.TwoPA, .8))

  if (checks && TwoP > TwoPA) {
    //check 2-pointers
    TwoPA = TwoP
  }
  var ThreeP = Math.round(randomSkewNormal(Math.random, p.ThreeP, m.ThreeP, .25))
  if (ThreeP < 0) {
    ThreeP = 0
  }
  var ThreePA = Math.round(randomSkewNormal(Math.random, p.ThreePA, m.ThreePA, .8))
  if (checks && ThreeP > ThreePA) {
    //check threes
    ThreePA = ThreeP
  }
  var PTS = sim(p.PTS, m.PTS)
  var PTS_diff = PTS - (TwoP * 2 + ThreeP * 3 + FT)
  if (checks && PTS_diff !== 0) {
    //TODO create some method to resolve this difference
  }

  var simGS = sim(p.GS, m.GS)
  var GS: 1 | 0 = 0
  // eslint-disable-next-line
  if (simGS != 0 && simGS != 1) {
    if (simGS > 1) GS = 1
    if (simGS < 0) GS = 0
  }

  var ORB = sim(p.ORB, m.ORB)
  if (checks && ORB < 0) {
    ORB = 0
  }
  var DRB = sim(p.DRB, m.DRB)
  if (checks && DRB < 0) {
    DRB = 0
  }

  var BLK = sim(p.BLK, m.BLK);
  if (checks && BLK < 0) {
    BLK = 0
  }
  var outcomeObj = {
    PlayerName: p.PlayerName,
    GS: GS,
    MP: sim(p.MP, m.MP),
    ThreeP: ThreeP,
    ThreePA: ThreePA,
    TwoP: TwoP,
    TwoPA: TwoPA,
    FT: FT,
    FTA: FTA,
    ORB: ORB,
    DRB: DRB,
    TRB: ORB + DRB,
    AST: sim(p.AST, m.AST),
    STL: sim(p.STL, m.STL),
    BLK: BLK,
    TOV: sim(p.TOV, m.TOV),
    PF: sim(p.PF, m.PF),
    PTS: PTS,
    PTS_diff: PTS_diff,
    plays: []
  }


  //console.log(outcomeObj)
  return outcomeObj
}

//box-mueller transformation
function rand_bm(min: number, max: number, skew: number) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0)
    num = rand_bm(min, max, skew) // resample between 0 and 1 if out of range

  else {
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
}

const randomNormals = (rng: () => number) => {
  let u1 = 0, u2 = 0;
  //Convert [0,1) to (0,1)
  while (u1 === 0) u1 = rng();
  while (u2 === 0) u2 = rng();
  const R = Math.sqrt(-2.0 * Math.log(u1));
  const Θ = 2.0 * Math.PI * u2;
  return [R * Math.cos(Θ), R * Math.sin(Θ)];
};
export const randomSkewNormal = (rng: () => number, mean: number, std: number, skew: number) => {
  const [u0, v] = randomNormals(rng);
  if (skew === 0) {
    return mean + std * u0;
  }
  const coeff = skew / Math.sqrt(1 + skew * skew);
  const u1 = coeff * u0 + Math.sqrt(1 - coeff * coeff) * v;
  const z = u0 >= 0 ? u1 : -u1;
  return mean + std * z;
};
export const adjustGameOutcomeByMP = (gameOutcome: GameOutcome, adjust: number): GameOutcome => {
  var ORB = Math.floor(gameOutcome.ORB * adjust)
  var DRB = Math.floor(gameOutcome.DRB * adjust)
  var PTS = Math.floor(gameOutcome.PTS * adjust)
  var ThreeP = Math.floor(gameOutcome.ThreeP * adjust)
  var TwoP = Math.floor(gameOutcome.TwoP * adjust)
  var FT = Math.floor(gameOutcome.FT * adjust)
  return {
    PlayerName: gameOutcome.PlayerName,
    GS: gameOutcome.GS,
    MP: gameOutcome.MP * adjust,
    ThreeP: ThreeP,
    ThreePA: Math.round(gameOutcome.ThreePA * adjust),
    TwoP: TwoP,
    TwoPA: Math.round(gameOutcome.TwoPA * adjust),
    FT: FT,
    FTA: Math.round(gameOutcome.FTA * adjust),
    ORB: ORB,
    DRB: DRB,
    TRB: ORB + DRB,
    AST: Math.round(gameOutcome.AST * adjust),
    STL: Math.round(gameOutcome.STL * adjust),
    BLK: Math.round(gameOutcome.BLK * adjust),
    TOV: Math.round(gameOutcome.TOV * adjust),
    PF: Math.round(gameOutcome.PF * adjust),
    PTS: (FT * 1 + TwoP * 2 + ThreeP * 3),
    PTS_diff: PTS - (FT * 1 + TwoP * 2 + ThreeP * 3),
    plays: []
  }
}