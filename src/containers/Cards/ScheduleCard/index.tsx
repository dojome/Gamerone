import React from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';

export interface ScheduleCardProps {
  isOwner?: boolean;
  handleClickEdit?: () => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  isOwner = false,
  handleClickEdit,
}: ScheduleCardProps): JSX.Element => {
  return (
    <Card
      type={CardTypeEnum.SCHEDULE}
      isOwner={isOwner}
      onEdit={handleClickEdit}
      data-testid="card-schedule"
    >
      <div className="card__content empty">
        <p>No schedule yet.</p>
      </div>
    </Card>
  );
};

export default ScheduleCard;
