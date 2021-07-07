import React from 'react';
import cn from 'classnames';

export type IconName =
  | 'icon-add'
  | 'icon-video-game-logo-steam'
  | 'icon-single-neutral-id-card-1'
  | 'icon-single-neutral-actions'
  | 'icon-video-game-controller-team'
  | 'icon-antenna'
  | 'icon-video-game-tetris'
  | 'icon-video-game-sword'
  | 'icon-video-game-mario-mushroom-1:'
  | 'icon-quill-write'
  | 'icon-video-game-mario-flower-1'
  | 'icon-check-1'
  | 'icon-monetization-sponsor'
  | 'icon-check-circle-1'
  | 'icon-expand-3'
  | 'icon-hash'
  | 'icon-newspaper-fold'
  | 'icon-satellite'
  | 'icon-search'
  | 'icon-video-games-discord'
  | 'icon-professional-network-linkedin'
  | 'icon-pin'
  | 'icon-award-trophy-star'
  | 'icon-keyboard'
  | 'icon-award-medal'
  | 'icon-video-game-pacman'
  | 'icon-user-network'
  | 'icon-remove-circle'
  | 'icon-image-file-edit'
  | 'icon-arrow-double-left'
  | 'icon-arrow-double-right'
  | 'icon-video-game-controller'
  | 'icon-tv-flat-screen'
  | 'icon-social-instagram'
  | 'icon-social-video-youtube-clip'
  | 'icon-video-game-logo-twitch'
  | 'icon-feed-sina-weibo'
  | 'icon-social-media-facebook'
  | 'icon-social-media-reddit'
  | 'icon-social-media-snapchat'
  | 'icon-social-media-twitter'
  | 'icon-social-media-vk'
  | 'icon-arrow-left-1'
  | 'icon-arrow-left'
  | 'icon-arrow-right-1'
  | 'icon-arrow-right'
  | 'icon-arrow-up-1'
  | 'icon-arrow-up'
  | 'icon-arrow-down-1'
  | 'icon-arrow-down'
  | 'icon-navigation-menu-vertical'
  | 'icon-navigation-menu-horizontal'
  | 'icon-cog'
  | 'icon-information-circle'
  | 'icon-alert-circle'
  | 'icon-alarm-bell'
  | 'icon-calendar'
  | 'icon-pencil'
  | 'icon-pencil-write-2'
  | 'icon-bin'
  | 'icon-attachment'
  | 'icon-hyperlink'
  | 'icon-share'
  | 'icon-messages-bubble-square'
  | 'icon-single-neutral-actions-subtract'
  | 'icon-single-neutral-actions-subtract1'
  | 'icon-arrow-thick-up'
  | 'icon-arrow-thick-down'
  | 'icon-image-file-add'
  | 'icon-network-arrow'
  | 'icon-view-off'
  | 'icon-view-1'
  | 'icon-multiple-users-1'
  | 'icon-multiple-users-11'
  | 'icon-multiple-users-network'
  | 'icon-messages-bubble-square-disable'
  | 'icon-remove'
  | 'icon-email-action-reply';

export type IconSize = '1x' | '125x' | '15x' | '2x' | '3x';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  size?: IconSize;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size,
  ...props
}: IconProps) => {
  const iconClasses = cn('icon ', {
    [`icon-${size}`]: !!size,
    [name]: !!name,
  });

  return <i className={iconClasses} {...props} />;
};

export default Icon;
