import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import * as AuthApi from 'api/auth';
import Card, { CardTypeEnum } from 'components/common/Card';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Loader from 'components/common/Loader';
import Page from 'components/layout/Page';

function SuccessMesage() {
  return (
    <>
      <h4 data-testid="title">Verified</h4>
      <p data-testid="message">
        Your email is verified. You can use your account now.
      </p>
    </>
  );
}

function ErrorMessage() {
  return (
    <>
      <h4 data-testid="title">Not Verified</h4>
      <p data-testid="message">
        Your account was not found or your token might be expired.
      </p>
    </>
  );
}

const EmailVerify: React.FC = (): JSX.Element => {
  const { email, token } = useParams<{ email: string; token: string }>();
  const [verified, setVerified] = useState(false);
  const [done, setDone] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const doVerifyToken = async () => {
      try {
        await AuthApi.verifyEmail({ email, verifyToken: token });
        setVerified(true);
      } catch (e) {
        setVerified(false);
      } finally {
        setDone(true);
      }
    };

    doVerifyToken();
  }, [email, token]);

  return (
    <Page title="Email Verify">
      <Card type={CardTypeEnum.NARROW}>
        <div className="card__header" style={{ textAlign: 'center' }}>
          <h3
            style={{
              fontWeight: 'normal',
              fontSize: '1.25rem',
              color: '#4D5A80',
            }}
          >
            Email Verfication
          </h3>
          <h1 style={{ fontWeight: 500, fontSize: '1.5rem' }}>
            We&apos;ve got your back.
          </h1>
        </div>
        <div className="card__content">
          {!done && <Loader />}
          {done && verified && <SuccessMesage />}
          {done && !verified && <ErrorMessage />}
        </div>
        <div className="card__actions">
          {done && verified && (
            <Button
              scheme={ButtonSchemeEnum.PRIMARY}
              onClick={() => {
                history.push('/login');
              }}
              data-testid="login"
            >
              Login
            </Button>
          )}
          {done && !verified && (
            <Button
              scheme={ButtonSchemeEnum.PRIMARY}
              onClick={() => {
                history.push('/');
              }}
              data-testid="home"
            >
              Home
            </Button>
          )}
        </div>
      </Card>
    </Page>
  );
};

export default EmailVerify;
