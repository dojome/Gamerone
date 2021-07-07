import React, { useContext } from 'react';
import { Redirect, Route, Switch, RouteProps } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { RouterProps } from 'react-router';
import { connect, useDispatch } from 'react-redux';

// components
import Home from '../Home';
import Account from '../Account';
import Login from '../Auth/Login';
import SignupProcessRoute from '../Auth/Signup/route';
// actions
import AuthActions from 'redux/auth/actions';
// provider
import { AuthContext, AuthProvider } from 'provider/auth';

import Profile from 'containers/Profile';
import Settings from 'containers/Settings';
import {
  selectIsAuthenticated,
  selectCurrentUserAvatar,
  selectCurrentUser,
} from 'redux/auth/selectors';

import { RootState } from 'redux/types';
import { SITE_URL } from 'utils/constants';
import Discover from 'containers/Discover';
import Privacy from 'containers/Legal/Privacy';
import Terms from 'containers/Legal/Terms';
import useApplyTheme from 'lib/useApplyTheme';
import OpenGraph, { PageMeta } from 'components/common/OpenGraph';
import ScrollIntoView from 'components/utility/ScrollIntoView';

export const RestrictedRoute = ({
  component: Component,
  ...rest
}: RouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const TypedComponent = Component as React.ElementType;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <TypedComponent {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export const LoggedOutRoute = ({
  component: Component,
  ...rest
}: RouteProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const TypedComponent = Component as React.ElementType;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <TypedComponent {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

interface RootRoutesProps {
  history: RouterProps['history'];
  isAuthenticated: boolean;
}

const RootRoutes = ({
  history,
  isAuthenticated,
}: RootRoutesProps): JSX.Element => {
  const dispatch = useDispatch();

  // Check authorization (esp, for page refresh)
  React.useEffect(() => {
    dispatch(AuthActions.checkAuthorization());
  }, [dispatch]);

  useApplyTheme();

  const pageTitle = 'Show the world who you are';
  const siteMeta = {
    title: 'Show the world who you are on Gamer One',
    description:
      'A dedicated hub that connects gamers so they can take their gaming career to the next level.',
    image: 'assets/logo/avatar.jpg',
    url: SITE_URL,
    type: 'website',
  } as PageMeta;

  return (
    <ConnectedRouter history={history}>
      <AuthProvider isAuthenticated={isAuthenticated}>
        <OpenGraph title={pageTitle} meta={siteMeta} />
        <ScrollIntoView>
          <Route exact path="/" component={Home} />
          <Switch>
            <Route exact path="/discover" component={Discover} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/terms" component={Terms} />
            <LoggedOutRoute path="/login" component={Login} />
            <Route path="/signup" component={SignupProcessRoute} />
            <RestrictedRoute path="/settings" component={Settings} />
            <Route path="/account" component={Account} />
            <Route path="/:username" component={Profile} />
          </Switch>
        </ScrollIntoView>
      </AuthProvider>
    </ConnectedRouter>
  );
};

export default connect(
  (state: RootState) => ({
    isAuthenticated: selectIsAuthenticated(state),
    user: selectCurrentUser(state),
    userAvatar: selectCurrentUserAvatar(state),
  }),
  { dispatchLogout: AuthActions.logout },
)(RootRoutes);
