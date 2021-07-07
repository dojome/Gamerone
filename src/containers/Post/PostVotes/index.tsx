import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { PostModel } from 'models/post';
import { RootState } from 'redux/types';
import PostActions from 'redux/post/actions';
import { selectIsAuthenticated } from 'redux/auth/selectors';
import { Notify } from 'components/utility/Notify';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { PostIsVotedEnum } from 'interfaces';

export interface PostVotesProps {
  post: PostModel;
}

function PostVotes({
  isAuthenticated,
  post,
  dispatchUpVote,
  dispatchDownVote,
}: PostVotesProps & MappedProps) {
  const { upCount, downCount, commentCount, isVoted } = post;

  const handleUpVoteClick = () => {
    if (!isAuthenticated) {
      Notify.warning('You should sign in to vote');
      return;
    }
    dispatchUpVote(post.id);
  };

  const handleDownVoteClick = () => {
    if (!isAuthenticated) {
      Notify.warning('You should sign in to vote');
      return;
    }
    dispatchDownVote(post.id);
  };

  return (
    <div>
      <Button
        onClick={handleUpVoteClick}
        scheme={isVoted === PostIsVotedEnum.Up ? ButtonSchemeEnum.SUBTLE : null}
        aria-label="up-vote"
      >
        <span style={{ marginRight: '10px' }}>&uarr;</span>
        <span id="up-vote-count">{upCount}</span>
      </Button>
      <Button
        onClick={handleDownVoteClick}
        scheme={
          isVoted === PostIsVotedEnum.Down ? ButtonSchemeEnum.SUBTLE : null
        }
        aria-label="down-vote"
      >
        <span style={{ marginRight: '10px' }}>&darr;</span>
        <span id="down-vote-count">{downCount}</span>
      </Button>
      {post.commentsEnabled && (
        <Button>
          Comments <span id="comment-count">{commentCount || 0}</span>
          {/* <!-- Click Show/Hide Comments --> */}
        </Button>
      )}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: selectIsAuthenticated(state),
});

const mapDispatchToProps = {
  dispatchUpVote: PostActions.upVote,
  dispatchDownVote: PostActions.downVote,
};

export type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, React.memo)(PostVotes) as React.ElementType;
