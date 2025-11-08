"use client";
import { useParams } from "next/navigation";

import { Button } from "@/components/common/ui/button";
import { QuestCard } from "@/components/quests/QuestCard";
import { QuestionCard } from "@/components/quests/QuestionCard";

import { useQuest } from "@/components/hooks/useQuest";
import { useQuestions } from "@/components/hooks/useQuestion";
import { useQuestLogic } from "@/components/hooks/useQuestLogic";
import { useCompleteQuest } from "@/api/quests";
import { GoBackButton } from "@/components/common/ui/goback-button";
import { FileCode, Send } from 'lucide-react';
import { StarsBackground } from "@/components/common/ui/stars";

export default function QuestPage() {
  const params = useParams();
  const questId = Number(params.questId);
  const category = "Next.js";

  const { data: quest } = useQuest(category, questId);
  const { data: questions } = useQuestions(category, questId);
  const {
    selectedAnswers,
    submitted,
    results,
    handleAnswerChange,
    handleSubmit,
  } = useQuestLogic();
  const completeQuestMutation = useCompleteQuest();

  if (!quest || !questions) return <div>Loading...</div>;

  const handleComplete = async () => {
    const res = handleSubmit(questions);
    const numCorrect = res.filter((r) => r.isCorrect).length;
    alert(`You got ${numCorrect} / ${questions.length} correct!`);

    const userId = Number(localStorage.getItem("userId"));
    if (userId) await completeQuestMutation.mutateAsync({ userId, questId });
  };

  return (
    <div
         className="relative min-h-screen w-full text-gray-900 dark:text-gray-100 
                    bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 
                    dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 overflow-hidden"
       >
    <StarsBackground />
    <div className="max-w-4xl mx-auto p-8">
      <GoBackButton className="mb-3"/>
      <QuestCard 
      quest={quest} 
      icon={<FileCode size={32} />}
      />
      
      {questions?.map((q: any, index: number) => {
        const result = results.find((r) => r.questionId === q.id);
        return (
          <QuestionCard
            key={q.id}
            index={index} 
            question={q}
            result={result}
            selectedAnswer={selectedAnswers[q.id]}
            onChange={(key) => handleAnswerChange(q.id, key)}
            submitted={submitted}
            xp={q.xp}
          />
        );
      })}
      <Button onClick={handleComplete} disabled={submitted} className="hover:bg-gray-400">
        {submitted ? "Completed" : "Complete Quest"}
        <Send className="h-4 w-4 mt-1.5"/>
      </Button>
    </div>
    </div>
  );
}
