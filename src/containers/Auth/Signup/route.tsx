import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import withChrome from 'components/common/Chrome/withChrome';
import DiscoverFollows from './DiscoverFollows';
import UploadAvatar from './UploadAvatar';
import SignupForm from './index';
import { LoggedOutRoute, RestrictedRoute } from 'containers/App/router';

const SignupProcessRoute: React.FC = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <Switch>
      <RestrictedRoute
        path={`${match.path}/follows`}
        component={DiscoverFollows}
      />
      <RestrictedRoute path={`${match.path}/avatar`} component={UploadAvatar} />
      <LoggedOutRoute path={`${match.path}`} component={SignupForm} />
    </Switch>
  );
};

export default withChrome(SignupProcessRoute);
