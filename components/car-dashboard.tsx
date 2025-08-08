import React from 'react';

interface CarDashboardProps {
  speed: number; // km/h
  fuelLevel: number; // 0-100
  temperature: number; // C
  powerMode: 'OFF' | 'CHG' | 'ECO' | 'PWR';
  time: string;
  totalDistance: number; // km
  tripADistance: number; // km
  currentFuelEfficiency: number; // km/L
  radarReady: boolean;
  evMode: boolean;
  holdActive: boolean;
  readyIndicator: boolean;
  gear: string;
}

export function CarDashboard({
  speed = 120,
  fuelLevel = 75,
  temperature = 50, // 0-100 scale for gauge
  powerMode = 'ECO',
  time = '5:05',
  totalDistance = 625,
  tripADistance = 89.4,
  currentFuelEfficiency = 0.0,
  radarReady = true,
  evMode = true,
  holdActive = true,
  readyIndicator = true,
  gear = 'D',
}: CarDashboardProps) {
  const getPowerNeedleRotation = (mode: string) => {
    switch (mode) {
      case 'OFF': return -90; // Corresponds to 0 on a -90 to 90 scale
      case 'CHG': return -45;
      case 'ECO': return 0;
      case 'PWR': return 45;
      default: return 0;
    }
  };

  const getFuelNeedleRotation = (level: number) => {
    // Map 0-100 to -90 to 90 degrees
    return (level / 100) * 180 - 90;
  };

  const getTempNeedleRotation = (temp: number) => {
    // Map 0-100 to -90 to 90 degrees
    return (temp / 100) * 180 - 90;
  };

  return (
    <div className="relative w-[600px] h-[350px] bg-black rounded-lg shadow-2xl overflow-hidden font-mono text-white p-4 flex items-center justify-center">
      {/* Background glow/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-30"></div>

      {/* Top Indicators */}
      <div className="absolute top-4 left-0 right-0 flex justify-between px-6 text-sm">
        <div className="flex items-center space-x-3">
          {radarReady && (
            <div className="flex flex-col items-center text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <span>Radar Ready</span>
            </div>
          )}
          {evMode && (
            <div className="text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <span>EV</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {holdActive && (
            <div className="text-yellow-400 flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              <span>HOLD</span>
            </div>
          )}
          <span className="text-xl font-bold">{time}</span>
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
      </div>

      <div className="flex items-end justify-between w-full h-full px-4 pb-4">
        {/* Left Gauge: PWR/ECO/CHG */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="absolute inset-0" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="powerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f" />
                <stop offset="50%" stopColor="#ff0" />
                <stop offset="100%" stopColor="#f00" />
              </linearGradient>
            </defs>
            {/* Background Arc */}
            <path
              d="M 20 180 A 160 160 0 0 1 180 180"
              fill="none"
              stroke="#003366"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Active Arc (simulated) */}
            <path
              d="M 20 180 A 160 160 0 0 1 180 180"
              fill="none"
              stroke="url(#powerGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="502.65" // Circumference of a 160 radius half-circle
              strokeDashoffset={502.65 - (getPowerNeedleRotation(powerMode) + 90) / 180 * 502.65}
            />
            {/* Labels */}
            <text x="100" y="100" textAnchor="middle" className="text-blue-400 font-bold text-xl">
              <tspan x="100" dy="-10">PWR</tspan>
              <tspan x="100" dy="20">ECO</tspan>
              <tspan x="100" dy="20">CHG</tspan>
              <tspan x="100" dy="20">OFF</tspan>
            </text>
            {/* Needle */}
            <g transform={`translate(100, 180) rotate(${getPowerNeedleRotation(powerMode)})`}>
              <line x1="0" y1="0" x2="0" y2="-70" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="0" r="6" fill="white" />
            </g>
          </svg>
        </div>

        {/* Center Digital Display & Speedometer */}
        <div className="relative w-[300px] h-[250px] flex flex-col items-center justify-end pb-4">
          {/* Speedometer Arc */}
          <svg className="absolute top-0 left-0 right-0 h-[200px]" viewBox="0 0 300 150">
            <path
              d="M 20 140 A 130 130 0 0 1 280 140"
              fill="none"
              stroke="#003366"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M 20 140 A 130 130 0 0 1 280 140"
              fill="none"
              stroke="#0099ff"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="408.4" // Circumference of a 130 radius half-circle
              strokeDashoffset={408.4 - (speed / 240) * 408.4}
            />
            {/* Speed Labels */}
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240].map((s, i) => {
              const angle = (s / 240) * 180 - 90; // -90 to 90 degrees
              const rad = angle * Math.PI / 180;
              const x = 150 + 110 * Math.cos(rad);
              const y = 140 + 110 * Math.sin(rad);
              return (
                <text key={s} x={x} y={y} textAnchor="middle" alignmentBaseline="middle" fontSize="12" fill="white">
                  {s}
                </text>
              );
            })}
            {/* Needle */}
            <g transform={`translate(150, 140) rotate(${(speed / 240) * 180 - 90})`}>
              <line x1="0" y1="0" x2="0" y2="-100" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="0" r="8" fill="white" />
            </g>
          </svg>

          {/* Digital Readouts */}
          <div className="absolute bottom-0 w-full text-center space-y-1">
            <div className="text-sm text-gray-400">Total Average</div>
            <div className="text-4xl font-bold text-green-400">{currentFuelEfficiency.toFixed(1)}<span className="text-xl">km/L</span></div>
            <div className="text-lg text-blue-300">{totalDistance}km</div>
            <div className="text-xs text-gray-500">Hold <span className="text-blue-400">OK</span> to Reset</div>
            <div className="flex justify-center items-center space-x-2 mt-2">
              {readyIndicator && <span className="text-green-400 text-sm border border-green-400 px-2 py-0.5 rounded">READY</span>}
              <span className="text-2xl font-bold">{gear}</span>
            </div>
            <div className="flex justify-between w-full px-8 text-sm mt-2">
              <span>Outside {temperature}°C</span>
              <span>TRIP A {tripADistance}km</span>
            </div>
          </div>
        </div>

        {/* Right Gauge: Fuel & Temp */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          <svg className="absolute inset-0" viewBox="0 0 200 200">
            {/* Fuel Arc */}
            <path
              d="M 20 180 A 160 160 0 0 1 180 180"
              fill="none"
              stroke="#003366"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 20 180 A 160 160 0 0 1 180 180"
              fill="none"
              stroke="#0099ff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="502.65"
              strokeDashoffset={502.65 - (fuelLevel / 100) * 502.65}
            />
            {/* Fuel Labels */}
            <text x="100" y="100" textAnchor="middle" className="text-blue-400 font-bold text-xl">
              <tspan x="100" dy="-10">F</tspan>
              <tspan x="100" dy="20">E</tspan>
            </text>
            {/* Fuel Needle */}
            <g transform={`translate(100, 180) rotate(${getFuelNeedleRotation(fuelLevel)})`}>
              <line x1="0" y1="0" x2="0" y2="-70" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="0" r="6" fill="white" />
            </g>

            {/* Temperature Arc (smaller, below fuel) */}
            <path
              d="M 40 180 A 140 140 0 0 1 160 180"
              fill="none"
              stroke="#003366"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 40 180 A 140 140 0 0 1 160 180"
              fill="none"
              stroke="#ff0000"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="439.8"
              strokeDashoffset={439.8 - (temperature / 100) * 439.8}
            />
            {/* Temp Labels */}
            <text x="100" y="100" textAnchor="middle" className="text-blue-400 font-bold text-xl">
              <tspan x="100" dy="40">H</tspan>
              <tspan x="100" dy="20">C</tspan>
            </text>
            {/* Temp Needle */}
            <g transform={`translate(100, 180) rotate(${getTempNeedleRotation(temperature)})`}>
              <line x1="0" y1="0" x2="0" y2="-50" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <circle cx="0" cy="0" r="4" fill="white" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
