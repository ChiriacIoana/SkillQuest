import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";

export function useQuest(category: string, questId: number) {
  return useQuery({
    queryKey: ["quest", category, questId],
    queryFn: async () => {
      const res = await api.get(`/quests/category/${category}/${questId}`);
      return res.data;
    },
    enabled: !!questId,
  });
}
