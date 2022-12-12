import { Button, HStack, Input, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Player } from "../../types/Player";
import { Comparator, SQLsearchterm } from "../../types/QueryRequest";
const SearchPlayerByStat = ({ search
}: {
  search: (searchTerm: SQLsearchterm) => Promise<void>
}) => {
  const [prop, setProp] = useState<keyof Player>("TwoP")
  const [value, setValue] = useState<number>(0);
  const [comparator, setComparator] = useState<Comparator>(Comparator["="])

  function createSQLSearch(): SQLsearchterm {
    const symbols = [">", ">=", "=", "<=", "<"]
    const searchTerm: SQLsearchterm = {
      value: value.toString(),
      type: "Player", //either player or team name
      comparator: comparator,
      term: prop
    }

    return searchTerm;
  }

  return (<HStack width={"50%"}>

    <Select
      width={"25%"}
      onChange={(e) => {
        var castProp = e.target.value as keyof Player;
        setProp(castProp)
        console.log(prop)
      }}
      placeholder=''>
      <option value="TwoP">Two Pointers</option>
      <option value="ThreeP">Three Pointers</option>
      <option value='TwoPA'>Two Pointer Attempts</option>
      <option value='ThreePA'>Three Pointer Attempts</option>
      <option value='FT'>Free Throws</option>
      <option value='FTA'>Free Throw Attempts</option>
      <option value='ContractPrice'>Contract Price</option>
      <option value='ORB'>Offensive Rebounds</option>
      <option value='DRB'>Defensive Rebounds</option>
      <option value='TRB'>Total Rebounds</option>
      <option value='AST'>Assists</option>
      <option value='STL'>Steals</option>
      <option value='BLK'>Blocks</option>
      <option value='TOV'>Turnovers</option>
      <option value='PF'>Personal Fouls</option>
    </Select>
    <Select
      width={"20%"}
      onChange={(e) => {
        const comp = e.target.value as unknown as Comparator
        setComparator(comp)
        console.log(comparator)
      }}
    >
      <option value={Comparator["="]}>=</option>
      <option value={Comparator["<"]}>{"<"}</option>
      <option value={Comparator["<="]}>{'\u2264'}</option>

      <option value={Comparator[">"]}>{">"}</option>
      <option value={Comparator[">="]}>{'\u2265'}</option>
    </Select>
    <Input
      width={"40%"}
      type="number"
      min={0}
      placeholder="Value"
      onChange={(e) => {
        setValue(parseInt(e.target.value))
      }}
      defaultValue={0}
    />
    <Button
      color={"white"}
      bg={"#ff9933"}
      width={"110px"}
      leftIcon={<BsSearch />}
      onClick={() => {
        search(createSQLSearch())
      }}>
      Search
    </Button>
  </HStack>)
}

export default SearchPlayerByStat