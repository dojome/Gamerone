import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { CHECK_PASSWORD_REGEX } from 'utils/constants';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Input from 'components/common/Form/Input';
import { ProfileSettingsRequest } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import { selectUpdateProfileStatus } from 'redux/request-status/selectors';
import Card from 'components/common/Card';
import {
  ERROR_MSG_MIN_LENGTH_8,
  ERROR_MSG_PASSWORD_PATTERN,
} from 'utils/formErrors';
import ToastMessage from 'components/common/ToastMessage';

const ChangePasswordSettings: React.FC = (): JSX.Element => {
  const status = useSelector(selectUpdateProfileStatus);
  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { isDirty } = formState;
  const dispatch = useDispatch();

  const onSubmit = (data: Record<string, any>) => {
    dispatch(SettingsActions.updateProfile(data as ProfileSettingsRequest));
    reset({
      password: '',
      newPassword: '',
    });
  };

  return (
    <Card>
      <h4 className="card__header card__title">Change Password</h4>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <div className="card__content" style={{ paddingTop: 0 }}>
          {status?.isError && (
            <ToastMessage
              type="inline"
              text={status?.error?.message}
              icon="icon-remove-circle"
            />
          )}
          <Input
            type="password"
            name="password"
            label="Current Password"
            inputRef={register({
              required: true,
              minLength: {
                value: 8,
                message: ERROR_MSG_MIN_LENGTH_8,
              },
              pattern: {
                value: CHECK_PASSWORD_REGEX,
                message: ERROR_MSG_PASSWORD_PATTERN,
              },
            })}
            error={errors['password']}
            maxLength={64}
            data-testid="password"
          />
          <Input
            type="password"
            name="newPassword"
            label="New Password"
            inputRef={register({
              required: true,
              minLength: {
                value: 8,
                message: ERROR_MSG_MIN_LENGTH_8,
              },
              pattern: {
                value: CHECK_PASSWORD_REGEX,
                message: ERROR_MSG_PASSWORD_PATTERN,
              },
            })}
            error={errors['newPassword']}
            maxLength={64}
            data-testid="new-password"
          />
        </div>

        <div className="card__actions">
          <div></div>
          <span className="last">
            <Button
              type="submit"
              scheme={ButtonSchemeEnum.PRIMARY}
              disabled={!isDirty}
              submitting={status?.isFetching}
              data-testid="save"
            >
              Save
            </Button>
          </span>
        </div>
      </form>
    </Card>
  );
};

export default ChangePasswordSettings;
