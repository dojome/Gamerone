import React from 'react';
import Card from 'components/common/Card';
import { UserGear } from 'interfaces';
import Image from 'components/common/Image';
import { truncateString } from 'utils/caseConversion';
import { GEAR_PLACEHOLDER } from 'utils/constants';
import Icon from 'components/common/Icon';

export interface UserGearCardProps {
  userGear: UserGear;
}

const UserGearCard: React.FC<UserGearCardProps> = ({
  userGear,
}: UserGearCardProps): JSX.Element => {
  const gearName = () => {
    const maxLength = 26;
    return truncateString(userGear.gear.name, maxLength);
  };

  return (
    <div className="card-wrapper card-wrapper--game">
      <div className="card-media">
        <figure>
          <Image
            src={userGear.image || GEAR_PLACEHOLDER}
            title={userGear.gear.name}
            alt={userGear.gear.name}
            width={200}
          />
        </figure>
      </div>
      <Card type="game">
        <div className="card__header">
          <h3 title={userGear.gear.name}>{gearName()}</h3>
        </div>
        <div className="card__content">
          {userGear.information && (
            <p>
              <Icon
                name="icon-information-circle"
                style={{ opacity: 0.3, marginRight: '0.5rem' }}
              />
              {userGear.information}
            </p>
          )}
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          {!userGear.information && <p>&nbsp;</p>}
        </div>
        <div className="card__actions" style={{ flex: 1 }}>
          <span />
          <span className="last">
            {userGear.link && (
              <a
                href={userGear.link}
                target="_blank"
                rel="noopener noreferrer"
                title={'View ' + userGear.gear.name}
                className="button button--subtle-reveal"
              >
                <i className={`icon icon--left icon-network-arrow`}></i>
                <span className="text">View</span>
              </a>
            )}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default React.memo(UserGearCard);
