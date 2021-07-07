import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'components/common/Dialog';
import { SelectOption } from 'components/common/Form/Input';
import { UserExperience } from 'interfaces';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';
import { RootState } from 'redux/types';
import {
  selectExperienceSettingsDialogIsOpen,
  selectExperienceSettingsDialogProp,
} from 'redux/dialogs/selectors';
import ExperienceForm from './ExperienceForm';

interface ExperienceSettingsProps {
  experienceTypeOptions: SelectOption[];
}

function ExperienceSettings({
  currentUserExperience,
  experienceTypeOptions,
  isOpen,
  dispatchShowDialog,
}: ExperienceSettingsProps & MappedProps) {
  const onClose = () => {
    dispatchShowDialog(DialogTypeEnum.SETTINGS_EXPERIENCE, false);
  };

  return (
    <Dialog
      title={!currentUserExperience ? 'Add Experience' : 'Edit Experience'}
      testid="experience-settings"
      show={isOpen}
      onClose={onClose}
    >
      <ExperienceForm
        experience={currentUserExperience}
        onCancel={onClose}
        experienceTypeOptions={experienceTypeOptions}
      />
    </Dialog>
  );
}

const mapStateToProps = (state: RootState) => ({
  isOpen: selectExperienceSettingsDialogIsOpen(state),
  currentUserExperience: selectExperienceSettingsDialogProp(state) as
    | UserExperience
    | undefined,
});

const mapDispatchToProps = {
  dispatchShowDialog: DialogActions.showDialog,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceSettings);
