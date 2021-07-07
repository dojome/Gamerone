import React from 'react';
import cn from 'classnames';
import AchievementBadge from 'containers/Profile/Achievements/AchievementBadge';
import { ActionType } from 'interfaces';
import { IconSize } from 'components/common/Icon';
import { BadgeSize } from 'components/common/Badge';
import ListItemBase from 'components/common/ListItemBase';
import './style.scss';
import { useHistory, useParams } from 'react-router-dom';

interface AchievementListItemProps {
  title: string | null;
  description?: string | null;
  action: ActionType;
  iconSize?: IconSize;
  badgeSize?: BadgeSize;
}

const AchievementListItem: React.FC<AchievementListItemProps> = ({
  title,
  description,
  action,
  iconSize,
  badgeSize,
}: AchievementListItemProps): JSX.Element => {
  const { username } = useParams();
  const history = useHistory();

  const detailClasses = cn('list-item__content', {
    [`achievement-title--${action}`]: action,
  });

  return (
    <ListItemBase
      data-testid="achievement-list-item"
      onClick={() => {
        history.push(`${username}/achievements`);
      }}
    >
      <AchievementBadge
        action={action}
        iconSize={iconSize}
        badgeSize={badgeSize}
      />

      <div className={detailClasses}>
        {title && <h4>{title}</h4>}
        {description && <p>{description}</p>}
      </div>
    </ListItemBase>
  );
};

export default AchievementListItem;
