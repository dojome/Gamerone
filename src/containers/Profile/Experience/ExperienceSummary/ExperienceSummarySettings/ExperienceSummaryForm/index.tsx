import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { connect } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';

import SettingsActions from 'redux/settings/actions';

import { DialogContent, DialogActions } from 'components/common/Dialog';
import FormInput from 'components/common/Form/FormInput';
import { RootState } from 'redux/types';
import { compose } from 'redux';
import { UserExperienceSummary } from 'interfaces/userExperienceSummary';
import {
  selectUpdateUserAttributesStatus,
  selectDeleteUserAttributesStatus,
} from 'redux/request-status/selectors';
import { UserAttributes } from 'interfaces/userAttributes';

interface ExperienceSummaryFormProps {
  currentSummary: string | null;
  currentUserAttributes: UserAttributes;
  onCancel: () => void;
}

export interface ExperienceSummaryForm {
  experienceSummary: string;
}

const ExperienceSummaryForm: React.FC<
  ExperienceSummaryFormProps & MappedProps
> = ({
  currentSummary,
  currentUserAttributes,
  onCancel,
  updateStatus,
  deleteStatus,
  dispatchUpdate,
  dispatchDelete,
}: ExperienceSummaryFormProps & MappedProps): JSX.Element => {
  const formMethods = useForm<ExperienceSummaryForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      experienceSummary: currentSummary || '',
    },
  });

  const { handleSubmit, formState } = formMethods;

  const { isDirty } = formState;

  const onSubmit = async (data: Record<string, any>) => {
    const request = {
      experienceSummary: data.experienceSummary,
    } as UserExperienceSummary;
    dispatchUpdate(request, currentUserAttributes);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatchDelete(currentUserAttributes);
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit((e) => onSubmit(e))}
        data-testid="form"
        autoComplete="off"
      >
        <DialogContent>
          <FormInput
            type="textarea"
            name="experienceSummary"
            label="Experience Summary"
            maxLength={750}
          />
        </DialogContent>
        <DialogActions alignRight={true}>
          {currentSummary && (
            <div style={{ marginRight: 'auto' }}>
              <Button
                schemes={[ButtonSchemeEnum.SQUARE]}
                iconLeft="icon-bin"
                onClick={(e) => handleDelete(e)}
                submitting={deleteStatus?.isFetching}
              />
            </div>
          )}
          <Button onClick={onCancel} data-testid="cancel">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isDirty && updateStatus?.isFetching}
            scheme={ButtonSchemeEnum.PRIMARY}
            submitting={updateStatus?.isFetching}
            iconLeft="icon-single-neutral-id-card-1"
            data-testid="save"
          >
            {currentSummary ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
};

const mapStateToProps = (state: RootState) => ({
  updateStatus: selectUpdateUserAttributesStatus(state),
  deleteStatus: selectDeleteUserAttributesStatus(state),
});

const mapDispatchToProps = {
  dispatchUpdate: SettingsActions.updateExperienceSummary,
  dispatchDelete: SettingsActions.deleteExperienceSummary,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  React.memo,
)(ExperienceSummaryForm) as React.ElementType;
