import { useState, useEffect } from 'react';
import type { Position, Command } from '../types/index';
import { soundManager } from '../../../utils/soundManager';
import rawLevels from '../data/levels.json';
import type { Level } from '../types/index';

const levels = rawLevels as unknown as Level[];

export const useGameEngine = () => {
  const GAME_SPEED_MS = 500;
  const MOVEMENT_ANIMATION_DURATION = 400;
  const CATAPULT_ANIMATION_DURATION = 1000;

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
    setBunnyDirection(null); // Reset direction when level changes
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
      await new Promise(resolve => setTimeout(resolve, GAME_SPEED_MS));
      
      const cmd = commands[i];
      const newPos = { ...pos };
      const oldPos = { ...pos }; // Store the starting position

      if (cmd === 'up' && pos.y > 0) newPos.y -= 1;
      else if (cmd === 'down' && pos.y < gridSize - 1) newPos.y += 1;
      else if (cmd === 'left' && pos.x > 0) newPos.x -= 1;
      else if (cmd === 'right' && pos.x < gridSize - 1) newPos.x += 1;

      // Check if the new position has a catapult first (catapults take precedence over obstacles)
     const hasCatapult = currentLevel.flying?.some(obs => obs.type === 'catapult' && obs.x === newPos.x && obs.y === newPos.y);
     const hasObstacle = currentLevel.obstacles?.some(obstacle =>
       obstacle.x === newPos.x && obstacle.y === newPos.y &&
       (obstacle.type === 'rock' || obstacle.type === 'wood' || obstacle.type === 'water' || obstacle.type === 'bush')
     );

     if (hasCatapult) {
       // Start movement animation to move to the catapult position
       setMovementAnimation({ active: true, startX: oldPos.x, startY: oldPos.y, endX: newPos.x, endY: newPos.y });

       pos = newPos;
       direction = cmd; // Track the direction the bunny is facing
       setBunnyPos(pos);
       setBunnyDirection(cmd); // Update the bunny's facing direction

       // End movement animation after a delay to match animation duration
       setTimeout(() => {
         setMovementAnimation(null);
       }, MOVEMENT_ANIMATION_DURATION);

       // Now handle the catapult
       const catapult = currentLevel.flying?.find(obs => obs.type === 'catapult' && obs.x === pos.x && obs.y === pos.y);
       if (catapult) {
         // Start catapult animation at the catapult position
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
         
         // Check if the new position after catapult has an obstacle that blocks movement
        const postCatapultObstacle = currentLevel.obstacles?.some(obstacle =>
          obstacle.x === launchPos.x && obstacle.y === launchPos.y &&
          (obstacle.type === 'rock' || obstacle.type === 'wood' || obstacle.type === 'water' || obstacle.type === 'bush')
        );

        if (postCatapultObstacle) {
          // Play "ouch" sound effect
          soundManager.playCollisionSound();
          
          // Update the local position variable for the next loop iteration
          pos = launchPos;
          
          // Move bunny to the position where it hit the obstacle (the launch position)
          // But first wait a bit to allow the catapult animation to show at the original position
          setTimeout(() => {
            setBunnyPos(launchPos);
          }, 300); // Delay to allow animation to be visible first
          
          // End animation after delay to allow visual effect to complete
          setTimeout(() => {
            setCatapultAnimation(null);
          }, CATAPULT_ANIMATION_DURATION);
          
          // Stop executing further commands after collision
          break;
        } else {
          // Update the local position variable for the next loop iteration
          pos = launchPos;
          
          // Move bunny to the launch position after a delay to allow animation to play at original position
          setTimeout(() => {
            setBunnyPos(launchPos);
          }, 300); // Delay to allow animation to be visible first

          // End animation after delay to allow visual effect to complete
          setTimeout(() => {
            setCatapultAnimation(null);
          }, CATAPULT_ANIMATION_DURATION);
        }
       }
     } else if (hasObstacle) {
       // Play "ouch" sound effect
       soundManager.playCollisionSound();
       
       // Stop the bunny at the current position (don't move to the obstacle position)
       // Start movement animation to show the impact
       setMovementAnimation({ active: true, startX: oldPos.x, startY: oldPos.y, endX: pos.x, endY: pos.y });
       
       // End movement animation after a delay to show the impact
       setTimeout(() => {
         setMovementAnimation(null);
       }, MOVEMENT_ANIMATION_DURATION);
       
       // Stop executing further commands after collision
       break;
     } else {
       // Normal movement without catapult or obstacle
       // Start movement animation
       setMovementAnimation({ active: true, startX: oldPos.x, startY: oldPos.y, endX: newPos.x, endY: newPos.y });

       pos = newPos;
       direction = cmd; // Track the direction the bunny is facing
       setBunnyPos(pos);
       setBunnyDirection(cmd); // Update the bunny's facing direction

       // End movement animation after a delay to match animation duration
       setTimeout(() => {
         setMovementAnimation(null);
       }, MOVEMENT_ANIMATION_DURATION);

       if (pos.x === currentLevel.carrot.x && pos.y === currentLevel.carrot.y) {
         setGameWon(true);
         soundManager.playCarrotCrunchSound();
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
    setMovementAnimation(null);
    setIsRunning(false); // Also reset the running state
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
    bunnyDirection, // Add bunnyDirection to the returned values
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