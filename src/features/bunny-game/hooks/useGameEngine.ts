import { useState, useEffect } from 'react';
import type { Level, Position, Command } from '../types/index';

const levelsData: Omit<Level, 'id'>[] = [
  { bunny: { x: 0, y: 0 }, carrot: { x: 3, y: 0 }, name: "Nivel 1 - Simplu" },
  { bunny: { x: 0, y: 0 }, carrot: { x: 0, y: 3 }, name: "Nivel 2 - În jos" },
  { bunny: { x: 0, y: 0 }, carrot: { x: 3, y: 3 }, name: "Nivel 3 - Diagonal" },
  { bunny: { x: 7, y: 7 }, carrot: { x: 0, y: 0 }, name: "Nivel 4 - Întoarcere" },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 5 - Distanță mare" },
];

const levels: Level[] = levelsData.map((level, index) => ({ ...level, id: index + 1 }));

export const useGameEngine = () => {
  const [level, setLevel] = useState(1);
  const [bunnyPos, setBunnyPos] = useState<Position>({ x: 0, y: 0 });
  const [carrotPos, setCarrotPos] = useState<Position>({ x: 7, y: 7 });
  const [commands, setCommands] = useState<Command[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [gameWon, setGameWon] = useState(false);
  const gridSize = 8;

  useEffect(() => {
    const currentLevel = levels[level - 1];
    setBunnyPos(currentLevel.bunny);
    setCarrotPos(currentLevel.carrot);
    setCommands([]);
    setGameWon(false);
    setCurrentStep(-1);
  }, [level]);

  const addCommand = (direction: Command) => {
    if (!isRunning) {
      setCommands([...commands, direction]);
    }
  };

  const removeLastCommand = () => {
    if (!isRunning) {
      setCommands(commands.slice(0, -1));
    }
  };

  const clearCommands = () => {
    if (!isRunning) {
      setCommands([]);
    }
  };

  const executeCommands = async () => {
    if (commands.length === 0) return;
    
    setIsRunning(true);
    setGameWon(false);
    const currentLevel = levels[level - 1];
    let pos = { ...currentLevel.bunny };
    setBunnyPos(pos);

    for (let i = 0; i < commands.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const cmd = commands[i];
      const newPos = { ...pos };

      if (cmd === 'up' && pos.y > 0) newPos.y -= 1;
      else if (cmd === 'down' && pos.y < gridSize - 1) newPos.y += 1;
      else if (cmd === 'left' && pos.x > 0) newPos.x -= 1;
      else if (cmd === 'right' && pos.x < gridSize - 1) newPos.x += 1;

      pos = newPos;
      setBunnyPos(pos);

      if (pos.x === carrotPos.x && pos.y === carrotPos.y) {
        setGameWon(true);
        break;
      }
    }

    setIsRunning(false);
    setCurrentStep(-1);
  };

  const resetGame = () => {
    const currentLevel = levels[level - 1];
    setBunnyPos(currentLevel.bunny);
    setCarrotPos(currentLevel.carrot);
    setGameWon(false);
    setCurrentStep(-1);
  };

  const nextLevel = () => {
    if (level < levels.length) {
      setLevel(level + 1);
    }
  };

  const prevLevel = () => {
    if (level > 1) {
      setLevel(level - 1);
    }
  };

  return {
    level: levels[level - 1],
    levels,
    bunnyPos,
    carrotPos,
    commands,
    isRunning,
    currentStep,
    gameWon,
    gridSize,
    addCommand,
    removeLastCommand,
    clearCommands,
    executeCommands,
    resetGame,
    nextLevel,
    prevLevel,
    setLevel,
  };
};