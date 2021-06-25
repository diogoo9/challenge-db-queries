import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { GamesRepository } from "./modules/games/repositories/implementations/GamesRepository";
import { UsersRepository } from "./modules/users/repositories/implementations/UsersRepository";

const app = express();
createConnection();
const u = new GamesRepository();

// createConnection method will automatically read connection options
// from your ormconfig file or environment variables

app.use(express.json());
app.get("/", async (req: Request, res: Response) => {
  const users = await u.findUsersByGameId(
    "ec480c67-a695-43e1-8e6c-5e48bdc2ee6e"
  );
  console.log(users);
  res.send(users);
});

app.listen(3333, () => {
  console.log(" server is running!");
});
