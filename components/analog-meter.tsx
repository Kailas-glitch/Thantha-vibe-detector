import React from 'react';

interface AnalogMeterProps {
  value: number; // Current score (0-10)
  max: number;   // Max score (always 10 for us)
}

export function AnalogMeter({ value, max }: AnalogMeterProps) {
  const normalizedValue = Math.max(0, Math.min(value, max)); // Clamp value between 0 and max
  const percentage = normalizedValue / max; // 0 to 1
  // Map percentage to a rotation angle from -90deg (0%) to +90deg (100%) for a half-circle sweep
  const rotationAngle = (percentage * 180) - 90;

  const yOffset = 5; // Amount to lower the meter by (adjust this value for more or less lowering)

  const centerX = 100;
  const centerY = 90 + yOffset; // Base Y-coordinate for the arc's center, shifted down
  const radius = 80; // Slightly smaller radius for the main arc
  const textRadius = radius + 10; // Distance for score labels from center

  const degToRad = (deg: number) => deg * Math.PI / 180;

  // Scores to display as labels on the meter - NOW ALL NUMBERS FROM 0 TO 10
  const scoreLabels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="relative w-48 h-28 mx-auto overflow-hidden">
      <svg className="absolute inset-0" viewBox="0 0 200 110">
        {/* Background Arc (dark blue) */}
        <path
          d={`M 20 ${90 + yOffset} A 80 80 0 0 1 180 ${90 + yOffset}`} // Adjusted Y-coordinates
          fill="none"
          stroke="#003366" // Dark blue from dashboard
          strokeWidth="8"
          strokeLinecap="round"
        />

        {/* Active Arc (bright blue gradient) */}
        <path
          d={`M 20 ${90 + yOffset} A 80 80 0 0 1 180 ${90 + yOffset}`} // Adjusted Y-coordinates
          fill="none"
          stroke="#0099ff" // Bright blue from dashboard
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="251.32" // Circumference of a 80 radius half-circle (2 * PI * 80 / 2)
          strokeDashoffset={251.32 - (percentage * 251.32)}
        />

        {/* Needle */}
        <g transform={`translate(${centerX}, ${centerY})`}> {/* Move origin to bottom center */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-70" // Length of the needle
            stroke="red" // Changed to red for better visibility against blue
            strokeWidth="3"
            strokeLinecap="round"
            style={{
              transformOrigin: '0 0',
              transition: 'transform 0.7s ease-out',
              transform: `rotate(${rotationAngle}deg)`,
            }}
          />
          <circle cx="0" cy="0" r="6" fill="red" /> {/* Pivot point */}
        </g>

        {/* Score Labels */}
        {scoreLabels.map((s) => {
          // Calculate angle for each score (0-10), from 180deg (0 score) to 0deg (10 score)
          const angleDegrees = 180 - (s / max) * 180;
          const angleRadians = degToRad(angleDegrees);

          // Calculate text position
          const textX = centerX + textRadius * Math.cos(angleRadians);
          const textY = centerY - textRadius * Math.sin(angleRadians);

          // Adjust text anchor for better readability around the arc
          let textAnchor: 'start' | 'middle' | 'end' = 'middle';
          if (angleDegrees > 135) textAnchor = 'end'; // Left side of the meter
          else if (angleDegrees < 45) textAnchor = 'start'; // Right side of the meter

          return (
            <text
              key={s}
              x={textX}
              y={textY}
              textAnchor={textAnchor}
              alignmentBaseline="middle" // Vertically center text
              fontSize="10"
              className="fill-white font-semibold" // White text for dashboard look
            >
              {s}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
