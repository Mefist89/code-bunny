import React from 'react';

interface Level {
  name: string;
}

interface LevelsPageProps {
  levels: Level[];
  onSelectLevel: (levelIndex: number) => void;
  onNavigate: (page: string) => void;
}

const LevelsPage: React.FC<LevelsPageProps> = ({ levels, onSelectLevel, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-800">📊 Niveluri</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
          {levels.map((lvl, index) => (
            <button
              key={index}
              onClick={() => onSelectLevel(index + 1)}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-green-300"
            >
              <p className="text-xl font-bold text-gray-800">{lvl.name}</p>
              <p className="text-gray-600 mt-2">🐰 → 🥕</p>
            </button>
          ))}
        </div>
        
        <button
          onClick={() => onNavigate('menu')}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 font-bold"
        >
          ← Înapoi la meniu
        </button>
      </div>
    </div>
  );
};

export default LevelsPage;