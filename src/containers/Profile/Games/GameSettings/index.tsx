import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'components/common/Dialog';
import { SelectOption } from 'components/common/Form/Input';
import { UserGame } from 'interfaces';
import DialogActions from 'redux/dialogs/actions';
import { DialogTypeEnum } from 'redux/dialogs/types';
import { RootState } from 'redux/types';
import GameForm from './GameForm';
import {
  selectGameSettingsDialogIsOpen,
  selectGameSettingsDialogProp,
} from 'redux/dialogs/selectors';

interface GameSettingsProps {
  platformOptions: SelectOption[];
}

function GameSettings({
  currentUserGame,
  platformOptions,
  isOpen,
  dispatchShowDialog,
}: GameSettingsProps & MappedProps) {
  const onClose = () => {
    dispatchShowDialog(DialogTypeEnum.SETTINGS_GAME, false);
  };

  return (
    <Dialog
      title={!currentUserGame ? 'Add Game' : 'Edit Game'}
      type="narrow"
      testid="game-settings"
      show={isOpen}
      onClose={onClose}
    >
      <GameForm
        userGame={currentUserGame}
        onCancel={onClose}
        platformOptions={platformOptions}
      />
    </Dialog>
  );
}

const mapStateToProps = (state: RootState) => ({
  isOpen: selectGameSettingsDialogIsOpen(state),
  currentUserGame: selectGameSettingsDialogProp(state) as UserGame | undefined,
});

const mapDispatchToProps = {
  dispatchShowDialog: DialogActions.showDialog,
};

type MappedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);
