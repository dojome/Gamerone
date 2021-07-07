import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RouteProps } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// components
import Button, {
  ButtonSchemeEnum,
  ButtonSizeEnum,
} from 'components/common/Button';
import Page from 'components/layout/Page';
import withChrome from 'components/common/Chrome/withChrome';
import Input from 'components/common/Form/Input';
import Card, { CardTypeEnum } from 'components/common/Card';

import { LoginActionPayload } from 'models/auth';
import { LoginRequest } from 'interfaces';

import { RootState } from 'redux/types';
import AuthActions from 'redux/auth/actions';
import { selectLoginStatus } from 'redux/request-status/selectors';
import RequestStatusActions from 'redux/request-status/actions';
import { LOGIN_REQUEST } from 'redux/auth/types';
import { ERROR_MSG_MIN_LENGTH_8 } from 'utils/formErrors';
import CenterContent from 'components/layout/CenterContent';
import ToastMessage from 'components/common/ToastMessage';

function LogInForm({
  status,
  dispatchLogin,
  dispatchCleanStatus,
}: LoginFormProps) {
  const history = useHistory();
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { isDirty } = formState;
  const location: RouteProps['location'] & {
    state: { from: { pathname: string } };
  } = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const onSubmit = (data: Record<string, any>) => {
    dispatchLogin(
      new LoginActionPayload().fromRequest(data as LoginRequest, from),
    );
  };

  useEffect(() => {
    return () => {
      dispatchCleanStatus(LOGIN_REQUEST);
    };
  }, [dispatchCleanStatus]);

  const handleForgotPassword = () => {
    history.push('/account/password-reset');
  };

  return (
    <Card type={CardTypeEnum.NARROW}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <div className="card__header" style={{ textAlign: 'center' }}>
          <h3
            style={{
              fontWeight: 'normal',
              fontSize: '1.25rem',
              color: '#4D5A80',
            }}
          >
            Log in
          </h3>
          <h1 style={{ fontWeight: 500, fontSize: '1.5rem' }}>Welcome back.</h1>
        </div>
        <div className="card__content">
          {status?.isError && (
            <ToastMessage
              type="inline"
              text="Incorrect email or password."
              icon="icon-remove-circle"
            />
          )}
          <Input
            type="text"
            name="email"
            label="Email"
            inputRef={register({ required: true })}
            error={errors['email']}
            data-testid="email"
          />
          <Input
            type="password"
            name="password"
            label="Password"
            inputRef={register({
              required: true,
              minLength: {
                value: 8,
                message: ERROR_MSG_MIN_LENGTH_8,
              },
            })}
            error={errors['password']}
            data-testid="password"
          />
        </div>
        <div className="card__actions">
          <Button
            scheme={ButtonSchemeEnum.SUBTLE}
            size={ButtonSizeEnum.SMALL}
            data-testid="forgot-password"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </Button>
          <span className="last">
            <Button
              type="submit"
              scheme={ButtonSchemeEnum.PRIMARY}
              size={ButtonSizeEnum.LARGE}
              disabled={!isDirty}
              submitting={status?.isFetching}
              data-testid="login"
            >
              Log In
            </Button>
          </span>
        </div>
      </form>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => ({
  status: selectLoginStatus(state),
});

const mapDispatchToProps = {
  dispatchLogin: AuthActions.login,
  dispatchCleanStatus: RequestStatusActions.cleanStatus,
};

type LoginFormProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInForm);

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <Page title="Log In" showHeader={false}>
      <CenterContent>
        <ConnectedLoginForm />
      </CenterContent>
    </Page>
  );
};

export default withChrome(LoginPage);
