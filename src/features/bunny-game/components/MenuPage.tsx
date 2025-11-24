import React, { useEffect } from 'react';
import startImage from '/img/start.png';

interface MenuPageProps {
  onNavigate: (page: string) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    // Create audio element for background music
    const audio = new Audio('/sounds/bg.mp3');
    audio.loop = true; // Make the music loop continuously
    audio.volume = 0.5; // Set volume to 50% to avoid being too loud

    // Play the background music when the component mounts
    const playPromise = audio.play();
    
    // Handle potential autoplay policy violations
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay was prevented, this is expected in some browsers
        console.log("Autoplay prevented:", error);
      });
    }

    // Cleanup function to stop music when component unmounts or user navigates away
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset to beginning for next play
    };
  }, []); // Empty dependency array means this effect runs only on mount and unmount

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold text-center mb-4 text-green-800 flex items-center justify-center gap-4">
          <img src="/img/bunny1.png" alt="Bunny" className="h-16 w-16 object-contain" />
          Code Bunny
        </h1>
        <p className="text-center text-gray-700 mb-10 text-xl">Învață să programezi jucându-te!</p>
        
        <div className="mb-8 flex justify-center">
          <img src={startImage} alt="Code Bunny Start" className="max-w-[45%] h-auto rounded-lg shadow-lg" />
        </div>
        
        <div className="flex flex-col gap-4 w-full max-w-md mb-8">
          <button
            onClick={() => onNavigate('game')}
            className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 text-2xl font-bold shadow-lg transition-all hover:scale-105"
          >
            🎮 Start Joc
          </button>
        </div>
        
        <div className="flex flex-col gap-4 w-full max-w-md">
          <button
            onClick={() => onNavigate('levels')}
            className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 text-2xl font-bold shadow-lg transition-all hover:scale-105"
          >
            📊 Niveluri
          </button>
          <button
            onClick={() => onNavigate('howto')}
            className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 text-2xl font-bold shadow-lg transition-all hover:scale-105"
          >
            📋 Cum se joacă
          </button>
          <button
            onClick={() => onNavigate('creators')}
            className="bg-purple-500 text-white px-8 py-4 rounded-xl hover:bg-purple-600 text-2xl font-bold shadow-lg transition-all hover:scale-105"
          >
            👨‍💻 Creatori
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;