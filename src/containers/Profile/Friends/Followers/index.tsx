import React, { useEffect, useContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import ProfileActions from 'redux/profile/actions';
import { ProfileActionTypes, LOAD_PAGE_REQUEST } from 'redux/profile/types';
import { RootState } from 'redux/types';
import {
  selectProfileFollowers,
  selectIsLastFollowers,
} from 'redux/profile/selectors';
import { selectStatus } from 'redux/request-status/selectors';
import Card from 'components/common/Card';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import ListItemProfile from 'components/common/ListItem';
import { AVATAR_PLACEHOLDER } from 'utils/constants';
import Loader from 'components/common/Loader';
import { selectCurrentUsername } from 'redux/auth/selectors';
import { AuthContext } from 'provider/auth';

function FollowersSettings({
  currentUsername,
  followers,
  isLastPage,
  status,
  dispatchLoadNextFollowers,
  dispatchLoadInitFollowers,
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

  useEffect(() => {
    dispatchLoadInitFollowers();
  }, [dispatchLoadInitFollowers]);

  const fetchMoreData = React.useCallback(() => {
    dispatchLoadNextFollowers();
  }, [dispatchLoadNextFollowers]);

  return (
    <Card>
      <div className="card__header">
        <h4>Followers</h4>
      </div>
      <div className="card__content">
        <Loader show={status?.isFetching} />
        {!status?.isFetching && followers.length === 0 ? (
          <div role="alert">
            {username === currentUsername ? 'You don' : username + '  doesn'}
            &apos;t have any followers.
          </div>
        ) : null}
        <InfiniteScroll
          dataLength={followers.length}
          next={fetchMoreData}
          hasMore={!isLastPage}
          loader={Loader}
          style={{ overflow: 'inherit' }}
        >
          {followers.map((user) => (
            <ListItemProfile
              key={user.id}
              title={user.username}
              image={user.avatar ? user.avatar : AVATAR_PLACEHOLDER}
              onClick={() => {
                history.push('/' + user.username);
              }}
              appendRight={
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
          ))}
        </InfiniteScroll>
      </div>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    currentUsername: selectCurrentUsername(state),
    followers: selectProfileFollowers(state),
    isLastPage: selectIsLastFollowers(state),
    status: selectStatus(state).get(LOAD_PAGE_REQUEST + '/followers'),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<ProfileActionTypes>) {
  return {
    dispatchLoadNextFollowers: () =>
      dispatch(ProfileActions.loadNextPage('followers')),
    dispatchLoadInitFollowers: () =>
      dispatch(ProfileActions.loadInitialPage('followers')),
  };
}

type ConnectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(FollowersSettings);
