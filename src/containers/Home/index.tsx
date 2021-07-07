import React, { useContext } from 'react';
import { AuthContext } from 'provider/auth';
import { ConnectedLoginForm } from 'containers/Auth/Login';
import UserHome from './UserHome';
import CenterContent from 'components/layout/CenterContent';
import { useHistory } from 'react-router-dom';
import Page from 'components/layout/Page';
import InfoCard from 'containers/Cards/CallToActionCard';
import withChrome from 'components/common/Chrome/withChrome';

function DefaultHomePage() {
  const history = useHistory();

  const handleSignup = () => {
    history.push('/signup');
  };

  return (
    <Page showHeader={false}>
      <CenterContent>
        <ConnectedLoginForm />
        <InfoCard
          title="No account yet?"
          description="Don’t miss out on your username!"
          buttonText="Register"
          onClick={handleSignup}
        />
      </CenterContent>
    </Page>
  );
}

function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <UserHome /> : <DefaultHomePage />;
}

export default withChrome(Home);
