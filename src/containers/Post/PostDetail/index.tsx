import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import Feed from 'components/layout/Feed';
import Card, { CardTypeEnum } from 'components/common/Card';
import PostCardHeader from 'containers/Cards/PostCard/PostCardHeader';
import PostCardMedia from 'containers/Cards/PostCard/PostCardMedia';
import PostCardContent from 'containers/Cards/PostCard/PostCardContent';
import PostCardThread from 'containers/Cards/PostCard/PostCardThread';
import { SITE_NAME, SITE_URL } from 'utils/constants';
import { RootState } from 'redux/types';
import {
  selectCurrentPost,
  selectCurrentPostComments,
  selectCurrentPostCommentsReachedLastPage,
} from 'redux/post/selectors';
import PostActions from 'redux/post/actions';
import {
  selectLoadPostDetailStatus,
  selectLoadCommentStatus,
} from 'redux/request-status/selectors';
import usePostDetail from './hooks';
import Loader from 'components/common/Loader';
import OpenGraph, { PageMeta } from 'components/common/OpenGraph';

const PostDetail: React.FC<MappedProps> = ({
  post,
  dispatchLoadPost,
  loadPostStatus,
}: MappedProps): JSX.Element => {
  const { username } = usePostDetail({ dispatchLoadPost });
  const isError = !loadPostStatus?.isFetching && loadPostStatus?.isError;
  const isFetching = !!loadPostStatus?.isFetching;

  // Page Meta
  const pageTitle = username + "'s Post";
  const postURL = `${SITE_URL}/${post?.user.username}/post/${post?.id}`;
  const postMeta = {
    title: pageTitle + ' on Gamer One',
    description: post?.title,
    image:
      post?.images && post?.images.length > 0
        ? post?.images[0].filename
        : post?.user.avatar,
    url: postURL,
    type: 'article',
  } as PageMeta;

  return (
    <Feed>
      {isError ? (
        <>
          <Helmet>
            <title>Post Not Found | {SITE_NAME}</title>
          </Helmet>
          <div style={{ marginTop: '10rem' }}>
            <h4>Post Not Found</h4>
          </div>
        </>
      ) : null}
      {isFetching ? <Loader /> : null}
      {post ? (
        <>
          <OpenGraph title={pageTitle} meta={postMeta} />
          <section style={{ minHeight: '8rem' }}></section>
          <Card type={CardTypeEnum.POST}>
            <PostCardHeader
              username={post.user.username}
              avatar={post.user.avatar}
              createdAt={post.createdDate}
              votes={{
                postId: post.id,
                upVotes: post.upCount,
                downVotes: post.downCount,
                isVoted: post.isVoted,
                postUserId: post.user.id,
              }}
              showVotes={true}
              showActions={true}
              commentsDisabled={!post.commentsEnabled}
              commentCount={post.commentCount}
              postId={post.id}
              postUrl={postURL}
              postContent={post.title}
            />

            <PostCardMedia media={post.images} grid={true} />

            <PostCardContent text={post.title} />

            {post.commentsEnabled && <PostCardThread />}
          </Card>
        </>
      ) : null}
    </Feed>
  );
};

const mapStateToProps = (state: RootState) => ({
  post: selectCurrentPost(state),
  loadPostStatus: selectLoadPostDetailStatus(state),
  comments: selectCurrentPostComments(state),
  isLastComment: selectCurrentPostCommentsReachedLastPage(state),
  loadCommentsStatus: selectLoadCommentStatus(state),
});

const mapDispatchToProps = {
  dispatchLoadPost: PostActions.loadPostDetail,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(PostDetail);
