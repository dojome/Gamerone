import React from 'react';
import { Sponsor } from 'interfaces';
import Card, { CardTypeEnum } from 'components/common/Card';
import Image from 'components/common/Image';
import './style.scss';
import Button from 'components/common/Button';

export interface SponsorsCardProps {
  sponsors: Sponsor[];
  isOwner: boolean;
  handleClickEdit?: () => void;
}

const SponsorsCard: React.FC<SponsorsCardProps> = ({
  sponsors,
  isOwner = false,
  handleClickEdit,
}: SponsorsCardProps): JSX.Element => {
  const sponsorItems =
    sponsors != null &&
    sponsors.map((s: Sponsor, index: any) => {
      return (
        <div key={index}>
          {s.link ? (
            <a
              href={s.link || '#'}
              target={'_blank'}
              rel={'nofollow noopener noreferrer'}
            >
              <Image src={s.image} alt={s.name} width={128} />
            </a>
          ) : (
            <Image src={s.image} alt={s.name} width={128} />
          )}
        </div>
      );
    });

  return (
    <Card
      type={CardTypeEnum.SPONSORS}
      isOwner={isOwner && sponsors.length > 0}
      onEdit={handleClickEdit}
      data-testid="card-sponsors"
    >
      {sponsors && sponsors.length > 0 ? (
        <div className="card__content">{sponsorItems}</div>
      ) : (
        <div className="card__content empty">
          <p>No sponsors yet.</p>
          {isOwner && (
            <Button onClick={handleClickEdit} data-testid="add-sponsor">
              Add your sponsors
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default SponsorsCard;
