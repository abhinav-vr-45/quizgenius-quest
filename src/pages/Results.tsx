
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import Button from "@/components/Button";
import QuizCard from "@/components/QuizCard";
import { Home, RotateCcw, Trophy, Check, X } from "lucide-react";
import { toast } from "sonner";

const Results = () => {
  const { genre, questions, answers, score, calculateScore, resetQuiz } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate score when component mounts
    calculateScore();
    
    // Redirect if no questions are loaded
    if (questions.length === 0) {
      navigate("/genre");
      toast.error("Please complete a quiz first");
    }
  }, [questions, navigate, calculateScore]);

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding!";
    if (percentage >= 70) return "Good job!";
    if (percentage >= 50) return "Nice try!";
    return "Keep practicing!";
  };

  const handleRestart = () => {
    resetQuiz();
    navigate("/genre");
  };

  if (questions.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex flex-col py-8 px-4 bg-gradient-to-b from-background to-quiz-light">
      <div className="max-w-3xl w-full mx-auto">
        <div className="text-center mb-12">
          <div className="mb-6 inline-flex p-4 rounded-full bg-gradient-to-r from-quiz-primary to-quiz-secondary">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
            Quiz Completed!
          </h1>
          
          <p className="text-xl font-medium mb-2">
            You scored <span className="text-quiz-primary font-bold">{score}/{questions.length}</span>
          </p>
          
          <p className="text-muted-foreground mb-4">
            {getScoreMessage()}
          </p>

          <div className="w-full max-w-xs mx-auto h-4 rounded-full bg-muted overflow-hidden mb-8">
            <div
              className={`h-full ${
                percentage >= 70 ? "bg-green-500" : percentage >= 40 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Summary</h2>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="bg-quiz-light rounded-lg p-4 flex-1 text-center">
              <p className="text-sm text-muted-foreground mb-1">Topic</p>
              <p className="font-medium">{genre}</p>
            </div>
            
            <div className="bg-quiz-light rounded-lg p-4 flex-1 text-center flex flex-col">
              <p className="text-sm text-muted-foreground mb-1">Correct Answers</p>
              <div className="flex items-center justify-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <p className="font-medium">{score}</p>
              </div>
            </div>
            
            <div className="bg-quiz-light rounded-lg p-4 flex-1 text-center">
              <p className="text-sm text-muted-foreground mb-1">Incorrect Answers</p>
              <div className="flex items-center justify-center gap-2">
                <X className="h-5 w-5 text-red-500" />
                <p className="font-medium">{questions.length - score}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-6">
          <h2 className="text-xl font-semibold">Review Questions</h2>
          
          {questions.map((question, index) => (
            <QuizCard
              key={question.id}
              question={question}
              onAnswer={() => {}}
              showResults={true}
              selectedAnswer={answers[question.id]}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            icon={<Home />}
          >
            Go to Home
          </Button>
          
          <Button
            variant="primary"
            onClick={handleRestart}
            icon={<RotateCcw />}
          >
            Try Another Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
