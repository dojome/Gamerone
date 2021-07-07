import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import Achievements from './Achievements/index';
import Games from './Games/index';
import Gear from './Gear/index';
import Overview from './Overview';
import withChrome from 'components/common/Chrome/withChrome';
import Following from './Friends/Following';
import Followers from './Friends/Followers';
import Blocks from './Friends/Blocks';

import GridSpacer from 'components/layout/GridSpacer';
import FriendsNav from './Friends/FriendsNav';
import NotFound from 'containers/NotFound';
import { selectCurrentUsername } from 'redux/auth/selectors';
import { SITE_NAME } from 'utils/constants';
import Experience from './Experience';
import ScrollIntoView from 'components/utility/ScrollIntoView';

export const FriendsRoute: React.FC = (): JSX.Element => {
  const currentUsername = useSelector(selectCurrentUsername);
  const match = useRouteMatch<{ username: string; friends: string }>(
    '/:username/:friends',
  );
  const username = match?.params.username;
  const friends = match?.params.friends;

  return (
    <>
      <Helmet>
        <title>
          {username}&apos;s {friends} | {SITE_NAME}
        </title>
      </Helmet>

      <GridSpacer size={1}>
        <FriendsNav blocksEnabled={currentUsername === username} />
      </GridSpacer>

      <GridSpacer size={3}>
        {friends === 'followers' ? <Followers /> : null}
        {friends === 'following' ? <Following /> : null}

        {friends === 'blocks' ? (
          currentUsername === username ? (
            <Blocks />
          ) : (
            // TODO: Access is denied
            <NotFound username={username + '/blocks'} />
          )
        ) : null}
      </GridSpacer>
    </>
  );
};

export const ProfileRoute: React.FC = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <ScrollIntoView>
      <Switch>
        <Route path={`${match.path}/achievements`} component={Achievements} />
        <Route path={`${match.path}/experience`} component={Experience} />
        <Route path={`${match.path}/gear`} component={Gear} />
        <Route path={`${match.path}/games`} component={Games} />
        <Route
          path={[
            `${match.path}/followers`,
            `${match.path}/following`,
            `${match.path}/blocks`,
          ]}
          component={FriendsRoute}
        />
        {/* // TODO: Redirect to 404 page */}
        {/* <Route component={() => <NotFound username={match.url} />} /> */}
      </Switch>
    </ScrollIntoView>
  );
};

export const OverviewRoute: React.FC = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <ScrollIntoView>
      <Switch>
        <Route exact path={`${match.path}`} component={withChrome(Overview)} />
      </Switch>
    </ScrollIntoView>
  );
};
