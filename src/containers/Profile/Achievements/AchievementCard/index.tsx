import React from 'react';
import cn from 'classnames';
import { formatDateDayMonthYear } from 'utils/dateFormatter';
import { AchievementModel } from 'models/AchievementModel';
import AchievementBadge from '../AchievementBadge';
import './style.scss';

export interface AchievementCardProps {
  achievement: AchievementModel;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
}: AchievementCardProps): JSX.Element => {
  const badgeNameClasses = cn('badge-name', {
    [`badge-name--${achievement.action}`]: achievement.action,
  });

  return (
    <div className="achievement-card-wrapper">
      <AchievementBadge
        action={achievement.action}
        badgeSize="xlarge"
        iconSize="3x"
      />
      {achievement.badge && (
        <div className="achievement-details">
          <p className={badgeNameClasses}>{achievement.badge.name}</p>
          <p className="badge-date">
            {formatDateDayMonthYear(achievement.date)}
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
