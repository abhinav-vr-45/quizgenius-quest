
import { createContext, useContext, useState, ReactNode } from "react";
import { generateQuiz } from "@/lib/quizGenerator";
import { Question } from "@/components/QuizCard";

interface QuizContextType {
  genre: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>;
  score: number;
  isLoading: boolean;
  error: string | null;
  setGenre: (genre: string) => void;
  generateQuestions: (genre: string) => Promise<void>;
  answerQuestion: (questionId: string, answerIndex: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateScore: () => number;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [genre, setGenre] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async (selectedGenre: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setGenre(selectedGenre);
      
      // For now, we'll use mock data. In a real app, this would call the backend
      const generatedQuestions = await generateQuiz(selectedGenre);
      
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setScore(0);
    } catch (err) {
      setError("Failed to generate quiz. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const answerQuestion = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = questions.length > 0 ? correctAnswers : 0;
    setScore(finalScore);
    return finalScore;
  };

  const resetQuiz = () => {
    setGenre("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setError(null);
  };

  return (
    <QuizContext.Provider
      value={{
        genre,
        questions,
        currentQuestionIndex,
        answers,
        score,
        isLoading,
        error,
        setGenre,
        generateQuestions,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        calculateScore,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
