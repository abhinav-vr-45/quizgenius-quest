
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import QuizCard from "@/components/QuizCard";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Quiz = () => {
  const {
    genre,
    questions,
    currentQuestionIndex,
    answers,
    isLoading,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    calculateScore,
  } = useQuiz();
  
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if no questions are loaded
    if (!isLoading && questions.length === 0) {
      navigate("/genre");
      toast.error("Please select a topic first");
    }
  }, [questions, isLoading, navigate]);

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const hasAnsweredCurrent = currentQuestion ? answers[currentQuestion.id] !== undefined : false;
  const hasAnsweredAll = questions.length > 0 && 
    questions.every(question => answers[question.id] !== undefined);

  const handleFinish = () => {
    calculateScore();
    navigate("/results");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-quiz-light">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-quiz-primary border-t-transparent mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">Generating Your Quiz</h2>
          <p className="text-muted-foreground">Creating questions about {genre}...</p>
        </div>
      </div>
    );
  }

  // Show nothing if no questions (will redirect)
  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col py-8 px-4 bg-gradient-to-b from-background to-quiz-light">
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/genre")}
            icon={<ArrowLeft />}
          >
            Change Topic
          </Button>
          <h2 className="text-xl font-semibold">
            Quiz: <span className="text-quiz-primary">{genre}</span>
          </h2>
        </div>

        <ProgressBar 
          current={currentQuestionIndex + 1} 
          total={questions.length} 
          className="mb-8"
        />

        <QuizCard
          question={currentQuestion}
          onAnswer={answerQuestion}
          selectedAnswer={answers[currentQuestion.id]}
          className="mb-8"
        />

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={isFirstQuestion}
            icon={<ArrowLeft />}
          >
            Previous
          </Button>

          {isLastQuestion ? (
            <Button
              variant="primary"
              onClick={handleFinish}
              disabled={!hasAnsweredAll}
              icon={<CheckCircle2 />}
              iconPosition="right"
            >
              Finish Quiz
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={nextQuestion}
              disabled={!hasAnsweredCurrent}
              icon={<ArrowRight />}
              iconPosition="right"
            >
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
