import { UserGame } from 'interfaces';
import { GameModel } from './GameModel';
import { GamePlatformModel } from './GamePlatformModel';

export class UserGameModel implements UserGame {
  id = 0;
  region: string | null = null;
  gamertag: string | null = null;
  game = new GameModel();
  platform: GamePlatformModel | null = null;

  fromDto = (game: UserGame) => {
    this.id = game.id;
    this.region = game.region;
    this.gamertag = game.gamertag;
    this.game = new GameModel().fromDto(game.game);
    this.platform = game.platform
      ? new GamePlatformModel().fromDto(game.platform)
      : null;
    return this;
  };
}
