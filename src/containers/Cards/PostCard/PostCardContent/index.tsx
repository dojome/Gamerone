import React from 'react';
import cn from 'classnames';
import { Game } from 'interfaces';
import DataItem from 'components/common/DataItem';
import { GAME_PLACEHOLDER } from 'utils/constants';
import LinkifyWrapper from '../LinkifyWrapper';

export interface PostCardContentProps {
  text: string;
  games?: Game[];
}

const PostCardContent: React.FC<PostCardContentProps> = ({
  text,
  games,
}: PostCardContentProps): JSX.Element => {
  const pClass = cn({
    [`p--huge`]: text.length <= 50,
    [`p--large`]: text.length <= 100,
  });

  return (
    <div className="card__content">
      <p className={pClass}>
        <LinkifyWrapper>{text}</LinkifyWrapper>
      </p>
      {games && games.length > 0 && (
        <DataItem
          badgeSize="tiny"
          imageSrc={games[0].cover || GAME_PLACEHOLDER}
          label={games[0].name}
        />
      )}
    </div>
  );
};

export default React.memo(PostCardContent);
