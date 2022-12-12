import React from "react";
import { GiBrokenHeart } from "react-icons/gi"
import { Button, Center, Icon, Stack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
const NoPage: React.FC = () => {
  return (
    <Center>
      <Stack>
        <Icon as={GiBrokenHeart} boxSize={50} alignSelf={"center"} />
        <Text>Whoops you got lost!</Text>
        <Link to={"/"}>
          <Button
            bg={"orange"}
            color={"white"}>
            Take me Home
          </Button>
        </Link>
      </Stack>
    </Center>

  )
}

export default NoPage;
