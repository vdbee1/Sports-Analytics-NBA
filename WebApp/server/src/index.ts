import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { User } from "../types/User"
interface LoginFormInputs {
  email: string,
  password: string
}
const users: User[] = [
  {
    id: 1,
    name: "Gavin Lau",
    email: "testmail@gmail.com",
    password: "123"
  },
]

dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 8080;




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
else {
  app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello World From the Typescript Server!</h1>')
  });
}
app.post('/login', (req: Request, res: Response) => {
  const { email, password }: LoginFormInputs = req.body;
  console.log(`${email} + ${password}`)
  const user = users.find(user => {
    return user.email === email && user.password === password
  });

  if (!user) {
    return res.status(404).send('User Not Found!')
  }

  console.log("Success!")
  return res.status(200).json(user)
});
app.post('/signup', (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;
  console.log(`Trying to add ${name} at ${email}`);
  const user = users.find(user => {
    return user.email === email
  });

  if (!user) {
    const newUser: User = { id: users.length, name, email, password }
    users.push(newUser)
    res.send({ success: true, title: "New User Created!", text: "Have fun!", user: newUser })
  }
  else {
    res.send({ success: false, title: "User already exists!", text: "Try a different email.", user: null })
  }
  return
})
app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});