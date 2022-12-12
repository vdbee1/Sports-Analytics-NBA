import { Box, Button, ButtonGroup, Center, Container, Grid, GridItem, Heading, HStack, NumberInput, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import PlotlyChart from "react-plotly.js"
import React, { useState } from "react";
import Plotly from "react-plotly.js"
import Plot from "react-plotly.js"
import { useFantasyTeam } from "../contexts/FantasyTeamContext";
import { Player } from "../types/Player";
import { randomSkewNormal } from "../utils/SimulationMethods";
import SliderInput from "./styled_components/NumberSlider";
const StatisticsView: React.FC = () => {
  const { team } = useFantasyTeam();
  //const handleClick = (evt: any) => alert('click')
  //const handleHover = (evt: any) => alert('hover')

  const layout = { title: "Player Stats", bardmode: "group", width: 1000, height: 500 };


  function plotComparatorStats(player: Player, playerMeta: Player, prop1: keyof Player, prop2: keyof Player, label1: string, label2: string): Plotly.Data {
    return {
      type: "bar",
      x: [label1, label2],
      y: [player[prop1], player[prop2]],
      error_y: {
        type: 'data',
        array: [playerMeta[prop1], playerMeta[prop2]]
      },
      text: player.PlayerName,
      name: player.PlayerName
    }
  }

  function generateData(player: Player, playerMeta: Player, prop1: keyof Player, prop2: keyof Player, label1: string, label2: string): Plotly.Data[] {
    const data: Plotly.Data[] = []

    if (team) {
      for (var i = 0; i < team.roster.length; i++) {
        data.push({
          type: "bar",
          x: [label1, label2],
          y: [player[prop1], player[prop1]],
          error_y: {
            type: 'data',
            array: [playerMeta[prop1], playerMeta[prop1]]
          },
          text: player.PlayerName,
          name: player.PlayerName
        });
      }

    }
    return data;
  }

  function genDataTeam(players: Player[], metas: Player[], prop1: keyof Player, label1: string, prop2?: keyof Player, label2?: string) {
    var x = players.map(p => p.PlayerName);
    var y = players.map(p => p[prop1]);
    var yError = metas.map(m => m[prop1])
    const data: Plotly.Data[] = [{
      type: "bar",
      x: x,
      y: y,
      error_y: {
        type: 'data',
        array: yError,
        color: "red"
      },

      //text: x,
      name: label1 + " Made"
    }]
    var max = Math.max(...y as number[]) + 2
    if (prop2) {
      var y2 = players.map(p => p[prop2])
      var y2error = metas.map(m => m[prop2])
      data.push({
        type: "bar",
        x: x,
        y: y2,
        error_y: {
          type: 'data',
          array: y2error
        },
        yaxis: 'y2',
        //text: x,
        name: label2 ? label2 : `${label1} Attempted`
      });
      max = Math.max(...y2 as number[]) + 5
    }

    const layout: Plotly.Layout = {
      title: `${label1} Averages This Season`,
      barmode: "group",
      width: 1000,
      height: 500,
      yaxis: {
        overlaying: 'y2',
        range: [0, max]
      },
      yaxis2: {
        range: [0, max]
      },
      /*shapes: [
        {
          type: 'line',
          xref: 'paper',
          x0: 0,
          y0: 12.0,
          x1: 1,
          y1: 12.0,
          line: {
            color: 'rgb(255, 0, 0)',
            width: 4,
            dash: 'dot'
          }
        }
      ]*/
    } as Plotly.Layout;

    return <PlotlyChart data={data} layout={layout} />
  }

  return <>
    {team ?
      <Tabs>
        <TabList>
          <Tab>
            Team Data
          </Tab>
          <Tab>
            More about the Statistics...
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box width={'100%'}>
              {genDataTeam(team.roster, team.rosterMetaData, "TwoP", "Two Pointers", "TwoPA")}
              {genDataTeam(team.roster, team.rosterMetaData, "ThreeP", "Three Pointers", "ThreePA")}
              {genDataTeam(team.roster, team.rosterMetaData, "FT", "Free Throws", "FTA")}
              {genDataTeam(team.roster, team.rosterMetaData, "BLK", "Blocks")}
              {genDataTeam(team.roster, team.rosterMetaData, "STL", "Steals")}
              {genDataTeam(team.roster, team.rosterMetaData, "DRB", "Defensive Rebounds")}
              {genDataTeam(team.roster, team.rosterMetaData, "ORB", "Offensive")}
            </Box>

          </TabPanel>
          <TabPanel>
            <BoxMuellerPlot />
          </TabPanel>
        </TabPanels>

      </Tabs>
      : <Container
        h={"70vh"}
      >
        <Center

          h={"100%"}>
          <Stack
            padding={10}
            bg={"blackAlpha.800"}
            textAlign={"center"}
            color={"white"}>
            <Heading>No stats here!</Heading>
            <Text >Make a team first!</Text>
          </Stack>

        </Center>
      </Container>}

  </>
}

const BoxMuellerPlot = () => {
  const [mean, setMean] = useState<number>(0);
  const [std, setStd] = useState<number>(1);
  const [skew, setSkew] = useState<number>(0);
  const [iterations, setIterations] = useState<number>(10);
  const [sampleData, setSampleData] = useState<number[]>([]);
  function generateData(): number[] {
    const dist: number[] = []
    for (var i = 0; i < iterations; i++) {
      dist.push(randomSkewNormal(Math.random, mean, std, skew))
    }
    return dist
  }
  return (<>
    <Heading>
      Box Mueller Transformation:
    </Heading>
    <Grid
      templateRows='repeat(4, 1fr)'
      templateColumns='repeat(3, 1fr)'>
      <GridItem colSpan={1}>
        <Text>
          Mean:
        </Text>
      </GridItem>
      <GridItem
        colSpan={2}>
        <SliderInput
          max={20}
          value={mean}
          setValue={setMean}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Text>
          Standard Deviation:
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <SliderInput
          value={std}
          setValue={setStd}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Text>
          Skew:
        </Text>
      </GridItem>
      <GridItem colSpan={2}>
        <SliderInput
          value={skew}
          setValue={setSkew}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Text>Iterations:</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <SliderInput
          value={iterations}
          setValue={setIterations}
          max={100000}
        />
      </GridItem>
    </Grid>
    <Stack>




      <Button
        onClick={() => {
          setSampleData(generateData())
        }}>
        Plot
      </Button>
    </Stack>
    <PlotlyChart
      data={[
        {
          x: sampleData,
          type: 'histogram',

        }
      ]}
      layout={{ title: 'Example of Box Mueller Transformation' }}
    />
  </>);

}

export default StatisticsView;