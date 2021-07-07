export const FETCH_DEFAULT_OPTIONS = {
  supportHeaderParams: true,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
};

export const API_HOST = process.env.REACT_APP_API_ENDPOINT
  ? process.env.REACT_APP_API_ENDPOINT
  : 'API_ENV_NOT_DEFINED';

export const CDN_URL = process.env.REACT_APP_CDN_URL
  ? process.env.REACT_APP_CDN_URL
  : 'CDN_ENV_NOT_DEFINED';

export const CORS_PROXY_URL = process.env.REACT_APP_CORS_PROXY_URL
  ? process.env.REACT_APP_CORS_PROXY_URL
  : 'CORS_PROXY_ENV_NOT_DEFINED';

export const SHARE_FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;

// Google Tag Manager
export const GTM_ID = process.env.REACT_APP_GTM_ID
  ? process.env.REACT_APP_GTM_ID
  : 'GTM_ID_NOT_DEFINED';
export const GTM_AUTH = process.env.REACT_APP_GTM_AUTH
  ? process.env.REACT_APP_GTM_AUTH
  : 'GTM_AUTH_NOT_DEFINED';
export const GTM_PREVIEW = process.env.REACT_APP_GTM_PREVIEW
  ? process.env.REACT_APP_GTM_PREVIEW
  : 'GTM_PREVIEW_NOT_DEFINED';

export const SITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://g1.gg'
    : 'https://stage.g1.gg';

export const SITE_NAME = 'Gamer One';
export const SUPPORT_EMAIL = 'support@g1.gg';

// eslint-disable-next-line no-useless-escape
export const CHECK_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const CHECK_PASSWORD_REGEX = /^(?=[^A-Z]*[A-Z])(?=(?:[^a-z]*[a-z]))(?=(?:[^0-9]*[0-9]))(?=(?:[^!?@*#&$._-]*[!?@*#&$._-])).{8,}$/;

export const URL_CHECK_REGEX = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  'gm',
);

export const MULTI_URL_CHECK_REGEX = new RegExp(
  // eslint-disable-next-line no-useless-escape
  /(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+/,
  'gm',
);
export const URL_PREFIX_CHECK_REGEX = /^(?:http(s)?:\/\/)/;

// Image placeholders
export const AVATAR_PLACEHOLDER = 'assets/placeholder/avatar.svg';
export const COVER_PLACEHOLDER = 'assets/placeholder/cover-image-dark.jpg';
export const GAME_PLACEHOLDER = 'assets/placeholder/game.svg';
export const GEAR_PLACEHOLDER = 'assets/placeholder/gear.svg';
export const POST_PLACEHOLDER = 'assets/placeholder/post.svg';

export const AVATAR_WIDTH = 512; //px
export const AVATAR_HEIGHT = 512; //px

export const COVER_WIDTH = 1600; //px
export const COVER_HEIGHT = 400; //px

export const POST_WIDTH = 640; //px
export const POST_HEIGHT = 360; //px
export const POST_IMAGE_LIMIT = 6;

// Modal default size
export const MODAL_WIDTH = 800; //px
export const MODAL_HEIGHT = 200; //px

export const DEFAULT_USER_VISIBILITY = {
  sponsors: true,
  socialNetworks: true,
  nowPlaying: true,
  gear: true,
  achievements: true,
  store: true,
  squad: true,
  schedule: false,
  timeline: true,
};

export const DEFAULT_CLUB_VISIBILITY = {
  sponsors: true,
  socialNetworks: true,
  nowPlaying: false,
  gear: false,
  achievements: false,
  store: true,
  squad: false,
  schedule: false,
  timeline: true,
};

export const SOCIAL_NETWORK_ICON_LIST = {
  discord: 'icon-video-games-discord',
  facebook: 'icon-social-media-facebook',
  instagram: 'icon-social-instagram',
  reddit: 'icon-social-media-reddit',
  snapchat: 'icon-social-media-snapchat',
  twitch: 'icon-video-game-logo-twitch',
  twitter: 'icon-social-media-twitter',
  weibo: 'icon-feed-sina-weibo',
  vk: 'icon-social-media-vk',
  youtube: 'icon-social-video-youtube-clip',
  linkedin: 'icon-professional-network-linkedin',
};

export const ACHIEVEMENT_ICON_LIST = {
  'up-vote': 'icon-award-trophy-star',
  comment: 'icon-award-trophy-star',
  experience: 'icon-video-game-sword',
  follow: 'icon-award-trophy-star',
  follower: 'icon-video-game-controller-team',
  post: 'icon-quill-write',
  // eslint-disable-next-line @typescript-eslint/camelcase
  profile_complete: 'icon-award-trophy-star',
  signup: 'icon-award-trophy-star',
  game: 'icon-video-game-pacman',
  // eslint-disable-next-line @typescript-eslint/camelcase
  currently_playing: 'icon-award-trophy-star',
  sponsor: 'icon-award-trophy-star',
  socialNetwork: 'icon-award-trophy-star',
  store: 'icon-award-trophy-star',
  gear: 'icon-keyboard',
};

export const CARDS = [
  { id: 1, name: 'sponsors', label: 'Sponsors' },
  { id: 2, name: 'socialNetworks', label: 'Social Networks' },
  { id: 3, name: 'nowPlaying', label: 'Now Playing' },
  { id: 4, name: 'gear', label: 'Gear' },
  { id: 5, name: 'achievements', label: 'Achievements' },
  { id: 6, name: 'store', label: 'Store' },
  { id: 7, name: 'squad', label: 'Squad' },
  // { id: 8, name: 'schedule', label: 'Schedule' },
  // { id: 9, name: 'teams', label: 'Teams' },
];

// Now Playing
export const STREAM_MEDIAS = ['facebook', 'twitch', 'youtube'];

export const G1_THEMES = {
  Default: 'theme--1',
  Funky: 'theme--2',
  Techie: 'theme--3',
  Soft: 'theme--4',
  Elegant: 'theme--5',
} as const;
