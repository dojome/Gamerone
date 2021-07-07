import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { Dispatch, AnyAction } from 'redux';
import Card from 'components/common/Card';
import { UserPrivacy } from 'interfaces';
import SettingsActions from 'redux/settings/actions';
import { selectUpdatePrivacyStatus } from 'redux/request-status/selectors';
import RequestStatusActions from 'redux/request-status/actions';
import { selectUserPrivacy } from 'redux/settings/selectors';
import { RootState } from 'redux/types';
import { UPDATE_PRIVACY_REQUEST } from 'redux/settings/types';
import { VISIBILITY_OPTIONS } from './options';
import FormInput from 'components/common/Form/FormInput';

function PrivacyForm({
  privacy,
  dispatchUpdatePrivacy,
  dispatchCleanForm,
}: PrivacyFormProps) {
  const formMethods = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const { reset, watch } = formMethods;
  const formValues = watch([
    'nameVisibility',
    'postVisibility',
    'gamertagVisibility',
  ]);

  const handleSelectChange = () => {
    dispatchUpdatePrivacy(formValues as UserPrivacy);
  };

  useEffect(() => {
    reset(privacy);
    return () => {
      dispatchCleanForm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, dispatchCleanForm]);

  return (
    <Card>
      <h4 className="card__header card__title">Privacy</h4>

      <div
        className="card__content"
        style={{ paddingTop: 0, marginTop: '-1.5rem' }}
      >
        <FormProvider {...formMethods}>
          <form>
            <div className="content--2-col">
              <span>Name visibility:</span>
              <FormInput
                type="select"
                name="nameVisibility"
                label="Name Visibility"
                selectEmptyOption={false}
                onChange={handleSelectChange}
                selectOptions={VISIBILITY_OPTIONS}
              />
              <span>Post visibility:</span>
              <FormInput
                type="select"
                name="postVisibility"
                label="Post Visibility"
                onChange={handleSelectChange}
                selectEmptyOption={false}
                selectOptions={VISIBILITY_OPTIONS}
              />
              <span>Gamer Tag visibility:</span>
              <FormInput
                type="select"
                name="gamertagVisibility"
                label="Gamer Tag Visibility"
                onChange={handleSelectChange}
                selectEmptyOption={false}
                selectOptions={VISIBILITY_OPTIONS}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => {
  return {
    privacy: selectUserPrivacy(state),
    status: selectUpdatePrivacyStatus(state),
  };
};

export function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
    dispatchUpdatePrivacy: (p: UserPrivacy) =>
      dispatch(SettingsActions.updatePrivacy(p)),
    dispatchCleanForm: () =>
      dispatch(RequestStatusActions.cleanStatus(UPDATE_PRIVACY_REQUEST)),
  };
}

type PrivacyFormProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

export const ConnectedPrivacyForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivacyForm);

export default function PrivacySettings() {
  return <ConnectedPrivacyForm />;
}
