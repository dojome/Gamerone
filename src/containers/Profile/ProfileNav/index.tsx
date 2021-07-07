import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './style.scss';

const ProfileNav: React.FC = (): JSX.Element => {
  const { username } = useParams();
  return (
    <div className="cover-spacer">
      <ul className="profile-nav" data-testid="profile-nav">
        <li>
          <NavLink exact to={'/' + username} activeClassName="is-active">
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/' + username + '/achievements'}
            activeClassName="is-active"
          >
            Achievements
          </NavLink>
        </li>
        <li>
          <NavLink
            to={'/' + username + '/experience'}
            activeClassName="is-active"
          >
            Experience
          </NavLink>
        </li>
        <li>
          <NavLink to={'/' + username + '/gear'} activeClassName="is-active">
            Gear
          </NavLink>
        </li>
        <li>
          <NavLink to={'/' + username + '/games'} activeClassName="is-active">
            Games
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ProfileNav;
