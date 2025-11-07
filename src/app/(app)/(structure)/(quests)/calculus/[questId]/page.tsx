'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button';
import { useCompleteQuest } from '@/api/quests';
import { Trophy, Zap, CheckCircle } from 'lucide-react';
import api from '@/api/api';

async function getQuestByIdAndCategory(questId: number) {
 
  const category = 'calculus';
  const res = await api.get(`/quests/category/${category}/${questId}`);
  return res.data;
}

export default function QuestPage() {
  const params = useParams();
  const questId = Number(params.questId);

  const { data: quest, isLoading, error } = useQuery({
    queryKey: ['quest', questId],
    queryFn: () => getQuestByIdAndCategory(questId),
    enabled: !!questId,
  });

  const completeQuestMutation = useCompleteQuest();

  const handleComplete = async () => {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;
    await completeQuestMutation.mutateAsync({ userId, questId });
    alert('Quest completed!');
  };

  if (isLoading) return <div className="p-8">Loading quest...</div>;
  if (error) return <div className="p-8">Error loading quest</div>;
  if (!quest) return <div className="p-8">Quest not found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-4 text-sm text-gray-500">
        calculus / Quest #{questId}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            {quest.questName}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2 text-lg">
            <Zap className="w-5 h-5 text-purple-500" />
            <span className="font-semibold">{quest.xp} XP</span>
          </div>

          <div className="prose dark:prose-invert">
            <p>{quest.description || 'Complete this quest to earn XP!'}</p>
          </div>

          <Button 
            onClick={handleComplete}
            disabled={completeQuestMutation.isPending}
            className="w-full"
          >
            {completeQuestMutation.isPending ? (
              'Completing...'
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Quest
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
