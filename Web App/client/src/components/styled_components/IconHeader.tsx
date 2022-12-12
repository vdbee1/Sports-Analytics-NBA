import { Button, Heading, Icon, Spacer, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

const IconHeader = ({ icon, setCollapsed, headerText, collapsed }: {
  icon: IconType
  setCollapsed: () => void,
  headerText: string,
  collapsed: boolean
}) => {
  return (<Button
    onClick={setCollapsed}
    bg="none"
    height={"-webkit-fit-content"}
    textAlign={"left"}
    justifyContent={"start"}>
    <Icon
      as={icon}
      color="white"
      bg="black"
      padding={2}
      borderRadius={25}
      w={20}
      h={20}
    />
    <Heading
      paddingLeft={5}
    >
      {headerText}
    </Heading>
    <Spacer />
    <Text>{collapsed ? "Click to Expand" : ""}</Text>
  </Button>);
}
export default IconHeader