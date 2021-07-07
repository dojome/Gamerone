import React from 'react';
import './style.scss';

export interface FeedProps {
  left?: React.ReactNode;
  children?: React.ReactNode;
  right?: React.ReactNode;
  outerWrap?: boolean;
}

const Feed: React.FC<FeedProps> = ({
  left,
  children,
  right,
  outerWrap = false,
}: FeedProps): JSX.Element => {
  const mainFeedClass = `feed__main${outerWrap ? '' : ' feed__main--wrap'}`;

  return (
    <div className="feed wrapper">
      <div className="feed__side feed__side--left">
        <div className="sticky">{left}</div>
      </div>

      <div className={mainFeedClass}>{children}</div>

      <div className="feed__side feed__side--right">
        <div className="sticky">{right}</div>
      </div>
    </div>
  );
};

export default Feed;
