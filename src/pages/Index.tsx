
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { ArrowRight, BrainCircuit } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-background to-quiz-light">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center animate-pulse-slow">
            <BrainCircuit className="h-12 w-12 text-quiz-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-heading">
          Welcome to QuizGenius
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-xl mx-auto">
          Test your knowledge with AI-powered quizzes on any topic you can imagine!
        </p>
        
        <Button 
          variant="primary" 
          size="lg" 
          icon={<ArrowRight />}
          iconPosition="right"
          onClick={() => navigate("/genre")}
          className="mx-auto"
        >
          Start Quiz
        </Button>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/80 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-2">Any Topic</h3>
            <p className="text-muted-foreground">Choose from endless quiz topics or create your own</p>
          </div>
          
          <div className="bg-white/80 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-2">AI-Generated</h3>
            <p className="text-muted-foreground">Unique questions created by artificial intelligence</p>
          </div>
          
          <div className="bg-white/80 p-6 rounded-xl shadow-md">
            <h3 className="font-semibold text-lg mb-2">Learn & Grow</h3>
            <p className="text-muted-foreground">Challenge yourself and expand your knowledge</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
