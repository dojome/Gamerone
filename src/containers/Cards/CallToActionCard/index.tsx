import React from 'react';
import Card, { CardTypeEnum } from '../../../components/common/Card';
import Button from 'components/common/Button';
import { IconName } from 'components/common/Icon';

export interface CallToActionCardProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonIconLeft?: IconName;
  to?: string;
  onClick?: () => void;
}

const CallToActionCard: React.FC<CallToActionCardProps> = ({
  title,
  description,
  buttonText,
  buttonIconLeft,
  to,
  onClick,
}: CallToActionCardProps): JSX.Element => {
  const handleClick = React.useCallback(() => {
    if (to) window.open(to, '_blank');
  }, [to]);

  return (
    <Card type={CardTypeEnum.NARROW_FLAT}>
      <div className="card__content">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div>
            <h1 style={{ fontWeight: 500, fontSize: '1.125rem' }}>{title}</h1>
            {description && (
              <h3
                style={{
                  fontWeight: 'normal',
                  fontSize: '1rem',
                  color: '#4D5A80',
                }}
              >
                {description}
              </h3>
            )}
          </div>
          <div onClick={handleClick}>
            <Button onClick={onClick} iconLeft={buttonIconLeft}>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CallToActionCard;
