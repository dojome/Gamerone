import React, { useEffect, useContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import ProfileActions from 'redux/profile/actions';
import { ProfileActionTypes, LOAD_PAGE_REQUEST } from 'redux/profile/types';
import { RootState } from 'redux/types';
import {
  selectProfileFollowings,
  selectIsLastFollowings,
} from 'redux/profile/selectors';
import { selectStatus } from 'redux/request-status/selectors';
import Card from 'components/common/Card';

import ListItem from 'components/common/ListItem';
import { useHistory, useParams } from 'react-router-dom';
import { AVATAR_PLACEHOLDER } from 'utils/constants';
import Loader from 'components/common/Loader';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { selectCurrentUsername } from 'redux/auth/selectors';
import { AuthContext } from 'provider/auth';

function FollowingSettings({
  currentUsername,
  followings,
  isLastPage,
  status,
  dispatchLoadNextFollowings,
  dispatchLoadInitFollowings,
}: ConnectedProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username } = useParams();
  const { isAuthenticated } = useContext(AuthContext);

  const handleFollowClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => {
    e.stopPropagation();
    dispatch(ProfileActions.follow(userId));
  };

  const handleUnfollowClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => {
    e.stopPropagation();
    dispatch(ProfileActions.unfollow(userId));
  };

  useEffect(() => {
    dispatchLoadInitFollowings();
  }, [dispatchLoadInitFollowings]);

  const fetchMoreData = React.useCallback(() => {
    dispatchLoadNextFollowings();
  }, [dispatchLoadNextFollowings]);

  return (
    <Card>
      <div className="card__header">
        <h4>Following</h4>
      </div>
      <div className="card__content">
        {status?.isFetching ? <Loader /> : null}
        {!status?.isFetching && followings.length === 0 ? (
          <div role="alert">
            {username === currentUsername ? 'You aren' : username + ' isn'}
            &apos;t following anyone.
          </div>
        ) : null}

        <InfiniteScroll
          dataLength={followings.length}
          next={fetchMoreData}
          hasMore={!isLastPage}
          loader={Loader}
          style={{ overflow: 'inherit' }}
        >
          {followings.map((user) => {
            const fullName =
              (user.firstName || ' ') + ' ' + (user.lastName || '');
            return (
              <ListItem
                key={user.id}
                title={user.username}
                description={fullName}
                image={user.avatar ? user.avatar : AVATAR_PLACEHOLDER}
                onClick={() => {
                  history.push('/' + user.username);
                }}
                appendRight={
                  // Is on my following list
                  currentUsername === username ? (
                    <Button
                      schemes={[
                        ButtonSchemeEnum.SQUARE,
                        ButtonSchemeEnum.REVEAL,
                      ]}
                      iconLeft="icon-bin"
                      onClick={(e) => handleUnfollowClick(e, user.id)}
                    />
                  ) : // Still not following
                  !user.isFollowing && currentUsername !== user.username ? (
                    <Button
                      scheme={ButtonSchemeEnum.PRIMARY}
                      onClick={(e) => handleFollowClick(e, user.id)}
                      disabled={!isAuthenticated}
                    >
                      Follow
                    </Button>
                  ) : undefined
                }
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    currentUsername: selectCurrentUsername(state),
    followings: selectProfileFollowings(state),
    isLastPage: selectIsLastFollowings(state),
    status: selectStatus(state).get(LOAD_PAGE_REQUEST + '/followings'),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<ProfileActionTypes>) {
  return {
    dispatchLoadNextFollowings: () =>
      dispatch(ProfileActions.loadNextPage('followings')),
    dispatchLoadInitFollowings: () =>
      dispatch(ProfileActions.loadInitialPage('followings')),
  };
}

type ConnectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(FollowingSettings);
