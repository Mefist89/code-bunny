import React from 'react';

interface HowToPlayPageProps {
  onNavigate: (page: string) => void;
}

const HowToPlayPage: React.FC<HowToPlayPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-800">📋 Cum se joacă</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mb-8">
          <ol className="list-decimal list-inside space-y-4 text-gray-700 text-lg">
            <li>Apasă pe <span className="font-bold text-blue-500">săgeți</span> pentru a crea o secvență de comenzi</li>
            <li>Apasă <span className="font-bold text-green-500">"Rulează"</span> pentru a vedea iepurașul executând comenzile</li>
            <li>Scopul este ca iepurașul 🐰 să ajungă la morcov 🥕</li>
            <li>Dacă nu reușești, apasă <span className="font-bold text-orange-500">"Resetează"</span> și încearcă din nou!</li>
            <li>Poți <span className="font-bold text-red-500">șterge</span> ultima comandă sau toate comenzile dacă greșești</li>
          </ol>
          
          <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
            <p className="text-center font-bold text-yellow-800">💡 Sfat: Gândește-te la drumul pe care trebuie să-l parcurgă iepurașul înainte de a adăuga comenzi!</p>
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

export default HowToPlayPage;