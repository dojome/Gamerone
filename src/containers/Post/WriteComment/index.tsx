import React, { memo, useCallback, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Avatar from 'components/common/Avatar';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { RootState } from 'redux/types';
import { selectCurrentUser } from 'redux/auth/selectors';
import PostActions from 'redux/post/actions';

import './style.scss';
import Input from 'components/common/Form/Input';

interface WriteCommentProps {
  postId: number;
}

function WriteComment({
  postId,
  user,
  dispatchWriteComment,
}: WriteCommentProps & MappedProps) {
  const { avatar, username } = user;
  const [comment, setComment] = useState('');

  const handleWriteComment = useCallback(() => {
    if (comment) {
      dispatchWriteComment(postId, {
        comment,
      });
      setComment('');
    }
  }, [comment, dispatchWriteComment, postId]);

  return (
    <div className="write-comment-container">
      <div>
        <Avatar src={avatar} alt={username} title={username} />
      </div>
      <div className="input-comment">
        <Input
          type="text"
          name="comment"
          value={comment}
          placeholder="Leave a comment"
          onChange={(e) => setComment(e.target.value)}
          appendRight={
            <Button
              scheme={ButtonSchemeEnum.PRIMARY}
              onClick={handleWriteComment}
            >
              Write
            </Button>
          }
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: selectCurrentUser(state),
});

const mapDispatchToProps = {
  dispatchWriteComment: PostActions.addComment,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(WriteComment) as React.ElementType;
