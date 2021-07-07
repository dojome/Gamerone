import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

// components
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import useSingleParamApi from 'lib/useSingleParamApi';
import * as AuthApi from 'api/auth';
import debounce from 'lib/debounce';
import { CHECK_EMAIL_REGEX, CHECK_PASSWORD_REGEX } from 'utils/constants';
import {
  SignupRequest,
  CheckUsernameRequest,
  CheckEmailRequest,
} from 'interfaces';
import { SignupActionPayload } from 'models/auth';
import Input from 'components/common/Form/Input';
import Card, { CardTypeEnum } from 'components/common/Card';

import { RootState } from 'redux/types';
import AuthActions from 'redux/auth/actions';
import { selectSignupStatus } from 'redux/request-status/selectors';
import RequestStatusActions from 'redux/request-status/actions';
import { SIGNUP_REQUEST } from 'redux/auth/types';

import { ErrorTypeEnum } from 'models/error';
import InputLoading from 'components/common/Form/InputLoading';
import {
  ERROR_MSG_EMAIL_PATTERN,
  ERROR_MSG_MIN_LENGTH_3,
  ERROR_MSG_MIN_LENGTH_8,
  ERROR_MSG_PASSWORD_PATTERN,
  ERROR_MSG_USERNAME_DUPLICATE,
  ERROR_MSG_EMAIL_DUPLICATE,
} from 'utils/formErrors';
import Page from 'components/layout/Page';
import CenterContent from 'components/layout/CenterContent';
import InfoCard from 'containers/Cards/CallToActionCard';
import { useHistory } from 'react-router-dom';
import ToastMessage from 'components/common/ToastMessage';

function SignUpForm({
  status,
  dispatchSignup,
  dispatchCleanStatus,
}: SignupFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    formState,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { isDirty } = formState;

  const [
    {
      resolved: checkEmailResolved,
      error: checkEmailError,
      loading: emailChecking,
    },
    doCheckEmail,
  ] = useSingleParamApi<CheckEmailRequest>(AuthApi.checkEmail);
  const [
    {
      resolved: checkUsernameResolved,
      error: checkUsernameError,
      loading: usernameChecking,
    },
    doCheckUsername,
  ] = useSingleParamApi<CheckUsernameRequest>(AuthApi.checkUsername);

  const onSubmit = (data: Record<string, any>) => {
    dispatchSignup(
      new SignupActionPayload().fromRequest(data as SignupRequest, true),
    );
  };

  const handleEmailChange = debounce((email) => {
    if (!email.match(CHECK_EMAIL_REGEX)) return;
    if (!errors.email || errors.email.type === ErrorTypeEnum.Validate) {
      doCheckEmail(email);
    }
  }, 600);

  const handleUsernameChange = debounce((username) => {
    if (!errors.username || errors.username.type === ErrorTypeEnum.Validate) {
      doCheckUsername(username);
    }
  }, 600);

  useEffect(() => {
    if (checkEmailError) {
      setError('email', {
        type: ErrorTypeEnum.Validate,
        message: ERROR_MSG_EMAIL_DUPLICATE,
      });
    }
    if (checkEmailResolved) {
      clearErrors('email');
    }
  }, [checkEmailResolved, checkEmailError, clearErrors, setError]);

  useEffect(() => {
    if (checkUsernameError) {
      setError('username', {
        type: ErrorTypeEnum.Validate,
        message: ERROR_MSG_USERNAME_DUPLICATE,
      });
    }
    if (checkUsernameResolved) {
      clearErrors('username');
    }
  }, [checkUsernameResolved, checkUsernameError, clearErrors, setError]);

  useEffect(() => {
    return () => {
      dispatchCleanStatus(SIGNUP_REQUEST);
    };
  }, [dispatchCleanStatus]);

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
            Register
          </h3>
          <h1 style={{ fontWeight: 500, fontSize: '1.5rem' }}>
            Create an account.
          </h1>
        </div>
        <div className="card__content">
          {status?.isError && (
            <ToastMessage
              type="inline"
              text="Something went wrong. Please try again."
              icon="icon-remove-circle"
            />
          )}
          <Input
            type="text"
            name="email"
            label="Email"
            inputRef={register({
              required: true,
              pattern: {
                value: CHECK_EMAIL_REGEX,
                message: ERROR_MSG_EMAIL_PATTERN,
              },
              validate: () =>
                checkEmailError === null || ERROR_MSG_EMAIL_DUPLICATE,
            })}
            onChange={(e) => handleEmailChange(e.target.value)}
            appendRight={<InputLoading show={emailChecking} />}
            error={errors['email']}
            maxLength={254}
            data-testid="email"
          />
          <Input
            type="text"
            name="username"
            label="Username"
            inputRef={register({
              required: true,
              minLength: {
                value: 3,
                message: ERROR_MSG_MIN_LENGTH_3,
              },
              maxLength: 30,
              validate: () =>
                checkUsernameError === null || ERROR_MSG_USERNAME_DUPLICATE,
            })}
            maxLength={30}
            onChange={(e) => handleUsernameChange(e.target.value)}
            appendRight={<InputLoading show={usernameChecking} />}
            error={errors['username']}
            data-testid="username"
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
              maxLength: 64,
              pattern: {
                value: CHECK_PASSWORD_REGEX,
                message: ERROR_MSG_PASSWORD_PATTERN,
              },
            })}
            maxLength={64}
            hint="A password must contain an uppercase, lowercase, a special character and a number."
            error={errors['password']}
            data-testid="password"
          />
        </div>
        <div className="card__actions" style={{ flexDirection: 'column' }}>
          <div
            style={{
              fontSize: '0.875rem',
              marginBottom: '1rem',
              opacity: '0.5',
            }}
            data-testid="legal"
          >
            By clicking Sign Up, you agree to our Terms, Data Policy and Cookies
            Policy.
          </div>
          <span className="last">
            <Button
              type="submit"
              scheme={ButtonSchemeEnum.PRIMARY}
              disabled={!isDirty}
              submitting={status?.isFetching}
              style={{ alignSelf: 'flex-start' }}
              data-testid="signup"
            >
              Sign Up
            </Button>
          </span>
        </div>
      </form>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => ({
  status: selectSignupStatus(state),
});

const mapDispatchToProps = {
  dispatchSignup: AuthActions.signUp,
  dispatchCleanStatus: RequestStatusActions.cleanStatus,
};

type SignupFormProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const ConnectedSignUpForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);

const SignupPage: React.FC = (): JSX.Element => {
  const history = useHistory();

  const handleSignin = () => {
    history.push('/');
  };

  return (
    <Page title="Sign up" showHeader={false}>
      <CenterContent>
        <ConnectedSignUpForm />
        <InfoCard
          title="Already have an account?"
          buttonText="Log in"
          onClick={handleSignin}
        />
      </CenterContent>
    </Page>
  );
};

export default SignupPage;
