import { useState, useEffect } from 'react';
import type { Level, Position, Command } from '../types/index';

const levelsData: Omit<Level, 'id'>[] = [
  { bunny: { x: 0, y: 0 }, carrot: { x: 3, y: 0 }, name: "Nivel 1 - Simplu" },
  { bunny: { x: 0, y: 0 }, carrot: { x: 0, y: 3 }, name: "Nivel 2 - În jos" },
  { bunny: { x: 0, y: 0 }, carrot: { x: 3, y: 3 }, name: "Nivel 3 - Diagonal", obstacles: [{ x: 2, y: 3, type: 'rock' }, { x: 2, y: 2, type: 'rock' }, { x: 2, y: 4, type: 'rock' }, { x: 3, y: 2, type: 'rock' }, { x: 3, y: 4, type: 'rock' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 4, y: 4 }, name: "Nivel 4 - Cu lemn", obstacles: [{ x: 2, y: 2, type: 'wood' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 3, y: 3 }, name: "Nivel 5 - Cu apă", obstacles: [{ x: 1, y: 1, type: 'water' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 4, y: 4 }, name: "Nivel 6 - Cu tufe", obstacles: [{ x: 2, y: 2, type: 'bush' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 7 - Distanță mare" },
  { bunny: { x: 4, y: 0 }, carrot: { x: 4, y: 7 }, name: "Nivel 8 - Culoar vertical" },
  { bunny: { x: 7, y: 3 }, carrot: { x: 0, y: 3 }, name: "Nivel 9 - Culoar orizontal" },
  { bunny: { x: 3, y: 4 }, carrot: { x: 6, y: 1 }, name: "Nivel 10 - Provocare", obstacles: [{ x: 3, y: 2, type: 'catapult' }] },
  { bunny: { x: 1, y: 1 }, carrot: { x: 6, y: 6 }, name: "Nivel 11 - Diagonală mijlocie" },
  { bunny: { x: 0, y: 4 }, carrot: { x: 7, y: 4 }, name: "Nivel 12 - Culoar central" },
  { bunny: { x: 5, y: 2 }, carrot: { x: 2, y: 5 }, name: "Nivel 13 - Inversare" },
  { bunny: { x: 3, y: 3 }, carrot: { x: 0, y: 7 }, name: "Nivel 14 - Centru spre colț" },
  { bunny: { x: 7, y: 0 }, carrot: { x: 0, y: 7 }, name: "Nivel 15 - Colțuri diagonale" },
];

const levels: Level[] = levelsData.map((level, index) => ({ ...level, id: index + 1 }));

export const useGameEngine = () => {
  const [level, setLevel] = useState(1);
  const [bunnyPos, setBunnyPos] = useState<Position>({ x: 0, y: 0 });
  const [bunnyDirection, setBunnyDirection] = useState<Command | null>(null);
  const [carrotPos, setCarrotPos] = useState<Position>({ x: 7, y: 7 });
  const [commands, setCommands] = useState<Command[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [gameWon, setGameWon] = useState(false);
  const gridSize = 8;

  useEffect(() => {
    const currentLevel = levels[level - 1];
    setBunnyPos(currentLevel.bunny);
    setBunnyDirection(null);
    setCarrotPos(currentLevel.carrot);
    setCommands([]);
    setGameWon(false);
    setCurrentStep(-1);
  }, [level]);

  const addCommand = (direction: Command) => {
    if (!isRunning) {
      setCommands(prevCommands => [...prevCommands, direction]);
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
    let direction: Command | null = null;
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
      direction = cmd; // Track the direction the bunny is facing
      setBunnyPos(pos);

      // Check if the bunny landed on a catapult
      if (currentLevel.obstacles) {
        const catapult = currentLevel.obstacles.find(obs => obs.type === 'catapult' && obs.x === pos.x && obs.y === pos.y);
        if (catapult) {
          // Launch the bunny 3 spaces forward in the direction it's facing
          const launchPos = { ...pos };
          if (direction === 'up' && launchPos.y > 2) launchPos.y -= 3;
          else if (direction === 'down' && launchPos.y < gridSize - 3) launchPos.y += 3;
          else if (direction === 'left' && launchPos.x > 2) launchPos.x -= 3;
          else if (direction === 'right' && launchPos.x < gridSize - 3) launchPos.x += 3;
          else {
            // If the launch would go out of bounds, stay on catapult
            break;
          }
          pos = launchPos;
          setBunnyPos(pos);
        }
      }

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
    setBunnyDirection(null);
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