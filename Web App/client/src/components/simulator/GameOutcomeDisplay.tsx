import { Box, Button, Container, Grid, GridItem, Heading, HStack, Spacer, Stack, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { GameOutcome } from "../../../../server/types/GameOutcome"
import { currentBudget } from "../../utils/DataUtils"
import Court from "../Court"
import Money from "../styled_components/Money"

const GameOutcomeDisplay = ({

  userTeamName,
  opponentTeamName,
  userOutcomes,
  opponentOutcomes
}: {
  userTeamName: string,
  opponentTeamName: string,
  userOutcomes: GameOutcome[],
  opponentOutcomes: GameOutcome[]
}) => {

  function percentageValues(label: string, num: number, den: number) {
    return (<Grid
      borderWidth={2}
      templateColumns={"1fr 1fr 1fr 1fr"}
    >
      <GridItem>
        <Text
          fontWeight={"bold"}>
          {label}:
        </Text>
      </GridItem>

      <GridItem>
        {num}
      </GridItem>
      <GridItem>
        {den}
      </GridItem>
      <GridItem>
        <Text>
          {(num / den).toFixed(2)}
        </Text>
      </GridItem>

    </Grid>)
  }
  function absoluteValues(label: string, num: number) {
    return (<Grid
      borderWidth={2}
      templateColumns={"1fr 1fr 1fr 1fr"}
    >
      <GridItem>
        <Text
          fontWeight={"bold"}>
          {label}:
        </Text>
      </GridItem>

      <GridItem>
        {num.toFixed(0)}
      </GridItem>
      <GridItem>

      </GridItem>
      <GridItem>
        <Text>

        </Text>
      </GridItem>

    </Grid>)
  }

  function showTeamOutcomes(outcomes: GameOutcome[]) {
    const teamOutcome: GameOutcome = {
      PlayerName: "",
      GS: 0,
      MP: outcomes.reduce((partialSum, a) => partialSum + a.MP, 0),
      ThreeP: outcomes.reduce((partialSum, a) => partialSum + a.ThreeP, 0),
      ThreePA: outcomes.reduce((partialSum, a) => partialSum + a.ThreePA, 0),
      TwoP: outcomes.reduce((partialSum, a) => partialSum + a.TwoP, 0),
      TwoPA: outcomes.reduce((partialSum, a) => partialSum + a.TwoPA, 0),
      FT: outcomes.reduce((partialSum, a) => partialSum + a.FT, 0),
      FTA: outcomes.reduce((partialSum, a) => partialSum + a.FTA, 0),
      ORB: outcomes.reduce((partialSum, a) => partialSum + a.ORB, 0),
      DRB: outcomes.reduce((partialSum, a) => partialSum + a.DRB, 0),
      TRB: outcomes.reduce((partialSum, a) => partialSum + a.TRB, 0),
      AST: outcomes.reduce((partialSum, a) => partialSum + a.AST, 0),
      STL: outcomes.reduce((partialSum, a) => partialSum + a.STL, 0),
      BLK: outcomes.reduce((partialSum, a) => partialSum + a.BLK, 0),
      TOV: outcomes.reduce((partialSum, a) => partialSum + a.TOV, 0),
      PF: outcomes.reduce((partialSum, a) => partialSum + a.PF, 0),
      PTS: outcomes.reduce((partialSum, a) => partialSum + a.PTS, 0),
      PTS_diff: outcomes.reduce((partialSum, a) => partialSum + a.PTS_diff, 0),
      plays: []
    }
    return (<Stack>
      {absoluteValues("Points", teamOutcome.PTS)}
      {percentageValues("Two Pointers", teamOutcome.TwoP, teamOutcome.TwoPA)}
      {percentageValues("Three Pointers", teamOutcome.ThreeP, teamOutcome.ThreePA)}
      {percentageValues("Free Throws", teamOutcome.FT, teamOutcome.FTA)}

      {absoluteValues("Point Discrepancy", teamOutcome.PTS_diff)}
      {absoluteValues("Minutes Played", teamOutcome.MP)}
      {absoluteValues("Blocks", teamOutcome.BLK)}
      {absoluteValues("Defensive Rebounds", teamOutcome.DRB)}
      {absoluteValues("Offensive Rebounds", teamOutcome.ORB)}
      {absoluteValues("Personal Fouls", teamOutcome.PF)}

    </Stack>)
  }

  function getWinningTeamName(): string {
    const userScore = userOutcomes.reduce((partialSum, a) => partialSum + a.PTS, 0)
    const opponentScore = opponentOutcomes.reduce((partialSum, a) => partialSum + a.PTS, 0)
    if (userScore > opponentScore) return userTeamName;
    else return opponentTeamName;
  }
  return (
    <Container
      alignSelf={"center"}
      justifyContent={"center"}
      boxShadow={"2xl"}
      maxWidth={"1000px"}>
      <Court />
      <motion.div
        initial={{ y: "-100px" }}
        animate={{
          scale: [.5, 1.5],
          transition: {
            type: "spring",
            damping: 10,
            mass: 0.75,
            stiffness: 0,
            repeat: Infinity,
            repeatType: "mirror"
          }
        }}
      >
        <Heading
          color={"black"}
          textShadow={"2xl"}

          fontSize={100}
          textAlign={"center"}>
          {getWinningTeamName()} WIN!
        </Heading>
      </motion.div>
      <Heading textAlign={"center"}
        fontFamily={"Open Sans"}>Game Breakdown below</Heading>
      <Grid templateColumns='repeat(2,1fr)'
        gap={5}>
        <GridItem
          alignContent={"center"}>
          <Heading fontSize={40}
            textAlign={"center"}>
            {userTeamName}
          </Heading>
          {showTeamOutcomes(userOutcomes)}
          {userOutcomes.map((outcome) => { return ShowIndividualOutcomes(outcome) })}
        </GridItem>
        <GridItem
          alignContent={"center"}>
          <Heading
            fontSize={40}
            textAlign={"center"}
          >{opponentTeamName}
          </Heading>
          {showTeamOutcomes(opponentOutcomes)}
          {opponentOutcomes.map((outcome) => { return ShowIndividualOutcomes(outcome) })}
        </GridItem>
      </Grid>
    </Container>
  )
}
function ShowIndividualOutcomes(outcome: GameOutcome) {
  const [showStats, setShowStats] = useState<boolean>(false);
  function absoluteValues(label: string, num: number) {
    return (<Grid
      borderWidth={2}
      templateColumns={"1fr 1fr 1fr 1fr"}
    >
      <GridItem>
        <Text
          fontWeight={"bold"}>
          {label}:
        </Text>
      </GridItem>

      <GridItem>
        {num.toFixed(0)}
      </GridItem>
      <GridItem>

      </GridItem>
      <GridItem>
        <Text>

        </Text>
      </GridItem>

    </Grid>)
  }

  function percentageValues(label: string, num: number, den: number) {
    return (<Grid
      borderWidth={2}
      templateColumns={"1fr 1fr 1fr 1fr"}
    >
      <GridItem>
        <Text
          fontWeight={"bold"}>
          {label}:
        </Text>
      </GridItem>

      <GridItem>
        {num}
      </GridItem>
      <GridItem>
        {den}
      </GridItem>
      <GridItem>
        <Text>
          {(num / den).toFixed(2)}
        </Text>
      </GridItem>

    </Grid>)
  }
  return (<Stack>
    <Button
      bg={showStats ? "orange.400" : "orange.600"}
      color={showStats ? "white" : "black"}
      _hover={{ bg: "gold" }}
      onClick={() => {
        showStats ? setShowStats(false) : setShowStats(true)
      }}>
      <Heading
        fontFamily={"Open Sans"}
        fontSize={22}>
        {outcome.PlayerName}
      </Heading><Spacer />
      <Text>
        Minutes played: {outcome.MP.toFixed(2)}
      </Text>
    </Button>
    {showStats ? <>
      <Grid
        borderWidth={2}
        templateColumns={"1fr 1fr 1fr 1fr"}
      >
        <Text>Stat</Text>
        <Text>Value</Text>
        <Text>Attempts</Text>
        <Text>Percentage</Text>
      </Grid>
      {absoluteValues("Points Scored", outcome.PTS)}

      {percentageValues("Two Pointers", outcome.TwoP, outcome.TwoPA)}
      {percentageValues("Three Pointers", outcome.ThreeP, outcome.ThreePA)}
      {percentageValues("Free Throws", outcome.FT, outcome.FTA)}
      {absoluteValues("Assists", outcome.AST)}
      {absoluteValues("Blocks", outcome.BLK)}
      {absoluteValues("Steals", outcome.STL)}
      {absoluteValues("Personal Fouls", outcome.PF)}
    </> : <></>}
  </Stack>)
}
export default GameOutcomeDisplay