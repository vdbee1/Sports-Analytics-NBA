import { Alert, Button, HStack, Input, Stack } from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"
import { useState, FormEvent } from "react"
import { Comparator, SQLsearchterm } from "../../types/QueryRequest"
//TODO throttle requests!
const SearchBar: React.FC<{
  type: "Player" | "Team"
  search: (searchTerm: SQLsearchterm) => Promise<void>
}> = ({
  search, type
}) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);

    function createSQLSearch(name: string): SQLsearchterm {
      const searchTerm: SQLsearchterm = {
        value: name,
        type: type, //either player or team name
        comparator: Comparator.includes,
        term: type === "Player" ? "PlayerName" : "team_id"
      }

      return searchTerm;
    }

    async function submit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      //search
      if (searchTerm.length < 3) {
        setAlert(true)
      }
      else {
        setDisabled(true)
        setAlert(false)
        await search(createSQLSearch(searchTerm))
        setDisabled(false)
      }
    }
    return <Stack
      width={"50%"}>
      {alert ? <Alert
        variant={"subtle"}>
        At least 3 characters required
      </Alert> : <></>}

      <form
        onSubmit={submit}>
        <HStack>
          <Input
            bg={"white"}
            placeholder={`Search for a ${type}`}
            disabled={disabled}
            onChange={e => {
              setSearchTerm(e.target.value)
            }}>
          </Input>

          <Button
            width={"110px"}
            color={"white"}
            bg={"#ff9933"}
            disabled={disabled}
            type="submit"

            leftIcon={<BsSearch />}>
            Search
          </Button>
        </HStack>
      </form>

    </Stack >
  }

export default SearchBar