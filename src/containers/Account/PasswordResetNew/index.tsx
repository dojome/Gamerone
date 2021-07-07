import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';

import useSingleParamApi from 'lib/useSingleParamApi';
import * as AccountApi from 'api/account';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { CHECK_PASSWORD_REGEX, CHECK_EMAIL_REGEX } from 'utils/constants';
import { ResetPasswordRequest, Nullable, ModelError } from 'interfaces';
import Input from 'components/common/Form/Input';
import Card, { CardTypeEnum } from 'components/common/Card';
import {
  ERROR_MSG_PASSWORD_PATTERN,
  ERROR_MSG_MIN_LENGTH_8,
  ERROR_MSG_PASSWORD_MATCH,
} from 'utils/formErrors';
import CenterContent from 'components/layout/CenterContent';
import Page from 'components/layout/Page';
import withChrome from 'components/common/Chrome/withChrome';
import ToastMessage from 'components/common/ToastMessage';

function PasswordResetNewForm() {
  const history = useHistory();
  const query = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });

  const { register, handleSubmit, errors, watch, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { isDirty } = formState;
  const [message, setMessage] = useState<Nullable<string>>(null);

  const [
    { resolved: resetPasswordResponse, error: resetPasswordError, loading },
    doResetPassword,
  ] = useSingleParamApi<ResetPasswordRequest>(AccountApi.resetPassword);

  const onSubmit = (data: Record<string, any>) => {
    doResetPassword({
      email: (query.email as string) || '',
      token: (query.token as string) || '',
      password: data.password,
    });
  };

  useEffect(() => {
    if (
      !query.email ||
      !query.token ||
      !(query.email as string).match(CHECK_EMAIL_REGEX)
    ) {
      history.push('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    if (resetPasswordError) {
      const error = resetPasswordError as ModelError;
      setMessage(error.message);
    } else if (resetPasswordResponse) {
      setMessage('Password has been reset successfully.');
    } else {
      setMessage(null);
    }
  }, [resetPasswordResponse, resetPasswordError]);

  const handleViewLogin = () => {
    history.push('/login');
  };

  return (
    <Card type={CardTypeEnum.NARROW}>
      <div className="card__header" style={{ textAlign: 'center' }}>
        <h3
          style={{
            fontWeight: 'normal',
            fontSize: '1.25rem',
            color: '#4D5A80',
          }}
        >
          Forgot Password
        </h3>
        <h1 style={{ fontWeight: 500, fontSize: '1.5rem' }}>
          Set New Password
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <div className="card__content">
          {message && (
            <ToastMessage
              type="inline"
              text={message}
              icon={
                resetPasswordError
                  ? 'icon-remove-circle'
                  : 'icon-information-circle'
              }
            />
          )}
          {!message && (
            <>
              <Input
                type="password"
                name="password"
                label="New Password"
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 8,
                    message: ERROR_MSG_MIN_LENGTH_8,
                  },
                  validate: (value) =>
                    value.match(CHECK_PASSWORD_REGEX) ||
                    ERROR_MSG_PASSWORD_PATTERN,
                })}
                error={errors['password']}
                data-testid="password"
              />
              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 8,
                    message: ERROR_MSG_MIN_LENGTH_8,
                  },
                  validate: (value) =>
                    value === watch('password') || ERROR_MSG_PASSWORD_MATCH,
                })}
                error={errors['confirmPassword']}
                data-testid="confirm-password"
              />
            </>
          )}
          {resetPasswordResponse && (
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <Button
                scheme={ButtonSchemeEnum.PRIMARY}
                size="large"
                onClick={handleViewLogin}
              >
                Login
              </Button>
            </div>
          )}
        </div>
        {!message && (
          <div className="card__actions">
            <div></div>
            <span className="last">
              <Button
                type="submit"
                scheme={ButtonSchemeEnum.PRIMARY}
                disabled={!isDirty && !loading}
                data-testid="save"
                submitting={loading}
              >
                Save
              </Button>
            </span>
          </div>
        )}
      </form>
    </Card>
  );
}

const PasswordResetNew: React.FC = (): JSX.Element => {
  return (
    <Page title="Set New Password" showHeader={false}>
      <CenterContent>
        <PasswordResetNewForm />
      </CenterContent>
    </Page>
  );
};

export default withChrome(PasswordResetNew);
