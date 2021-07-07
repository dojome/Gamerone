import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import PostCardComment from '../PostCardComment';
import PostCardReply from '../PostCardReply';
import { Comment } from 'interfaces';
import { RootState } from 'redux/types';

import {
  selectCurrentPostId,
  selectCurrentPostComments,
  selectCurrentPostCommentsReachedLastPage,
} from 'redux/post/selectors';
import PostActions from 'redux/post/actions';
import { selectLoadCommentStatus } from 'redux/request-status/selectors';
import { PostActionTypes } from 'redux/post/types';
import InputLoading from 'components/common/Form/InputLoading';
import Button from 'components/common/Button';

export interface PostCardThreadProps {
  postId?: number;
  // TODO: Show given post's comments
}

const PostCardThread: React.FC<PostCardThreadProps & MappedProps> = ({
  currentPostId,
  comments,
  isLastPage,
  loadCommentsStatus,
  dispatchLoadNextComments,
}: PostCardThreadProps & MappedProps): JSX.Element => {
  const handleNextClick = React.useCallback(() => {
    dispatchLoadNextComments(currentPostId);
  }, [dispatchLoadNextComments, currentPostId]);

  return (
    <div className="card__thread">
      {loadCommentsStatus?.isFetching ? <InputLoading show /> : null}
      {comments
        ? comments.map((c: Comment) => {
            return (
              <PostCardComment
                key={c.id}
                username={c.user.username}
                avatar={c.user.avatar}
                comment={c.comment}
                createdAt={new Date(c.createdAt)}
              />
            );
          })
        : null}

      <div>
        {!isLastPage ? (
          <Button onClick={handleNextClick}>Load more</Button>
        ) : null}
      </div>

      <PostCardReply />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentPostId: selectCurrentPostId(state),
  comments: selectCurrentPostComments(state),
  isLastPage: selectCurrentPostCommentsReachedLastPage(state),
  loadCommentsStatus: selectLoadCommentStatus(state),
});

export function mapDispatchToProps(dispatch: Dispatch<PostActionTypes>) {
  return {
    dispatchLoadNextComments: (postId: number) =>
      dispatch(PostActions.loadNextPage('comments', { postId })),
  };
}

type MappedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(PostCardThread) as React.ElementType;
