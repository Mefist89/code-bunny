import React from 'react';
import startImage from '../../../assets/img/start.png';

interface MenuPageProps {
  onNavigate: (page: string) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold text-center mb-4 text-green-800">🐰 Code Bunny</h1>
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