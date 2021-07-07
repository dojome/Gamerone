import React from 'react';
import Dialog, { DialogContent } from 'components/common/Dialog';
import SquadSettings from '../SquadSettings';

interface SquadSettingsModalProps {
  visible?: boolean;
  onClose?: () => void;
}

export default function SquadSettingsModal({
  visible = false,
  onClose,
}: SquadSettingsModalProps) {
  return (
    <Dialog
      type="narrow"
      title="Squad"
      testid="squad-settings"
      show={visible}
      onClose={onClose}
    >
      <DialogContent>
        <SquadSettings />
      </DialogContent>
    </Dialog>
  );
}
