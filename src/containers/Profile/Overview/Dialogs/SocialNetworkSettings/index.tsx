import React, { useState } from 'react';
import Dialog from 'components/common/Dialog';
import SocialNetworkList from './SocialNetworkList';
import { SocialNetwork } from 'interfaces';
import { useSelector } from 'react-redux';
import SocialNetworkForm from './SocialNetworkForm';
import { selectSocialNetworks } from 'redux/selectors';
import useSocialNetworks from 'lib/useSocialNetworks';

interface SocialNetworkSettingsProps {
  visible?: boolean;
  onClose?: () => void;
}

export default function SocialNetworkSettings({
  visible = false,
  onClose,
}: SocialNetworkSettingsProps) {
  const socialNetworks = useSelector(selectSocialNetworks);
  const [showForm, setShowForm] = useState(false);
  const [currentSocialNetwork, setCurrentSocialNetwork] = useState<
    SocialNetwork | undefined
  >(undefined);
  const socialNetworkRefData = useSocialNetworks();

  const handleAddClick = () => {
    setShowForm(true);
    setCurrentSocialNetwork(undefined);
  };

  const handleSetSocialNetwork = (socialNetwork: SocialNetwork) => {
    setCurrentSocialNetwork(socialNetwork);
    setShowForm(true);
  };

  const handleCancelFormClick = () => {
    setShowForm(false);
  };

  const resetState = () => {
    handleCancelFormClick();
    onClose && onClose();
  };

  return (
    <Dialog
      type="narrow"
      title={
        !showForm
          ? 'Social Networks'
          : currentSocialNetwork === undefined
          ? 'Add Social Network'
          : 'Edit Social Network'
      }
      testid="social-settings"
      show={visible}
      onClose={resetState}
    >
      {showForm ? (
        <SocialNetworkForm
          currentSocialNetwork={currentSocialNetwork}
          socialNetworks={socialNetworks}
          socialNetworkRefData={socialNetworkRefData}
          onCancel={handleCancelFormClick}
        />
      ) : (
        <SocialNetworkList
          socialNetworks={socialNetworks}
          onAddClick={handleAddClick}
          onItemClick={handleSetSocialNetwork}
          onClose={onClose}
        />
      )}
    </Dialog>
  );
}
