import React from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';
import './style.scss';
import { NowPlaying, SocialNetwork } from 'interfaces';
import { CDN_URL } from 'utils/constants';
import GTMDataLayer from 'utils/gtm';
import SocialNetworkIcon from '../SocialNetworksCard/SocialNetworkIcon';
import Button from 'components/common/Button';
import Badge from 'components/common/Badge';

export interface NowPlayingCardProps {
  playing: NowPlaying;
  isOwner?: boolean;
  handleClickEdit?: () => void;
}

const NowPlayingCard: React.FC<NowPlayingCardProps> = ({
  playing,
  isOwner = false,
  handleClickEdit,
}: NowPlayingCardProps): JSX.Element => {
  const handleClick = (social: SocialNetwork) => {
    GTMDataLayer('Watch Button Click', {
      playing: {
        id: playing.game?.id,
        game: playing.game?.name,
        online: playing.online,
      },
      social: {
        id: social.id,
        name: social.name,
        url: social.url,
        value: social.value,
      },
    });
    window.open(`${social.url}${social.value}`, '_blank');
  };

  const game = (
    <div className="now-playing-wrapper">
      <div className="now-playing-details">
        <div className="game">
          <p>Now Playing</p>
          <h3>{playing.game?.name}</h3>
        </div>
        <div className="watch">
          {playing.onlineAt &&
            playing.onlineAt.map((social) => {
              return (
                <Badge
                  type="flat-dark"
                  size="medium"
                  key={social.id}
                  onClick={() => handleClick(social)}
                  style={{ margin: '0.5rem' }}
                  testid="now-playing-badge"
                >
                  <SocialNetworkIcon name={social.name} size="15x" />
                </Badge>
              );
            })}
        </div>
      </div>
    </div>
  );

  return (
    <Card
      type={CardTypeEnum.NOW_PLAYING}
      isOwner={isOwner && playing.game != null}
      onEdit={handleClickEdit}
      style={
        playing.game
          ? {
              backgroundImage: `url(${
                CDN_URL + '/539,fit/' + playing.game.cover
              })`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }
          : {}
      }
      data-testid="card-now-playing"
    >
      {playing.game != null ? (
        game
      ) : (
        <>
          <div className="card__header">
            <h4>Now Playing</h4>
          </div>
          <div className="card__content empty">
            <p>Not playing yet.</p>
            {isOwner && (
              <Button onClick={handleClickEdit} data-testid="add-product">
                Add your game
              </Button>
            )}
          </div>
        </>
      )}
    </Card>
  );
};

export default NowPlayingCard;
