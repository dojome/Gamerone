import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardTypeEnum } from 'components/common/Card';
import { SquadList } from 'interfaces';
import Tooltip from 'components/common/Tooltip';
import './style.scss';
import Avatar from 'components/common/Avatar';
import Button from 'components/common/Button';

interface SquadCardProps {
  isOwner?: boolean;
  squadList?: SquadList[];
  handleClickEdit?: () => void;
}

const SquadCard: React.FC<SquadCardProps> = ({
  isOwner = false,
  squadList = [],
  handleClickEdit,
}: SquadCardProps): JSX.Element => {
  const SquadList = React.useMemo(
    () =>
      squadList.map(({ friend }) => (
        <Link key={friend.id} to={`/${friend.username}`}>
          <Tooltip text={friend.username}>
            <Avatar size="medium" src={friend.avatar} alt={friend.username} />
          </Tooltip>
        </Link>
      )),
    [squadList],
  );

  return (
    <Card
      type={CardTypeEnum.SQUAD}
      isOwner={isOwner && SquadList.length > 0}
      onEdit={handleClickEdit}
      data-testid="card-squad"
    >
      <div className="card__header">
        <h4>Squad</h4>
      </div>
      {SquadList.length > 0 ? (
        <div className="card__content squad-members">{SquadList}</div>
      ) : (
        <div className="card__content empty">
          <p>No squad yet.</p>
          {isOwner && (
            <Button onClick={handleClickEdit} data-testid="manage-squad">
              Manage your squad
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default React.memo(SquadCard);
