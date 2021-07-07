import React, { ReactNode, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import useOutsideClick from 'lib/useOutsideClick';
import './style.scss';
import useSmoothOpen from 'lib/useSmoothOpen';
import Icon from '../Icon';

export type DropdownOptionType = DropdownOption;

export interface DropdownOption {
  label: string;
  link?: string;
  disabled?: boolean;
  onClick?: (e?: any) => void;
}

export interface DropdownProps {
  type?: 'wide';
  title?: string;
  options?: DropdownOptionType[];
  content?: ReactNode;
  last?: boolean;
  children: ReactNode;
  onClick?: (e?: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  type,
  title,
  options,
  content,
  last = false,
  children,
}: DropdownProps): JSX.Element => {
  const [dropDownIsOpen, setDropDownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hideDropdown = useCallback(() => {
    setDropDownIsOpen(false);
  }, []);

  const toggleDropdown = useCallback(
    (e?: React.MouseEvent<HTMLSpanElement>) => {
      if (e) e.stopPropagation();
      setDropDownIsOpen(!dropDownIsOpen);
    },
    [dropDownIsOpen],
  );

  const [showDropdown, renderDropdown] = useSmoothOpen(dropDownIsOpen);

  const optionsWithCloseToggle =
    options &&
    options.map((o: DropdownOption, i: number) => {
      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.stopPropagation();

        const clickFn = o.onClick || null;
        if (clickFn) {
          clickFn(o);
        }
        toggleDropdown();
      };

      return (
        <li key={i}>
          <Link
            to={o.link ? o.link : '#'}
            onClick={handleClick}
            className={o.disabled ? 'is-disabled' : ''}
          >
            {o.label}
          </Link>
        </li>
      );
    });

  useOutsideClick([dropdownRef], hideDropdown);

  const dropdownWrapper = cn('dropdown-wrapper', {
    [`wide`]: type && type === 'wide',
    [`last`]: !!last,
  });

  return (
    <div className={dropdownWrapper}>
      <span className="dropdown-wrapper__children" onClick={toggleDropdown}>
        {children}
      </span>

      {renderDropdown && (
        <div
          className={`dropdown dropdown--has-close ${
            showDropdown ? 'is-open' : ''
          }`}
          ref={dropdownRef}
        >
          <button
            onClick={toggleDropdown}
            className="button button--square button--inset close"
          >
            <Icon name="icon-remove" />
          </button>
          {title && (
            <div className="dropdown__header">
              <h4>{title}</h4>
            </div>
          )}
          {optionsWithCloseToggle && <ul>{optionsWithCloseToggle}</ul>}
          {content && <div className="dropdown__content">{content}</div>}
        </div>
      )}
    </div>
  );
};

export default React.memo(Dropdown);
