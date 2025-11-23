import React from 'react';
import { Play, RotateCcw, Trash2 } from 'lucide-react';
import type { Level, Position, Command } from '../types/index';

interface GamePageProps {
  level: Level;
  levels: Level[];
  bunnyPos: Position;
  carrotPos: Position;
  commands: Command[];
  currentStep: number;
  isRunning: boolean;
  gameWon: boolean;
  gridSize: number;
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
    carrotPos,
    commands,
    currentStep,
    isRunning,
    gameWon,
    gridSize,
    onNavigate,
    onRemoveLastCommand,
    onClearCommands,
    onExecuteCommands,
    onResetGame,
    onNextLevel,
    onPrevLevel
  } = props;

  /* color arrow */
  const commandIcons = {
    up: <span className="text-white-500 text-2xl bg-red-500 p-2 rounded">↑</span>,
    down: <span className="text-white-500 text-2xl bg-blue-500 p-2 rounded">↓</span>,
    left: <span className="text-white-500 text-2xl bg-green-500 p-2 rounded">←</span>,
    right: <span className="text-white-500 text-2xl bg-orange-500 p-2 rounded">→</span>
  };

 return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-green-50 to-blue-50 p-8" style={{ transform: 'scale(1.20)', transformOrigin: 'top center' }}>
      <div className="max-w-5xl mx-auto" style={{ transform: 'scale(0.87)', transformOrigin: 'top center' }}>
        <h1 className="text-4xl font-bold text-center mb-2 text-green-800 flex items-center justify-center gap-4">
          <img src="/img/bunny1.png" alt="Bunny" className="h-12 w-12 object-contain" />
          Code Bunny
        </h1>
        <p className="text-center text-gray-700 mb-6">Ajută iepurașul să ajungă la morcov!</p>

        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
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

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Tabla de Joc</h2>
              /* фон таблице  bg-[#87AD3B] */
              <div className="bg-[#87AD3B] rounded-xl border-4 border-yellow-950 shadow-inner shadow-lg p-2 grid grid-cols-8 gap-1">
                {[...Array(gridSize * gridSize)].map((_, i) => {
                  const x = i % gridSize;
                  const y = Math.floor(i / gridSize);
                  const isBunny = bunnyPos.x === x && bunnyPos.y === y;
                  const isCarrot = carrotPos.x === x && carrotPos.y === y;

                  return (
                    <div
                      key={`${x}-${y}`}
                      className={`aspect-square flex items-center justify-center text-3xl bg-cover bg-center rounded-md border-2 border-black
                        ${(x + y) % 2 === 0 ? "bg-[url('/box1.png')]" : "bg-[url('/box2.png')]"}
                        ${isBunny && isCarrot ? 'bg-yellow-200/50' : ''}`}
                    >
                      {isBunny && <img src="/img/bunny1.png" alt="Bunny" className="w-12 h-12 object-contain" />}
                      {isCarrot && !isBunny && <img src="/img/carot1.png" alt="Carot" className="w-12 h-12 object-contain" />}
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
                    <span className="text-white-500 text-3xl">↑</span>
                  </button>
                  <div></div>
                  <button
                    onClick={() => props.onAddCommand('left')}
                    disabled={isRunning}
                    className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white-500 text-3xl">←</span>
                  </button>
                  <button
                    onClick={() => props.onAddCommand('down')}
                    disabled={isRunning}
                    className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white-500 text-3xl">↓</span>
                  </button>
                  <button
                    onClick={() => props.onAddCommand('right')}
                    disabled={isRunning}
                    className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <span className="text-white-500 text-3xl">→</span>
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

        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
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
                    ${currentStep === index ? 'bg-yellow-40 scale-110' : 'bg-white'}
                    ${currentStep > index ? 'bg-green-200' : ''}
                    transition-all duration-300 border-2 border-gray-300`}
                >
                  {commandIcons[cmd]}
                </div>
              ))
            )}
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">Total comenzi: {commands.length}</p>
        </div>
      </div>
    </div>
  );
};

export default GamePage;