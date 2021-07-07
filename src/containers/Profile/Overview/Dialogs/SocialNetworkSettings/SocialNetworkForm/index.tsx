import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { connect } from 'react-redux';

import { SocialNetwork, SocialNetworkRequest } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import FormInput, { SelectOption } from 'components/common/Form/FormInput';
import Button, { ButtonSchemeEnum } from 'components/common/Button';
import { selectAddUpdateSocialStatus } from 'redux/request-status/selectors';
import { ERROR_MSG_MIN_LENGTH_3 } from 'utils/formErrors';
import { DialogContent, DialogActions } from 'components/common/Dialog';
import { RootState } from 'redux/types';
import { compose } from 'redux';

interface SocialNetworkFormProps {
  currentSocialNetwork: SocialNetwork | undefined;
  socialNetworks: SocialNetwork[];
  socialNetworkRefData: SocialNetwork[];
  onCancel: () => void;
}
const SocialNetworkForm: React.FC<SocialNetworkFormProps & MappedProps> = ({
  currentSocialNetwork,
  socialNetworks,
  socialNetworkRefData,
  onCancel,
  addUpdateStatus,
  dispatchAddUpdate,
}: SocialNetworkFormProps & MappedProps): JSX.Element => {
  const formMethods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { formState, setValue, reset, handleSubmit } = formMethods;
  const { isDirty } = formState;
  const [isAdding] = useState(currentSocialNetwork === undefined);

  // const socialNetworkRefData = useSocialNetworks();

  const [
    socialNetworkFilteredOptions,
    setSocialNetworkFilteredOptions,
  ] = useState<SelectOption[]>([]);

  const [socialNetworkOptions, setSocialNetworkOptions] = useState<
    SelectOption[]
  >([]);

  useEffect(() => {
    if (socialNetworkRefData !== undefined) {
      const allSocialNetworks = socialNetworkRefData.map(
        (item: SocialNetwork) =>
          ({
            label: item.name,
            value: item.id,
          } as SelectOption),
      );
      setSocialNetworkOptions(allSocialNetworks);

      const currentSocialNetworkIds = socialNetworks.map(
        (n: SocialNetwork) => n.id,
      );

      const filteredOptions: SelectOption[] = socialNetworkRefData
        .filter((sn: SocialNetwork) => !currentSocialNetworkIds.includes(sn.id))
        .map(
          (item: SocialNetwork) =>
            ({
              label: item.name,
              value: item.id,
            } as SelectOption),
        );
      setSocialNetworkFilteredOptions(filteredOptions);
    }
  }, [socialNetworkRefData, socialNetworks]);

  useEffect(() => {
    if (currentSocialNetwork) {
      const formData = {
        socialNetworkId: currentSocialNetwork.id,
        url: currentSocialNetwork.value,
      };
      reset(formData);
    } else {
      const formData = {
        url: '',
      };
      reset(formData);
    }
  }, [currentSocialNetwork, reset]);

  useEffect(() => {
    // TODO: Do not reset value manually. Remove setTimeOut
    setTimeout(() => {
      setValue('socialNetworkId', currentSocialNetwork?.id.toString() || '');
    }, 200);
  }, [currentSocialNetwork, setValue]);

  const onSubmit = (data: Record<string, any>) => {
    const social = {
      socialNetworkId:
        data.socialNetworkId ||
        (currentSocialNetwork && currentSocialNetwork?.id),
      url: data.url,
    } as SocialNetworkRequest;
    dispatchAddUpdate(social);
    onCancel();
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <DialogContent>
          <FormInput
            type="select"
            name="socialNetworkId"
            label="Social Network"
            validationRules={{ required: true }}
            selectOptions={
              currentSocialNetwork
                ? socialNetworkOptions
                : socialNetworkFilteredOptions
            }
            disabled={currentSocialNetwork !== undefined}
          />
          <FormInput
            name="url"
            label="Username or Path"
            validationRules={{
              required: true,
              minLength: { value: 3, message: ERROR_MSG_MIN_LENGTH_3 },
            }}
            maxLength={100}
            hint="Username or handle only. e.g WeAreGamerOne"
          />
        </DialogContent>
        <DialogActions alignRight={true}>
          <Button onClick={onCancel} data-testid="cancel">
            Cancel
          </Button>
          <Button
            type="submit"
            scheme={ButtonSchemeEnum.PRIMARY}
            submitting={addUpdateStatus?.isFetching}
            disabled={!isDirty || addUpdateStatus?.isFetching}
            data-testid="save"
          >
            {!isAdding ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
};

const mapStateToProps = (state: RootState) => ({
  addUpdateStatus: selectAddUpdateSocialStatus(state),
});

const mapDispatchToProps = {
  dispatchAddUpdate: SettingsActions.addUpdateSocial,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(SocialNetworkForm) as React.ElementType;
