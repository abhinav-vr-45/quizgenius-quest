
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { useQuiz } from "@/context/QuizContext";
import { ArrowLeft, Brain, Dices, FlaskConical, History, TerminalSquare, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const popularGenres = [
  { name: "Science", icon: <FlaskConical className="h-5 w-5" /> },
  { name: "History", icon: <History className="h-5 w-5" /> },
  { name: "Technology", icon: <TerminalSquare className="h-5 w-5" /> },
  { name: "Random", icon: <Dices className="h-5 w-5" /> },
];

const GenreSelection = () => {
  const [inputGenre, setInputGenre] = useState("");
  const { generateQuestions, isLoading } = useQuiz();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenreSelect = (genre: string) => {
    setInputGenre(genre);
  };

  const handleGenerateQuiz = async () => {
    if (!inputGenre.trim()) {
      toast({
        title: "Please enter a topic",
        description: "You need to specify a topic for your quiz",
        variant: "destructive",
      });
      return;
    }

    try {
      await generateQuestions(inputGenre);
      navigate("/quiz");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-b from-background to-quiz-light">
      <div className="max-w-2xl w-full">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          icon={<ArrowLeft />}
          className="mb-8"
        >
          Back to Home
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
            Choose Your Quiz Topic
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Enter any topic you're curious about or select from our suggestions
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <div className="relative mb-6">
            <input
              type="text"
              value={inputGenre}
              onChange={(e) => setInputGenre(e.target.value)}
              placeholder="Enter a topic..."
              className="w-full p-4 pl-12 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-quiz-primary"
            />
            <Brain className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            {inputGenre && (
              <button
                onClick={() => setInputGenre("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-quiz-primary" />
              Popular Topics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularGenres.map((genre) => (
                <button
                  key={genre.name}
                  onClick={() => handleGenreSelect(genre.name)}
                  className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all ${
                    inputGenre === genre.name
                      ? "bg-quiz-light border-2 border-quiz-primary"
                      : "bg-muted hover:bg-quiz-light border-2 border-transparent"
                  }`}
                >
                  <span className={inputGenre === genre.name ? "text-quiz-primary" : "text-muted-foreground"}>
                    {genre.icon}
                  </span>
                  <span className="font-medium">{genre.name}</span>
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handleGenerateQuiz}
            disabled={isLoading}
          >
            {isLoading ? "Generating Quiz..." : "Generate Quiz"}
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Powered by AI • Questions are generated uniquely for each quiz
        </p>
      </div>
    </div>
  );
};

export default GenreSelection;
