import React from 'react';
import TimeAgo from 'timeago-react';
import Avatar from 'components/common/Avatar';
import { Comment } from 'interfaces';

export interface CommentProps {
  data: Comment;
}

function CommentBox({ data }: CommentProps) {
  const { user, comment, createdAt } = data;
  const { username, avatar } = user;
  return (
    <div className="comment-box">
      <Avatar src={avatar} alt={username} />
      <div className="comment-content">
        <h6 className="username">{username}</h6>
        <div className="comment-text">{comment}</div>
      </div>
      <TimeAgo datetime={createdAt} opts={{ minInterval: 60 }} />
    </div>
  );
}

export default React.memo(CommentBox);
