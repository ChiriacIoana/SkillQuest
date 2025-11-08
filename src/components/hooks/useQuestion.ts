import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export function useQuestions(category: string, questId: number) {
  return useQuery({
    queryKey: ["questions", category, questId],
    queryFn: async () => {
      const res = await api.get(`/quests/category/${category}/${questId}/questions`);
      return res.data;
    },
    enabled: !!questId,
  });
}
