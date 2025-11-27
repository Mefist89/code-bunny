import React from 'react';

interface HowToPlayPageProps {
  onNavigate: (page: string) => void;
}

const HowToPlayPage: React.FC<HowToPlayPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4 sm:p-8" style={{ transform: 'scale(1.20)', transformOrigin: 'top center' }}>
      <div className="w-full mx-auto flex flex-col items-center py-6" style={{ transform: 'scale(0.87)', transformOrigin: 'top center' }}>
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-green-800">📋 Cum se joacă</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 w-full mb-6">
          {/* Game Objective */}
          <div className="mb-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Scopul jocului
            </h2>
            <p className="text-gray-700 text-lg">Ajută iepurașul 🐰 să ajungă la morcov 🥕 folosind o secvență de comenzi!</p>
          </div>

          {/* Game Controls */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎮</span> Controlul jocului
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="text-2xl bg-red-500 text-white p-2 rounded">↑</span>
                <span>Comandă SUS - Iepurașul merge în sus</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="text-2xl bg-blue-500 text-white p-2 rounded">↓</span>
                <span>Comandă JOS - Iepurașul merge în jos</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="text-2xl bg-green-500 text-white p-2 rounded">←</span>
                <span>Comandă STÂNGA - Iepurașul merge la stânga</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="text-2xl bg-orange-500 text-white p-2 rounded">→</span>
                <span>Comandă DREAPTA - Iepurașul merge la dreapta</span>
              </div>
            </div>
          </div>

          {/* Step-by-step Guide */}
          <div className="mb-8 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
            <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">📋</span> Ghid pas cu pas
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
              <li>Analizează tabla de joc și gândește-te la drumul pe care trebuie să-l urmeze iepurașul</li>
              <li>Apasă pe <span className="font-bold text-blue-500">săgeți</span> pentru a adăuga comenzi în secvență</li>
              <li>Vezi comenzile tale afișate în partea de jos a ecranului</li>
              <li>Apasă <span className="font-bold text-green-500">"Rulează"</span> pentru a vedea iepurașul executând comenzile</li>
              <li>Urmărește cum iepurașul se mișcă pas cu pas</li>
              <li>Dacă iepurașul ajunge la morcov 🥕, ai câștigat!</li>
              <li>Dacă nu reușești, apasă <span className="font-bold text-orange-50">"Resetează"</span> și încearcă din nou</li>
            </ol>
          </div>

          {/* Game Mechanics */}
          <div className="mb-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
            <h2 className="text-2xl font-bold text-yellow-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚙️</span> Mecanica jocului
            </h2>
            <div className="space-y-4 text-gray-700 text-lg">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Obstacole:</h3>
                <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                  <li><span className="font-semibold">Rocile 🪨</span> - Iepurașul nu poate trece prin ele</li>
                  <li><span className="font-semibold">Apa 💧</span> - Iepurașul nu poate trece prin apă</li>
                  <li><span className="font-semibold">Copacii 🌳</span> - Iepurașul nu poate trece prin copaci</li>
                  <li><span className="font-semibold">Cătările 🔥</span> - Iepurașul nu poate trece prin tufișuri</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Elemente speciale:</h3>
                <ul className="list-disc list-inside ml-4 space-y-2 mt-2">
                  <li><span className="font-semibold">Catapultele 🚀</span> - Când iepurașul pășește pe o catapultă, este lansat cu 2 poziții în față în direcția în care mergea</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interface Elements */}
          <div className="mb-8 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
            <h2 className="text-2xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎨</span> Elemente ale interfeței
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-lg">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800">Tabla de joc</h3>
                <p>Grilă 8x8 cu iepurașul 🐰 și morcovul 🥕</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800">Butonul "Rulează"</h3>
                <p>Execută secvența de comenzi create</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800">Butonul "Resetează"</h3>
                <p>Repornește nivelul curent</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-80">Șterge comenzi</h3>
                <p>Elimină ultima comandă sau toate comenzile</p>
              </div>
            </div>
          </div>

          {/* Programming Concepts */}
          <div className="mb-8 p-4 bg-pink-50 rounded-lg border-l-4 border-pink-500">
            <h2 className="text-2xl font-bold text-pink-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">💻</span> Concepte de programare pentru începători
            </h2>
            <div className="space-y-3 text-gray-700 text-lg">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800">Secvențialitate:</h3>
                <p>Comenzile sunt executate în ordinea în care le-ai adăugat</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800">Algoritmi:</h3>
                <p>Succesiunea de comenzi este un algoritm care rezolvă problema</p>
              </div>
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-800">Planificare:</h3>
                <p>Gândește-te la soluție înainte de a crea secvența de comenzi</p>
              </div>
            </div>
          </div>

          {/* Example Code */}
          <div className="mb-8 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <h2 className="text-2xl font-bold text-red-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">📝</span> Exemplu de "cod"
            </h2>
            <div className="p-4 bg-gray-800 text-green-400 rounded-lg font-mono text-lg overflow-x-auto">
              <p className="mb-2">// Pentru a ajunge iepurașul de la (0,0) la (2,2)</p>
              <p className="mb-2">Mergi la DREAPTA</p>
              <p className="mb-2">Mergi la DREAPTA</p>
              <p className="mb-2">Mergi la JOS</p>
              <p className="mb-2">Mergi la JOS</p>
              <p className="mt-4">// Rezultat: Iepurașul ajunge la morcov! 🐰➡🥕</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mb-8 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
            <h2 className="text-2xl font-bold text-teal-700 mb-3 flex items-center gap-2">
              <span className="text-2xl">🧭</span> Navigare în aplicație
            </h2>
            <div className="space-y-3 text-gray-700 text-lg">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">🏠</span>
                <span><span className="font-bold">Meniu principal:</span> De la orice ecran poți reveni la meniu</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">📊</span>
                <span><span className="font-bold">Niveluri:</span> Alege orice nivel dorit din listă</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">🎮</span>
                <span><span className="font-bold">Joc:</span> Ecranul de joc unde creezi și execuți comenzile</span>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="p-4 bg-yellow-100 rounded-lg border-l-4 border-yellow-400">
            <h3 className="font-bold text-yellow-800 text-xl mb-2">💡 Sfaturi pentru programatori începători:</h3>
            <ul className="list-disc list-inside space-y-2 text-yellow-70 text-lg">
              <li>Gândește-te la drumul înainte de a începe să creezi comenzi</li>
              <li>Folosește "Resetează" pentru a încerca din nou fără să părăsești nivelul</li>
              <li>Încearcă să găsești cea mai scurtă cale posibilă către morcov</li>
              <li>Experimentează! E OK să greșești - așa înveți!</li>
            </ul>
          </div>
        </div>
        
        <button
          onClick={() => onNavigate('menu')}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl hover:from-green-600 hover:to-blue-600 font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <span>←</span> Înapoi la meniu
        </button>
      </div>
    </div>
  );
};

export default HowToPlayPage;