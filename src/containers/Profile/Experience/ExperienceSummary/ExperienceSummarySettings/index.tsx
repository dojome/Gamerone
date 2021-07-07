import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'components/common/Dialog';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';
import { RootState } from 'redux/types';
import ExperienceSummaryForm from './ExperienceSummaryForm';
import {
  selectExperienceSummarySettingsDialogIsOpen,
  selectExperienceSummarySettingsDialogProp,
} from 'redux/dialogs/selectors';
import { UserExperienceSummary } from 'interfaces/userExperienceSummary';
import { selectUserAttributes } from 'redux/settings/selectors';

function ExperienceSummarySettings({
  currentSummary,
  currentUserAttributes,
  isOpen,
  dispatchShowDialog,
}: MappedProps) {
  const onClose = () => {
    dispatchShowDialog(DialogTypeEnum.SETTINGS_EXPERIENCE_SUMMARY, false);
  };

  return (
    <Dialog
      title={!currentSummary ? 'Add Summary' : 'Edit Summary'}
      testid="experience-summary-settings"
      show={isOpen}
      onClose={onClose}
    >
      <ExperienceSummaryForm
        currentSummary={currentSummary}
        currentUserAttributes={currentUserAttributes}
        onCancel={onClose}
      />
    </Dialog>
  );
}

const mapStateToProps = (state: RootState) => ({
  isOpen: selectExperienceSummarySettingsDialogIsOpen(state),
  currentSummary: selectExperienceSummarySettingsDialogProp(
    state,
  ) as UserExperienceSummary | null,
  currentUserAttributes: selectUserAttributes(state),
});

const mapDispatchToProps = {
  dispatchShowDialog: DialogActions.showDialog,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceSummarySettings);
