import React from 'react';
import { SocialNetwork } from 'interfaces';
import Card, { CardTypeEnum } from 'components/common/Card';
import Badge from 'components/common/Badge';
import './style.scss';
import SocialNetworkIcon from './SocialNetworkIcon';
import Button from 'components/common/Button';

export interface SocialNetworksCardProps {
  networks?: SocialNetwork[];
  isOwner?: boolean;
  handleClickEdit?: () => void;
}

const SocialNetworksCard: React.FC<SocialNetworksCardProps> = ({
  networks,
  isOwner = false,
  handleClickEdit,
}: SocialNetworksCardProps): JSX.Element => {
  const socialAccounts =
    networks != null &&
    networks
      .filter((network) => network.value !== null)
      .map((network, index) => {
        return (
          <a
            key={index}
            href={network.url + network.value}
            target={'_blank'}
            rel={'nofollow noopener noreferrer'}
          >
            <Badge type="flat" size="large" testid="social-network-badge">
              <SocialNetworkIcon name={network.name} size="15x" />
            </Badge>
          </a>
        );
      });

  return (
    <Card
      type={CardTypeEnum.SOCIAL}
      isOwner={isOwner}
      onEdit={handleClickEdit}
      data-testid="card-social"
    >
      <div className="card__header">
        <h4>Social</h4>
      </div>
      {socialAccounts && socialAccounts.length > 0 ? (
        <div className="card__content">{socialAccounts}</div>
      ) : (
        <div className="card__content empty">
          <p>No social networks yet.</p>
          {isOwner && (
            <Button onClick={handleClickEdit} data-testid="add-network">
              Add your networks
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default SocialNetworksCard;
