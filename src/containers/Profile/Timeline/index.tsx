import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostCard from 'containers/Cards/PostCard';
import Feed from 'components/layout/Feed';
import './style.scss';
import {
  selectResolvedContentType,
  selectHasMoreProfileFeed,
  selectProfileFeedStatus,
  selectProfileFeedRest,
} from 'redux/selectors';
import { RootState } from 'redux/types';
import PostActions from 'redux/post/actions';
import { PostModel } from 'models/post';
import { selectResolvedContentId } from 'redux/profile/selectors';
import PostLoader from 'containers/Post/PostLoader';

function Timeline({
  posts,
  contentId,
  contentType,
  hasMoreFeed,
  loadStatus,
  dispatchLoadNextFeed,
}: MappedProps) {
  const fetchMoreData = React.useCallback(() => {
    dispatchLoadNextFeed(
      contentType,
      contentType === 'private' ? 0 : contentId,
    );
  }, [contentType, contentId, dispatchLoadNextFeed]);

  return (
    <Feed outerWrap>
      <PostLoader show={loadStatus?.isFetching} />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMoreFeed}
        loader={PostLoader}
        className="feed__main--wrap"
        style={{ overflow: 'inherit' }}
      >
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </InfiniteScroll>
    </Feed>
  );
}

const mapStateToProps = (state: RootState) => ({
  posts: selectProfileFeedRest(state) as PostModel[],
  loadStatus: selectProfileFeedStatus(state),
  contentType: selectResolvedContentType(state),
  contentId: selectResolvedContentId(state),
  hasMoreFeed: selectHasMoreProfileFeed(state),
});

const mapDispatchToProps = {
  dispatchLoadNextFeed: PostActions.loadNextFeed,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
