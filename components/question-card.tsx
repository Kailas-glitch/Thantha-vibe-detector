import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useMemo } from "react"; // Import useMemo
import { questions } from "@/lib/game-logic";

interface QuestionCardProps {
  questionData: typeof questions[0];
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (score: number) => void;
}

export function QuestionCard({ questionData, questionNumber, totalQuestions, onAnswerSubmit }: QuestionCardProps) {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  // Shuffle options using useMemo to ensure it only shuffles once per questionData change
  const shuffledOptions = useMemo(() => {
    return [...questionData.options].sort(() => Math.random() - 0.5);
  }, [questionData.options]);

  const handleSubmit = () => {
    if (selectedScore !== null) {
      onAnswerSubmit(selectedScore);
      setSelectedScore(null); // Reset for next question
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl text-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
          Question {questionNumber} of {totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Label htmlFor="question" className="text-xl font-semibold leading-snug block text-center text-gray-100">
          {questionData.question}
        </Label>
        <RadioGroup
          onValueChange={(value) => setSelectedScore(parseInt(value))}
          value={selectedScore !== null ? String(selectedScore) : undefined}
          className="space-y-3"
        >
          {shuffledOptions.map((option, index) => ( // Use shuffledOptions here
            <div
              key={index}
              className="flex items-center space-x-3 p-4 border border-white/30 rounded-lg cursor-pointer transition-all duration-200
                         hover:bg-white/20 hover:border-blue-400
                         data-[state=checked]:bg-blue-600/50 data-[state=checked]:border-blue-400 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-400"
              data-state={selectedScore === option.scoreValue ? 'checked' : 'unchecked'}
              onClick={() => setSelectedScore(option.scoreValue)}
            >
              <RadioGroupItem value={String(option.scoreValue)} id={`option-${questionNumber}-${index}`} className="text-blue-400 border-white/50 data-[state=checked]:text-blue-400 data-[state=checked]:bg-blue-400" />
              <Label htmlFor={`option-${questionNumber}-${index}`} className="flex-1 text-lg cursor-pointer text-gray-50">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="pt-6">
        <Button
          onClick={handleSubmit}
          className="w-full py-3 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg
                     hover:from-purple-600 hover:to-pink-600 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600"
          disabled={selectedScore === null}
        >
          {questionNumber === totalQuestions ? "Reveal My Thantha Vibe!" : "Next Question"}
        </Button>
      </CardFooter>
    </Card>
  );
}
