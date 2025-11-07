
import api from './api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type Quest = {
  questId: number;
  questName: string;
  xp: number;
  isActive?: boolean;
};

export type UserQuest = {
  id: number;
  userId: number;
  questId: number;
  completed: boolean;
  completedAt?: string | null;
  quest?: Quest; 
};

export const getRecommendedQuests = async (userId: number): Promise<Quest[]> => {
  const res = await api.get(`/quests/${userId}`);
  return res.data;
};
export const completeQuest = async (userId: number, questId: number) => {
  const res = await api.patch(`/quests/${userId}/${questId}/complete`);
  return res.data;
};

export const createQuest = async (payload: { userId: number; questName: string; xp: number }) => {
  const res = await api.post('/quests', payload);
  return res.data;
};

export const deleteQuest = async (id: number) => {
  const res = await api.delete(`/quests/${id}`);
  return res.data;
};

export const useRecommendedQuests = (userId?: number) => {
  return useQuery<Quest[], Error>({
    queryKey: ['quests', userId],

    queryFn: () => (userId ? getRecommendedQuests(userId) : Promise.resolve([] as Quest[])),
    enabled: !!userId,
  });
};

export const useCompleteQuest = () => {
  const qc = useQueryClient();
  return useMutation<any, Error, { userId: number; questId: number }>({
    mutationFn: ({ userId, questId }) => completeQuest(userId, questId),
    onSuccess: (_data, variables) => {
      if (variables?.userId) {
        qc.invalidateQueries({ queryKey: ['quests', variables.userId] });
      }
      qc.invalidateQueries({ queryKey: ['users', 'me'] }); 
    },
  });
};

export const useCreateQuest = () => {
  const qc = useQueryClient();
  return useMutation<any, Error, { userId: number; questName: string; xp: number }>({
    mutationFn: (payload) => createQuest(payload),
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });
};

export const useDeleteQuest = () => {
  const qc = useQueryClient();
  return useMutation<any, Error, { id: number; userId?: number }>({
    mutationFn: (payload) => deleteQuest(payload.id),
    onSuccess: (_data, variables) => {
      if (variables?.userId) qc.invalidateQueries({ queryKey: ['quests', variables.userId] });
      qc.invalidateQueries();
    },
  });

};

export const getQuestById = async (questId: number): Promise<Quest> => {
  const res = await api.get(`/quests/details/${questId}`);
  return res.data;
};

export const useQuest = (questId?: number) => {
  return useQuery<Quest, Error>({
    queryKey: ['quest', questId],
    queryFn: () => getQuestById(questId!),
    enabled: !!questId,
  });
};