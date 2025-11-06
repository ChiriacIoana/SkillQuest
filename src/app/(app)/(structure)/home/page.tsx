'use client';

import { Card, CardContent, CardHeader, CardTitle} from '@/components/common/ui/card';
import { ProgressBar } from '@/components/common/dashboard/progress-bar';
import { RecommendedQuests } from '@/components/common/dashboard/recom-quests';
import { StatsPanel } from '@/components/common/dashboard/stats-panel';
import {QuestsHeader} from '@/components/common/dashboard/quests-header';

export default function Home() {
  const user = {
    name: 'ioana',
    level: 5,
    currentXP: 120,
    nextLevelXP: 200,
    completedQuests: 12,
  };

  return (
    <div className="p-8 space-y-8">
      <StatsPanel
        name="ioana"
        level={5}
        completedQuests={12}
        currentXP={120}
        nextLevelXP={200}
        streak={7}
      />

      <Card>
        <CardHeader>
          <CardTitle>Progress to next level</CardTitle>
        </CardHeader>
        <CardContent>
         <ProgressBar
            current={120}
            max={200}
            questsCompleted={[
              { name: 'Intro to JS', xp: 20 },
              { name: 'Loops Challenge', xp: 50 },
              { name: 'Functions Mini Quest', xp: 80 },
            ]}
          />    
        </CardContent>
      </Card>
      <QuestsHeader />
      <RecommendedQuests />
    </div>
  );
}

