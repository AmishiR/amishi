"use client";

import { useEffect, useState } from "react";

type ScoreVisualizationProps = {
  score: number;
  percentage: number;
  label: string;
  color: string;
};

export default function ScoreVisualization({
  score,
  percentage,
  label,
  color,
}: ScoreVisualizationProps) {
  const [offset, setOffset] = useState(0);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - percentage) / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage, circumference]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${color}`}>{score}</span>
          <span className="text-sm text-gray-500">{label}</span>
        </div>
      </div>
    </div>
  );
}
