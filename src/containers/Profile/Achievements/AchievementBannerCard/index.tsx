import React from 'react';
import { Achievement, ActionType } from 'interfaces';
import Card, { CardTypeEnum } from 'components/common/Card';
import Badge from 'components/common/Badge';
import './style.scss';
import { formatDateDayMonthYear } from 'utils/dateFormatter';

export interface AchievementBannerCardProps {
  action: ActionType;
  achievements: Achievement[] | null;
}

export const sortAchievementThreshold = (a: Achievement, b: Achievement) =>
  (b as Achievement).threshold - (a as Achievement).date.getTime();

const AchievementBannerCard: React.FC<AchievementBannerCardProps> = ({
  action,
  achievements,
}: AchievementBannerCardProps): JSX.Element => {
  const actionsOnly =
    achievements &&
    achievements
      .filter((a: Achievement) => a.action === action)
      .sort(sortAchievementThreshold);

  const achievement =
    actionsOnly && actionsOnly.length > 0 ? actionsOnly[0] : undefined;

  return achievement ? (
    <Card type={CardTypeEnum.BANNER}>
      <div
        className="card__content"
        style={{
          textAlign: 'center',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        }}
      >
        <Badge size="xlarge" type="outline" testid="badge-banner">
          {achievement.action === 'follower' ? (
            <i className="icon icon-2x icon-video-game-controller-team" />
          ) : achievement.action === 'post' ? (
            <i className="icon icon-2x icon-quill-write" />
          ) : (
            ''
          )}
        </Badge>

        <br />
        <br />
        <br />

        <h3 className="number">{achievement.threshold}</h3>
        <h4 className="label">
          {achievement.action === 'follower'
            ? 'Followers'
            : achievement.action === 'post'
            ? 'Posts'
            : ''}
        </h4>

        <br />

        <time className="time">
          {formatDateDayMonthYear(new Date(achievement.date))}
        </time>
      </div>
    </Card>
  ) : (
    <Card type={CardTypeEnum.BANNER}>
      <div
        className="card__content"
        style={{
          textAlign: 'center',
        }}
      >
        <h4>No major {action} milestones yet.</h4>
      </div>
    </Card>
  );
};

export default AchievementBannerCard;
