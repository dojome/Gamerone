import { NowPlaying } from 'interfaces/nowPlaying';
import { SocialNetwork, Game } from 'interfaces';

export class NowPlayingModel implements NowPlaying {
  game: Game | null = null;
  online = false;
  onlineAt: SocialNetwork[] = [];
  stoppedAt = new Date();
  createdAt = new Date();

  fromDto = (nowPlaying?: NowPlaying) => {
    Object.assign(this, nowPlaying);
    return this;
  };

  isOnlineAt(media: string) {
    return this.onlineAt.some((social) => social.name.toLowerCase() === media);
  }
}
