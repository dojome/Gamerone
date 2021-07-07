import React, { useState, useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import EditImage from 'components/common/EditImage';
import { useDropzone } from 'react-dropzone';
import Button, {
  ButtonSchemeEnum,
  ButtonSizeEnum,
} from 'components/common/Button';

import { selectCurrentUser } from 'redux/auth/selectors';
import { selectUploadAvatarStatus } from 'redux/request-status/selectors';
import SettingsActions from 'redux/settings/actions';
import RequestStatusActions from 'redux/request-status/actions';

import {
  AVATAR_WIDTH,
  AVATAR_HEIGHT,
  AVATAR_PLACEHOLDER,
} from 'utils/constants';
import { RootState } from 'redux/types';

import { UPLOAD_AVATAR_REQUEST } from 'redux/settings/types';
import Card, { CardTypeEnum } from 'components/common/Card';
import Image from 'components/common/Image';
import Page from 'components/layout/Page';
import CenterContent from 'components/layout/CenterContent';
import ToastMessage from 'components/common/ToastMessage';

function UploadAvatar({
  user,
  status,
  dispatchCleanForm,
  dispatchUploadAvatar,
}: MappedProps) {
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const { username, avatar } = user;
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(
    user.avatar,
  );
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setEditing(true);
      setUploadedAvatar(files[0].preview);
    },
  });

  useEffect(() => {
    setUploadedAvatar(user.avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    return () => {
      dispatchCleanForm();
    };
  }, [dispatchCleanForm]);

  const handleCancel = () => {
    setUploadedAvatar(avatar);
    setEditing(false);
  };

  const handleApply = (blobUrl: string) => {
    setUploadedAvatar(blobUrl);
    setEditing(false);
  };

  const handleUpload = (e: any) => {
    e.preventDefault();

    if (uploadedAvatar) dispatchUploadAvatar(uploadedAvatar);
  };

  const handleSkip = () => {
    history.push('/');
  };

  return (
    <Page title="Upload your avatar" showHeader={false}>
      <CenterContent>
        <Card type={CardTypeEnum.NARROW}>
          <div className="card__header" style={{ textAlign: 'center' }}>
            <h3
              style={{
                fontWeight: 'normal',
                fontSize: '1.25rem',
                color: '#4D5A80',
              }}
            >
              Get started
            </h3>
            <h1 style={{ fontWeight: 500, fontSize: '1.5rem' }}>
              Welcome to Gamer One!
            </h1>
          </div>
          <div className="card__content">
            {status?.isError && (
              <ToastMessage
                type="inline"
                text="Something went wrong. Please try again or skip."
                icon="icon-remove-circle"
              />
            )}
            <p style={{ paddingBottom: '0.8rem' }}>
              Let&apos;s start by adding an avatar to your account:
            </p>
            <form data-testid="form">
              <div>
                <div
                  {...getRootProps({
                    className: 'input-wrapper input-dropzone',
                  })}
                  style={{ textAlign: 'center' }}
                >
                  <input
                    name="avatar"
                    {...getInputProps()}
                    aria-label="file-upload"
                    data-testid="avatar"
                  />
                  <Image
                    src={uploadedAvatar || AVATAR_PLACEHOLDER}
                    alt={username}
                    style={{
                      borderRadius: '3rem',
                      maxWidth: 120,
                      maxHeight: 120,
                    }}
                    width={120}
                    useCdn={
                      uploadedAvatar != null &&
                      uploadedAvatar.startsWith('blob:')
                        ? false
                        : true
                    }
                  />
                  {/* <p
                    style={{
                      paddingTop: '0.75rem',
                      fontSize: '80%',
                      opacity: '0.5',
                    }}
                  >
                    {isDragActive ? (
                      <>Drop your avatar here ...</>
                    ) : (
                      <>
                        Drag &amp; drop your avatar here, or click to select
                        files.
                      </>
                    )}
                  </p> */}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                {uploadedAvatar != null &&
                uploadedAvatar.startsWith('blob:') ? (
                  <Button
                    size={ButtonSizeEnum.LARGE}
                    iconLeft={'icon-image-file-edit'}
                    onClick={open}
                  >
                    Change image
                  </Button>
                ) : (
                  <Button
                    scheme={ButtonSchemeEnum.PRIMARY}
                    size={ButtonSizeEnum.LARGE}
                    iconLeft={'icon-image-file-add'}
                    onClick={open}
                  >
                    Add image
                  </Button>
                )}
              </div>
              {uploadedAvatar && (
                <EditImage
                  image={uploadedAvatar}
                  visible={editing}
                  title="Edit avatar"
                  onCancel={handleCancel}
                  onApply={handleApply}
                  width={AVATAR_WIDTH}
                  height={AVATAR_HEIGHT}
                  borderRadius={AVATAR_WIDTH / 2}
                />
              )}
            </form>
          </div>
          <div className="card__actions">
            <Button
              scheme={ButtonSchemeEnum.SUBTLE}
              size={ButtonSizeEnum.SMALL}
              onClick={handleSkip}
            >
              Skip the step
            </Button>
            <span className="last">
              <Button
                scheme={ButtonSchemeEnum.PRIMARY}
                size={ButtonSizeEnum.LARGE}
                onClick={handleUpload}
                submitting={status?.isFetching}
                disabled={avatar === uploadedAvatar}
              >
                Finish
              </Button>
            </span>
          </div>
        </Card>
      </CenterContent>
    </Page>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    user: selectCurrentUser(state),
    status: selectUploadAvatarStatus(state),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    dispatchUploadAvatar: (f: string) =>
      dispatch(SettingsActions.uploadAvatar(f)),
    dispatchCleanForm: () =>
      dispatch(RequestStatusActions.cleanStatus(UPLOAD_AVATAR_REQUEST)),
  };
}

type MappedProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);
