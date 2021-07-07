import React, { useState } from 'react';
import Dialog from 'components/common/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { selectGearFormIsOpen } from 'redux/dialogs/selectors';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';
import { UserGear } from 'interfaces';
import UserGearList from './UserGearList';
import { selectSettingsGears } from 'redux/settings/selectors';
import UserGearForm from './UserGearForm';
import useGearTypes from 'lib/useGearTypes';

interface GearSettingsProps {
  visible?: boolean;
  onClose?: () => void;
}

const closeGearForm = DialogActions.showDialog(DialogTypeEnum.FORM_GEAR, false);

const openGearForm = DialogActions.showDialog(DialogTypeEnum.FORM_GEAR, true);

export default function GearSettings({
  visible = false,
  onClose,
}: GearSettingsProps) {
  const gearTypeOptions = useGearTypes();
  const gears = useSelector(selectSettingsGears);
  const formIsOpen = useSelector(selectGearFormIsOpen);
  const [currentUserGear, setCurrentUserGear] = useState<UserGear | undefined>(
    undefined,
  );
  const dispatch = useDispatch();

  const handleAddClick = () => {
    dispatch(openGearForm);
    setCurrentUserGear(undefined);
  };

  const handleSetUserGear = (gear: UserGear) => {
    setCurrentUserGear(gear);
    dispatch(openGearForm);
  };

  const handleCancelFormClick = () => {
    dispatch(closeGearForm);
  };

  const resetState = () => {
    handleCancelFormClick();
    onClose && onClose();
    // wait for the dialog to close
    // setTimeout(() => {
    //   dispatch(closeGearForm);
    // }, 500);
  };

  return (
    <Dialog
      title={!formIsOpen ? 'Gear' : !currentUserGear ? 'Add Gear' : 'Edit Gear'}
      testid="gear-settings"
      show={visible}
      onClose={resetState}
    >
      {formIsOpen ? (
        <UserGearForm
          userGear={currentUserGear}
          gearTypeOptions={gearTypeOptions}
          onCancel={handleCancelFormClick}
        />
      ) : (
        <UserGearList
          userGears={gears}
          onAddClick={handleAddClick}
          onItemClick={handleSetUserGear}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
}
