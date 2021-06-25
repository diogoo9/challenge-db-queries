import { createConnection, getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games: Game[] = await this.repository
      .createQueryBuilder("game")
      .where(`UPPER(game.title) like UPPER(:title)`, {
        title: `%${param}%`,
      })
      .getMany();
    return games;
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select COUNT(*) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await this.repository
      .createQueryBuilder("game")
      .where("game.id = :id", { id: id })
      .leftJoinAndSelect("game.users", "*")
      .getOne();

    if (game) {
      game as Game;
      return game.users;
    }
    return [];
    // Complete usando query builder
  }
}
