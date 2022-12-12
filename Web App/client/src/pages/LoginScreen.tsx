import React, { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { Input, Box, Button, useToast, Text, Center, ButtonGroup, Stack, Heading, HStack, FormControl, FormLabel, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import { useUserContext } from "../contexts/UserContext";
import { Link, Navigate } from "react-router-dom";
import { useFantasyTeam } from "../contexts/FantasyTeamContext";
const defaultFormFields = {
  email: '',
  password: '',
}

const LoginScreen: React.FC = () => {
  const { login, user } = useUserContext();
  const { loadTeam } = useFantasyTeam();
  // react hooks
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const toast = useToast();
  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }
  // handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const loggedInUser = await login(email, password)
    console.log(loggedInUser)
    if (loggedInUser && loggedInUser.team_id) {
      console.log(loggedInUser.team_id)
      const returnedTeam = await loadTeam(loggedInUser.team_id)
      if (returnedTeam) localStorage.setItem("team", JSON.stringify(returnedTeam))
    }
  }

  const renderRedirect = () => {
    if (user) {
      return <Navigate to="/" />
    }
  }
  return (

    <Center
      bg={"#383434"}
      padding={10}
      height={"80vh"}
      alignContent={"center"}>
      {renderRedirect()}

      <form onSubmit={handleSubmit}>


        <Stack
          color={"white"}
          spacing={"15px"}>
          <Heading
            color={"white"}>
            Have an account? Sign In
          </Heading>
          <FormControl
            color={"white"}
            bgColor={"#383434"} variant="floating" id="email" isRequired

          >
            <Input placeholder="Email"
              type="email"
              required
              name="email"
              value={email}
              onChange={handleChange} />
            {/* It is important that the Label comes after the Control due to css selectors */}
            <FormLabel>Email</FormLabel>
            <FormErrorMessage>Invalid Email</FormErrorMessage>
          </FormControl>
          <FormControl
            color={"white"}
            bgColor={"#383434"} variant="floating" id="password" isRequired>
            <Input
              placeholder="Password"
              type='password'
              required
              name='password'
              value={password}
              onChange={handleChange}
            />
            {/* It is important that the Label comes after the Control due to css selectors */}
            <FormLabel>Password</FormLabel>
            <FormErrorMessage>Invalid Password</FormErrorMessage>
          </FormControl>

          <ButtonGroup
            colorScheme={"orange"}
            justifyContent={"center"}
            width={"100%"}>
            <Button
              w={"33%"}
              type="submit">Sign In</Button>
            <Button
              w={"33%"}
              type="button" onClick={resetFormFields}>Clear</Button>

          </ButtonGroup>
          <Link
            to="/signupPage"
          >
            <Text
              textDecor={"underline"}
              color="white"
              fontSize={"1rem"}
              fontWeight={"black"}
            >Haven't made an account? Sign up here!</Text>

          </Link>
        </Stack>
      </form>

    </Center >);
}

export default LoginScreen