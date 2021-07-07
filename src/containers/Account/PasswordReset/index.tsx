import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import useSingleParamApi from 'lib/useSingleParamApi';
import * as AccountApi from 'api/account';
import { CHECK_EMAIL_REGEX } from 'utils/constants';
import { ForgotPasswordRequest, Nullable } from 'interfaces';
import Input from 'components/common/Form/Input';
import Card, { CardTypeEnum } from 'components/common/Card';
import { ERROR_MSG_EMAIL_PATTERN } from 'utils/formErrors';
import CenterContent from 'components/layout/CenterContent';
import Page from 'components/layout/Page';
import { useHistory } from 'react-router-dom';
import CallToActionCard from 'containers/Cards/CallToActionCard';
import withChrome from 'components/common/Chrome/withChrome';
import ToastMessage from 'components/common/ToastMessage';

function PasswordResetForm() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { isDirty } = formState;
  const [message, setMessage] = useState<Nullable<string>>(null);
  const [
    { resolved: forgotPasswordResponse, error: forgotPasswordError, loading },
    doForgotPassword,
  ] = useSingleParamApi<ForgotPasswordRequest>(AccountApi.forgotPassword);

  const onSubmit = (data: Record<string, any>) => {
    doForgotPassword(data as ForgotPasswordRequest);
  };

  useEffect(() => {
    if (forgotPasswordError || forgotPasswordResponse) {
      setMessage(
        'If the email exists in Gamer One you will receive an email shortly.',
      );
    } else {
      setMessage(null);
    }
  }, [forgotPasswordResponse, forgotPasswordError]);

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
          We&apos;ve got your back.
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <div className="card__content">
          {message && (
            <ToastMessage
              type="inline"
              text={message}
              icon={
                forgotPasswordError
                  ? 'icon-remove-circle'
                  : 'icon-information-circle'
              }
            />
          )}
          {!message && (
            <Input
              name="email"
              label="Email"
              inputRef={register({
                required: true,
                pattern: {
                  value: CHECK_EMAIL_REGEX,
                  message: ERROR_MSG_EMAIL_PATTERN,
                },
              })}
              error={errors['email']}
              data-testid="email"
            />
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
                data-testid="reset"
                submitting={loading}
              >
                Reset
              </Button>
            </span>
          </div>
        )}
      </form>
    </Card>
  );
}

const PasswordReset: React.FC = (): JSX.Element => {
  const history = useHistory();

  const handleSignup = () => {
    history.push('/signup');
  };

  return (
    <Page title="Forgot Password" showHeader={false}>
      <CenterContent>
        <PasswordResetForm />
        <CallToActionCard
          title="No account yet?"
          description="Don’t miss out on your username!"
          buttonText="Register"
          onClick={handleSignup}
        />
      </CenterContent>
    </Page>
  );
};

export default withChrome(PasswordReset);
