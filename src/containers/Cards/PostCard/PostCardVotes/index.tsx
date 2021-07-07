import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';

import PostActions from 'redux/post/actions';
import { PostIsVoted, PostIsVotedEnum } from 'interfaces';
import { RootState } from 'redux/types';
import { selectCurrentUserId } from 'redux/auth/selectors';

export interface PostCardVotesProps {
  postId: number;
  isVoted: PostIsVoted;
  upVotes: number;
  downVotes: number;
  postUserId: number;
}

const PostCardVotes: React.FC<PostCardVotesProps & MappedProps> = ({
  postId,
  postUserId,
  isVoted,
  upVotes,
  downVotes,
  currentUserId,
  dispatchUpVote,
  dispatchDownVote,
}: PostCardVotesProps & MappedProps): JSX.Element => {
  const handleUpVoteClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      dispatchUpVote(postId);
    },
    [postId, dispatchUpVote],
  );

  const handleDownVoteClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatchDownVote(postId);
    },
    [postId, dispatchDownVote],
  );

  return (
    <div className="button-group">
      <Button
        iconLeft="icon-arrow-thick-up"
        scheme={isVoted === PostIsVotedEnum.Up ? ButtonSchemeEnum.SUBTLE : null}
        disabled={currentUserId === 0 || currentUserId === postUserId}
        onClick={handleUpVoteClick}
      >
        {upVotes}
      </Button>
      <Button
        iconLeft="icon-arrow-thick-down"
        scheme={
          isVoted === PostIsVotedEnum.Down ? ButtonSchemeEnum.SUBTLE : null
        }
        disabled={currentUserId === 0 || currentUserId === postUserId}
        onClick={handleDownVoteClick}
      >
        {downVotes}
      </Button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  currentUserId: selectCurrentUserId(state),
});

const mapDispatchToProps = {
  dispatchUpVote: PostActions.upVote,
  dispatchDownVote: PostActions.downVote,
};

export type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(PostCardVotes) as React.ElementType;
