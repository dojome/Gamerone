import { NowPlayingModel } from 'models/NowPlayingModel';
import { NowPlayingRequest, Game } from 'interfaces';

export interface NowPlayingSettings {
  game: string;
  facebook: boolean;
  twitch: boolean;
  youtube: boolean;
  online: boolean;
}

export class NowPlayingSettingsModel implements NowPlayingSettings {
  game = '';
  facebook = false;
  twitch = false;
  youtube = false;
  online = false;

  constructor(
    r: NowPlayingSettings = {
      game: '',
      facebook: false,
      twitch: false,
      youtube: false,
      online: false,
    },
  ) {
    Object.assign(this, r);
  }

  fromGame = (currentGame: NowPlayingModel) => {
    this.online = currentGame.online;
    this.game = currentGame.game?.name || '';
    this.facebook = currentGame.isOnlineAt('facebook');
    this.youtube = currentGame.isOnlineAt('youtube');
    this.twitch = currentGame.isOnlineAt('twitch');
    return this;
  };

  toRequest(game?: Game): NowPlayingRequest {
    return {
      gameId: game?.id || 0,
      facebook: this.facebook,
      twitch: this.twitch,
      youtube: this.youtube,
      online: this.online,
    };
  }
}
