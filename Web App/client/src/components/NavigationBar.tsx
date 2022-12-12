import { Button, ButtonGroup, HStack, Text, Stack, Spacer, Heading, Box, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useFantasyTeam } from "../contexts/FantasyTeamContext";
import { useUserContext } from "../contexts/UserContext"
import AdminControls from "./AdminControls";
import { AiOutlineUser } from "react-icons/ai";
const NavigationBar = () => {
  const { user } = useUserContext();
  return (<HStack
    color={"white"}
    bg="blackAlpha.800"
    pl={2}
    pr={2}>
    <ButtonGroup variant={"ghost"}>
      <Link to="/home">
        <Button
          colorScheme={"whiteAlpha"}>
          Home
        </Button>
      </Link>
    </ButtonGroup>
    {user?.role == "admin" ? <AdminControls /> : <></>}
    <Spacer />
    <Text fontFamily={"mono"}>
      Version 1.2
    </Text>
    <Spacer />


    <Heading
      fontFamily="bangers">
      {user?.team_id}
    </Heading>

    {user ? <Popover
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button
          colorScheme={"whiteAlpha"}
          leftIcon={<AiOutlineUser />}>{user.name}</Button>
      </PopoverTrigger>
      <PopoverContent color='white' bg='blackAlpha.800' borderColor='blue.800'>
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          User info:
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Text>Email: {user.email}
          </Text>
          <Text>
            Team ID: {user.team_id}
          </Text>

        </PopoverBody>
        <PopoverFooter
          border='0'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          pb={4}
        >
          <Box fontSize='sm'
            w={"100%"}
            textAlign={"right"}>Logged in as {user.name}</Box>

        </PopoverFooter>
      </PopoverContent>
    </Popover> : <Text>Not Logged In!</Text>}
  </HStack>)
}
export default NavigationBar