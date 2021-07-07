import React from 'react';
import Card from 'components/common/Card';
import DataItem from 'components/common/DataItem';
import { useSelector } from 'react-redux';
import { selectProfileUser } from 'redux/selectors';
import { UserModel } from 'models/user';

interface FriendsNavProps {
  blocksEnabled?: boolean;
}

function FriendsNav({ blocksEnabled = false }: FriendsNavProps) {
  const user = useSelector(selectProfileUser);
  const { followCount, followerCount } = (user as UserModel).followStatus;
  // TODO blockCount

  return (
    <Card type="flat">
      <h4 className="card__header card__title">Friends</h4>
      <div
        className="card__content"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
        }}
      >
        <DataItem
          value={followerCount}
          label="followers"
          link="followers"
          activeClassName="is-active"
        />
        <DataItem
          value={followCount}
          label="following"
          link="following"
          activeClassName="is-active"
        />
        {blocksEnabled ? (
          <DataItem
            icon="icon-view-off"
            label="blocked"
            link="blocks"
            activeClassName="is-active"
          />
        ) : null}
      </div>
    </Card>
  );
}

export default FriendsNav;
