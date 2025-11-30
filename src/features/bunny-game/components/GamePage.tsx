import React from 'react';
import { Play, RotateCcw, Trash2 } from 'lucide-react';
import LevelCompleteModal from './LevelCompleteModal';
import type { Level, Position, Command } from '../types/index';

interface GamePageProps {
  level: Level;
  levels: Level[];
  bunnyPos: Position;
  commands: Command[];
  currentStep: number;
  isRunning: boolean;
  gameWon: boolean;
  gridSize: number;
  catapultAnimation: { active: boolean; x: number; y: number; } | null;
  movementAnimation: { active: boolean; startX: number; startY: number; endX: number; endY: number; } | null;
  onNavigate: (page: string) => void;
  onAddCommand: (command: Command) => void;
  onRemoveLastCommand: () => void;
  onClearCommands: () => void;
  onExecuteCommands: () => void;
  onResetGame: () => void;
  onNextLevel: () => void;
  onPrevLevel: () => void;
}

const GamePage: React.FC<GamePageProps> = (props) => {
  const {
    level,
    levels,
    bunnyPos,
    commands,
    currentStep,
    isRunning,
    gameWon,
    gridSize,
    catapultAnimation,
    movementAnimation,
    onNavigate,
    onRemoveLastCommand,
    onClearCommands,
    onExecuteCommands,
    onResetGame,
    onNextLevel,
    onPrevLevel
  } = props;
  
  const getObstacleAtPosition = (x: number, y: number) => {
    if (!level.obstacles) return null;
    return level.obstacles.find(obstacle => obstacle.x === x && obstacle.y === y);
  };
  
  const getFlyingAtPosition = (x: number, y: number) => {
    if (!level.flying) return null;
    return level.flying.find(flying => flying.x === x && flying.y === y);
  };

  const commandIcons = {
    up: <span className="text-white text-xl sm:text-2xl bg-red-500 p-1.5 sm:p-2 rounded">↑</span>,
    down: <span className="text-white text-xl sm:text-2xl bg-blue-500 p-1.5 sm:p-2 rounded">↓</span>,
    left: <span className="text-white text-xl sm:text-2xl bg-green-500 p-1.5 sm:p-2 rounded">←</span>,
    right: <span className="text-white text-xl sm:text-2xl bg-orange-500 p-1.5 sm:p-2 rounded">→</span>
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-blue-50 p-3 sm:p-6 lg:p-8">
      <style>{`
        @keyframes catapult-launch {
          0% {
            transform: scale(1);
            -webkit-transform: scale(1);
          }
          10% {
            transform: scale(0.8);
            -webkit-transform: scale(0.8);
          }
          25% {
            transform: scale(1.2) translateY(-20px);
            -webkit-transform: scale(1.2) translateY(-20px);
          }
          100% {
            transform: scale(1) translateY(0);
            -webkit-transform: scale(1) translateY(0);
          }
        }
        
        @keyframes particle-effect {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
          }
        }
        
        @keyframes bunny-hop {
          0% {
            transform: translate(0, 0) scale(0.9, 1.1) rotate(0deg);
          }
          30% {
            transform: translate(50%, -30%) scale(1.1, 0.9) rotate(5deg);
          }
          70% {
            transform: translate(100%, -10%) scale(1.15, 0.85) rotate(-5deg);
          }
          100% {
            transform: translate(100%, 0) scale(1, 1) rotate(0deg);
          }
        }
        
        .animate-catapult-launch {
          animation: catapult-launch 1s ease-out;
        }
        
        .animate-bunny-hop {
          animation: bunny-hop 0.4s cubic-bezier(0.42, 0, 0.58, 1);
        }
      `}</style>
      
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 text-green-800 flex items-center justify-center gap-2 sm:gap-4">
          <img src="/img/bunny1.png" alt="Bunny" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 object-contain" />
          Code Bunny
        </h1>
        <p className="text-center text-gray-700 text-sm sm:text-base mb-3 sm:mb-6">Ajută iepurașul să ajungă la morcov!</p>

        {/* Navigation Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4 mb-3 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            {/* Back Button - Full width on mobile */}
            <button
              onClick={() => onNavigate('menu')}
              className="w-full sm:w-auto bg-gray-500 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-gray-600 font-bold text-sm sm:text-base order-3 sm:order-1"
            >
              ← Meniu
            </button>
            
            {/* Level Navigation - First on mobile */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-center order-1 sm:order-2">
              <button
                onClick={onPrevLevel}
                disabled={level.id === 1}
                className="px-2 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 text-xs sm:text-base"
              >
                ← Anterior
              </button>
              <div className="text-center flex-1 sm:flex-initial sm:min-w-[180px]">
                <p className="text-base sm:text-xl font-bold text-gray-800">{level.name}</p>
                <p className="text-xs sm:text-sm text-gray-600">Nivel {level.id} din {levels.length}</p>
              </div>
              <button
                onClick={onNextLevel}
                disabled={level.id === levels.length}
                className="px-2 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 text-xs sm:text-base"
              >
                Următor →
              </button>
            </div>

            {/* Action Buttons - Second on mobile */}
            <div className="flex gap-2 w-full sm:w-auto order-2 sm:order-3">
              <button
                onClick={onResetGame}
                disabled={isRunning}
                className="flex-1 sm:flex-initial bg-orange-500 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Reset</span>
              </button>
              <button
                onClick={onExecuteCommands}
                disabled={isRunning || commands.length === 0}
                className="flex-1 sm:flex-initial bg-green-500 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base font-bold"
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                Rulează
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Game Board */}
            <div className="flex flex-col items-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Tabla de Joc</h2>
              <div className="bg-[#87AD3B] rounded-lg sm:rounded-xl border-2 sm:border-4 border-yellow-950 shadow-inner p-1 sm:p-2 grid grid-cols-8 gap-0.5 sm:gap-1 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px]">
                {[...Array(gridSize * gridSize)].map((_, i) => {
                  const x = i % gridSize;
                  const y = Math.floor(i / gridSize);
                  const isBunny = bunnyPos.x === x && bunnyPos.y === y;
                  const isCarrot = level.carrot.x === x && level.carrot.y === y;

                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`aspect-square flex items-center justify-center bg-cover bg-center rounded-sm sm:rounded-md border border-black
                        ${(x + y) % 2 === 0 ? "bg-[url('/box1.png')]" : "bg-[url('/box2.png')]"}
                        ${isBunny && isCarrot ? 'bg-yellow-200/50' : ''}`}
                    >
                      {isBunny && (
                        <div className={`inline-block origin-center ${catapultAnimation?.active && catapultAnimation.x === x && catapultAnimation.y === y ? 'animate-catapult-launch' : ''} ${movementAnimation?.active && movementAnimation.startX === x && movementAnimation.startY === y ? 'animate-bunny-hop' : ''}`}>
                          <img src="/img/bunny1.png" alt="Bunny" className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain" />
                        </div>
                      )}
                      {isCarrot && !isBunny && <img src="/img/carot1.png" alt="Carot" className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain" />}
                      {!isBunny && !isCarrot && (() => {
                        const obstacle = getObstacleAtPosition(x, y);
                        if (obstacle) {
                          return obstacle.type === 'rock' ?
                            <img src="/img/rock1.png" alt="Rock" className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain" /> :
                            obstacle.type === 'wood' ?
                              <img src="/img/wood1.png" alt="Wood" className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain" /> :
                              obstacle.type === 'water' ?
                                <img src="/img/water1.png" alt="Water" className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain" /> :
                                obstacle.type === 'bush' ?
                                  <img src="/img/bush1.png" alt="Bush" className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain" /> :
                                  null;
                        }
                        
                        const flying = getFlyingAtPosition(x, y);
                        if (flying) {
                          return flying.type === 'catapult' ?
                            <img src="/img/catapult1.png" alt="Catapult" className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain" /> :
                            null;
                        }
                        
                        return null;
                      })()}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center justify-start">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Comenzi</h2>
              
              {/* Arrow Buttons */}
              <div className="mb-4 sm:mb-6 w-full">
                <p className="text-center mb-2 sm:mb-3 font-semibold text-gray-700 text-sm sm:text-base">Adaugă comenzi:</p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-[240px] sm:max-w-sm mx-auto">
                  <div></div>
                  <button
                    onClick={() => props.onAddCommand('up')}
                    disabled={isRunning}
                    className="bg-red-500 text-white p-3 sm:p-4 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-2xl sm:text-3xl">↑</span>
                  </button>
                  <div></div>
                  <button
                    onClick={() => props.onAddCommand('left')}
                    disabled={isRunning}
                    className="bg-green-500 text-white p-3 sm:p-4 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-2xl sm:text-3xl">←</span>
                  </button>
                  <button
                    onClick={() => props.onAddCommand('down')}
                    disabled={isRunning}
                    className="bg-blue-500 text-white p-3 sm:p-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-2xl sm:text-3xl">↓</span>
                  </button>
                  <button
                    onClick={() => props.onAddCommand('right')}
                    disabled={isRunning}
                    className="bg-orange-500 text-white p-3 sm:p-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-2xl sm:text-3xl">→</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-sm mx-auto">
                <button
                  onClick={onRemoveLastCommand}
                  disabled={isRunning || commands.length === 0}
                  className="bg-red-500 text-white px-2 py-2 sm:px-4 sm:py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors text-xs sm:text-base"
                >
                  <span className="hidden sm:inline">Șterge ultimul</span>
                  <span className="sm:hidden">Șterge</span>
                </button>
                <button
                  onClick={onClearCommands}
                  disabled={isRunning || commands.length === 0}
                  className="bg-gray-500 text-white px-2 py-2 sm:px-4 sm:py-3 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2 transition-colors text-xs sm:text-base"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Șterge tot</span>
                  <span className="sm:hidden">Tot</span>
                </button>
              </div>
              <br></br>
               {/* Action Buttons - Second on mobile */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-sm mx-auto">
              <button
                onClick={onResetGame}
                disabled={isRunning}
                className="flex-1 sm:flex-initial bg-orange-500 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                Reset
              </button>
              <button
                onClick={onExecuteCommands}
                disabled={isRunning || commands.length === 0}
                className="flex-1 sm:flex-initial bg-green-500 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base font-bold"
              >
                <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                Rulează
              </button>
            </div>
            </div>
          </div>
        </div>

        {/* Command Sequence */}
        <div className="mt-3 sm:mt-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-center text-gray-800">Secvența ta de comenzi</h2>
          
          <div className="min-h-16 sm:min-h-20 bg-gray-100 rounded-lg p-2 sm:p-4 flex flex-wrap gap-1 sm:gap-2 justify-center max-h-32 sm:max-h-40 overflow-y-auto">
            {commands.length === 0 ? (
              <p className="text-gray-400 text-center w-full text-xs sm:text-base">Apasă săgețile pentru a adăuga comenzi</p>
            ) : (
              commands.map((cmd, index) => (
                <div
                  key={index}
                  className={`p-1 sm:p-2 rounded-lg flex items-center justify-center
                    ${currentStep === index ? 'bg-yellow-400/30 scale-110' : ''}
                    ${currentStep > index ? 'bg-green-200' : ''}
                    transition-all duration-300`}
                >
                  {commandIcons[cmd]}
                </div>
              ))
            )}
          </div>
          <p className="text-center text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">Total comenzi: {commands.length}</p>
        </div>
        
        {/* Particle Effects */}
        {catapultAnimation?.active && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-300 text-base sm:text-lg"
                style={{
                  left: `${((catapultAnimation.x + 0.5) * 12.5)}%`,
                  top: `${((catapultAnimation.y + 0.5) * 12.5)}%`,
                  animation: `particle-effect 0.3s ease-out forwards`,
                  '--tx': `${Math.cos(i * Math.PI/4) * 20}px`,
                  '--ty': `${Math.sin(i * Math.PI/4) * 20}px`,
                } as React.CSSProperties}
              >
                ✨
              </div>
            ))}
          </div>
        )}
        
        {/* Level Complete Modal */}
        {gameWon && <LevelCompleteModal levelId={level.id} totalLevels={levels.length} onNextLevel={onNextLevel} />}
      </div>
    </div>
  );
};

export default GamePage;