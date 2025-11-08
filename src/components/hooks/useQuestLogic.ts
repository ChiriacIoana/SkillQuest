import { useState } from "react";

export function useQuestLogic() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleAnswerChange = (questionId: number, answerKey: string) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answerKey }));
  };

  const handleSubmit = (questions: any[]) => {
    const res = questions.map(q => {
      const answers = JSON.parse(q.answersJson);
      const keys = Object.keys(answers);
      const correctKey = keys[q.correctIndex];
      const userKey = selectedAnswers[q.id];
      return {
        questionId: q.id,
        question: q.question,
        answers,
        correctKey,
        userKey,
        isCorrect: userKey === correctKey,
      };
    });

    setResults(res);
    setSubmitted(true);

    return res;
  };

  return { selectedAnswers, submitted, results, handleAnswerChange, handleSubmit };
}
