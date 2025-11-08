'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button';
import { useCompleteQuest } from '@/api/quests';
import { Trophy, Zap, CheckCircle } from 'lucide-react';
import api from '@/api/api';

async function getQuestByIdAndCategory(category: string, questId: number) {
  const res = await api.get(`/quests/category/${category}/${questId}`);
  return res.data;
}

async function getQuestions(category: string, questId: number) {
  const res = await api.get(`/quests/category/${category}/${questId}/questions`);
  return res.data;
}

export default function QuestPage() {
  const params = useParams();
  const questId = Number(params.questId);
  const category = 'React';

  const { data: quest, isLoading: questLoading, error: questError } = useQuery({
    queryKey: ['quest', category, questId],
    queryFn: () => getQuestByIdAndCategory(category, questId),
    enabled: !!questId,
  });

  const { data: questions, isLoading: questionsLoading, error: questionsError } = useQuery({
    queryKey: ['questions', category, questId],
    queryFn: () => getQuestions(category, questId),
    enabled: !!questId,
  });

  const completeQuestMutation = useCompleteQuest();

  const handleComplete = async () => {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;
    await completeQuestMutation.mutateAsync({ userId, questId });
    alert('Quest completed!');
  };

  if (questLoading || questionsLoading) return <div className="p-8">Loading quest...</div>;
  if (questError || questionsError) return <div className="p-8">Error loading quest</div>;
  if (!quest) return <div className="p-8">Quest not found</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-4 text-sm text-gray-500">
        {category} / Quest #{questId}
      </div>

      <Card className="mb-6">
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
        </CardContent>
      </Card>

      {!questions || questions.length === 0 ? (
        <Card className="mb-4">
          <CardContent className="p-6 text-center text-gray-500">
            No questions assigned to this quest yet.
          </CardContent>
        </Card>
      ) : (
        questions.map((q: any, index: number) => (
          <Card key={q.id} className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Question {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{q.question}</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {Object.entries(q.answersJson ? JSON.parse(q.answersJson) : {}).map(
                  ([key, answer]: any) => (
                    <li key={key}>{answer}</li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        ))
      )}

      <Button
        onClick={handleComplete}
        disabled={completeQuestMutation.isPending || !questions || questions.length === 0}
        className="w-full mt-4"
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
    </div>
  );
}