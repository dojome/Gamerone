import React from 'react';
import cn from 'classnames';
import Icon, { IconSize } from 'components/common/Icon';
import { ACHIEVEMENT_ICON_LIST } from 'utils/constants';
import { ActionType } from 'interfaces';
import Badge, { BadgeSize } from 'components/common/Badge';
import './style.scss';

export interface AchievementIconProps {
  action: ActionType;
  iconSize?: IconSize;
  badgeSize?: BadgeSize;
}

const AchievementBadge: React.FC<AchievementIconProps> = ({
  action,
  iconSize = '1x',
  badgeSize,
}: AchievementIconProps): JSX.Element => {
  const badgeClasses = cn({
    [`achievement-badge--${action}`]: action,
  });

  return (
    <div className={badgeClasses}>
      <Badge type="outline" size={badgeSize} testid="badge-achievement">
        <Icon name={ACHIEVEMENT_ICON_LIST[action]} size={iconSize} />
      </Badge>
    </div>
  );
};

export default React.memo(AchievementBadge);
