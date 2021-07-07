import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';

import { PostIsVoted } from 'interfaces';
import PostCardVotes from '../PostCardVotes';
import PostActions from 'redux/post/actions';
import { AuthContext } from 'provider/auth';
import { useHistory } from 'react-router-dom';
import PostCardDropdown from '../PostCardDropdown';

export interface PostCardActionsProps {
  postId: number;
  postUserId: number;
  isVoted: PostIsVoted;
  upVotes: number;
  downVotes: number;
  postUrl: string;
  postContent: string;
  postPath: string;
  commentsEnabled: boolean;
}

const PostCardActions: React.FC<PostCardActionsProps> = ({
  postUrl,
  postPath,
  postContent,
  commentsEnabled,
  ...postVotesProps
}: PostCardActionsProps): JSX.Element => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  const handleShareClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      dispatch(PostActions.sharePost(postUrl, postContent));
    },
    [dispatch, postUrl, postContent],
  );

  const handleReplyClick = React.useCallback(() => {
    if (postPath) history.push(postPath);
  }, [postPath, history]);

  return (
    <div className="card__actions">
      <Button
        scheme={ButtonSchemeEnum.SQUARE_ON_MOBILE}
        iconLeft="icon-share"
        onClick={handleShareClick}
      >
        Share
      </Button>

      <Button
        scheme={ButtonSchemeEnum.SQUARE_ON_MOBILE}
        iconLeft="icon-messages-bubble-square"
        disabled={!commentsEnabled || !isAuthenticated}
        onClick={handleReplyClick}
      >
        Reply
      </Button>

      <PostCardVotes {...postVotesProps} />

      <span className="last">
        <PostCardDropdown
          postId={postVotesProps.postId}
          postUserId={postVotesProps.postUserId}
          postUrl={postUrl}
          postContent={postContent}
        />
      </span>
    </div>
  );
};

export default React.memo(PostCardActions);
