import { Icon, HStack, Text, ChakraProps } from "@chakra-ui/react"
import { GiMoneyStack } from "react-icons/gi"

export type ValueLabelProps = ChakraProps & {
  value: number,
  label?: string,
};
const Money: React.FC<ValueLabelProps> = ({ value, label, width }) => {

  return (

    <HStack
      width={width}
      bg="green.500"
      padding={1}
      borderRadius={10}>
      <Icon
        as={GiMoneyStack}
        color={"white"}
        borderRadius={10}
        height={25}
        width={25} />
      {label ?
        <Text
          fontWeight={"black"}
          color={"white"}>
          {label}:
        </Text> : <></>}
      <Text
        fontWeight={"bold"}
        color={"white"}>
        $ {value.toLocaleString() + ".00"}
      </Text></HStack>)
}

export default Money