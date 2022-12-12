import React, { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { User } from "../types/User"
import { Input, Box, Button, useToast, Text, Center, ButtonGroup, Stack, Alert, AlertIcon, Heading, HStack, FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import { useUserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
const defaultFormFields = {
  name: '',
  email: '',
  password: '',
  confirm_password: ''
}

const SignupScreen: React.FC = () => {
  const { createNewUser, user } = useUserContext();
  // react hooks
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { name, email, password, confirm_password } = formFields
  const [matchpwAlert, setMatchpwAlert] = useState<boolean>(false);
  const [pwLengthAlert, setpwLengthAlert] = useState<boolean>(false);
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
    const tempUser: User = {
      name: name,
      email: email,
      password: password,
      room_id: null,
      team_id: null,
      role: "NULL"
    }
    if (formFields.password.length < 5) {
      setpwLengthAlert(true);
    }
    else if (formFields.confirm_password !== formFields.password) {
      setMatchpwAlert(true);
    }
    else await createNewUser(tempUser)
  }

  const renderRedirect = () => {
    if (user) {
      return <Navigate to="/" />
    }
  }
  return (
    <Center
      bg={"blackAlpha.800"}
      height={"80vh"}
      alignContent={"center"}>
      {renderRedirect()}


      <form onSubmit={handleSubmit}
        color="white">
        <Stack
          color={"white"}
          w={"100%"}
        >
          <Heading color={"white"}>
            Sign up and create your dream team
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
            <FormHelperText color={"white"}>Please input your email (or anything with an @ sign)</FormHelperText>
            <FormErrorMessage>Invalid Email</FormErrorMessage>
          </FormControl>
          <FormControl
            color={"white"}
            bgColor={"#383434"} variant="floating" id="email" isRequired

          >
            <Input

              placeholder="Name"
              type="name"
              required
              name="name"
              value={name}
              onChange={handleChange}
            />

            {/* It is important that the Label comes after the Control due to css selectors */}
            <FormLabel>Public Username</FormLabel>
            <FormHelperText color={"white"}>Keep it very short and sweet!</FormHelperText>
            <FormErrorMessage>Invalid Username</FormErrorMessage>
          </FormControl>
          <FormControl
            color={"white"}
            bgColor={"#383434"} variant="floating" id="email" isRequired

          >
            {pwLengthAlert ? <Alert
              status='error'
              variant={"subtle"}
            >
              <AlertIcon />
              Password is too short!
            </Alert> : <></>}
            <Input

              placeholder="Password"
              type='password'
              required
              name='password'
              value={password}
              onChange={handleChange}
            />
            {matchpwAlert ?
              <Alert
                status='error'
                variant={"subtle"}
              >
                <AlertIcon />
                Passwords don't match!
              </Alert> : <></>}
            <Input

              placeholder="Confirm Password"
              type='password'
              required
              name='confirm_password'
              value={confirm_password}
              onChange={handleChange}
            />
            {/* It is important that the Label comes after the Control due to css selectors */}
            <FormLabel>Password</FormLabel>
            <FormHelperText color={"white"}>WARNING: This site is just a demo, as such your password is NOT SECURE. </FormHelperText>
            <FormErrorMessage>Invalid Email</FormErrorMessage>
          </FormControl>
          <HStack
            justifyContent={"center"}

          >
            <ButtonGroup
              colorScheme={"orange"}>
              <Button type="submit">Sign me up!</Button>
              <Button

                type="button" onClick={resetFormFields}>Clear</Button>
            </ButtonGroup>
          </HStack>

        </Stack>
      </form>
    </Center>);
}

export default SignupScreen