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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center py-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-purple-600 flex items-center justify-center gap-3">
          <span className="text-5xl">🐰</span> Niveluri <span className="text-5xl">🥕</span>
        </h1>
        <p className="text-lg text-purple-500 mb-8 text-center">Alege un nivel și începe aventura!</p>
        
        <div className="w-full max-w-4xl mb-8 bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 rounded-3xl border-4 border-pink-300 shadow-lg shadow-pink-100 overflow-hidden">
          <div className="p-5 bg-gradient-to-r from-purple-400 to-pink-400">
            <p className="text-white font-bold text-xl text-center flex items-center justify-center gap-2">
              <span>✨</span> Alege un nivel <span>✨</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-6">
            {levels.map((lvl, index) => (
              <button
                key={index}
                onClick={() => onSelectLevel(index + 1)}
                className="p-5 text-center transition-all duration-300 bg-white/80 hover:bg-pink-50 border-2 border-purple-200 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-1 flex flex-col items-center justify-center min-h-[120px]"
              >
                <div className="text-3xl mb-2"> {/* Adding level icons */}
                  {index % 5 === 0 ? '🌱' :
                   index % 5 === 1 ? '🌿' :
                   index % 5 === 2 ? '🍃' :
                   index % 5 === 3 ? '🐰' : '🥕'}
                </div>
                <p className="text-lg font-bold text-purple-700">{lvl.name}</p>
                <p className="text-purple-500/80 text-sm mt-1">Apasă pentru a începe</p>
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => onNavigate('menu')}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-60 font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <span>←</span> Înapoi la meniu
        </button>
      </div>
    </div>
  );
};

export default LevelsPage;