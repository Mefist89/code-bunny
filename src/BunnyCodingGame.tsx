import { useState } from 'react';
import MenuPage from './features/bunny-game/components/MenuPage';
import LevelsPage from './features/bunny-game/components/LevelsPage';
import HowToPlayPage from './features/bunny-game/components/HowToPlayPage';
import CreatorsPage from './features/bunny-game/components/CreatorsPage';
import GamePage from './features/bunny-game/components/GamePage';
import { useGameEngine } from './features/bunny-game/hooks/useGameEngine';

const BunnyCodingGame = () => {
  const [currentPage, setCurrentPage] = useState('menu');
  const gameEngine = useGameEngine();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleSelectLevel = (levelIndex: number) => {
    gameEngine.setLevel(levelIndex);
    setCurrentPage('game');
  };

  if (currentPage === 'menu') {
    return <MenuPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'levels') {
    return <LevelsPage levels={gameEngine.levels} onSelectLevel={handleSelectLevel} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'howto') {
    return <HowToPlayPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'creators') {
    return <CreatorsPage onNavigate={handleNavigate} />;
  }
  
  return (
    <GamePage
      level={gameEngine.level}
      levels={gameEngine.levels}
      bunnyPos={gameEngine.bunnyPos}
      carrotPos={gameEngine.carrotPos}
      commands={gameEngine.commands}
      currentStep={gameEngine.currentStep}
      isRunning={gameEngine.isRunning}
      gameWon={gameEngine.gameWon}
      gridSize={gameEngine.gridSize}
      onNavigate={handleNavigate}
      onAddCommand={gameEngine.addCommand}
      onRemoveLastCommand={gameEngine.removeLastCommand}
      onClearCommands={gameEngine.clearCommands}
      onExecuteCommands={gameEngine.executeCommands}
      onResetGame={gameEngine.resetGame}
      onNextLevel={gameEngine.nextLevel}
      onPrevLevel={gameEngine.prevLevel}
    />
  );
};

export default BunnyCodingGame;