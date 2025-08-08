'use client'

import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MaturityRating } from '@/lib/game-logic';
import html2canvas from 'html2canvas';

interface ThanthaCertificateProps {
  userName: string;
  score: number;
  rating: MaturityRating;
  onPlayAgain: () => void;
}

export function ThanthaCertificate({ userName, score, rating, onPlayAgain }: ThanthaCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false); // New state for capture process
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleDownloadCertificate = async () => {
    if (certificateRef.current) {
      setIsCapturing(true); // Hide buttons
      // Give React a moment to apply the 'hidden' class
      await new Promise(resolve => setTimeout(resolve, 50));

      try {
        const canvas = await html2canvas(certificateRef.current, {
          scale: 2,
          useCORS: true,
          logging: true,
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `Thantha_Vibe_Certificate_${userName.replace(/\s/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('Certificate download initiated successfully.');
      } catch (error) {
        console.error('Error generating or downloading certificate:', error);
        alert('Failed to download certificate. Please check the console for errors.');
      } finally {
        setIsCapturing(false); // Show buttons again
      }
    } else {
      console.warn('Certificate ref is null, cannot download.');
    }
  };

  return (
    <div
      ref={certificateRef}
      className="relative w-full max-w-xl mx-auto p-8 bg-gradient-to-br from-gray-800 to-gray-950 border-4 border-yellow-400 rounded-xl shadow-2xl text-white font-serif overflow-hidden"
    >
      {/* Background pattern/texture */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/placeholder.svg?height=100&width=100&query=subtle+geometric+pattern)' }}></div>

      {/* Top Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center text-black font-bold text-xl uppercase tracking-wider shadow-md">
        Official Thantha Vibe Certification
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center pt-16 pb-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
          CERTIFICATE OF THANTHA VIBE
        </h1>
        <p className="text-lg text-gray-300">This certifies that</p>
        <h2 className="text-5xl font-bold text-blue-400 drop-shadow-md">
          {userName.toUpperCase()}
        </h2>
        <p className="text-lg text-gray-300">has been officially assessed and awarded the prestigious title of</p>
        <div className="flex items-center justify-center space-x-4">
          <span className="text-7xl">{rating.emoji}</span>
          <h3 className="text-6xl font-extrabold text-orange-400 leading-tight drop-shadow-lg">
            {rating.title}
          </h3>
        </div>
        <p className="text-lg text-gray-300">with an impressive Thantha Vibe Score of</p>
        <p className="text-5xl font-bold text-green-400 drop-shadow-md">{score} / 10</p>
        <p className="text-md text-gray-400 italic max-w-md mx-auto">
          "{rating.roast}"
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pt-8 border-t border-gray-700 mt-6">
        <p className="text-sm text-gray-400">Issued on: {today}</p>
        <p className="text-sm text-gray-400 mt-2">By the Grand Thantha Vibe Council</p>
        <div className={isCapturing ? 'hidden' : 'mt-6 flex flex-col gap-4'}>
          <Button
            onClick={handleDownloadCertificate}
            className="py-3 px-8 text-lg font-bold bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg
                       hover:from-green-600 hover:to-teal-600 transition-all duration-200"
          >
            Download Certificate
          </Button>
          <Button
            onClick={onPlayAgain}
            className="py-3 px-8 text-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg
                       hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
          >
            Play Again & Earn More Wisdom!
          </Button>
        </div>
      </div>

      {/* Decorative Seal (optional, could be an SVG) */}
      <div className="absolute bottom-8 left-8 w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-4xl text-black">📜</span>
      </div>
    </div>
  );
}
