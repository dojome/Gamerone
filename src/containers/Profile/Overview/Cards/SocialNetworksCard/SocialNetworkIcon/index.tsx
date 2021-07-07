import React from 'react';
import Icon, { IconSize } from 'components/common/Icon';
import { SOCIAL_NETWORK_ICON_LIST } from 'utils/constants';

export interface SocialNetworkIconProps {
  name: string;
  size?: IconSize;
}

const SocialNetworkIcon: React.FC<SocialNetworkIconProps> = ({
  name,
  size = '1x',
}: SocialNetworkIconProps): JSX.Element => {
  return (
    <Icon name={SOCIAL_NETWORK_ICON_LIST[name.toLowerCase()]} size={size} />
  );
};

export default React.memo(SocialNetworkIcon);
