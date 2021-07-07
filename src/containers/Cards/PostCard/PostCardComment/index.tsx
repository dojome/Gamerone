import React from 'react';
import Tooltip from 'components/common/Tooltip';
import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import Avatar from 'components/common/Avatar';
import LinkifyWrapper from '../LinkifyWrapper';

export interface PostCardCommentProps {
  username: string;
  avatar: string;
  createdAt: Date;
  comment: string;
}

const PostCardComment: React.FC<PostCardCommentProps> = ({
  username,
  avatar,
  createdAt,
  comment,
}: PostCardCommentProps): JSX.Element => {
  return (
    <div className="comment">
      <Link to={`/${username}`}>
        <Avatar src={avatar} alt={username} title={username} />
      </Link>
      <div>
        <Link to={`/${username}`}>
          <h4
            className="username"
            style={{ display: 'inline-block', marginRight: '0.5rem' }}
          >
            <span className="at">@</span>
            {username}
          </h4>
        </Link>
        <Tooltip text={createdAt.toString()}>
          <TimeAgo datetime={createdAt} opts={{ minInterval: 60 }} />
        </Tooltip>
        <p>
          <LinkifyWrapper>{comment}</LinkifyWrapper>
        </p>
      </div>
      <div className="comment__actions">
        {/* <Dropdown
          options={[
            { label: 'Share', link: '/' },
            { label: 'Reply', link: '/' },
            { label: 'Copy link', link: '/' },
            { label: 'Report', link: '/' },
          ]}
        >
          <Button scheme={ButtonSchemeEnum.SQUARE}>...</Button>
        </Dropdown> */}
      </div>
    </div>
  );
};

export default React.memo(PostCardComment);
