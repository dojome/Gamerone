/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useContext, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { selectCurrentProfileUser } from 'redux/profile/selectors';
import ProfileActions from 'redux/profile/actions';
import SettingsActions from 'redux/settings/actions';
import { AuthContext } from 'provider/auth';
import { RootState } from 'redux/types';
import { UserModel } from 'models/user';
import Dropdown, { DropdownOptionType } from 'components/common/Dropdown';
import { UserSquadStatusEnum } from 'interfaces';

export interface FollowBlockProps {
  isSelf: boolean;
  className?: string;
}

function FollowBlock({
  isSelf,
  user,
  dispatchFollow,
  dispatchUnfollow,
  dispatchBlock,
  dispatchAddSquad,
  dispatchRemoveSquad,
}: FollowBlockProps & ConnectedProps) {
  const { isAuthenticated } = useContext(AuthContext);
  let { isFollowing } = (user as UserModel).followStatus;
  const { isBlocking = false } = (user as UserModel).followStatus;

  const handleFollowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!isFollowing) {
        dispatchFollow();
        isFollowing = true;
      }
    },
    [isFollowing],
  );

  const handleUnfollowClick = useCallback(() => {
    if (isFollowing) dispatchUnfollow();
  }, [isFollowing]);

  const dropdownOptions = useMemo(() => {
    const options: DropdownOptionType[] = [];

    if (isFollowing) {
      options.push({
        label: 'Unfollow',
        onClick: (): void => handleUnfollowClick(),
      });
    }
    if (user?.isSquad === UserSquadStatusEnum.NO_SQUAD) {
      options.push({
        label: 'Invite to Squad',
        onClick: () => dispatchAddSquad(),
      });
    } else if (user?.isSquad === UserSquadStatusEnum.IN_SQUAD) {
      options.push({
        label: 'Remove from Squad',
        onClick: () => dispatchRemoveSquad(user.id),
      });
    } else {
      options.push({ label: 'Waiting for accept', disabled: true });
    }

    options.push({ label: 'Block', onClick: () => dispatchBlock() });
    options.push({ label: 'Unblock' });

    return options;
  }, [handleUnfollowClick, isFollowing]);

  return !isSelf ? (
    <>
      <Button
        scheme={!isFollowing ? ButtonSchemeEnum.PRIMARY : null}
        onClick={handleFollowClick}
        aria-label="follow-button"
        disabled={!isAuthenticated || isFollowing || isBlocking}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
      <div className="last" style={{ marginLeft: 'auto' }}>
        {isAuthenticated && (
          <Dropdown options={dropdownOptions}>
            <Button
              scheme={ButtonSchemeEnum.SQUARE}
              disabled={!isAuthenticated}
            >
              ...
            </Button>
          </Dropdown>
        )}
      </div>
    </>
  ) : (
    <></>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: selectCurrentProfileUser(state),
});

const mapDispatchToProps = {
  dispatchFollow: ProfileActions.follow,
  dispatchUnfollow: ProfileActions.unfollow,
  dispatchBlock: ProfileActions.block,
  dispatchAddSquad: ProfileActions.addSquad,
  dispatchRemoveSquad: SettingsActions.deleteSquad,
};

type ConnectedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(FollowBlock) as React.ElementType;
