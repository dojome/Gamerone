import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Input from 'components/common/Form/Input';
import { RootState } from 'redux/types';
import {
  selectCurrentUsername,
  selectCurrentUserAvatar,
} from 'redux/auth/selectors';
import PostActions from 'redux/post/actions';
import { selectCurrentPostId } from 'redux/post/selectors';
import Avatar from 'components/common/Avatar';
import { AuthContext } from 'provider/auth';

export interface PostCardReplyProps {
  commentId?: number;
}

const PostCardReply: React.FC<PostCardReplyProps & MappedProps> = ({
  username,
  avatar,
  postId,
  dispatchReply,
}: PostCardReplyProps & MappedProps): JSX.Element => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = React.useState('');
  const { isAuthenticated } = useContext(AuthContext);

  const handlePostReplyClick = React.useCallback(() => {
    if (comment) {
      dispatchReply(postId, {
        comment,
      });
      setComment('');
    }
  }, [comment, dispatchReply, postId]);

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return isAuthenticated ? (
    <div className="reply">
      <h4>Reply</h4>

      <div className="reply__content">
        <Avatar src={avatar} alt={username} title={username} size="medium" />

        <Input
          type="textarea"
          name="reply"
          label="Type your reply here..."
          textareaRef={inputRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className="reply__actions">
        <Button
          scheme={ButtonSchemeEnum.PRIMARY}
          size="large"
          onClick={handlePostReplyClick}
        >
          Post reply
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
};

const mapStateToProps = (state: RootState) => ({
  username: selectCurrentUsername(state),
  avatar: selectCurrentUserAvatar(state),
  postId: selectCurrentPostId(state),
});

const mapDispatchToProps = {
  dispatchReply: PostActions.addComment,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(PostCardReply) as React.ElementType;
