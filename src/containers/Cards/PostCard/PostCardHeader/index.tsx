import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'timeago-react';

import PostCardVotes, { PostCardVotesProps } from '../PostCardVotes';
import Avatar from 'components/common/Avatar';
import Badge from 'components/common/Badge';
import Icon from 'components/common/Icon';
import PostCardDropdown from '../PostCardDropdown';
import Tooltip from 'components/common/Tooltip';

export interface PostCardHeaderProps {
  username: string;
  avatar: string;
  createdAt: Date;
  showVotes?: boolean;
  showActions?: boolean;
  commentsDisabled?: boolean;
  commentCount: number;
  votes?: PostCardVotesProps;
  isLatest?: boolean;
  postId: number;
  postUrl: string;
  postContent: string;
}

const PostCardHeader: React.FC<PostCardHeaderProps> = ({
  username,
  avatar,
  createdAt,
  votes,
  showVotes = false,
  showActions = false,
  commentsDisabled = false,
  commentCount,
  isLatest = false,
  postId,
  postUrl,
  postContent,
}: PostCardHeaderProps): JSX.Element => {
  const handleLinkClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
    },
    [],
  );

  return (
    <div className="card__header">
      {isLatest ? (
        <div style={{ display: 'flex', flex: 1 }}>
          <h4>Latest Post</h4>
          {commentCount > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                placeContent: 'center',
                alignItems: 'center',
                marginLeft: 'auto',
              }}
            >
              <div style={{ marginRight: '0.5rem' }}>{commentCount}</div>{' '}
              <div style={{ opacity: '0.3' }}>
                <Icon name="icon-messages-bubble-square" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <Link to={`/${username}`} onClick={handleLinkClick}>
            <Avatar src={avatar} alt={username} title={username} />
          </Link>

          <div>
            <Link to={`/${username}`} onClick={handleLinkClick}>
              <h4 className="username">
                <span className="at">@</span>
                {username}
              </h4>
            </Link>
            <Tooltip text={createdAt.toString()}>
              <TimeAgo datetime={createdAt} opts={{ minInterval: 60 }} />
            </Tooltip>
          </div>

          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            {commentsDisabled ? (
              <div style={{ marginRight: '1.25rem' }}>
                <Badge size="medium" type="flat-dark" testid="comment-badge">
                  <Icon
                    name={'icon-messages-bubble-square-disable'}
                    size="125x"
                  />
                </Badge>
              </div>
            ) : commentCount > 0 ? (
              <Link
                to={`/${username}/post/${postId}`}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  placeContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={{ marginRight: '0.5rem' }}>{commentCount}</div>{' '}
                <div style={{ opacity: '0.3' }}>
                  <Icon name="icon-messages-bubble-square" />
                </div>
              </Link>
            ) : (
              <></>
            )}
            {showVotes && votes ? (
              <div style={{ marginLeft: '1rem', marginRight: '1.25rem' }}>
                <PostCardVotes {...votes} />
              </div>
            ) : null}
            {showActions && votes ? (
              <span className="last">
                <PostCardDropdown
                  postId={votes.postId}
                  postUserId={votes.postUserId}
                  postUrl={postUrl}
                  postContent={postContent}
                />
              </span>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(PostCardHeader);
