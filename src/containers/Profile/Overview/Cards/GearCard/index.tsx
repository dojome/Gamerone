import React from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';
import { UserGear } from 'interfaces';
import Image from 'components/common/Image';
import './style.scss';
import Badge from 'components/common/Badge';
import Button from 'components/common/Button';

export interface GearCardProps {
  gears: UserGear[];
  isOwner?: boolean;
  handleClickEdit?: () => void;
}

const GearCard: React.FC<GearCardProps> = ({
  gears,
  isOwner = false,
  handleClickEdit,
}: GearCardProps): JSX.Element => {
  const gearItems = gears ? (
    <>
      {gears.slice(0, 4).map((g) => (
        <a
          key={g.id}
          href={g.link}
          target="_blank"
          rel="noopener noreferrer"
          title={'View ' + g.gear.name}
        >
          <Badge type="flat" size="huge" testid="gear-badge">
            <Image src={g.image} width={120} alt={g.gear.name} />
          </Badge>
        </a>
      ))}
    </>
  ) : (
    <></>
  );

  return (
    <Card
      type={CardTypeEnum.GEAR}
      isOwner={isOwner && gears.length > 0}
      onEdit={handleClickEdit}
      data-testid="card-gear"
    >
      <div className="card__header">
        <h4>Gear</h4>
      </div>
      {gears && gears.length > 0 ? (
        <div className="card__content">{gearItems}</div>
      ) : (
        <div className="card__content empty">
          <p>No gear yet.</p>
          {isOwner && (
            <Button onClick={handleClickEdit} data-testid="add-gear">
              Add your gear
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default GearCard;
