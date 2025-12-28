import api from './api';

export type UserType = {
  id: string;
  name: string;
  description?: string | null;
  minXP?: number | null;
  maxXP?: number | null;
  minQuizzes?: number | null;
};

export const getUserType = async (userId: number): Promise<UserType> => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const res = await api.get(`/user-type/${userId}`);

  const data = res.data;

  if (data?.message) {
    throw new Error(data.message);
  }

  return data as UserType;
};
