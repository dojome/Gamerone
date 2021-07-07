import React from 'react';
import Dropdown from 'components/common/Dropdown';
import './style.scss';
import Search from 'containers/Search/Search';
import Avatar from 'components/common/Avatar';
import Button, {
  ButtonSchemeEnum,
  ButtonSizeEnum,
} from 'components/common/Button';
import IsAuthenticated from 'components/utility/IsAuthenticated';
import NotificationsBadge from 'containers/Settings/NotificationsBadge';

export interface HeaderProps {
  username: string;
  avatar: string;
  handleNewPost: () => void;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  username,
  avatar,
  handleNewPost,
  handleLogout,
}: HeaderProps): JSX.Element => {
  return (
    <header className="header">
      <section className="wrapper">
        <div className="header__left">
          <Search />

          <ul className="menu">
            <li>
              {/* <Link to={'/discover'}>
                <Button
                  schemes={[
                    ButtonSchemeEnum.SUBTLE,
                    ButtonSchemeEnum.SUBTLE_REVEAL,
                  ]}
                  size="large"
                  iconLeft="icon-satellite"
                >
                  Discover
                </Button>
              </Link> */}
            </li>
          </ul>
        </div>

        <IsAuthenticated>
          <div className="header__right">
            <Button
              scheme={ButtonSchemeEnum.PRIMARY}
              size={ButtonSizeEnum.LARGE}
              iconLeft={'icon-pencil-write-2'}
              onClick={handleNewPost}
            >
              New post
            </Button>
            <NotificationsBadge />
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
              <Avatar
                src={avatar}
                type="flat"
                alt={username}
                title={username}
                size="medium"
              />
            </Dropdown>
          </div>
        </IsAuthenticated>
      </section>
    </header>
  );
};

export default React.memo(Header);
