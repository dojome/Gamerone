import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import Button, { ButtonSchemeEnum } from 'components/common/Button';
import Checkbox from 'components/common/Form/Checkbox';

import { LayoutSettings } from 'interfaces';
import ProfileActions from 'redux/profile/actions';
import { selectSetLayoutStatus } from 'redux/request-status/selectors';
import { selectLayoutSettings } from 'redux/settings/selectors';

import {
  CARDS as visibilityOptions,
  DEFAULT_USER_VISIBILITY,
} from 'utils/constants';
import './style.scss';
import Dialog, { DialogContent, DialogActions } from 'components/common/Dialog';

interface CardVisibilitySettingsProps {
  visible?: boolean;
  onClose?: () => void;
}

function CardVisibilitySettings({
  visible = false,
  onClose,
}: CardVisibilitySettingsProps) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { isDirty } = formState;

  const profileLayout = useSelector(selectLayoutSettings);
  const setStatus = useSelector(selectSetLayoutStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    reset(profileLayout?.visibility || DEFAULT_USER_VISIBILITY);
  }, [profileLayout, reset]);

  useEffect(() => {
    if (onClose && setStatus?.isSuccess) {
      onClose();
    }
  }, [setStatus, onClose]);

  const onSubmit = (data: Record<string, any>) => {
    const layoutSettings: LayoutSettings = {
      settings: profileLayout?.settings,
      visibility: data,
    };
    dispatch(ProfileActions.setCurrentProfileLayout(layoutSettings));
  };

  return (
    <Dialog
      type="narrow"
      title="Card Visibility"
      testid="card-visibility"
      show={visible}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogContent>
        {visibilityOptions.map((card) => (
          <Checkbox
            key={card.id}
            name={card.name}
            label={card.label}
            inputRef={register}
          />
        ))}
      </DialogContent>
      <DialogActions alignRight={true}>
        <Button onClick={onClose} data-testid="cancel">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isDirty}
          scheme={ButtonSchemeEnum.PRIMARY}
          submitting={setStatus?.isFetching}
          data-testid="save"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CardVisibilitySettings;
