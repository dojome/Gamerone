import {
  Profile,
  NowPlaying,
  SocialNetwork,
  Sponsor,
  Product,
  LayoutSettings,
  User,
  Achievement,
  Gear,
} from 'interfaces';
import { UserModel } from './user';
import { NowPlayingModel } from './NowPlayingModel';
import { LayoutSettingsModel } from './LayoutSettingModel';
import { AchievementModel } from './AchievementModel';

export class ProfileModel implements Profile {
  user: UserModel;
  networks: Array<SocialNetwork>;
  products: Array<Product>;
  sponsors: Array<Sponsor>;
  gears: Array<Gear>;
  achievements: Array<Achievement>;
  currentlyPlaying: NowPlaying;
  layout: LayoutSettings;

  constructor() {
    this.user = new UserModel();
    this.networks = [];
    this.products = [];
    this.sponsors = [];
    this.gears = [];
    this.achievements = [];
    this.currentlyPlaying = new NowPlayingModel();
    this.layout = new LayoutSettingsModel();
  }

  fromDto = (profile: Profile) => {
    this.user = new UserModel().fromDto(profile.user);
    this.networks = profile.networks.map((network: SocialNetwork) => network);
    this.products = profile.products.map((product: Product) => product);
    this.sponsors = profile.sponsors.map((sponsor: Sponsor) => sponsor);
    this.gears = profile.gears.map((gear: Gear) => gear);
    this.achievements = profile.achievements.map((achievement: Achievement) =>
      new AchievementModel().fromDto(achievement),
    );
    this.currentlyPlaying = new NowPlayingModel().fromDto(
      profile.currentlyPlaying,
    );
    this.layout = new LayoutSettingsModel().fromDto(profile.layout);
    return this;
  };

  follow() {
    this.user.follow();
    return this;
  }

  followed() {
    this.user.followed();
    return this;
  }

  unfollow() {
    this.user.unfollow();
    return this;
  }

  unfollowed() {
    this.user.unfollowed();
    return this;
  }

  updateUser(user: User) {
    this.user = new UserModel().fromDto(user);
    return this;
  }

  updateLayoutSettings(layout: LayoutSettings) {
    this.layout = new LayoutSettingsModel().fromDto(layout);
    return this;
  }
}
