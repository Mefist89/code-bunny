# Code Bunny - Educational Programming Game

## Overview

Code Bunny is an educational programming game designed for first-grade children to develop algorithmic thinking skills. The game teaches basic programming concepts through a fun, interactive bunny character that must navigate to reach a carrot by following a sequence of commands.

## Architecture

The application follows a React-based component architecture with the following structure:

- **Main Components**:
  - [`BunnyCodingGame.tsx`](src/BunnyCodingGame.tsx:1) - Main game controller that manages page navigation and state
  - [`App.tsx`](src/App.tsx:1) - Root application component

- **Feature Module**:
  - [`src/features/bunny-game/`](src/features/bunny-game/) - Contains all game-related functionality
    - **Components**: MenuPage, GamePage, LevelsPage, HowToPlayPage, CreatorsPage
    - **Hooks**: useGameEngine - Central game logic manager
    - **Types**: TypeScript interfaces and type definitions

## Technologies

- **Frontend Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript, PostCSS, Autoprefixer

## Functionality

### Core Features:
- **Interactive Game Board**: 8x8 grid where the bunny navigates to reach the carrot
- **Command System**: Users create sequences of movement commands (up, down, left, right)
- **Multiple Levels**: 15 progressively challenging levels with different obstacles
- **Obstacles**: Rocks, wood, water, bushes that block the bunny's path
- **Special Elements**: Catapults that launch the bunny forward when stepped on

### Game Mechanics:
- **Movement Controls**: Arrow buttons to add commands to the sequence
- **Execution Engine**: Step-by-step execution of command sequences
- **Animation System**: Visual feedback for bunny movement and catapult launches
- **Level Management**: Navigation between different levels with progress tracking
- **Win Conditions**: Automatic detection when bunny reaches the carrot

### User Interface:
- **Menu System**: Main menu with options for gameplay, level selection, instructions
- **Responsive Design**: Works on different screen sizes with scaling
- **Visual Feedback**: Animations for movement, win states, and interactive elements
- **Command Visualization**: Visual display of the command sequence being executed

### Game Elements:
- **Bunny Character**: The player-controlled character
- **Carrot Goal**: The target destination
- **Obstacles**: Various types including rocks, wood, water, and bushes
- **Catapults**: Special elements that launch the bunny forward in the direction it's facing

## How to Run

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

The game is designed to be intuitive for young children while teaching fundamental programming concepts like sequencing, logical thinking, and problem-solving.
