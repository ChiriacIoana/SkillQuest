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
import { Code2 } from "lucide-react";

export default function QuestPage() {
  const params = useParams();
  const questId = Number(params.questId);
  const category = "HTML";

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
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div className="max-w-4xl mx-auto p-8">
      <GoBackButton className="mb-3"/>
      <QuestCard 
      quest={quest} 
      icon={<Code2 size={32} />} 
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
          />
        );
      })}
      <Button onClick={handleComplete} disabled={submitted}>
        {submitted ? "Completed" : "Complete Quest"}
      </Button>
    </div>
    </div>
  );
}
