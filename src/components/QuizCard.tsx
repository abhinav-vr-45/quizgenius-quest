
import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { Check, X } from "lucide-react";

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizCardProps {
  question: Question;
  onAnswer: (questionId: string, answerIndex: number) => void;
  showResults?: boolean;
  selectedAnswer?: number;
  className?: string;
}

const QuizCard = ({
  question,
  onAnswer,
  showResults = false,
  selectedAnswer,
  className,
}: QuizCardProps) => {
  const [selected, setSelected] = useState<number | undefined>(selectedAnswer);

  const handleSelect = (index: number) => {
    if (showResults) return;
    
    setSelected(index);
    onAnswer(question.id, index);
  };

  return (
    <div className={cn("quiz-card", className)}>
      <h3 className="text-xl font-semibold mb-6">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={cn(
              "answer-button",
              selected === index && "selected",
              showResults && index === question.correctAnswer && "correct",
              showResults && selected === index && selected !== question.correctAnswer && "incorrect"
            )}
            onClick={() => handleSelect(index)}
            disabled={showResults}
          >
            <div className="flex items-start">
              <div className="flex-1">
                <span className="font-medium">{option}</span>
              </div>
              {showResults && (
                <div className="flex-shrink-0 ml-2">
                  {index === question.correctAnswer ? (
                    <Check className="text-green-500" />
                  ) : selected === index ? (
                    <X className="text-red-500" />
                  ) : null}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
