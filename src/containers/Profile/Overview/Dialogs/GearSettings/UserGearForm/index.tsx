import React, { Fragment, useCallback, useMemo, useEffect } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { connect } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import InputSearch from 'components/common/Form/InputSearch';
import ListItem from 'components/common/ListItem';

import { Gear, UserGear, UserGearAddRequest } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import {
  selectUpdateGearStatus,
  selectAddGearStatus,
} from 'redux/request-status/selectors';

import { searchGear } from 'api/profile';
import { RootState } from 'redux/types';
import { compose } from 'redux';
import useUnfurlURL from 'lib/useUnfurlURL';
import { URL_CHECK_REGEX } from 'utils/constants';
import { ERROR_MSG_URL_PATTERN } from 'utils/formErrors';
import debounce from 'lib/debounce';
import { GEAR_LINK_ERROR } from 'utils/messages';
import InputLoading from 'components/common/Form/InputLoading';
import { DialogContent, DialogActions } from 'components/common/Dialog';
import { refineUrlPrefix } from 'utils/url';
import { useDropzone } from 'react-dropzone';
import Image from 'components/common/Image';
import { getFileFromUrl } from 'utils/image';
import FormInput, { SelectOption } from 'components/common/Form/FormInput';

interface GearFormProps {
  userGear: UserGear | undefined;
  gearTypeOptions: SelectOption[];
  onCancel: () => void;
}

export interface UserGearForm {
  gear: string;
  gearTypeId: number | '';
  link: string;
  information: string;
  gearImage: string;
}

function GearForm({
  userGear,
  gearTypeOptions,
  onCancel,
  addStatus,
  updateStatus,
  dispatchAdd,
  dispatchUpdate,
}: GearFormProps & MappedProps) {
  const [unfurledUrls, , doUnfurl, isUnfurling, isUnfurlError] = useUnfurlURL();

  const formMethods = useForm<UserGearForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      gear: userGear?.gear.name || '',
      gearTypeId: userGear?.gear.type.id || '',
      link: userGear?.link || '',
      information: userGear?.information || '',
      gearImage: userGear?.image || '',
    },
  });

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    errors,
    clearErrors,
    // watch,
    control,
  } = formMethods;
  const { isDirty } = formState;

  const gearImage = useWatch<string>({
    control,
    name: 'gearImage',
    defaultValue: userGear?.image || '',
  });

  const gearTypeId = useWatch<number | ''>({
    control,
    name: 'gearTypeId',
    defaultValue: userGear?.gear.type.id || '',
  });

  // Dropzone for store image upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setValue('gearImage', files[0].preview, { shouldValidate: true });
    },
  });

  useEffect(() => {
    if (unfurledUrls.length > 0) {
      setValue('gearImage', unfurledUrls[0].thumbnailUrl, {
        shouldValidate: true,
      });
    }
  }, [unfurledUrls, setValue]);

  useEffect(() => {
    register({ name: 'gearImage' }, { required: true });
  }, [register]);

  useEffect(() => {
    // TODO: Do not reset value manually. Remove setTimeOut
    setTimeout(() => {
      setValue('gearTypeId', userGear?.gear.type.id || '');
    }, 200);
  }, [userGear, setValue]);

  // console.table(
  //   watch(['gearTypeId', 'gear', 'link', 'information', 'gearImage']),
  // );

  const renderGearItem = (gear: Gear, handleSearchResultClick: Function) =>
    // eslint-disable-next-line
    gear.type.id == gearTypeId ? (
      <ListItem
        key={gear.id}
        title={gear.name}
        description={gear.type.name}
        onClick={() => {
          setValue('gear', gear.name);
          if (errors['gear']) clearErrors('gear');

          handleSearchResultClick(gear);
        }}
      />
    ) : (
      <Fragment key={gear.id}></Fragment>
    );

  const debouncedUnfurl = useMemo(
    () => debounce((value) => doUnfurl([value]), 800),
    [doUnfurl],
  );

  const handleLinkChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.persist(); // https://fb.me/react-event-pooling
      debouncedUnfurl(e.target.value);
    },
    [debouncedUnfurl],
  );

  const onSubmit = async (data: Record<string, any>) => {
    const id = userGear?.id;

    const request = {
      gear: data.gear,
      gearTypeId: data.gearTypeId,
      link: data.link ? refineUrlPrefix(data.link) : undefined,
      information: data.information,
      image: await getFileFromUrl(data.gearImage),
    } as UserGearAddRequest;

    if (id) {
      dispatchUpdate(request, id);
    } else {
      dispatchAdd(request);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid="form"
        style={{ display: 'flex', flexDirection: 'column', flex: '1' }}
        autoComplete="off"
      >
        <DialogContent>
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
                      'input' + (errors['gearImage'] ? ' is-error' : ''),
                  })}
                >
                  <input
                    name="gearImage"
                    {...getInputProps()}
                    aria-label="file-upload"
                    data-testid="gearImage"
                  />
                  {gearImage ? (
                    <Image
                      src={gearImage}
                      alt={userGear?.gear.name || 'Gear image'}
                      width={120}
                    />
                  ) : errors['gearImage'] ? (
                    <div className="input-hint" data-testid="gearImage-error">
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
              <FormInput
                type="select"
                name="gearTypeId"
                label="Gear Type"
                validationRules={{
                  required: true,
                }}
                selectOptions={gearTypeOptions}
                disabled={userGear !== undefined}
              />
              <InputSearch<Gear>
                name="gear"
                label="Search / Add Gear"
                register={register}
                validationRules={{
                  required: userGear ? false : true,
                }}
                error={errors['gear']}
                api={searchGear}
                renderItem={renderGearItem}
              />
              <FormInput
                name="link"
                label="Link"
                validationRules={{
                  minLength: 3,
                  maxLength: 255,
                  validate: (v: string) =>
                    !v ||
                    v.match(URL_CHECK_REGEX) !== null ||
                    ERROR_MSG_URL_PATTERN,
                }}
                onChange={handleLinkChange}
                maxLength={255}
                hint={isUnfurlError ? GEAR_LINK_ERROR : ''}
                appendRight={<InputLoading show={isUnfurling} />}
              />
              <FormInput
                name="information"
                label="Information"
                validationRules={{
                  required: false,
                  minLength: 2,
                  maxLength: 100,
                }}
                maxLength={100}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions alignRight={true}>
          <Button onClick={onCancel} data-testid="cancel">
            Cancel
          </Button>
          <Button
            type="submit"
            scheme={ButtonSchemeEnum.PRIMARY}
            disabled={!isDirty || isUnfurling}
            submitting={addStatus?.isFetching || updateStatus?.isFetching}
            iconLeft="icon-keyboard"
            data-testid="save"
          >
            {userGear ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
}

const mapStateToProps = (state: RootState) => ({
  addStatus: selectAddGearStatus(state),
  updateStatus: selectUpdateGearStatus(state),
});

const mapDispatchToProps = {
  dispatchAdd: SettingsActions.addUserGear,
  dispatchUpdate: SettingsActions.updateUserGear,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, React.memo)(GearForm) as React.ElementType;
