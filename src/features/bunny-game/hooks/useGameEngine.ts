import { useState, useEffect } from 'react';
import type { Level, Position, Command } from '../types/index';
import { soundManager } from '../../../utils/soundManager';

const levelsData: Omit<Level, 'id'>[] = [
  { bunny: { x: 0, y: 0 }, carrot: { x: 3, y: 0 }, name: "Nivel 1 - Simplu" },
  { bunny: { x: 0, y: 0 }, carrot: { x: 0, y: 3 }, name: "Nivel 2 - În jos" },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 3 - Primele obstacole", obstacles: [{ x: 1, y: 1, type: 'rock' }, { x: 2, y: 2, type: 'wood' }, { x: 3, y: 3, type: 'water' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 4 - Pădurea magică", obstacles: [{ x: 1, y: 1, type: 'rock' }, { x: 1, y: 3, type: 'rock' }, { x: 3, y: 1, type: 'rock' }, { x: 3, y: 3, type: 'wood' }, { x: 2, y: 4, type: 'bush' }, { x: 4, y: 2, type: 'bush' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 5 - Râul de flori", obstacles: [{ x: 0, y: 3, type: 'water' }, { x: 1, y: 3, type: 'water' }, { x: 2, y: 3, type: 'water' }, { x: 3, y: 3, type: 'water' }, { x: 4, y: 3, type: 'water' }, { x: 5, y: 3, type: 'water' }, { x: 6, y: 3, type: 'water' }, { x: 3, y: 2, type: 'rock' }, { x: 3, y: 4, type: 'rock' }, { x: 3, y: 5, type: 'wood' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 6 - Labirintul verii", obstacles: [{ x: 1, y: 0, type: 'rock' }, { x: 1, y: 1, type: 'rock' }, { x: 1, y: 2, type: 'rock' }, { x: 1, y: 3, type: 'water' }, { x: 1, y: 4, type: 'water' }, { x: 1, y: 6, type: 'water' }, { x: 1, y: 5, type: 'water' }, { x: 2, y: 6, type: 'wood' }, { x: 3, y: 6, type: 'wood' }, { x: 4, y: 6, type: 'wood' }, { x: 5, y: 6, type: 'bush' }, { x: 6, y: 6, type: 'bush' }, { x: 7, y: 6, type: 'bush' }, { x: 6, y: 5, type: 'bush' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 7 - Peisaj muntos", obstacles: [{ x: 0, y: 1, type: 'rock' }, { x: 0, y: 2, type: 'rock' }, { x: 0, y: 3, type: 'rock' }, { x: 0, y: 4, type: 'rock' }, { x: 1, y: 4, type: 'rock' }, { x: 2, y: 4, type: 'rock' }, { x: 3, y: 4, type: 'water' }, { x: 4, y: 4, type: 'water' }, { x: 5, y: 4, type: 'water' }, { x: 6, y: 4, type: 'wood' }, { x: 6, y: 5, type: 'wood' }, { x: 6, y: 6, type: 'wood' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 8 - Frunze de toamnă", obstacles: [{ x: 1, y: 1, type: 'bush' }, { x: 1, y: 2, type: 'bush' }, { x: 1, y: 3, type: 'bush' }, { x: 2, y: 1, type: 'bush' }, { x: 3, y: 1, type: 'bush' }, { x: 4, y: 1, type: 'water' }, { x: 5, y: 1, type: 'water' }, { x: 5, y: 2, type: 'water' }, { x: 5, y: 3, type: 'water' }, { x: 5, y: 4, type: 'rock' }, { x: 5, y: 5, type: 'rock' }, { x: 4, y: 5, type: 'wood' }, { x: 3, y: 5, type: 'wood' }, { x: 2, y: 5, type: 'wood' }, { x: 1, y: 5, type: 'rock' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 9 - Podişul cu flori", obstacles: [{ x: 0, y: 1, type: 'rock' }, { x: 0, y: 2, type: 'rock' }, { x: 0, y: 3, type: 'rock' }, { x: 0, y: 4, type: 'rock' }, { x: 0, y: 5, type: 'rock' }, { x: 0, y: 6, type: 'rock' }, { x: 1, y: 6, type: 'water' }, { x: 2, y: 6, type: 'water' }, { x: 3, y: 6, type: 'water' }, { x: 4, y: 6, type: 'water' }, { x: 5, y: 6, type: 'water' }, { x: 6, y: 6, type: 'water' }, { x: 6, y: 5, type: 'wood' }, { x: 6, y: 4, type: 'wood' }, { x: 6, y: 3, type: 'wood' }, { x: 6, y: 2, type: 'wood' }, { x: 6, y: 1, type: 'bush' }, { x: 5, y: 1, type: 'bush' }, { x: 4, y: 1, type: 'bush' }, { x: 3, y: 1, type: 'bush' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 10 - Provocarea finală", obstacles: [{ x: 7, y: 6, type: 'wood' }, { x: 7, y: 5, type: 'wood' }, { x: 6, y: 6, type: 'wood' }, { x: 1, y: 1, type: 'rock' }, { x: 1, y: 6, type: 'rock' }, { x: 1, y: 7, type: 'rock' }, { x: 1, y: 2, type: 'rock' }, { x: 1, y: 3, type: 'rock' }, { x: 1, y: 4, type: 'rock' }, { x: 1, y: 5, type: 'rock' }, { x: 2, y: 5, type: 'water' }, { x: 3, y: 5, type: 'water' }, { x: 4, y: 5, type: 'water' }, { x: 4, y: 4, type: 'water' }, { x: 5, y: 4, type: 'wood' }, { x: 5, y: 3, type: 'wood' }, { x: 5, y: 2, type: 'wood' }, { x: 5, y: 1, type: 'wood' }, { x: 4, y: 1, type: 'bush' }, { x: 3, y: 1, type: 'bush' }, { x: 2, y: 1, type: 'bush' }, { x: 2, y: 2, type: 'bush' }, { x: 3, y: 2, type: 'bush' }, { x: 4, y: 2, type: 'bush' }], flying: [{ x: 3, y: 2, type: 'catapult' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 11 - Prima catapultă", obstacles: [{ x: 6, y: 6, type: 'rock' }, { x: 6, y: 7, type: 'rock' }, { x: 7, y: 6, type: 'rock' }], flying: [{ x: 5, y: 7, type: 'catapult' }],  },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 12 - Peste lac", obstacles: [{ x: 0, y: 2, type: 'water' }, { x: 1, y: 2, type: 'water' }, { x: 2, y: 2, type: 'water' }, { x: 3, y: 2, type: 'water' }, { x: 4, y: 2, type: 'water' }, { x: 5, y: 2, type: 'water' }, { x: 6, y: 2, type: 'water' }, { x: 7, y: 2, type: 'water' }, { x: 0, y: 5, type: 'water' }, { x: 1, y: 5, type: 'water' }, { x: 2, y: 5, type: 'water' }, { x: 3, y: 5, type: 'water' }, { x: 4, y: 5, type: 'water' }, { x: 5, y: 5, type: 'water' }, { x: 6, y: 5, type: 'water' }, { x: 7, y: 5, type: 'water' }], flying: [{ x: 3, y: 1, type: 'catapult' }, { x: 5, y: 4, type: 'catapult' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 13 - Peste pădure", obstacles: [{ x: 0, y: 1, type: 'wood' }, { x: 1, y: 1, type: 'wood' }, { x: 2, y: 1, type: 'wood' }, { x: 3, y: 1, type: 'wood' }, { x: 4, y: 1, type: 'wood' }, { x: 5, y: 1, type: 'wood' }, { x: 6, y: 1, type: 'wood' }, { x: 1, y: 4, type: 'wood' }, { x: 0, y: 4, type: 'wood' }, { x: 2, y: 4, type: 'wood' }, { x: 3, y: 4, type: 'wood' }, { x: 4, y: 4, type: 'wood' }, { x: 5, y: 4, type: 'wood' }, { x: 6, y: 4, type: 'wood' }, { x: 7, y: 4, type: 'wood' }, {x: 6, y: 6, type: 'wood' }, {x: 7, y: 6, type: 'wood' }, {x: 5, y: 6, type: 'wood' }, {x: 6, y: 7, type: 'wood' },], flying: [{ x: 5, y: 3, type: 'catapult' }, { x: 5, y: 7, type: 'catapult' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 14 - Două căi", obstacles: [{ x: 1, y: 0, type: 'rock' }, { x: 1, y: 1, type: 'rock' }, { x: 1, y: 2, type: 'rock' }, { x: 1, y: 3, type: 'rock' }, { x: 1, y: 4, type: 'rock' }, { x: 1, y: 5, type: 'rock' }, { x: 1, y: 6, type: 'rock' }, { x: 2, y: 7, type: 'water' }, { x: 4, y: 7, type: 'water' }, { x: 5, y: 7, type: 'water' }, { x: 6, y: 7, type: 'water' }, { x: 6, y: 6, type: 'water' }, { x: 6, y: 5, type: 'water' }, { x: 7, y: 6, type: 'water' }], flying: [{ x: 1, y: 7, type: 'catapult' }, { x: 7, y: 5, type: 'catapult' }] },
  { bunny: { x: 0, y: 0 }, carrot: { x: 7, y: 7 }, name: "Nivel 15 - Finalul magic", obstacles: [{ x: 0, y: 1, type: 'rock' }, { x: 0, y: 4, type: 'rock' }, { x: 0, y: 5, type: 'rock' }, { x: 0, y: 6, type: 'rock' }, { x: 1, y: 1, type: 'rock' }, { x: 2, y: 1, type: 'rock' }, { x: 3, y: 1, type: 'rock' }, { x: 4, y: 1, type: 'water' }, { x: 5, y: 1, type: 'water' }, { x: 6, y: 1, type: 'water' }, { x: 6, y: 2, type: 'water' }, { x: 7, y: 2, type: 'water' }, { x: 7, y: 4, type: 'wood' }, { x: 6, y: 4, type: 'wood' }, { x: 2, y: 4, type: 'wood' }, { x: 2, y: 5, type: 'wood' }, { x: 2, y: 3, type: 'wood' }, { x: 5, y: 4, type: 'wood' }, { x: 5, y: 2, type: 'wood' }, { x: 5, y: 3, type: 'wood' }, { x: 5, y: 5, type: 'bush' }, { x: 6, y: 6, type: 'bush' }, { x: 6, y: 7, type: 'bush' }, { x: 7, y: 5, type: 'bush' }, { x: 3, y: 7, type: 'bush' }, { x: 2, y: 7, type: 'bush' }, { x: 7, y: 6, type: 'bush' }, { x: 6, y: 5, type: 'bush' }], flying: [{ x: 7, y: 1, type: 'catapult' }, { x: 6, y: 3, type: 'catapult' }, { x: 5, y: 7, type: 'catapult' }] },
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
  const [catapultAnimation, setCatapultAnimation] = useState<{ active: boolean; x: number; y: number; } | null>(null);
  const [movementAnimation, setMovementAnimation] = useState<{ active: boolean; startX: number; startY: number; endX: number; endY: number; } | null>(null);
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
      const oldPos = { ...pos }; // Store the starting position

      if (cmd === 'up' && pos.y > 0) newPos.y -= 1;
      else if (cmd === 'down' && pos.y < gridSize - 1) newPos.y += 1;
      else if (cmd === 'left' && pos.x > 0) newPos.x -= 1;
      else if (cmd === 'right' && pos.x < gridSize - 1) newPos.x += 1;

      // Check if the new position has an obstacle that blocks movement
      const hasObstacle = currentLevel.obstacles?.some(obstacle =>
        obstacle.x === newPos.x && obstacle.y === newPos.y &&
        (obstacle.type === 'rock' || obstacle.type === 'wood' || obstacle.type === 'water' || obstacle.type === 'bush')
      );

      if (hasObstacle) {
        // Play "ouch" sound effect
        soundManager.playCollisionSound();
        
        // Stop the bunny at the current position (don't move to the obstacle position)
        // Start movement animation to show the impact
        setMovementAnimation({ active: true, startX: oldPos.x, startY: oldPos.y, endX: pos.x, endY: pos.y });
        
        // End movement animation after a delay to show the impact
        setTimeout(() => {
          setMovementAnimation(null);
        }, 400);
        
        // Stop executing further commands after collision
        break;
      } else {
        // Start movement animation
        setMovementAnimation({ active: true, startX: oldPos.x, startY: oldPos.y, endX: newPos.x, endY: newPos.y });

        pos = newPos;
        direction = cmd; // Track the direction the bunny is facing
        setBunnyPos(pos);

        // End movement animation after a delay to match animation duration
        setTimeout(() => {
          setMovementAnimation(null);
        }, 400); // Using 400ms as a middle ground between 300-500ms

        // Check if the bunny landed on a catapult
        if (currentLevel.flying) {
          const catapult = currentLevel.flying.find(obs => obs.type === 'catapult' && obs.x === pos.x && obs.y === pos.y);
          if (catapult) {
            // Start catapult animation
            setCatapultAnimation({ active: true, x: pos.x, y: pos.y });
            
            // Launch the bunny 2 spaces forward in the direction it's facing
            const launchPos = { ...pos };
            if (direction === 'up' && launchPos.y > 1) launchPos.y -= 2;
            else if (direction === 'down' && launchPos.y < gridSize - 2) launchPos.y += 2;
            else if (direction === 'left' && launchPos.x > 1) launchPos.x -= 2;
            else if (direction === 'right' && launchPos.x < gridSize - 2) launchPos.x += 2;
            else {
              // If the launch would go out of bounds, stay on catapult
              setCatapultAnimation(null);
              break;
            }
            pos = launchPos;
            setBunnyPos(pos);
            
            // End animation after delay to allow visual effect to complete
            setTimeout(() => {
              setCatapultAnimation(null);
            }, 1000); // 1 second to match animation duration
          }
        }

        if (pos.x === carrotPos.x && pos.y === carrotPos.y) {
          setGameWon(true);
          break;
        }
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
    setCatapultAnimation(null);
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
    catapultAnimation,
    movementAnimation,
  };
};