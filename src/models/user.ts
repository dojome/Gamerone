import { User, FollowStatus, UserSquadStatusEnum } from 'interfaces';

export class UserModel implements User {
  id = 0;
  email = null;
  firstName = null;
  lastName = null;
  username = '';
  avatar = '';
  banner = '';
  location = null;
  birthDate = null;
  status = null;
  followerCount = 0;
  followCount = 0;
  badgeCount = 0;
  gameCount = 0;
  playCount = 0;
  isFollowing = false;
  bio = null;
  websiteUrl = null;
  isPro = false;
  isStreamer = false;
  isInfluencer = false;
  isSquad = UserSquadStatusEnum.NO_SQUAD;

  fromDto = (user?: User) => {
    Object.assign(this, user);
    return this;
  };

  follow() {
    this.followerCount += 1;
    this.isFollowing = true;
    return this;
  }

  followed() {
    this.followCount += 1;
  }

  unfollow() {
    if (this.followerCount > 0) this.followerCount -= 1;
    else this.followerCount = 0; // TODO: Raise exception
    this.isFollowing = false;
  }

  unfollowed() {
    if (this.followCount > 0) this.followCount -= 1;
  }

  get followStatus(): FollowStatus {
    return {
      followCount: this.followCount,
      followerCount: this.followerCount,
      isFollowing: this.isFollowing,
      isBlocking: false, // TODO: Set isBlocking status
    } as FollowStatus;
  }
}
