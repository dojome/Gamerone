import React from 'react';
import { UserGame } from 'interfaces';
import Image from 'components/common/Image';
import { GAME_PLACEHOLDER } from 'utils/constants';
import { truncateString } from 'utils/caseConversion';
import Card from 'components/common/Card';
import DataItem from 'components/common/DataItem';
import Icon from 'components/common/Icon';

export interface UserGameCardProps {
  usergame: UserGame;
  isOwner: boolean;
  onEditClick: (userGame: UserGame) => void;
}

const UserGameCard: React.FC<UserGameCardProps> = ({
  usergame,
  isOwner,
  onEditClick,
}: UserGameCardProps): JSX.Element => {
  const gameName = () => {
    const maxLength = 26;
    if (usergame.game.name.length > maxLength && usergame.game.shortName)
      return usergame.game.shortName;
    return truncateString(usergame.game.name, maxLength);
  };

  const onEdit = () => {
    onEditClick(usergame);
  };

  return (
    <div className="card-wrapper card-wrapper--game">
      <div className="card-media">
        <figure>
          <Image
            src={usergame.game.cover || GAME_PLACEHOLDER}
            title={usergame.game.name}
            alt={usergame.game.name}
            width={200}
          />
        </figure>
      </div>
      <Card type="game" isOwner={isOwner} onEdit={onEdit}>
        <div className="card__header">
          <h3 title={usergame.game.name}>{gameName()}</h3>
          <p style={{ fontWeight: 700, opacity: 0.3 }}>
            {usergame.platform?.name}
          </p>
        </div>
        <div className="card__content">
          {usergame.gamertag && (
            <p>
              <Icon
                name="icon-single-neutral-id-card-1"
                style={{ opacity: 0.3, marginRight: '0.5rem' }}
                title="Gamer Tag"
              />
              {usergame.gamertag}
            </p>
          )}

          {usergame.region && (
            <p>
              <Icon
                name="icon-network-arrow"
                style={{ opacity: 0.3, marginRight: '0.5rem' }}
                title="Region"
              />
              {usergame.region}
            </p>
          )}
          {!usergame.platform?.name && <p>&nbsp;</p>}
          {!usergame.gamertag && <p>&nbsp;</p>}
          {!usergame.region && <p>&nbsp;</p>}
        </div>
        <div className="card__actions">
          <span />
          <span className="last">
            <DataItem label="players" value={usergame.game.playerCount} />
          </span>
        </div>
      </Card>
    </div>
  );
};

export default UserGameCard;
