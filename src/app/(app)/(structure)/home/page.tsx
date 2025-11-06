'use client';

import { Card, CardContent, CardHeader, CardTitle} from '@/components/common/ui/card';
import { ProgressBar } from '@/components/common/dashboard/progress-bar';
import { RecommendedQuests } from '@/components/common/dashboard/recom-quests';
import { StatsPanel } from '@/components/common/dashboard/stats-panel';
import {QuestsHeader} from '@/components/common/dashboard/quests-header';
import { useRecommendedQuests } from '@/api/quests';
import { useUser } from '@/api/users';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/api';

export default function Home() {

  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const localUser = storedUser ? JSON.parse(storedUser) : null;
  const userId = localUser?.id;

  const { data: user, isLoading: userLoading } = useUser(userId);
  const { data: recommendedQuests = [] } = useRecommendedQuests(userId);

  if (userLoading) return <div className="p-8">Loading user data...</div>;

  return (
    <div className="p-8 space-y-8">
      <StatsPanel
        name={user?.username || 'Player'}
        level={user?.level || 1}
        completedQuests={user?.completedQuests || 0}
        currentXP={user?.currentXP || 0}
        nextLevelXP={user?.nextLevelXP || 100}
        streak={user?.streak || 0}
      />

      <Card>
        <CardHeader>
          <CardTitle>Progress to next level</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar
            current={user?.currentXP || 0}
            max={user?.nextLevelXP || 100}
            questsCompleted={recommendedQuests.map(q => ({
              name: q.questName,
              xp: q.xp,
            }))}
          />
        </CardContent>
      </Card>

      <QuestsHeader />
      <RecommendedQuests />
    </div>
  );
}