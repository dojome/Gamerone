import { Game } from 'interfaces';

export class GameModel implements Game {
  id = 0;
  name = '';
  shortName: string | null = null;
  cover: string | null = null;
  logo: string | null = null;
  playerCount = 0;

  fromDto = (game: Game) => {
    Object.assign(this, game);
    return this;
  };
}
