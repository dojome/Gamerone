import { GamePlatform } from 'interfaces';

export class GamePlatformModel implements GamePlatform {
  id = 0;
  name = '';
  shortName: string | null = null;
  ordinal = 0;

  fromDto = (gamePlatform: GamePlatform) => {
    Object.assign(this, gamePlatform);
    return this;
  };
}
