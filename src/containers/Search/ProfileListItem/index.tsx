import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { User } from 'interfaces';
import ListItem from 'components/common/ListItem';
import { AVATAR_PLACEHOLDER } from 'utils/constants';
import './style.scss';
import Button, { ButtonSchemeEnum } from 'components/common/Button';

interface Props {
  profile: User;
  chosen?: boolean;
  blocked?: boolean;
  itemClassName?: string;
  handleClick?: (t: User) => void;
  handleItemRemove?: (id: number) => void;
}

function ProfileListItem({
  profile,
  chosen = false,
  blocked = false,
  itemClassName = '',
  handleClick,
  handleItemRemove,
}: Props) {
  const { username, avatar, firstName, lastName } = profile;
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(blocked);
  const fullName = (firstName || '') + ' ' + (lastName || '');

  const onClick = useCallback(() => {
    if (chosen) {
      // do nothing
    } else {
      if (!selected && handleClick) {
        handleClick(profile);
        setSelected(true);
      }
    }
  }, [chosen, selected, handleClick, profile]);

  return (
    <div
      className={cn('profile-list-item', itemClassName, {
        hover: hovered,
        chosen: chosen,
        selected: selected,
      })}
      onMouseEnter={() => chosen || setHovered(true)}
      onMouseLeave={() => chosen || setHovered(false)}
      onClick={onClick}
      aria-label="profile-list-item"
    >
      <ListItem
        title={username}
        description={fullName}
        image={avatar ? avatar : AVATAR_PLACEHOLDER}
        appendRight={
          chosen ? (
            <Button
              scheme={ButtonSchemeEnum.SUBTLE}
              onClick={(e) => {
                e.stopPropagation();
                if (handleItemRemove) handleItemRemove(profile.id);
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

export default React.memo(ProfileListItem);
