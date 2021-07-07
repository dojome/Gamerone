import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import { SponsorRequest, Sponsor } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import {
  selectAddSponsorStatus,
  selectUpdateSponsorStatus,
} from 'redux/request-status/selectors';
import Image from 'components/common/Image';
import Input from 'components/common/Form/Input';
import {
  ERROR_MSG_MIN_LENGTH_3,
  ERROR_MSG_URL_PATTERN,
} from 'utils/formErrors';
import { URL_CHECK_REGEX } from 'utils/constants';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { DialogContent, DialogActions } from 'components/common/Dialog';
import { compose } from 'redux';
import { RootState } from 'redux/types';
import { getFileFromUrl } from 'utils/image';
import ToastMessage from 'components/common/ToastMessage';

interface SponsorFormProps {
  sponsor: Sponsor | undefined;
  onCancel: () => void;
}

const SponsorForm: React.FC<SponsorFormProps & MappedProps> = ({
  sponsor,
  onCancel,
  addStatus,
  updateStatus,
  dispatchAdd,
  dispatchUpdate,
}: SponsorFormProps & MappedProps): JSX.Element => {
  const [currentSponsor, setCurrentSponsor] = useState<Sponsor | undefined>(
    sponsor,
  );
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>();

  const {
    register,
    handleSubmit,
    formState,
    errors,
    setValue,
    clearErrors,
    reset,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { isDirty } = formState;

  // Dropzone for sponsor image upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      setUploadedAvatar(files[0].preview);
    },
  });

  const resetFormData = useCallback(
    (sponsorName = '', sponsorUrl = '', sponsorImage = '') => {
      reset({
        sponsorName,
        sponsorUrl,
        sponsorImage,
      });
    },
    [reset],
  );

  useEffect(() => {
    register({ name: 'sponsorImage' }, { required: true });
  }, [register]);

  useEffect(() => {
    setValue('sponsorImage', uploadedAvatar);
    if (uploadedAvatar) clearErrors('sponsorImage');
  }, [uploadedAvatar, setValue, clearErrors]);

  useEffect(() => {
    if (currentSponsor) {
      setUploadedAvatar(currentSponsor.image);
      resetFormData(currentSponsor?.name, currentSponsor?.link);
    } else {
      resetFormData();
    }
  }, [currentSponsor, resetFormData]);

  const handleClose = useCallback(() => {
    resetFormData();
    setUploadedAvatar(null);
    setCurrentSponsor(undefined);
    onCancel();
  }, [setUploadedAvatar, setCurrentSponsor, resetFormData, onCancel]);

  const onSubmit = async (
    data: Record<string, any>,
    id: number | undefined,
  ) => {
    if (!uploadedAvatar) return;

    const request = {
      name: data.sponsorName,
      link: data.sponsorUrl,
      image: await getFileFromUrl(uploadedAvatar),
    } as SponsorRequest;

    if (id) {
      dispatchUpdate(request, id);
    } else {
      dispatchAdd(request);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit(e, currentSponsor?.id))}
      data-testid="form"
      style={{ display: 'flex', flexDirection: 'column', flex: '1' }}
    >
      <DialogContent>
        {addStatus?.isError && (
          <ToastMessage
            type="inline"
            text={addStatus?.error?.message}
            icon="icon-remove-circle"
          />
        )}
        <div style={{ display: 'flex' }}>
          <div>
            <div className="input-wrapper input-dropzone">
              <div
                style={{
                  width: '12rem',
                  height: '7.5rem',
                  textAlign: 'center',
                }}
                {...getRootProps({
                  className:
                    'input' + (errors['sponsorImage'] ? ' is-error' : ''),
                })}
              >
                <input
                  name="sponsorImage"
                  {...getInputProps()}
                  aria-label="file-upload"
                  data-testid="sponsorImage"
                />
                {uploadedAvatar ? (
                  <Image
                    src={uploadedAvatar}
                    alt={currentSponsor?.name || 'Sponsor image'}
                    width={120}
                  />
                ) : errors['sponsorImage'] ? (
                  <div className="input-hint" data-testid="sponsorImage-error">
                    Image is required.
                  </div>
                ) : (
                  <p
                    style={{
                      paddingTop: '0.75rem',
                      fontSize: '80%',
                      opacity: '0.3',
                      textAlign: 'center',
                    }}
                  >
                    {isDragActive ? (
                      <>Drop your avatar here ...</>
                    ) : (
                      <>
                        Drag &amp; drop or <br />
                        click to select files.
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, marginLeft: '1.5rem' }}>
            <Input
              name="sponsorName"
              label="Name"
              inputRef={register({
                required: true,
                minLength: {
                  value: 3,
                  message: ERROR_MSG_MIN_LENGTH_3,
                },
                maxLength: 50,
              })}
              error={errors['sponsorName']}
              maxLength={50}
            />
            <Input
              name="sponsorUrl"
              label="Website URL"
              inputRef={register({
                maxLength: 255,
                validate: (v: string) =>
                  !v ||
                  v.match(URL_CHECK_REGEX) !== null ||
                  ERROR_MSG_URL_PATTERN,
              })}
              maxLength={255}
              error={errors['sponsorUrl']}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions alignRight={true}>
        <Button onClick={handleClose} data-testid="cancel">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isDirty}
          scheme={ButtonSchemeEnum.PRIMARY}
          submitting={addStatus?.isFetching || updateStatus?.isFetching}
          iconLeft="icon-monetization-sponsor"
          data-testid="save"
        >
          {currentSponsor ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  addStatus: selectAddSponsorStatus(state),
  updateStatus: selectUpdateSponsorStatus(state),
});

const mapDispatchToProps = {
  dispatchAdd: SettingsActions.addSponsor,
  dispatchUpdate: SettingsActions.updateSponsor,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(SponsorForm) as React.ElementType;
