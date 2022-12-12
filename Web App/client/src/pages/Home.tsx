import React, { useState } from "react";
import { Outlet } from "react-router-dom"
import { Alert, Box, Button, ButtonGroup, Center, Heading, HStack, Icon, Input, Spacer, Stack, Text, Tooltip } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { GiBasketballBall, GiBasketballBasket } from "react-icons/gi"
import { useUserContext } from "../contexts/UserContext"
import { useFantasyTeam } from "../contexts/FantasyTeamContext";
import Court from "../components/Court";
import NBAcourt from "../tmp/NBAcourt";
import { motion } from "framer-motion";
const Home: React.FC = () => {

  const { user, logout, createRoom, joinRoom } = useUserContext();
  const { clearTeam } = useFantasyTeam();
  const [roomCode, setRoomCode] = useState<string>("");
  function roomControls() {
    if (user)
      return (<>{user.room_id ?
        <ButtonGroup
          width={"100%"}>

          <Tooltip
            label="We're working on this feature!"
            placement="right-end"
          >
            <Button
              bg={"gray"}
              width={"100%"}
              disabled={true}
            //TODO leave room
            >
              Leave Room
            </Button>
          </Tooltip>

        </ButtonGroup> : <Stack>{roomCode.length < 4 ? <Alert status="warning">
          Room code should be a minimum of 4 characters!
        </Alert> : roomCode.length > 10 ? <Alert status="warning">
          Room code is too long!
        </Alert> : <></>}<ButtonGroup>

            <Input
              bg={"white"}
              width={"30%"}
              textAlign={"center"}
              placeholder="ROOM CODE"
              required
              value={roomCode}
              onChange={(e) => {
                setRoomCode(e.target.value.toUpperCase())
              }}
            />

            <Button
              onClick={() => {
                if (roomCode.length >= 4 && roomCode.length <= 10) {
                  joinRoom(roomCode)
                }
              }}>
              Join Room
            </Button>
            <Button
              onClick={() => {
                if (roomCode.length >= 4 && roomCode.length <= 10) {
                  createRoom(roomCode)
                }
              }}
              //TODO disabled createRoom for now.
              disabled={true}
            >

              Create New Room
            </Button>
          </ButtonGroup></Stack>}
      </>
      )
  }
  function renderOptions() {

    return (
      <ButtonGroup
        padding={0}
        alignSelf={"center"}
        colorScheme={"orange"}
        variant={"solid"}>
        <Stack w={"10em"}>
          {user ?
            <Button
              width={"100%"}
              onClick={() => {
                logout();
                clearTeam();
              }}>
              Log Out
            </Button> : <><Link to='/signupPage' >
              <Button
                w={"100%"}>
                Sign Up
              </Button>
            </Link>

              <Link to='/loginPage'>
                <Button w={"100%"}>
                  Log In
                </Button>
              </Link></>}</Stack>
      </ButtonGroup>
    )
  }


  return (
    <Box
      alignContent={"center"}>
      <Center
        bg={"blackAlpha.800"}
        pt={40}>
        <Stack
          height={"100%"}
          width={"50%"}
          alignItems='center'
          justifyContent='center'
        >


          <Heading
            color={"white"}
            textAlign={"center"}
            as='h3'>
            The Data Nerds present:
          </Heading>
          <HStack
            justifyContent={"center"}
            width={"100%"}
            fontSize={100}
            textAlign={"center"}
            color={"orange"}>
            <Icon as={GiBasketballBasket}
            //color="orange"
            />


            <Heading
              fontSize={100}
            >
              NBA Fantasy Simulator
            </Heading><motion.div
              whileHover={{
                scale: [1, .3, 1.7, 1, 1.5, 1, 1.2, 1],
                rotateY: [12, 0, -6, 4, 8, 10, 12]

              }}
              transition={{
                type: "spring",
                duration: 2
              }}
            >
              <Icon as={GiBasketballBall}
              //color="orange"
              />
            </motion.div>
          </HStack>


        </Stack>
      </Center>
      <Spacer
        height={"1rem"} />
      <Text
        fontSize={"24"}
        textAlign={"center"}>
        {user?.team_id ? `and the ${user.team_id}` : ""}
      </Text>

      <Center
        height={"100%"}
        alignContent={"center"}>
        <Stack >
          {renderOptions()}
          {roomControls()}
          {user?.room_id ? <Link to='/simulator' >
            <Button
              width={"100%"}
              colorScheme={"green"}>
              Go to the Simulator!
            </Button>
          </Link> : <></>}
        </Stack>
      </Center>
      <Spacer height={10} />

    </Box>
  )
}

export default Home

