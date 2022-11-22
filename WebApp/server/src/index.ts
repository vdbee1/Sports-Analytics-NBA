import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

const PORT = process.env.PORT || 8080;

const app: Express = express();

dotenv.config();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello World From the Typescript Server!</h1>')
});

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});