import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { selectSettingsProfileUser } from 'redux/settings/selectors';
import { selectIsUpdatingUserSettings } from 'redux/request-status/selectors';
import SettingsActions from 'redux/settings/actions';
import DialogActions from 'redux/dialogs/actions';
import RequestStatusActions from 'redux/request-status/actions';
import { UPDATE_PROFILE_REQUEST } from 'redux/settings/types';
import * as AuthApi from 'api/auth';
import debounce from 'lib/debounce';
import useSingleParamApi from 'lib/useSingleParamApi';
import {
  CHECK_EMAIL_REGEX,
  URL_CHECK_REGEX,
  COVER_PLACEHOLDER,
  AVATAR_PLACEHOLDER,
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
} from 'utils/constants';
import { ProfileSettingsRequest } from 'interfaces';
import { ErrorTypeEnum } from 'models/error';
import InputLoading from 'components/common/Form/InputLoading';
import {
  ERROR_MSG_URL_PATTERN,
  ERROR_MSG_EMAIL_PATTERN,
  ERROR_MSG_MIN_LENGTH_3,
  ERROR_MSG_USERNAME_DUPLICATE,
  ERROR_MSG_EMAIL_DUPLICATE,
} from 'utils/formErrors';
import Dialog, { DialogContent } from 'components/common/Dialog';
import FormInput from 'components/common/Form/FormInput';
import Avatar from 'components/common/Avatar';
import Image from 'components/common/Image';
import './style.scss';
import FormImage from 'components/common/Form/FormImage';
import { DialogTypeEnum } from 'redux/dialogs/types';

export interface EditProfileDialogProps {
  visible?: boolean;
  onClose: () => void;
}

export interface ProfileForm {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  location: string;
  birthDate: string;
  websiteUrl: string;
  avatar: string;
  banner: string;
  bio: string;
}

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  visible = false,
  onClose,
}: EditProfileDialogProps): JSX.Element => {
  const user = useSelector(selectSettingsProfileUser);
  const isUpdating = useSelector(selectIsUpdatingUserSettings);
  const updateStarted = React.useRef(false);
  const dispatch = useDispatch();

  const formMethods = useForm<ProfileForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const {
    handleSubmit,
    errors,
    reset,
    setError,
    clearErrors,
    formState,
  } = formMethods;

  const { isDirty, isValid } = formState;
  const [
    {
      resolved: checkEmailResolved,
      error: checkEmailError,
      loading: emailChecking,
    },
    doCheckEmail,
  ] = useSingleParamApi(AuthApi.checkEmail);

  const [
    {
      resolved: checkUsernameResolved,
      error: checkUsernameError,
      loading: usernameChecking,
    },
    doCheckUsername,
  ] = useSingleParamApi(AuthApi.checkUsername);

  useEffect(() => {
    return () => {
      dispatch(RequestStatusActions.cleanStatus(UPDATE_PROFILE_REQUEST));
    };
  }, [dispatch]);

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

  const onSubmit = (data: ProfileForm) => {
    const { avatar: formAvatar, banner: formBanner, ...restData } = data;

    updateStarted.current = true;

    if (formAvatar !== user.avatar) {
      if (formAvatar === AVATAR_PLACEHOLDER)
        dispatch(SettingsActions.deleteAvatar());
      else dispatch(SettingsActions.uploadAvatar(formAvatar));
    }
    if (formBanner !== user.banner) {
      if (formBanner === COVER_PLACEHOLDER)
        dispatch(SettingsActions.deleteBanner());
      else dispatch(SettingsActions.uploadBanner(formBanner));
    }

    // TODO: Check data is actually updated
    dispatch(SettingsActions.updateProfile(restData as ProfileSettingsRequest));
  };

  const handleEmailChange = debounce((email) => {
    if (!email.match(CHECK_EMAIL_REGEX)) return;
    if (email === user.email) return;
    if (!errors.email || errors.email.type === ErrorTypeEnum.Validate) {
      doCheckEmail(email);
    }
  }, 800);

  const handleUsernameChange = debounce((username) => {
    if (username === user.username) return;
    if (!errors.username || errors.username.type === ErrorTypeEnum.Validate) {
      doCheckUsername(username);
    }
  }, 800);

  // Reset form
  useEffect(() => {
    reset({
      username: user.username || '',
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      location: user.location || '',
      birthDate: user.birthDate || '',
      websiteUrl: user.websiteUrl || '',
      bio: user.bio || '',
      avatar: user.avatar,
      banner: user.banner || COVER_PLACEHOLDER,
    });
  }, [reset, user]);

  // Hide this dialog update call finishes
  useEffect(() => {
    if (!isUpdating && updateStarted.current) {
      updateStarted.current = false;
      dispatch(DialogActions.showDialog(DialogTypeEnum.SETTINGS_USER, false));
    }
  }, [dispatch, isUpdating]);

  return (
    <Dialog
      title="Edit profile info"
      testid="edit-profile"
      show={visible}
      onClose={onClose}
    >
      <DialogContent>
        {/* <DevTool control={control} /> */}
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            data-testid="form"
            style={{ display: 'flex', flexDirection: 'column', flex: '1' }}
            autoComplete="off"
          >
            <div className="edit-profile-wrapper">
              <div style={{ marginRight: '2rem' }}>
                <label>Profile picture</label>
                <FormImage
                  needEdit
                  name="avatar"
                  testid="avatar"
                  editInfo={{
                    width: AVATAR_WIDTH / 2,
                    height: AVATAR_HEIGHT / 2,
                    borderRadius: 50,
                  }}
                  src={user.avatar}
                  defaultSrc={AVATAR_PLACEHOLDER}
                  withinInputWrapper={false}
                  showRemoveButton={true}
                  showEditButton={false}
                >
                  {({ src }) => (
                    <Avatar src={src} size="huge" alt={user.username} />
                  )}
                </FormImage>
              </div>

              <div style={{ width: '100%' }}>
                <label>Cover image</label>
                <div className="banner">
                  <FormImage
                    needEdit
                    name="banner"
                    testid="banner"
                    editInfo={{
                      width: 533,
                      height: 133,
                      borderRadius: 0,
                    }}
                    withinInputWrapper={false}
                    src={user.banner || COVER_PLACEHOLDER}
                    defaultSrc={COVER_PLACEHOLDER}
                    showRemoveButton={true}
                  >
                    {({ src }) => (
                      <Image
                        src={src}
                        width={465}
                        height={116}
                        alt={`Cover image for ${user.username}`}
                      />
                    )}
                  </FormImage>
                </div>
              </div>
            </div>

            <div className="content--2-col">
              <FormInput
                name="username"
                label="Username"
                validationRules={{
                  required: true,
                  minLength: {
                    value: 3,
                    message: ERROR_MSG_MIN_LENGTH_3,
                  },
                  validate: () =>
                    checkUsernameError === null || ERROR_MSG_USERNAME_DUPLICATE,
                }}
                onChange={(e) => handleUsernameChange(e.target.value)}
                appendRight={<InputLoading show={usernameChecking} />}
                maxLength={30}
              />
              <FormInput
                name="email"
                label="Email"
                validationRules={{
                  required: true,
                  pattern: {
                    value: CHECK_EMAIL_REGEX,
                    message: ERROR_MSG_EMAIL_PATTERN,
                  },
                  validate: () =>
                    checkEmailError === null || ERROR_MSG_EMAIL_DUPLICATE,
                }}
                onChange={(e) => handleEmailChange(e.target.value)}
                maxLength={254}
                appendRight={<InputLoading show={emailChecking} />}
              />

              <FormInput
                name="firstName"
                label="First Name"
                validationRules={{ required: true, minLength: 2 }}
                maxLength={50}
              />
              <FormInput
                name="lastName"
                label="Last Name"
                validationRules={{ required: true, minLength: 2 }}
                maxLength={50}
              />
              <FormInput
                name="location"
                label="Location"
                validationRules={{
                  required: false,
                  minLength: 2,
                  maxLength: 100,
                }}
                maxLength={100}
              />
              <FormInput
                name="birthDate"
                label="Birth date"
                type="date"
                hint="format: YYYY-MM-DD"
                dateMax={new Date().toISOString().split('T')[0]}
              />

              <FormInput
                name="websiteUrl"
                label="Website URL"
                validationRules={{
                  minLength: 3,
                  maxLength: 100,
                  validate: (v: string) =>
                    !v ||
                    v.match(URL_CHECK_REGEX) !== null ||
                    ERROR_MSG_URL_PATTERN,
                }}
                maxLength={100}
              />
            </div>

            <FormInput type="textarea" name="bio" label="Bio" maxLength={116} />

            <div
              className="dialog__actions"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                boxShadow: 'none',
                borderTop: 'none',
                marginTop: 0,
              }}
            >
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="submit"
                scheme={ButtonSchemeEnum.PRIMARY}
                disabled={!isDirty || !isValid}
                submitting={isUpdating}
                data-testid="save"
              >
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
