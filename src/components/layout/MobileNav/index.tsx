import React from 'react';
import { NavLink } from 'react-router-dom';
import Button, {
  ButtonSchemeEnum,
  ButtonSizeEnum,
} from 'components/common/Button';
import Dropdown from 'components/common/Dropdown';
import './style.scss';
import NotificationsBadge from 'containers/Settings/NotificationsBadge';
import Avatar from 'components/common/Avatar';
import Badge from 'components/common/Badge';
import Icon from 'components/common/Icon';
import IsAuthenticated from 'components/utility/IsAuthenticated';

export interface MobileNavProps {
  username: string;
  avatar: string;
  handleNewPost: () => void;
  handleLogout: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  username,
  avatar,
  handleNewPost,
  handleLogout,
}: MobileNavProps): JSX.Element => {
  return (
    <nav className="mobile-nav">
      <ul className="menu">
        <li>
          <NavLink exact={true} activeClassName="is-active" to={'/'}>
            <Badge
              type="flat-dark"
              style={{ background: 'none' }}
              testid="mobile-nav-feed"
            >
              <Icon name="icon-newspaper-fold" size="125x" />
            </Badge>
            <label>Feed</label>
          </NavLink>
        </li>
        <li>
          <NavLink exact={true} activeClassName="is-active" to={'/discover'}>
            <Badge
              type="flat-dark"
              style={{ background: 'none' }}
              testid="mobile-nav-discover"
            >
              <Icon name="icon-satellite" size="125x" />
            </Badge>
            <label>Discover</label>
          </NavLink>
        </li>
        <li>
          <Button
            iconLeft="icon-pencil-write-2"
            schemes={[ButtonSchemeEnum.PRIMARY, ButtonSchemeEnum.SQUARE]}
            size={ButtonSizeEnum.LARGE}
            onClick={handleNewPost}
          />
          <label>New Post</label>
        </li>
        <li>
          <IsAuthenticated>
            <NotificationsBadge mobile={true} />
          </IsAuthenticated>
        </li>
        <li>
          <Dropdown
            options={[
              { label: 'Profile', link: '/' + username },
              { label: 'Settings', link: '/settings' },
              {
                label: 'Logout',
                onClick: (): void => handleLogout(),
              },
            ]}
          >
            <Avatar type="flat-dark" src={avatar} alt={username} />
            <label>Profile</label>
          </Dropdown>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
