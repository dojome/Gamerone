import React from 'react';
import DataItem from 'components/common/DataItem';
import { UserExperience } from 'interfaces';
import { GAME_PLACEHOLDER } from 'utils/constants';
import { formatPureDateMonthYear, durationBetween } from 'utils/dateFormatter';
import Image from 'components/common/Image';
import Tooltip from 'components/common/Tooltip';
import Icon from 'components/common/Icon';

export interface ExperienceItemProps {
  experience: UserExperience;
  isOwner: boolean;
  onEdit: (experience: UserExperience) => void;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  isOwner,
  onEdit,
}: ExperienceItemProps): JSX.Element => {
  const formatStartEndDates = (startDate: string, endDate: string | null) => {
    const formattedStartDate = formatPureDateMonthYear(startDate);
    const formattedEndDate = endDate
      ? formatPureDateMonthYear(endDate)
      : 'Present';

    return (
      <>
        {formattedStartDate} - {formattedEndDate}
      </>
    );
  };

  const unitText = (unit: string, value: number): string => {
    return value === 1 ? unit + ' ' : unit + 's ';
  };

  const formatDuration = (startDate: string, endDate: string | null) => {
    const actualEndDate = endDate ? new Date(endDate) : new Date();

    const day = durationBetween(startDate, actualEndDate, 'day');

    // does not consider leap-years
    const calcYears = Math.floor(day / 365);
    const daysRemaining = day - calcYears * 365;
    const calcMonthsFloat = daysRemaining / (365 / 12);
    const calcMonths = Math.floor(calcMonthsFloat);
    const daysRemainingAgain = daysRemaining - calcMonths * (365 / 12);

    return (
      <>
        {calcYears !== 0 &&
          calcYears + unitText(' year', Math.floor(calcYears))}
        {calcMonths !== 0 &&
          calcMonths + unitText(' month', Math.floor(calcMonths))}
        {calcYears === 0 &&
          daysRemainingAgain > 0 &&
          Math.floor(daysRemainingAgain) +
            unitText(' day', Math.floor(daysRemainingAgain))}
      </>
    );
  };

  const handleClickEdit = () => {
    onEdit(experience);
  };

  return (
    <div className="experience-item">
      <figure className="experience-item__image">
        <Image
          src={experience.game.cover || GAME_PLACEHOLDER}
          alt={experience.game.name}
          width={128}
        />
      </figure>
      <div>
        {isOwner && (
          // <div className="card__edit-corner" onClick={handleClickEdit}>
          <div
            className="experience-item__edit-corner"
            onClick={handleClickEdit}
          >
            <Tooltip text="Edit experience" position="bottom-left">
              <button
                className="button button--square button--very-small button--subtle"
                data-testid="card-edit"
              >
                <Icon name={'icon-pencil'} />
              </button>
            </Tooltip>
          </div>
        )}
        <h3>{experience.title}</h3>
        <h4 style={{ opacity: 0.5 }}>{experience.companyName}</h4>
        <small>
          {formatStartEndDates(experience.startDate, experience.endDate)}
          <span style={{ opacity: 0.3 }}>
            {' '}
            {formatDuration(experience.startDate, experience.endDate)}
          </span>
        </small>
        <br />
        <br />
        <p className="description">{experience.achievements}</p>
        {experience.game && (
          <div className="experience-item__games">
            <DataItem
              badgeSize="tiny"
              imageSrc={experience.game.cover || GAME_PLACEHOLDER}
              label={experience.game.name}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceItem;
