import request from 'utils/request';
import { Achievement } from 'interfaces';

// Lists badges achieved.
export const getProfileAchievements = () => {
  return request<Achievement[]>(`/achievements`).then((result) => result);
};

// Lists badges with user_id.
export const getProfileAchievementsById = (id: number) => {
  return request<Achievement[]>(`/achievements/${id}`).then((result) => result);
};
