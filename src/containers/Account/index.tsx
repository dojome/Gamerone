import React from 'react';
import { useRouteMatch, Switch } from 'react-router-dom';

// routes
import { LoggedOutRoute, RestrictedRoute } from '../App/router';
import PasswordReset from './PasswordReset';
import PasswordResetNew from './PasswordResetNew';
import EmailVerify from './EmailVerify';
import Page from 'components/layout/Page';
import withChrome from 'components/common/Chrome/withChrome';

const Account: React.FC = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <Switch>
      <LoggedOutRoute
        path={`${match.path}/password-reset-new`}
        component={PasswordResetNew}
      />
      <LoggedOutRoute
        path={`${match.path}/password-reset`}
        component={PasswordReset}
      />
      <LoggedOutRoute
        path={`${match.path}/email-verify/:email/:token`}
        component={EmailVerify}
      />
      <RestrictedRoute
        path="*"
        component={() => (
          <Page title="Accounts">
            <section className="wrapper section">
              <h2>Accounts</h2>
            </section>
          </Page>
        )}
      />
    </Switch>
  );
};

export default withChrome(Account);
