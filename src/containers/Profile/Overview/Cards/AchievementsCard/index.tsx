import React from 'react';
import { Achievement } from 'interfaces';
import Card, { CardTypeEnum } from 'components/common/Card';
import { formatDateDayMonthYear } from 'utils/dateFormatter';
import './style.scss';
import AchievementListItem from './AchievementListItem';

export interface AchievementsCardProps {
  achievements: Achievement[];
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({
  achievements,
}: AchievementsCardProps): JSX.Element => {
  // NB: slice below is temp until UI mock finalised
  const achievementItems =
    achievements != null &&
    achievements.slice(0, 2).map((a: Achievement) => {
      return (
        <AchievementListItem
          key={a.id}
          title={a.badge && a.badge.name}
          description={formatDateDayMonthYear(a.date)}
          action={a.action}
        />
      );
    });

  return (
    <Card type={CardTypeEnum.ACHIEVEMENTS} data-testid="card-achievements">
      <div className="card__header">
        <h4>Achievements</h4>
      </div>
      {achievements && achievements.length > 0 ? (
        <div className="card__content">{achievementItems}</div>
      ) : (
        <div className="card__content empty" data-testid="card-achievements">
          <p>No achievements yet.</p>
        </div>
      )}
    </Card>
  );
};

export default AchievementsCard;
