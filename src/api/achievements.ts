import api from './api';

export type Achievement = {
  id: number;
  name: string;
  description: string;
  icon: string;
  xpRequired?: number;
  questsRequired?: number;
  category: string;
  rarity: string;
};

export type UserAchievement = {
  id: number;
  userId: number;
  achievementId: number;
  unlockedAt: string;
  achievement: Achievement;
};

export const getUserAchievements = async (userId: number): Promise<UserAchievement[]> => {
  const res = await api.get(`/achievements/user/${userId}`);
  return res.data;
};

export const getAllAchievements = async (): Promise<Achievement[]> => {
  const res = await api.get('/achievements/all');
  return res.data;
};