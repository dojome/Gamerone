import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { useForm, useWatch } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import Button, {
  ButtonSchemeEnum,
  ButtonSizeEnum,
} from 'components/common/Button';
import Dialog, { DialogContent, DialogActions } from 'components/common/Dialog';
import Badge from 'components/common/Badge';
import Icon from 'components/common/Icon';
import Input from 'components/common/Form/Input';
import InputLoading from 'components/common/Form/InputLoading';
import DiscoverGames from 'components/common/DiscoverGames';
import NewPostImageContainer from 'containers/Post/NewPostImageContainer';

import { RootState } from 'redux/types';
import {
  selectPostFormImageUploadStatus,
  selectPostFormStatus,
} from 'redux/request-status/selectors';
import PostActions from 'redux/post/actions';
import PostFormActions from 'redux/post-form/actions';
import RequestStatusActions from 'redux/request-status/actions';
import { Game, VisibilityEnum } from 'interfaces';
import {
  selectImagePaths,
  selectPostFormTitle,
} from 'redux/post-form/selectors';
import { ADD_POST_REQUEST } from 'redux/post/types';
import { UPLOAD_IMAGE_REQUEST } from 'redux/post-form/types';
import { selectUserPrivacy } from 'redux/settings/selectors';

import { MULTI_URL_CHECK_REGEX, GAME_PLACEHOLDER } from 'utils/constants';
import useUnfurlURL from 'lib/useUnfurlURL';
import { POST_LINK_ERROR } from 'utils/messages';
import Dropdown, { DropdownOption } from 'components/common/Dropdown';
import { capFLetter } from 'utils/caseConversion';
import Tooltip from 'components/common/Tooltip';
import DataItem from 'components/common/DataItem';

export interface NewPostDialogProps {
  isOpen?: boolean;
  handleClose: () => void;
}

function NewPostDialog({
  isOpen,
  handleClose,
  privacy,
  imagePaths,
  formStatus,
  title,
  imageUploadStatus,
  dispatchAddPost,
  dispatchAddImage,
  dispatchInitForm,
  dispatchSaveTitle,
  dispatchCleanStatus,
}: NewPostDialogProps & MappedProps) {
  const [discoverGamesIsOpen, showDiscoverGames] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [privacyLevel, setPrivacyLevel] = useState('public');
  const [games, setGames] = useState<Game[]>([]);
  const { register, handleSubmit, errors, formState, reset, control } = useForm(
    {
      mode: 'onBlur',
      reValidateMode: 'onChange',
    },
  );
  const { isValid } = formState;
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) =>
        dispatchAddImage(URL.createObjectURL(file)),
      );
    },
  });
  const [
    unfurledUrls,
    parsedUrls,
    doUnfurl,
    isLoading,
    isUnfurlError,
  ] = useUnfurlURL();

  const onSubmit = (data: Record<string, any>) => {
    dispatchAddPost({
      title: data.title,
      privacy: privacyLevel,
      commentsEnabled,
      gameIds: games.map((g) => g.id),
      images: Object.keys(imagePaths)
        .map((k) => imagePaths[parseInt(k, 10)].file)
        .filter((f) => f !== undefined) as string[],
    });
  };

  const handleDiscoverFinish = useCallback((games: Game[]) => {
    setGames(games);
    showDiscoverGames(false);
  }, []);

  const handleDiscoverCancel = useCallback(() => {
    showDiscoverGames(false);
  }, []);

  const handleToggleComments = useCallback(() => {
    setCommentsEnabled(!commentsEnabled);
  }, [commentsEnabled]);

  useEffect(() => {
    return () => {
      dispatchInitForm();
      dispatchCleanStatus(ADD_POST_REQUEST);
      dispatchCleanStatus(UPLOAD_IMAGE_REQUEST);
    };
  }, [dispatchInitForm, dispatchCleanStatus]);

  useEffect(() => {
    if (!formStatus?.isSuccess) {
      reset({
        title: '',
      });
      setGames([]);
      doUnfurl([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formStatus?.isFetching, formStatus?.isError, reset]);

  useEffect(() => {
    setPrivacyLevel(privacy.postVisibility || 'public');
  }, [privacy.postVisibility]);

  useEffect(() => {
    for (const url of unfurledUrls) {
      dispatchAddImage(url.thumbnailUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unfurledUrls]);

  const handleSetPrivacy = useCallback((o: DropdownOption) => {
    setPrivacyLevel(o.label.toLowerCase());
  }, []);

  const VISIBILITY_OPTIONS_DROPDOWN: DropdownOption[] = useMemo(
    () => [
      {
        label: capFLetter(VisibilityEnum.Private),
        onClick: handleSetPrivacy,
      },
      {
        label: capFLetter(VisibilityEnum.Public),
        onClick: handleSetPrivacy,
      },
      {
        label: capFLetter(VisibilityEnum.Followers),
        onClick: handleSetPrivacy,
      },
      {
        label: capFLetter(VisibilityEnum.Friends),
        onClick: handleSetPrivacy,
      },
      {
        label: capFLetter(VisibilityEnum.Squad),
        onClick: handleSetPrivacy,
      },
    ],
    [handleSetPrivacy],
  );

  const inputTitle = useWatch({
    control,
    name: 'title',
    defaultValue: title,
  });

  React.useEffect(() => {
    const urls = inputTitle.match(MULTI_URL_CHECK_REGEX);

    if (urls && parsedUrls.join() !== urls.join()) doUnfurl(urls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTitle]);

  React.useEffect(() => {
    if (discoverGamesIsOpen) {
      dispatchSaveTitle(inputTitle);
    } else {
      reset({ title });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoverGamesIsOpen]);

  return (
    <>
      {discoverGamesIsOpen ? (
        <DiscoverGames
          initGames={games}
          show={discoverGamesIsOpen}
          onFinish={handleDiscoverFinish}
          onCancel={handleDiscoverCancel}
        />
      ) : (
        <Dialog
          title="New Post"
          testid="new-post"
          show={isOpen}
          // method="visibility"
          onClose={handleClose}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <Input
              type="textarea"
              name="title"
              textareaRef={register({
                required: true,
                minLength: 1,
                maxLength: 500,
              })}
              error={errors['title']}
              hint={isUnfurlError ? POST_LINK_ERROR : ''}
              appendRight={<InputLoading show={isLoading} />}
              maxLength={500}
            />

            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'stretch',
              }}
            >
              <NewPostImageContainer />
              <div
                {...getRootProps({
                  className: 'pointer',
                })}
              >
                <input {...getInputProps()} aria-label="file-upload" />
                <Button iconLeft="icon-image-file-add">Add images</Button>
              </div>

              <Button
                iconLeft="icon-video-game-controller"
                onClick={() => showDiscoverGames(true)}
              >
                Tag game
              </Button>
            </div>

            <div className="post__games">
              {games.map((game) => (
                <DataItem
                  key={game.id}
                  badgeSize="tiny"
                  label={game.name}
                  imageSrc={game.cover || GAME_PLACEHOLDER}
                />
              ))}
            </div>
          </DialogContent>

          <DialogActions>
            <Dropdown options={VISIBILITY_OPTIONS_DROPDOWN}>
              <Tooltip text={`Post visible to ${capFLetter(privacyLevel)}`}>
                <Badge size="medium" type="flat-dark" testid="privacy-badge">
                  {
                    {
                      private: (
                        <Icon name={'icon-video-games-discord'} size="125x" />
                      ),
                      public: <Icon name={'icon-network-arrow'} size="125x" />,
                      followers: (
                        <Icon name={'icon-user-network'} size="125x" />
                      ),
                      friends: (
                        <Icon name={'icon-information-circle'} size="125x" />
                      ),
                      squad: (
                        <Icon name={'icon-social-media-snapchat'} size="125x" />
                      ),
                    }[privacyLevel]
                  }
                </Badge>
              </Tooltip>
            </Dropdown>
            <Tooltip text={commentsEnabled ? 'Comments on' : 'Comments off'}>
              <Badge
                size="medium"
                type="flat-dark"
                onClick={handleToggleComments}
                testid="comments-badge"
              >
                {commentsEnabled ? (
                  <Icon name={'icon-messages-bubble-square'} size="125x" />
                ) : (
                  <Icon
                    name={'icon-messages-bubble-square-disable'}
                    size="125x"
                  />
                )}
              </Badge>
            </Tooltip>

            <span className="last">
              <Button
                type="submit"
                iconLeft="icon-pencil-write-2"
                size={ButtonSizeEnum.LARGE}
                scheme={ButtonSchemeEnum.PRIMARY}
                disabled={
                  !inputTitle || !isValid || imageUploadStatus?.isFetching
                }
                submitting={
                  formStatus?.isFetching || imageUploadStatus?.isFetching
                }
              >
                Post
              </Button>
            </span>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  title: selectPostFormTitle(state),
  formStatus: selectPostFormStatus(state),
  privacy: selectUserPrivacy(state),
  imagePaths: selectImagePaths(state),
  imageUploadStatus: selectPostFormImageUploadStatus(state),
});

const mapDispatchToProps = {
  dispatchAddPost: PostActions.addNewPost,
  dispatchAddImage: PostFormActions.addImage,
  dispatchInitForm: PostFormActions.initForm,
  dispatchSaveTitle: PostFormActions.saveTitle,
  dispatchCleanStatus: RequestStatusActions.cleanStatus,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(NewPostDialog) as React.ElementType;
