import React, { useState } from 'react';
import Dialog from 'components/common/Dialog';
import SponsorList from './SponsorList';
import SponsorForm from './SponsorForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectSettingsSponsors } from 'redux/settings/selectors';
import { Sponsor } from 'interfaces';
import { selectSponsorFormIsOpen } from 'redux/dialogs/selectors';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';

interface SponsorSettingsProps {
  visible?: boolean;
  onClose?: () => void;
}

const closeSponsorForm = DialogActions.showDialog(
  DialogTypeEnum.FORM_SPONSOR,
  false,
);

const openSponsorForm = DialogActions.showDialog(
  DialogTypeEnum.FORM_SPONSOR,
  true,
);

export default function SponsorSettings({
  visible = false,
  onClose,
}: SponsorSettingsProps) {
  const sponsors = useSelector(selectSettingsSponsors);
  const formIsOpen = useSelector(selectSponsorFormIsOpen);
  const [currentSponsor, setCurrentSponsor] = useState<Sponsor | undefined>(
    undefined,
  );
  const dispatch = useDispatch();

  const handleAddClick = () => {
    dispatch(openSponsorForm);
    setCurrentSponsor(undefined);
  };

  const handleSetSponsor = (sponsor: Sponsor) => {
    setCurrentSponsor(sponsor);
    dispatch(openSponsorForm);
  };

  const handleCancelFormClick = () => {
    dispatch(closeSponsorForm);
  };

  const resetState = () => {
    handleCancelFormClick();
    onClose && onClose();
  };

  return (
    <Dialog
      title={
        !formIsOpen
          ? 'Sponsors'
          : !currentSponsor
          ? 'Add Sponsor'
          : 'Edit Sponsor'
      }
      testid="sponsor-settings"
      show={visible}
      onClose={resetState}
    >
      {formIsOpen ? (
        <SponsorForm
          sponsor={currentSponsor}
          onCancel={handleCancelFormClick}
        />
      ) : (
        <SponsorList
          sponsors={sponsors}
          onAddClick={handleAddClick}
          onItemClick={handleSetSponsor}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
}
