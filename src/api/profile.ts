import request, { requestOptions } from 'utils/request';
import {
  Profile,
  Route,
  User,
  ProfileSettingsRequest,
  SponsorRequest,
  ProductRequest,
  Nullable,
  UserExperienceAddRequest,
  UserExperience,
  Sponsor,
  Product,
  UserPrivacy,
  LayoutSettings,
  SocialNetwork,
  SocialNetworkRequest,
  UserGamePagedResponse,
  GameAddRequest,
  UserGame,
  NowPlaying,
  Gear,
  UserGearAddRequest,
  UserGear,
  UserGearPagedResponse,
  GameUpdateRequest,
  NowPlayingRequest,
} from 'interfaces';
import { UserExperienceSummary } from 'interfaces/userExperienceSummary';
import { UserAttributes } from 'interfaces/userAttributes';

export interface GetGamesParam {
  userId: number;
}

/**
 * Get profile information for given user id
 */
export const getProfile = (id: number) => {
  return request<Profile>(`/profile/get/${id}`);
};

/**
 * Get profile layout
 */
export const getProfileLayout = () => {
  return request<LayoutSettings>(`/profile/layout-settings`);
};

/**
 * Set profile layout
 */
export const setProfileLayout = (param: LayoutSettings) => {
  return request<LayoutSettings>(
    `/profile/layout-settings`,
    requestOptions(param, 'POST'),
  );
};

/**
 * Resolves the given slug to either user or club content
 */
export const resolveRoute = (param: string) => {
  return request<Route>(`/rr/${param}`);
};

/**
 * Search in the user database
 */
export const searchProfile = (q?: Nullable<string>) => {
  let url = '/profile/search';
  if (q) url += `?q=${q}`;

  return request<User[]>(url);
};

/**
 * Change profile informations and credentials
 */
export const updateProfile = (param: ProfileSettingsRequest) => {
  return request<User>('/profile/settings', requestOptions(param, 'PUT'));
};

/**
 * Upload a new avatar for your profile
 */
export const uploadAvatar = (f: File) => {
  const form = new FormData();
  form.append('f', f);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<User>('/profile/avatar', options);
};

/**
 * Delete the current avatar. Set default avatar.
 */
export const deleteAvatar = () => {
  return request<User>('/profile/avatar', requestOptions({}, 'DELETE'));
};

/**
 * Upload a new banner for your profile
 */
export const uploadBanner = (f: File) => {
  const form = new FormData();
  form.append('f', f);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<User>('/profile/banner', options);
};

/**
 * Delete the current banner. Set default banner.
 */
export const deleteBanner = () => {
  return request<User>('/profile/banner', requestOptions({}, 'DELETE'));
};

/**
 * update experience
 */
export const updateExperience = (
  id: number,
  data: UserExperienceAddRequest,
) => {
  return request<UserExperience[]>(
    `/profile/experiences/${id}`,
    requestOptions(data, 'PUT'),
  );
};

/**
 * create experience
 */
export const createExperience = (param: UserExperienceAddRequest) => {
  return request<UserExperience[]>(
    '/profile/experiences',
    requestOptions(param),
  );
};

/**
 * Delete a experience
 */
export const deleteExperience = (id: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<UserExperience[]>(`/profile/experiences/${id}`, options);
};

/**
 * Get experience
 */
export const getExperiences = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  return request<UserExperience[]>('/profile/experiences/', options);
};

/**
 * Get a users experience
 */
export const getExperiencesById = (id: number | undefined) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  return request<UserExperience[]>(`/profile/get/${id}/experiences`, options);
};

/**
 * Get experience summary for a user by user id
 */
export const getExperienceSummaryById = (id: number | undefined) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  return request<UserExperienceSummary>(
    `/profile/get/${id}/experience/summary`,
    options,
  );
};

/**
 * Get user attributes for the current authenticated user
 */
export const getUserAttributes = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  return request<UserAttributes>('/profile/attributes', options);
};

/**
 * Add / Update - <key>: "new value or updated value"
 * Delete - <key> = null e.g experience_summary: null
 * @param param
 */
export const addUpdateDeleteUserAttributes = (param: UserAttributes) => {
  return request<UserAttributes>('/profile/attributes', requestOptions(param));
};

/**
 * Create a sponsor
 */
export const addSponsor = (param: SponsorRequest) => {
  const form = new FormData();
  form.append('name', param.name);
  form.append('link', param.link);
  form.append('image', param.image);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<Sponsor>('/profile/sponsors', options);
};

/**
 * Update a sponsor
 */
export const updateSponsor = (id: number, param: SponsorRequest) => {
  const form = new FormData();
  form.append('name', param.name);
  form.append('link', param.link);
  form.append('image', param.image);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<Sponsor>(`/profile/sponsors/${id}`, options);
};

/**
 * Delete a sponsor
 */
export const deleteSponsor = (param: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<Sponsor>(`/profile/sponsors/${param}`, options);
};

/**
 * Get sponsors
 */
export const getSponsors = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  return request<Sponsor>('/profile/sponsors/', options);
};

/**
 * Create a product
 */
export const createProduct = (param: ProductRequest) => {
  const form = new FormData();
  form.append('name', param.name);
  form.append('link', param.link);
  form.append('image', param.image);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<Product>('/profile/store', options);
};

/**
 * Update a product
 */
export const updateProduct = (id: number, param: ProductRequest) => {
  const form = new FormData();
  form.append('name', param.name);
  form.append('link', param.link);
  form.append('image', param.image);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<Product>(`/profile/store/${id}`, options);
};

/**
 * Delete a product
 */
export const deleteProduct = (param: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<Product>(`/profile/store/${param}`, options);
};

/**
 * Get stores
 */
export const getStores = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };
  return request<Product>('/profile/store/', options);
};

/**
 * Add/Update a social
 */
export const addUpdateSocial = (param: SocialNetworkRequest) => {
  return request<SocialNetwork>(
    '/social-networks',
    requestOptions(param, 'PUT'),
  );
};

/**
 * Delete a social
 */
export const deleteSocial = (param: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<SocialNetwork>(`/social-networks/${param}`, options);
};

/**
 * Get socials
 */
export const getSocials = () => {
  return request<SocialNetwork>('/social-networks');
};

/*
 * Get current privacy settings
 */
export const getPrivacySettings = () => {
  return request<UserPrivacy>('/profile/privacy');
};

/**
 * Update current privacy settings
 */
export const updatePrivacySettings = (p: UserPrivacy) => {
  return request<UserPrivacy>('/profile/privacy', requestOptions(p, 'POST'));
};

/**
 * Get UserGames
 */
export const getUserGames = (param: number, page = 0) => {
  return request<UserGamePagedResponse>(
    `/profile/get/${param}/games?page=${page}`,
  );
};

/**
 * Add a UserGame
 */
export const addUserGame = (param: GameAddRequest) => {
  return request<UserGame>('/game/add/', requestOptions(param, 'POST'));
};

/**
 * Update a UserGame
 */
export const updateUserGame = (id: number, param: GameUpdateRequest) => {
  return request<UserGame>(`/game/update/${id}`, requestOptions(param, 'PUT'));
};

/**
 * Delete a UserGame
 */
export const deleteUserGame = (param: number) => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<UserGame[]>(`/game/delete/${param}`, options);
};

/**
 * Get now playing game
 */
export const getNowPlayingGame = (id: number) => {
  return request<NowPlaying>(`/game/current/${id}`);
};

/**
 * Update now playing game
 */
export const updateNowPlayingGame = (param: NowPlayingRequest) => {
  return request<NowPlaying>(`/game/current`, requestOptions(param, 'PUT'));
};

/**
 * Delete now playing game
 */
export const deleteNowPlayingGame = () => {
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  };
  return request<NowPlaying>(`/game/current`, options);
};

/**
 * Get Online status
 */
export const getOnlineStatus = () => {
  return request<NowPlaying>(`/game/current/toggle-online`);
};

/**
 * Search in the gear database
 */
export const searchGear = (q?: Nullable<string>) => {
  return request<Gear[]>(`/gear/search?q=${q}`);
};

/**
 * Add gear to profile
 */
export const addGear = (param: UserGearAddRequest) => {
  const form = new FormData();
  form.append('gear', param.gear);
  form.append('gear_type_id', param.gearTypeId.toString());
  if (param.link !== undefined) form.append('link', param.link);
  form.append('information', param.information);
  form.append('image', param.image);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<Product>('/gear/add', options);
};

/**
 * Update gear
 */
export const updateGear = (id: number, param: UserGearAddRequest) => {
  const form = new FormData();
  form.append('gear', param.gear);
  form.append('gear_type_id', param.gearTypeId.toString());
  if (param.link !== undefined) form.append('link', param.link);
  form.append('information', param.information);
  form.append('image', param.image);

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: form,
  };

  return request<UserGear>(`/gear/update/${id}`, options);
};

/**
 * Delete gear from profile
 */
export const deleteGear = (id: number) => {
  return request<UserGear[]>(
    `/gear/delete/${id}`,
    requestOptions({}, 'DELETE'),
  );
};

/**
 * Get users added gears for any profile
 */
export const getUserGears = (userId: number, page = 0) => {
  return request<UserGearPagedResponse>(
    `/profile/get/${userId}/gears?page=${page}`,
  );
};
