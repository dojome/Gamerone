import React from 'react';
import Card from 'components/common/Card';
import Badge from 'components/common/Badge';
import Loader from 'components/common/Loader';

export interface PostLoaderProps {
  show: boolean | undefined;
}

const PostLoader: React.FC<PostLoaderProps> = ({
  show = false,
}: PostLoaderProps): JSX.Element => {
  return show ? (
    <Card type="post card--flat">
      {/* Feed Loader card */}
      <div className="card__header">
        <Badge type="flat" testid="" />
        <div>
          <div
            className="badge badge--flat badge--tiny"
            style={{
              height: '0.75rem',
              width: '0.75rem',
              minWidth: 0,
              padding: 0,
            }}
          />
          <div
            className="badge badge--flat badge--tiny"
            style={{ height: '0.75rem', width: '5rem' }}
          />
          <br />
          <div
            className="badge badge--flat badge--tiny"
            style={{ height: '0.5rem', width: '4rem', opacity: 0.5 }}
          />
        </div>
      </div>
      <div
        className="card__content"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '5rem 0',
          opacity: 0.3,
        }}
      >
        <Loader />
        Getting posts...
        <div
          style={{
            position: 'absolute',
            top: '1.5rem',
            left: '1.5rem',
            width: '100%',
          }}
        >
          <div
            className="badge badge--flat badge--tiny"
            style={{ height: '0.5rem', width: '70%' }}
          />
          <div
            className="badge badge--flat badge--tiny"
            style={{ height: '0.5rem', width: '80%' }}
          />
          <div
            className="badge badge--flat badge--tiny"
            style={{ height: '0.5rem', width: '35%' }}
          />
        </div>
      </div>
    </Card>
  ) : (
    <></>
  );
};

export default PostLoader;
