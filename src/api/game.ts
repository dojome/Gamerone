import request from 'utils/request';
import { Game, Nullable } from 'interfaces';

/**
 * Search in the game database
 */
export const searchGame = (q?: Nullable<string>) => {
  let url = '/game/search';
  if (q) url += `?q=${q}`;

  return request<Game[]>(url);
};
