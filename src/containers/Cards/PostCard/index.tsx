import React from 'react';
import Card, { CardTypeEnum } from 'components/common/Card';
import { PostModel } from 'models/post';
import './style.scss';
import PostCardHeader from './PostCardHeader';
import PostCardMedia from './PostCardMedia';
import PostCardContent from './PostCardContent';
import PostCardActions from './PostCardActions';
import { Post } from 'interfaces';
import { SITE_URL } from 'utils/constants';

interface PostCardDetailProps {
  post: PostModel;
  isLatest?: boolean;
}

const PostCardDetail: React.FC<PostCardDetailProps> = ({
  post,
  isLatest,
}: PostCardDetailProps): JSX.Element => {
  return (
    <Card type={CardTypeEnum.POST}>
      <PostCardHeader
        username={post.user.username}
        avatar={post.user.avatar}
        createdAt={post.createdDate}
        isLatest={isLatest}
        commentCount={post.commentCount}
        postId={post.id}
        postUrl={`${SITE_URL}/${post.user.username}/post/${post.id}`}
        postContent={post.title}
      />
      <PostCardContent text={post.title} games={post.games} />
      <PostCardActions
        postUrl={`${SITE_URL}/${post.user.username}/post/${post.id}`}
        postPath={`/${post.user.username}/post/${post.id}`}
        postContent={post.title}
        postId={post.id}
        postUserId={post.user.id}
        isVoted={post.isVoted}
        upVotes={post.upCount}
        downVotes={post.downCount}
        commentsEnabled={post.commentsEnabled}
      />
    </Card>
  );
};

export interface PostCardProps {
  post: PostModel;
  isDetailView?: boolean;
  isLatest?: boolean;
  isSelf?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  isLatest = false,
}: PostCardProps): JSX.Element => {
  return post.id !== 0 ? (
    post.images && post.images.length >= 1 ? (
      <div className="card-wrapper">
        <PostCardMedia media={post.images} />
        <PostCardDetail post={post} isLatest={isLatest} />
      </div>
    ) : (
      <PostCardDetail isLatest={isLatest} post={post} />
    )
  ) : (
    <Card type={CardTypeEnum.POST} data-testid={'card-post'}>
      <div className="card__content empty">
        <p>No posts yet.</p>
      </div>
    </Card>
  );
};

export default React.memo(PostCard);

/**
 * WIP: The card below is for virtualization
 */
interface WindowedPostCardProps {
  index: number;
  style: Record<string, any>;
  data: Post[];
}

function WindowedPostCard({ index, style, data }: WindowedPostCardProps) {
  const loading = data[index] === null;
  const post = loading ? null : (data[index] as PostModel);

  return post ? (
    post.images && post.images.length >= 1 ? (
      <div className="card-wrapper" style={style}>
        <PostCardMedia media={post.images} />
        <PostCardDetail post={post} />
      </div>
    ) : (
      <PostCardDetail post={post} />
    )
  ) : (
    <Card type={CardTypeEnum.POST} data-testid={'card-post'}>
      <div className="card__content empty" style={style}>
        <p>Loading post ...</p>
      </div>
    </Card>
  );
}

export const MemoizedPostCard = React.memo(WindowedPostCard);
