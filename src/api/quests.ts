
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

// Complete a quest for a user
export const completeQuest = async (userId: number, questId: number) => {
  const res = await api.patch(`/quests/${userId}/${questId}/complete`);
  return res.data;
};

// Create a quest (admin or seeded; typically not used by normal client)
export const createQuest = async (payload: { userId: number; questName: string; xp: number }) => {
  const res = await api.post('/quests', payload);
  return res.data;
};

// Delete a quest by id
export const deleteQuest = async (id: number) => {
  const res = await api.delete(`/quests/${id}`);
  return res.data;
};

/* React Query hooks */

// recommended
// React Query hook: recommended quests for a user
export const useRecommendedQuests = (userId?: number) => {
  return useQuery<Quest[], Error>({
    queryKey: ['quests', userId],
    // if no userId is provided, don't call backend — return empty array instead
    queryFn: () => (userId ? getRecommendedQuests(userId) : Promise.resolve([] as Quest[])),
    enabled: !!userId,
  });
};

// completed
// complete mutation
export const useCompleteQuest = () => {
  const qc = useQueryClient();
  return useMutation<any, Error, { userId: number; questId: number }>({
    mutationFn: ({ userId, questId }) => completeQuest(userId, questId),
    onSuccess: (_data, variables) => {
      // invalidate queries so UI refreshes for that user
      if (variables?.userId) {
        qc.invalidateQueries({ queryKey: ['quests', variables.userId] });
      }
      qc.invalidateQueries({ queryKey: ['users', 'me'] }); // if you fetch user stats
    },
  });
};

// create quest mutation
export const useCreateQuest = () => {
  const qc = useQueryClient();
  return useMutation<any, Error, { userId: number; questName: string; xp: number }>({
    mutationFn: (payload) => createQuest(payload),
    onSuccess: () => {
      // ideally we would invalidate the specific user's quests. If the created quest includes userId in response,
      // consider passing that through to invalidate only that user's cache.
      qc.invalidateQueries();
    },
  });
};

// delete mutation
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
