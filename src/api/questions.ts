import api from './api';

export type CachedQuestion = {
  id: number;
  question: string;
  answersJson: string;
  correctIndex?: number | null;
  xp: number;
  difficulty?: string;
};

export const getQuestionsForCategory = async (category: string, min = 10): Promise<CachedQuestion[]> => {
  const res = await api.get(`/questions/category/${encodeURIComponent(category)}?min=${min}`);
  return res.data;
};
