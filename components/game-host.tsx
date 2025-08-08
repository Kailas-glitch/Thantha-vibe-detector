'use client'

import { useState } from "react";
import { allQuestions, calculateMaturityRating, MaturityRating, getRandomQuestions, Question } from "@/lib/game-logic";
import { QuestionCard } from "./question-card";
import { ResultDisplay } from "./result-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Import Input component
import { Label } from "@/components/ui/label"; // Import Label component

export function GameHost() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedScores, setSelectedScores] = useState<number[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalRating, setFinalRating] = useState<MaturityRating | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [userName, setUserName] = useState(''); // New state for user's name

  const handleStartGame = () => {
    if (userName.trim() === '') {
      alert('Please enter your name to start the game!');
      return;
    }
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedScores([]);
    setGameFinished(false);
    setFinalScore(0);
    setFinalRating(null);
    setCurrentQuestions(getRandomQuestions(5));
  };

  const handleAnswerSubmit = (score: number) => {
    const newScores = [...selectedScores, score];
    setSelectedScores(newScores);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const { score: calculatedScore, rating } = calculateMaturityRating(newScores);
      setFinalScore(calculatedScore);
      setFinalRating(rating);
      setGameFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 p-4 sm:p-8">
      <h1 className="text-6xl sm:text-7xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 drop-shadow-lg">
        Thantha Vibe Detector
      </h1>

      {!gameStarted && (
        <Card className="w-full max-w-md mx-auto text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl text-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              Welcome, Future Sage!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-100 leading-relaxed">
              Prepare to have your "Thantha Vibe" detected! Enter your name below to begin your journey to ultimate elder energy.
            </p>
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-lg text-gray-200">Your Name:</Label>
              <Input
                id="userName"
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-md text-gray-300 italic">
              Are you a 🍼 Kunu vava, a 🍵 Upcoming thantha, or a true 👴 Certified Thantha? Let's find out!
            </p>
            <Button
              onClick={handleStartGame}
              className="w-full py-3 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg
                         hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
            >
              Start the Vibe Detection!
            </Button>
          </CardContent>
        </Card>
      )}

      {gameStarted && !gameFinished && currentQuestions.length > 0 && (
        <QuestionCard
          key={currentQuestionIndex}
          questionData={currentQuestions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={currentQuestions.length}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}

      {gameFinished && finalRating && (
        <ResultDisplay
          score={finalScore}
          rating={finalRating}
          onPlayAgain={handleStartGame}
          userName={userName}
        />
      )}
    </div>
  );
}
