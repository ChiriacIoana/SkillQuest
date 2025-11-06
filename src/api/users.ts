import api from './api';
import { useQuery } from '@tanstack/react-query';

export type User = {
  userId: number;
  username: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  completedQuests: number;
  streak: number;
};

export const getUserById = async (userId: number): Promise<User> => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

export const useUser = (userId?: number) => {
  return useQuery<User, Error>({
    queryKey: ['users', userId],
    queryFn: () => getUserById(userId!),
    enabled: !!userId,
  });
};