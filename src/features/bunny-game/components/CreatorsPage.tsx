import React from 'react';

interface CreatorsPageProps {
  onNavigate: (page: string) => void;
}

const CreatorsPage: React.FC<CreatorsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8" style={{ transform: 'scale(1.20)', transformOrigin: 'top center' }}>
      <div className="w-full mx-auto flex flex-col items-center py-10" style={{ transform: 'scale(0.87)', transformOrigin: 'top center' }}>
        <h1 className="text-4xl font-bold text-center mb-8 text-green-800">👨‍💻 Creatori</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 w-full mb-8 text-center">
          <div className="text-6xl mb-4">🐰🥕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Code Bunny</h2>
          <p className="text-gray-700 text-lg mb-4">
            Un joc educațional pentru copiii de clasa întâi, destinat dezvoltării gândirii algoritmice.
          </p>
          <div className="border-t pt-4 mt-4">
            <p className="text-gray-600">Creat cu ❤️ pentru micii programatori</p>
            <p className="text-gray-500 mt-2">Versiunea 1.0</p>
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

export default CreatorsPage;