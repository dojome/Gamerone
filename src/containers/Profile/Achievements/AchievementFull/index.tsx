import React, { ReactNode } from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';
import './style.scss';

export interface AchievementFullCardProps {
  children?: ReactNode;
}

const AchievementFullCard: React.FC<AchievementFullCardProps> = ({
  children,
}: AchievementFullCardProps): JSX.Element => {
  return (
    <Card type={CardTypeEnum.ACHIEVEMENTS_FULL}>
      <div className="card__header">
        <h4>All badges</h4>
      </div>
      <div className="card__content">{children}</div>
    </Card>
  );
};

export default AchievementFullCard;
