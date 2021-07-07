import React from 'react';
import Image from '../Image';
import Badge, { BadgeSize, BadgeType } from '../Badge';
import { AVATAR_PLACEHOLDER } from 'utils/constants';

export interface AvatarProps {
  src: string;
  alt: string;
  title?: string;
  type?: BadgeType;
  size?: BadgeSize;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  type = '',
  size,
  ...props
}: AvatarProps): JSX.Element => {
  const avatarSrc =
    src !== null && !src.startsWith('blob:')
      ? src
      : src === null
      ? AVATAR_PLACEHOLDER
      : src;
  const useCdn = avatarSrc !== null && !avatarSrc.startsWith('blob:');

  return src !== '' ? (
    <Badge avatar={true} type={type} size={size} testid="badge-avatar">
      <Image
        src={avatarSrc}
        alt={'@' + alt}
        width={120}
        height={120}
        useCdn={useCdn}
        {...props}
      />
    </Badge>
  ) : (
    <></>
  );
};

export default Avatar;
