import React, { memo } from 'react';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import Cover from 'components/common/Cover';
import Feed from 'components/layout/Feed';
import Card, { CardTypeEnum } from 'components/common/Card';
import UserCard, { UserCardTypeEnum } from 'containers/Cards/UserCard';
import PostCard from 'containers/Cards/PostCard';
import Page from 'components/layout/Page';
import './style.scss';

import { PostActionTypes } from 'redux/post/types';
import PostActions from 'redux/post/actions';
import { RootState } from 'redux/types';
import {
  selectHomeFeed,
  selectHasMoreHomeFeed,
  selectPromotedFeed,
  selectHasMorePromotedFeed,
} from 'redux/post/selectors';
import { selectSettingsProfileUser } from 'redux/settings/selectors';
import { selectHomeFeedStatus } from 'redux/request-status/selectors';
import { PostModel } from 'models/post';
import PostLoader from 'containers/Post/PostLoader';
import ToastMessage from 'components/common/ToastMessage';

function UserHome({
  user,
  // Feed
  feed,
  hasMoreFeed,
  // Promoted Feed
  promotedFeed,
  hasMorePromotedFeed,
  loadStatus,
  dispatchLoadFeed,
  dispatchLoadNextFeed,
  dispatchLoadPromotedFeed,
  dispatchLoadNextPromotedFeed,
}: MappedProps) {
  const { banner } = user;

  React.useEffect(() => {
    dispatchLoadFeed();
  }, [dispatchLoadFeed]);

  React.useEffect(() => {
    if (loadStatus?.isSuccess && feed.length === 0) {
      dispatchLoadPromotedFeed();
    }
  }, [dispatchLoadPromotedFeed, loadStatus, feed]);

  const fetchMoreData = React.useCallback(() => {
    dispatchLoadNextFeed();
  }, [dispatchLoadNextFeed]);

  const fetchMorePromotedData = React.useCallback(() => {
    dispatchLoadNextPromotedFeed();
  }, [dispatchLoadNextPromotedFeed]);

  return (
    <Page title="Home">
      <Cover src={banner} />
      <Feed
        outerWrap
        left={
          <UserCard type={UserCardTypeEnum.Compact} user={user} isSelf={true} />
        }
        right={<Card type={CardTypeEnum.FLAT}></Card>}
      >
        {loadStatus?.isSuccess && feed.length === 0 && (
          <ToastMessage
            type="inline"
            text="Hey, you're not following anyone. Here's some content to check out!"
            icon="icon-information-circle"
          />
        )}

        <PostLoader show={loadStatus?.isFetching} />

        <InfiniteScroll
          dataLength={feed.length !== 0 ? feed.length : promotedFeed.length}
          next={feed.length !== 0 ? fetchMoreData : fetchMorePromotedData}
          hasMore={feed.length !== 0 ? hasMoreFeed : hasMorePromotedFeed}
          loader={PostLoader}
          className="feed__main--wrap"
          style={{ overflow: 'inherit' }}
        >
          {feed.length > 0
            ? feed.map((post) => <PostCard post={post} key={post.id} />)
            : promotedFeed.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
        </InfiniteScroll>
      </Feed>
    </Page>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: selectSettingsProfileUser(state),
  feed: selectHomeFeed(state) as PostModel[],
  hasMoreFeed: selectHasMoreHomeFeed(state),
  loadStatus: selectHomeFeedStatus(state),
  promotedFeed: selectPromotedFeed(state) as PostModel[],
  hasMorePromotedFeed: selectHasMorePromotedFeed(state),
});

export function mapDispatchToProps(dispatch: Dispatch<PostActionTypes>) {
  return {
    dispatchLoadFeed: () => dispatch(PostActions.loadFeed('home')),
    dispatchLoadNextFeed: () => dispatch(PostActions.loadNextFeed('home')),
    dispatchLoadPromotedFeed: () => dispatch(PostActions.loadFeed('promoted')),
    dispatchLoadNextPromotedFeed: () =>
      dispatch(PostActions.loadNextFeed('promoted')),
  };
}

type MappedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(UserHome) as React.ElementType;
