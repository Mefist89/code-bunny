import React from 'react';

interface LevelCompleteModalProps {
  levelId: number;
  totalLevels: number;
  onNextLevel: () => void;
}

const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({ 
  levelId, 
  totalLevels, 
  onNextLevel 
}) => {
  const isLastLevel = levelId === totalLevels;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full mx-4" style={{ minHeight: '600px' }}>
        <div className="mb-6">
          <p className="text-2xl font-bold text-green-600 mb-2">🎉 Bravo! Ai reușit! 🎉</p>
          <p className="text-gray-700 text-lg">Iepurașul a ajuns la morcov!</p>
        </div>

        <div className="mb-8 flex justify-center">
          <img 
            src="/img/next.png" 
            alt="Next Level" 
            className="w-48 h-48 object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={onNextLevel}
          />
        </div>

        {!isLastLevel ? (
          <div>
            <p className="text-gray-700 mb-4">Nivel {levelId + 1} din {totalLevels}</p>
            <button
              onClick={onNextLevel}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 text-lg"
            >
              Următorul Nivel →
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-700 mb-4 text-lg font-bold">🏆 Ai completat toate nivelurile! 🏆</p>
            <button
              onClick={onNextLevel}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 text-lg"
            >
              Înapoi la Meniu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelCompleteModal;
