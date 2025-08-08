'use client'

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MaturityRating } from "@/lib/game-logic";
import { AnalogMeter } from "./analog-meter";
import { ThanthaCertificate } from "./thantha-certificate";

interface ResultDisplayProps {
  score: number;
  rating: MaturityRating;
  onPlayAgain: () => void;
  userName: string;
}

export function ResultDisplay({ score, rating, onPlayAgain, userName }: ResultDisplayProps) {
  const [showCertificate, setShowCertificate] = useState(false);

  if (showCertificate) {
    return (
      <ThanthaCertificate
        userName={userName}
        score={score}
        rating={rating}
        onPlayAgain={() => {
          setShowCertificate(false); // Hide certificate before playing again
          onPlayAgain();
        }}
      />
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto text-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl text-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-400">
          The Verdict is In!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-8xl animate-bounce-in">{rating.emoji}</div>
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 leading-tight">
          {rating.title}
        </h2>
        <div className="w-full flex flex-col items-center bg-black/30 p-4 rounded-lg border border-white/10">
          <AnalogMeter value={score} max={10} />
          <div className="text-lg text-gray-300 mt-4 font-semibold">
            Your Thantha Score: <span className="text-blue-400 text-2xl">{score}</span> / 10
          </div>
        </div>
        <p className="text-lg text-gray-200 italic leading-relaxed">
          {userName ? `${userName} is a ${rating.title.toLowerCase()}! ${rating.roast}` : rating.roast}
        </p>
      </CardContent>
      <CardFooter className="pt-6 flex flex-col gap-4">
        <Button
          onClick={() => setShowCertificate(true)}
          className="w-full py-3 text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-lg shadow-lg
                     hover:from-yellow-600 hover:to-orange-600 transition-all duration-200"
        >
          View My Official Certificate!
        </Button>
        <Button
          onClick={onPlayAgain}
          className="w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg
                     hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
        >
          Play Again, You Old Soul (or Youngster)!
        </Button>
      </CardFooter>
    </Card>
  );
}
