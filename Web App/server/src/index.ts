import express, { Express, Request, Response } from "express"
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { Team } from "../types/Team"
import * as dbAccess from "./utils/DatabaseAccess"
import { SQLsearchterm } from "../types/QueryRequest";
import { SaveTeamFormat } from "../types/SaveTeamFormat"
interface LoginFormInputs {
  email: string,
  password: string
}

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 8080;
//TODO note the various modes are production, staging and development
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../../client/build')));

  app.get('/home', function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../../../client/build', 'index.html'));
  });

}
else if (process.env.NODE_ENV === 'staging') {
  app.get('/', (req: Request, res: Response) => {
    res.send(`<h1>Server is in staging mode!</h1><h2>NODE_ENV: ${process.env.NODE_ENV} <br/> DB_HOST: ${process.env.DB_HOST}</h2>`)
  });
}
else {
  app.use(express.static(path.join(__dirname, '../../client/build')));

  app.get('/home', function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}
app.post('/login', async (req: Request, res: Response) => {
  const { email, password }: LoginFormInputs = req.body;
  console.log(`${email} + ${password}`)

  const result = await dbAccess.findUser(email, password);
  if (!result.user) {
    return res.status(404).json({ status: "error", title: result.title, text: result.text, user: null })
  }

  console.log("Success!")
  return res.status(200).json({ status: "success", title: result.title, text: result.text, user: result.user })
});

app.post('/signup', async (req: Request, res: Response) => {
  const newUser: { name: string, email: string, password: string, role: string, room_id: string, team_id: string } = req.body;
  console.log(`Trying to add ${newUser.name} at ${newUser.email}`);
  newUser.role = "NULL"
  const result = await dbAccess.createUser(newUser);
  if (!result.user) {
    return res.status(404).json({ status: "error", title: result.title, text: result.text, user: null })
  }

  console.log("Success!")
  return res.status(200).json({ status: "success", title: result.title, text: result.text, user: result.user })
});

app.post('/joinroom', async (req: Request, res: Response) => {
  const { roomCode, email } = req.body;
  const mode = "join"
  console.log(`${mode.toUpperCase()} + ${roomCode}`)

  const result = await dbAccess.findRoom(roomCode, mode, email);
  if (result.status === "error") {
    return res.status(404).json({ status: "error", title: result.title, text: result.text })
  }

  console.log("Success!")
  return res.status(200).json({ status: "success", title: result.title, text: result.text })
});
app.post('/createroom', async (req: Request, res: Response) => {
  const { roomCode, email } = req.body;
  const mode = "create"
  console.log(`${mode.toUpperCase()} + ${roomCode}`)

  const result = await dbAccess.findRoom(roomCode, mode, email);
  if (result.status === "error") {
    return res.status(404).json({ status: "error", title: result.title, text: result.text })
  }

  console.log("Success!")
  return res.status(200).json({ status: "success", title: result.title, text: result.text })
});
app.post('/search', async (req: Request, res: Response) => {
  const search: SQLsearchterm = req.body
  console.log(search)

  if (search.type === "Player") {
    const result = await dbAccess.findPlayers(search)

    if (result.players.length === 0) {
      return res.status(404).json({ status: "error", title: result.title, text: result.text, players: [], playerMetas: [] })
    }
    else {
      return res.status(200).json({ status: "success", title: result.title, text: result.text, players: result.players, playerMetas: result.playerMetas })
    }
  }
  else if (search.type === "Team") {
    console.log(`Searching for ${search.type} where team_id == ${search.value} `)
    const result = await dbAccess.findTeam(search)
    if (result.teams.length === 0) {
      return res.status(404).json({ status: "error", title: result.title, text: result.text, teams: [] })
    }
    else {
      return res.status(200).json({ status: "success", title: result.title, text: result.text, teams: result.teams })
    }
  }
})
app.post('/saverecord', async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(404).json({ status: "error", title: "No Team received", text: "" })
  }
  console.log("Saving record")
  const { teamWon, teamLost } = req.body;
  await dbAccess.updateTeamScore(teamWon, true);
  await dbAccess.updateTeamScore(teamLost, false);
});
app.post('/saveteam', async (req: Request, res: Response) => {
  console.log(req.body)
  //prep the saveteam object
  //console.log("hitting end point")
  const { team, email }: { team: Team, email: string } = req.body
  if (!req.body) {
    return res.status(404).json({ status: "error", title: "No Team received", text: "" })
  }
  if (req.body.email === undefined) {
    console.error("THERE IS NO EMAIL")
  }
  const result = await dbAccess.saveTeam(team, email)
  const saveTeam: SaveTeamFormat = {
    team_id: team.name,
    team_name: team.name,
    year: team.year,
    budget: team.budget,
    player1: team.roster[0]?.PlayerName,
    player2: team.roster[1]?.PlayerName,
    player3: team.roster[2]?.PlayerName,
    player4: team.roster[3]?.PlayerName,
    player5: team.roster[4]?.PlayerName,
    player6: team.roster[5]?.PlayerName,
    player7: team.roster[6]?.PlayerName,
    player8: team.roster[7]?.PlayerName,
    player9: team.roster[8]?.PlayerName,
    player10: team.roster[9]?.PlayerName,
    player11: team.roster[10]?.PlayerName,
    player12: team.roster[11]?.PlayerName,
    player13: team.roster[12]?.PlayerName,
    player14: team.roster[13]?.PlayerName,
    player15: team.roster[14]?.PlayerName,
    owner: team.owner,
    losses: 0, wins: 0,
    winloss: 0,
  }

  return res.status(200).json({ status: result.status, title: result.title, text: result.text })
})


app.post('/loadteam', async (req: Request, res: Response) => {
  //prep the saveteam object
  if (!req.body) {
    return res.status(404).json({ status: "error", title: "No Team received", text: "" })
  }
  const { team_id } = req.body;
  console.log(team_id)
  const result = await dbAccess.getTeam(team_id)

  return res.status(200).json({ status: result.status, title: result.title, text: result.text, team: result.team })
})


app.get('/allteams', async (req: Request, res: Response) => {
  const result = await dbAccess.getTeams();
  if (result.status == "success") {
    return res.status(200).json(result)
  }
  else return res.status(404).json({ status: "error", title: "Error communicating with server", text: "Maybe server is down?", teams: null })
})


app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});