import React from 'react';
import { CDN_URL, COVER_HEIGHT, COVER_WIDTH } from 'utils/constants';
import './style.scss';

export interface CoverProps {
  src?: string | null;
}

const Cover: React.FC<CoverProps> = ({ src }: CoverProps): JSX.Element => {
  const coverUrl =
    src !== undefined && src !== null && !src.startsWith('blob:')
      ? CDN_URL + `/${COVER_WIDTH}x${COVER_HEIGHT}/` + src
      : src;

  return src ? (
    <section
      className="cover"
      style={{
        backgroundImage: `url(${coverUrl})`,
      }}
      aria-label="cover"
    />
  ) : (
    <section className="cover is-default" aria-label="cover" />
  );
};

export default Cover;
