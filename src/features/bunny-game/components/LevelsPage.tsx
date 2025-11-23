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
      <div className="max-w-5xl mx-auto flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-800">📊 Niveluri</h1>
        
        <div className="w-full max-w-4xl mb-8 bg-gradient-to-br from-yellow-700 via-amber-800 to-yellow-900 rounded-xl border-4 border-yellow-950 shadow-inner overflow-hidden">
          <div className="flex flex-col">
            {/* Опциональный заголовок, как в ТЗ */}
            <div className="p-4 bg-yellow-950">
              <p className="text-amber-200 font-bold text-xl text-center">Alege un nivel</p>
            </div>
            
            {levels.map((lvl, index) => (
              <button
                key={index}
                onClick={() => onSelectLevel(index + 1)}
                className="p-4 text-left transition-colors duration-200 odd:bg-black/20 even:bg-transparent hover:bg-amber-600/50 border-b border-yellow-900/50 last:border-b-0"
              >
                <p className="text-xl font-bold text-amber-100">{lvl.name}</p>
                <p className="text-amber-200/80 mt-1">Apasă pentru a începe</p>
              </button>
            ))}
          </div>
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