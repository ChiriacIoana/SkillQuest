import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/common/ui/card";
import HintCard from "./HintCard";

export function QuestionCard({
  index,
  question,
  result,
  selectedAnswer,
  onChange,
  submitted,
  onOpenChat,
  xp,
}: {
  index: number;
  question: any;
  result: any;
  selectedAnswer: string | undefined;
  onChange: (key: string) => void;
  submitted: boolean;
  onOpenChat: () => void;
  xp: number;
}) {
  const answers = JSON.parse(question.answersJson);

  return (
    <Card className="mb-4 shadow-md bg-gray-50 dark:bg-gray-900 p-8">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Question {index + 1}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="mb-1">{question.question}</p>

        <HintCard
          className="p-1 ml-0 mb-1"
          questionText={question.question}
          backendUrl={process.env.NEXT_PUBLIC_BACKEND_URL!}
          onOpenChat={onOpenChat}
        />

        <div className="space-y-2">
          {Object.entries(answers).map(([key, answer]: any) => {
            let bg = "";
            if (submitted) {
              if (key === result?.correctKey)
                bg = "bg-green-100 dark:bg-green-900";
              else if (key === result?.userKey && key !== result?.correctKey)
                bg = "bg-red-100 dark:bg-red-900";
            }

            return (
              <label
                key={key}
                className={`flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-800 transition-colors ${bg}`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={key}
                  checked={selectedAnswer === key}
                  onChange={() => onChange(key)}
                  disabled={submitted}
                  className="w-4 h-4"
                />
                <span>{answer}</span>
              </label>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
