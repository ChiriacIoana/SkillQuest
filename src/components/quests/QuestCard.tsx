import { Card, CardHeader, CardTitle, CardContent } from "@/components/common/ui/card";
import { Zap } from "lucide-react";
import React from "react";

interface QuestCardProps {
  quest: any;
  icon?: React.ReactNode; 
}

export function QuestCard({ quest, icon }: QuestCardProps) {
  return (
    <Card className="mb-6 bg-gray-50 dark:bg-gray-900 p-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl flex items-center gap-3">
          {icon || <DefaultIcon />} 
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
  );
}

function DefaultIcon() {
  return <span className="w-8 h-8 inline-block bg-gray-300 rounded-full" />;
}
