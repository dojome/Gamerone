import React from 'react';
import DataItem from '../DataItem';
import { formatPureDateDayMonth } from 'utils/dateFormatter';

export interface Props {
  username: string;
  followerCount?: number;
  followCount?: number;
  birthDate?: string | null;
  location?: string | null;
}

const FollowStatus: React.FC<Props> = ({
  username,
  followerCount = 0,
  followCount = 0,
  birthDate,
  location,
}: Props): JSX.Element => {
  return (
    <>
      <DataItem
        value={followerCount}
        label="followers"
        link={`${username}/followers`}
      />
      {location && <DataItem icon="icon-pin" label={location} />}
      <DataItem
        value={followCount}
        label="following"
        link={`${username}/following`}
      />
      {birthDate && (
        <DataItem
          icon="icon-calendar"
          label={formatPureDateDayMonth(birthDate)}
        />
      )}
    </>
  );
};

export default React.memo(FollowStatus);
