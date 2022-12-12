import { Box, Button, ButtonGroup, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Link, Outlet } from "react-router-dom";
import { useFantasyTeam } from "../contexts/FantasyTeamContext";
import { useUserContext } from "../contexts/UserContext";
const Layout: React.FC = () => {
  const { createNewTeam } = useFantasyTeam();
  const { user } = useUserContext();
  return (
    <Box
      height={"-webkit-fit-content"}>
      <NavigationBar />
      <Outlet />
    </Box>)
}

export default Layout