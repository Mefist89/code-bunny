import React from 'react';
import { Play, RotateCcw, Trash2 } from 'lucide-react';
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

  /* color arrow */
const commandIcons = {
  up: <span className="text-white text-2xl bg-red-500 p-2 rounded">↑</span>,
  down: <span className="text-white text-2xl bg-blue-500 p-2 rounded">↓</span>,
  left: <span className="text-white text-2xl bg-green-500 p-2 rounded">←</span>,
  right: <span className="text-white text-2xl bg-orange-500 p-2 rounded">→</span>
};

return (
   <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-blue-50 p-8" style={{ transform: 'scale(1.20)', transformOrigin: 'top center' }}>
     <style>{`
       @keyframes catapult-launch {
         0% {
           /* Initial state before contact */
           transform: scale(1);
           -webkit-transform: scale(1);
           -moz-transform: scale(1);
           -ms-transform: scale(1);
           -o-transform: scale(1);
         }
         10% {
           /* 0.1s / 1s = 10% - scale down to 80% over 0.1s */
           transform: scale(0.8);
           -webkit-transform: scale(0.8);
           -moz-transform: scale(0.8);
           -ms-transform: scale(0.8);
           -o-transform: scale(0.8);
         }
         25% {
           /* (0.1s + 0.15s) / 1s = 25% - scale up to 120% over 0.15s while moving up */
           transform: scale(1.2) translateY(-20px);
           -webkit-transform: scale(1.2) translateY(-20px);
           -moz-transform: scale(1.2) translateY(-20px);
           -ms-transform: scale(1.2) translateY(-20px);
           -o-transform: scale(1.2) translateY(-20px);
         }
         100% {
           /* scale back to 100% over remaining 0.75s while launching forward */
           transform: scale(1) translateY(0);
           -webkit-transform: scale(1) translateY(0);
           -moz-transform: scale(1) translateY(0);
           -ms-transform: scale(1) translateY(0);
           -o-transform: scale(1) translateY(0);
         }
       }
       
       @keyframes particle-effect {
         0% {
           opacity: 1;
           transform: translate(0, 0) scale(1);
           -webkit-transform: translate(0, 0) scale(1);
           -moz-transform: translate(0, 0) scale(1);
           -ms-transform: translate(0, 0) scale(1);
           -o-transform: translate(0, 0) scale(1);
         }
         100% {
           opacity: 0;
           transform: translate(var(--tx), var(--ty)) scale(0);
           -webkit-transform: translate(var(--tx), var(--ty)) scale(0);
           -moz-transform: translate(var(--tx), var(--ty)) scale(0);
           -ms-transform: translate(var(--tx), var(--ty)) scale(0);
           -o-transform: translate(var(--tx), var(--ty)) scale(0);
         }
       }
       
       @keyframes bunny-hop {
         0% {
           /* Start position - slightly compressed */
           transform: translate(0, 0) scale(0.9, 1.1) rotate(0deg);
           -webkit-transform: translate(0, 0) scale(0.9, 1.1) rotate(0deg);
           -moz-transform: translate(0, 0) scale(0.9, 1.1) rotate(0deg);
           -ms-transform: translate(0, 0) scale(0.9, 1.1) rotate(0deg);
           -o-transform: translate(0, 0) scale(0.9, 1.1) rotate(0deg);
         }
         30% {
           /* Mid-jump - stretched upward */
           transform: translate(50%, -30%) scale(1.1, 0.9) rotate(5deg);
           -webkit-transform: translate(50%, -30%) scale(1.1, 0.9) rotate(5deg);
           -moz-transform: translate(50%, -30%) scale(1.1, 0.9) rotate(5deg);
           -ms-transform: translate(50%, -30%) scale(1.1, 0.9) rotate(5deg);
           -o-transform: translate(50%, -30%) scale(1.1, 0.9) rotate(5deg);
         }
         70% {
           /* Coming down - stretched downward */
           transform: translate(100%, -10%) scale(1.15, 0.85) rotate(-5deg);
           -webkit-transform: translate(100%, -10%) scale(1.15, 0.85) rotate(-5deg);
           -moz-transform: translate(100%, -10%) scale(1.15, 0.85) rotate(-5deg);
           -ms-transform: translate(100%, -10%) scale(1.15, 0.85) rotate(-5deg);
           -o-transform: translate(100%, -10%) scale(1.15, 0.85) rotate(-5deg);
         }
         100% {
           /* End position - back to normal */
           transform: translate(100%, 0) scale(1, 1) rotate(0deg);
           -webkit-transform: translate(100%, 0) scale(1, 1) rotate(0deg);
           -moz-transform: translate(100%, 0) scale(1, 1) rotate(0deg);
           -ms-transform: translate(100%, 0) scale(1, 1) rotate(0deg);
           -o-transform: translate(100%, 0) scale(1, 1) rotate(0deg);
         }
       }
       
       .animate-catapult-launch {
         animation: catapult-launch 1s ease-out;
         -webkit-animation: catapult-launch 1s ease-out;
         -moz-animation: catapult-launch 1s ease-out;
         -ms-animation: catapult-launch 1s ease-out;
         -o-animation: catapult-launch 1s ease-out;
       }
       
       .animate-bunny-hop {
         animation: bunny-hop 0.4s cubic-bezier(0.42, 0, 0.58, 1);
         -webkit-animation: bunny-hop 0.4s cubic-bezier(0.42, 0, 0.58, 1);
         -moz-animation: bunny-hop 0.4s cubic-bezier(0.42, 0, 0.58, 1);
         -ms-animation: bunny-hop 0.4s cubic-bezier(0.42, 0, 0.58, 1);
         -o-animation: bunny-hop 0.4s cubic-bezier(0.42, 0, 0.58, 1);
       }
     `}</style>
      <div className="w-full mx-auto" style={{ transform: 'scale(0.87)', transformOrigin: 'top center' }}>
        <h1 className="text-4xl font-bold text-center mb-2 text-green-800 flex items-center justify-center gap-4">
          <img src="/img/bunny1.png" alt="Bunny" className="h-12 w-12 object-contain" />
          Code Bunny
        </h1>
        <p className="text-center text-gray-700 mb-6">Ajută iepurașul să ajungă la morcov!</p>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('menu')}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 font-bold mr-4"
            >
              ← Meniu
            </button>
            <button
              onClick={onPrevLevel}
              disabled={level.id === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 mr-4"
            >
              ← Anterior
            </button>
            <div className="text-center flex-1">
              <p className="text-xl font-bold text-gray-800 mb-1">{level.name}</p>
              <p className="text-sm text-gray-600">Nivel {level.id} din {levels.length}</p>
            </div>
            <button
              onClick={onNextLevel}
              disabled={level.id === levels.length}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 ml-4"
            >
              Următor →
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Tabla de Joc</h2>
              <div className="bg-[#87AD3B] rounded-xl border-4 border-yellow-950 shadow-inner shadow-lg p-2 grid grid-cols-8 gap-1">
                {[...Array(gridSize * gridSize)].map((_, i) => {
                  const x = i % gridSize;
                  const y = Math.floor(i / gridSize);
                  const isBunny = bunnyPos.x === x && bunnyPos.y === y;
                  const isCarrot = level.carrot.x === x && level.carrot.y === y;

                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`aspect-square flex items-center justify-center text-3xl bg-cover bg-center rounded-md border-2 border-black
                        ${(x + y) % 2 === 0 ? "bg-[url('/box1.png')]" : "bg-[url('/box2.png')]"}
                        ${isBunny && isCarrot ? 'bg-yellow-200/50' : ''}`}
                    >
                      {isBunny && (
                        <div className={`inline-block origin-center ${catapultAnimation?.active && catapultAnimation.x === x && catapultAnimation.y === y ? 'animate-catapult-launch' : ''} ${movementAnimation?.active && movementAnimation.startX === x && movementAnimation.startY === y ? 'animate-bunny-hop' : ''}`}>
                          <img src="/img/bunny1.png" alt="Bunny" className="w-12 h-12 object-contain" />
                        </div>
                      )}
                      {isCarrot && !isBunny && <img src="/img/carot1.png" alt="Carot" className="w-12 h-12 object-contain" />}
                      {!isBunny && !isCarrot && (() => {
                        const obstacle = getObstacleAtPosition(x, y);
                        if (obstacle) {
                          return obstacle.type === 'rock' ?
                            <img src="/img/rock1.png" alt="Rock" className="w-10 h-10 object-contain" /> :
                            obstacle.type === 'wood' ?
                              <img src="/img/wood1.png" alt="Wood" className="w-10 h-10 object-contain" /> :
                              obstacle.type === 'water' ?
                                <img src="/img/water1.png" alt="Water" className="w-10 h-10 object-contain" /> :
                                obstacle.type === 'bush' ?
                                  <img src="/img/bush1.png" alt="Bush" className="w-10 h-10 object-contain" /> :
                                  null;
                        }
                        
                        const flying = getFlyingAtPosition(x, y);
                        if (flying) {
                          return flying.type === 'catapult' ?
                            <img src="/img/catapult1.png" alt="Catapult" className="w-10 h-10 object-contain" /> :
                            null;
                        }
                        
                        return null;
                      })()}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col items-center justify-start self-start">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Comenzi</h2>
              
              <div className="mb-6 w-full">
                <p className="text-center mb-3 font-semibold text-gray-700">Adaugă comenzi:</p>
                <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                  <div></div>
                  <button
                    onClick={() => props.onAddCommand('up')}
                    disabled={isRunning}
                    className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-3xl">↑</span>
                  </button>
                  <div></div>
                  <button
                    onClick={() => props.onAddCommand('left')}
                    disabled={isRunning}
                    className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-3xl">←</span>
                  </button>
                  <button
                    onClick={() => props.onAddCommand('down')}
                    disabled={isRunning}
                    className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-3xl">↓</span>
                  </button>
                  <button
                    onClick={() => props.onAddCommand('right')}
                    disabled={isRunning}
                    className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white text-3xl">→</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto">
                <button
                  onClick={onExecuteCommands}
                  disabled={isRunning || commands.length === 0}
                  className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Rulează
                </button>
                <button
                  onClick={onResetGame}
                  disabled={isRunning}
                  className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Resetează
                </button>
                <button
                  onClick={onRemoveLastCommand}
                  disabled={isRunning || commands.length === 0}
                  className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  Șterge ultimul
                </button>
                <button
                  onClick={onClearCommands}
                  disabled={isRunning || commands.length === 0}
                  className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Șterge tot
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Secvența ta de comenzi</h2>
          
          {gameWon && (
            <div className="mb-4 bg-green-100 border-4 border-green-500 rounded-lg p-4 text-center animate-bounce">
              <p className="text-2xl font-bold text-green-800">🎉 Bravo! Ai reușit! 🎉</p>
              <p className="text-green-700">Iepurașul a ajuns la morcov!</p>
              {level.id < levels.length && (
                <button
                  onClick={onNextLevel}
                  className="mt-3 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 font-bold"
                >
                  Nivel următor →
                </button>
              )}
            </div>
          )}

          <div className="min-h-20 bg-gray-100 rounded-lg p-4 flex flex-wrap gap-2 justify-center">
            {commands.length === 0 ? (
              <p className="text-gray-400 text-center w-full">Apasă săgețile pentru a adăuga comenzi</p>
            ) : (
              commands.map((cmd, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg flex items-center justify-center
                    ${currentStep === index ? 'bg-yellow-400/30 scale-110' : ''}
                    ${currentStep > index ? 'bg-green-200' : ''}
                    transition-all duration-300`}
                >
                  {commandIcons[cmd]}
                </div>
              ))
            )}
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">Total comenzi: {commands.length}</p>
        </div>
        
        {/* Render particle effects when catapult animation is active */}
        {catapultAnimation?.active && (
          <div className="absolute inset-0 pointer-events-none" style={{ transform: 'scale(0.87) translateY(-100%)', transformOrigin: 'top center' }}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-300 text-lg"
                style={{
                  left: `${((catapultAnimation.x + 0.5) * 12.5)}%`,
                  top: `${((catapultAnimation.y + 0.5) * 12.5)}%`,
                  animation: `particle-effect 0.3s ease-out forwards`,
                  '--tx': `${Math.cos(i * Math.PI/4) * 30}px`,
                  '--ty': `${Math.sin(i * Math.PI/4) * 30}px`,
                } as React.CSSProperties}
              >
                ✨
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;