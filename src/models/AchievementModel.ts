import { Achievement, Badge, ActionType } from 'interfaces';

export class AchievementModel implements Achievement {
  id = 0;
  date = new Date();
  badge: Badge | null = null;
  action: ActionType = '';
  threshold = 0;

  fromDto = (achievement: Achievement) => {
    Object.assign(this, achievement);
    this.date = new Date(achievement.date);
    return this;
  };
}
