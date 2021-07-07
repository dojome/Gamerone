import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { Game } from 'interfaces';
import { GAME_PLACEHOLDER } from 'utils/constants';
import ListItem from 'components/common/ListItem';
import './style.scss';
import Button, { ButtonSchemeEnum } from 'components/common/Button';

interface Props {
  game: Game;
  chosen?: boolean;
  blocked?: boolean;
  itemClassName?: string;
  handleClick?: (t: Game) => void;
  handleItemRemove?: (id: Game) => void;
}

function GameListItem({
  game,
  chosen = false,
  blocked = false,
  itemClassName = '',
  handleClick,
  handleItemRemove,
}: Props) {
  const { name, cover } = game;
  const [selected, setSelected] = useState(blocked);
  const [hovered, setHovered] = useState(false);

  const onClick = useCallback(() => {
    if (chosen) {
      // do nothing
    } else {
      if (!selected && handleClick) {
        handleClick(game);
        setSelected(true);
      }
    }
  }, [chosen, selected, handleClick, game]);

  return (
    <div
      className={cn('game-list-item', itemClassName, {
        hover: hovered,
        chosen: chosen,
        selected: selected,
      })}
      onMouseEnter={() => chosen || setHovered(true)}
      onMouseLeave={() => chosen || setHovered(false)}
      onClick={onClick}
      aria-label="game-list-item"
    >
      <ListItem
        title={name}
        image={cover || GAME_PLACEHOLDER}
        appendRight={
          chosen ? (
            <Button
              scheme={ButtonSchemeEnum.SUBTLE}
              onClick={(e) => {
                e.stopPropagation();
                if (handleItemRemove) handleItemRemove(game);
              }}
            >
              Remove
            </Button>
          ) : selected ? (
            <i>Selected</i>
          ) : undefined
        }
      />
    </div>
  );
}

export default React.memo(GameListItem);
