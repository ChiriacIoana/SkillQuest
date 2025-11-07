'use client';

import { Card, CardContent, CardHeader, CardTitle} from '@/components/common/ui/card';
import { ProgressBar } from '@/components/common/dashboard/progress-bar';
import { RecommendedQuests } from '@/components/common/dashboard/recom-quests';
import { StatsPanel } from '@/components/common/dashboard/stats-panel';
import {QuestsHeader} from '@/components/common/dashboard/quests-header';
import { useRecommendedQuests } from '@/api/quests';
import { useUser } from '@/api/users';
import { SiteHeader } from '@/components/common/dashboard/site-header';

export default function Home() {
  const userIdString = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const userId = userIdString ? parseInt(userIdString, 10) : undefined;


  const { data: user, isLoading: userLoading, error } = useUser(userId);
  const { data: recommendedQuests = [] } = useRecommendedQuests(userId);

  if (userLoading) return <div className="p-8">Loading user data...</div>;
  if (error) return <div className="p-8">Error loading user: {error.message}</div>;
  if (!user) return <div className="p-8">No user found. Please log in.</div>;

  return (
    <div className="p-8 space-y-8">
      <SiteHeader />
      <StatsPanel
        name={user.username || 'Player'}
        level={user.level || 1}
        completedQuests={user.completedQuests || 0}
        currentXP={user.currentXP || 0}
        nextLevelXP={user.nextLevelXP || 100}
        streak={user.streak || 0}
      />

      <Card>
        <CardHeader>
          <CardTitle>Progress to next level</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar
            current={user.currentXP}
            max={user.nextLevelXP}
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