import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';

import ProfileActions from 'redux/profile/actions';
import Button, { ButtonSchemeEnum } from 'components/common/Button';

import SettingsActions from 'redux/settings/actions';
import { SettingsActionTypes, LOAD_PAGE_REQUEST } from 'redux/settings/types';
import { RootState } from 'redux/types';
import {
  selectSettingsBlocks,
  selectIsLastBlocks,
} from 'redux/settings/selectors';
import { selectStatus } from 'redux/request-status/selectors';
import Card from 'components/common/Card';
import { AVATAR_PLACEHOLDER } from 'utils/constants';

import Loader from 'components/common/Loader';
import ListItem from 'components/common/ListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { selectCurrentUsername } from 'redux/auth/selectors';

function BlocksSettings({
  currentUsername,
  blocks,
  isLastPage,
  status,
  dispatchLoadNextBlocks,
  dispatchLoadInitBlocks,
}: ConnectedProps) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { username } = useParams();

  useEffect(() => {
    dispatchLoadInitBlocks();
  }, [dispatchLoadInitBlocks]);

  const fetchMoreData = React.useCallback(() => {
    dispatchLoadNextBlocks();
  }, [dispatchLoadNextBlocks]);

  const handleUnblockClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    userId: number,
  ) => {
    e.stopPropagation();
    dispatch(ProfileActions.unblock(userId));
  };

  return (
    <Card>
      <div className="card__header">
        <h4>Blocks</h4>
      </div>
      <div className="card__content">
        {status?.isFetching ? <Loader /> : null}
        {!status?.isFetching && blocks.length === 0 ? (
          <div role="alert">
            {username === currentUsername ? 'You aren' : { username } + ' isn'}
            &apos;t blocking anyone.
          </div>
        ) : null}

        <InfiniteScroll
          dataLength={blocks.length}
          next={fetchMoreData}
          hasMore={!isLastPage}
          loader={Loader}
          style={{ overflow: 'inherit' }}
        >
          {blocks.map((user) => {
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
                  currentUsername === username ? (
                    <Button
                      scheme={ButtonSchemeEnum.SUBTLE}
                      onClick={(e) => handleUnblockClick(e, user.id)}
                    >
                      Unblock
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
    blocks: selectSettingsBlocks(state),
    isLastPage: selectIsLastBlocks(state),
    status: selectStatus(state).get(LOAD_PAGE_REQUEST + '/blocks'),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<SettingsActionTypes>) {
  return {
    dispatchLoadNextBlocks: () =>
      dispatch(SettingsActions.loadNextPage('blocks')),
    dispatchLoadInitBlocks: () =>
      dispatch(SettingsActions.loadInitialPage('blocks')),
  };
}

type ConnectedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(BlocksSettings);
