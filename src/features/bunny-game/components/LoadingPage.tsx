import React, { useState, useEffect, useRef } from 'react';
// Am eliminat importul soundManager deoarece folosim direct API-ul HTML5 Audio

interface LoadingPageProps {
 onLoadingComplete: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentAsset, setCurrentAsset] = useState('Se încarcă...');
  // Ref pentru a urmări elementul audio pentru muzica de fundal
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  // Ref pentru a urmări intervalul de estompare a muzicii
  const fadeOutIntervalRef = useRef<number | null>(null);

  // Lista tuturor resurselor de preîncărcat
  const assets = [
    // Imagini
    '/img/bunny1.png',
    '/img/bush1.png',
    '/img/carot1.png',
    '/img/catapult1.png',
    '/img/feat1.png',
    '/img/fish1.png',
    '/img/fox1.png',
    '/img/next.png',
    '/img/rock1.png',
    '/img/water1.png',
    '/img/wolf1.png',
    '/img/wood1.png',
    '/img/start.png',
    '/box1.png',
    '/box2.png',
    // Sunete
    '/sounds/bg.mp3',
    '/sounds/bunny-ouch.mp3',
    '/sounds/carrot-crunch.mp3',
  ];

  useEffect(() => {
    // Pornește muzica de fundal când componenta este montată
    const bgAudio = new Audio('/sounds/bg.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.5;
    bgAudioRef.current = bgAudio;
    
    // Redă muzica de fundal cu gestionarea erorilor pentru politicile de autopornire
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Redarea automată a fost prevenită pentru muzica de fundal:", error);
        // Dacă redarea automată este blocată, vom încerca să o redăm din nou când utilizatorul interacționează cu pagina
        // dar pentru moment vom doar înregistra eroarea
      });
    }

    let loadedCount = 0;
    const totalAssets = assets.length;

    const preloadAssets = async () => {
      for (const asset of assets) {
        try {
          setCurrentAsset(`Se încarcă: ${asset.split('/').pop() || asset}`);
          
          if (asset.endsWith('.mp3')) {
            // Preîncarcă sunetul
            const audio = new Audio();
            audio.src = asset;
            await new Promise((resolve, reject) => {
              audio.oncanplaythrough = resolve;
              audio.onerror = reject;
              // Stabilește un timp de așteptare pentru a evita blocarea la încărcările eșuate
              setTimeout(reject, 5000);
            });
          } else {
            // Preîncarcă imaginea
            await new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = asset;
              // Stabilește un timp de așteptare pentru a evita blocarea la încărcările eșuate
              setTimeout(reject, 5000);
            });
          }
          
          loadedCount++;
          const newProgress = Math.round((loadedCount / totalAssets) * 100);
          setProgress(newProgress);
        } catch (error) {
          console.warn(`Nu s-a reușit încărcarea resursei: ${asset}`, error);
          loadedCount++;
          const newProgress = Math.round((loadedCount / totalAssets) * 100);
          setProgress(newProgress);
        }
      }
      
      // Asigură-te că progresul ajunge la 100%
      setProgress(100);
      setCurrentAsset('Încărcare completă!');

      // Estompează muzica de fundal înainte de tranziție
      const fadeOutInterval = setInterval(() => {
        if (bgAudioRef.current && bgAudioRef.current.volume > 0.01) {
          bgAudioRef.current.volume -= 0.05; // Scade treptat volumul
        } else {
          clearInterval(fadeOutInterval);
          if (bgAudioRef.current) {
            bgAudioRef.current.pause();
            bgAudioRef.current.currentTime = 0; // Resetează la început
          }
        }
      }, 50); // Actualizează volumul la fiecare 50ms pentru estompare lină
      
      // Salvează intervalul în ref pentru curățare
      fadeOutIntervalRef.current = fadeOutInterval;
    };

    preloadAssets();

    // Funcție de curățare pentru a opri muzica și intervalul când componenta este demontată
    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current.currentTime = 0;
      }
      // Curăță intervalul dacă există
      if (fadeOutIntervalRef.current) {
        clearInterval(fadeOutIntervalRef.current);
      }
    };
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-green-200 to-yellow-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Bine ai venit!</h1>
          <p className="text-lg text-gray-600">Jocul se încarcă...</p>
        </div>

        <div className="relative mb-6">
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-center"
              style={{ width: `${progress}%` }}
            >
              <span className="text-xs font-bold text-white">{progress}%</span>
            </div>
          </div>
        </div>

        <div className="text-gray-700 font-medium mb-8 min-h-[24px]">
          {currentAsset}
        </div>

        <div className="flex justify-center">
          <div className="relative">
            {/* Animated bunny */}
            <div className="animate-bounce">
              <img 
                src="/img/bunny1.png" 
                alt="Bunny" 
                className="w-24 h-24 object-contain"
              />
            </div>
            
            {/* Carrot that appears when progress is high */}
            {progress > 30 && (
              <div className={`absolute top-0 left-full ml-4 transition-all duration-1000 ${progress > 50 ? 'opacity-10' : 'opacity-0'}`}>
                <img 
                  src="/img/carot1.png" 
                  alt="Carrot" 
                  className="w-16 h-16 object-contain animate-pulse"
                />
              </div>
            )}
            
            {/* Catapult that appears when progress is higher */}
            {progress > 60 && (
              <div className={`absolute top-0 right-full mr-4 transition-all duration-1000 ${progress > 80 ? 'opacity-10' : 'opacity-0'}`}>
                <img 
                  src="/img/catapult1.png" 
                  alt="Catapult" 
                  className="w-16 h-16 object-contain animate-spin"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Pregătirea câmpului de joc...</p>
        </div>

        {/* Butonul de Start apare după ce încărcarea este completă și permite utilizatorului să acceseze meniul jocului */}
        {progress === 100 && (
          <div className="mt-6">
            <button
              onClick={onLoadingComplete}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
              Start {/* Cuvântul "Start" este păstrat în această formă pentru că este un termen universal recunoscut în interfețele de joc */}
            </button>
          </div>
        )}
      </div>
      
      {/* Fun decorative elements */}
      <div className="absolute top-10 left-10 text-4xl animate-bounce">🌱</div>
      <div className="absolute top-20 right-16 text-3xl animate-pulse">🐰</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-bounce delay-300">🍃</div>
      <div className="absolute bottom-10 right-10 text-3xl animate-pulse delay-500">🥕</div>
    </div>
  );
};

export default LoadingPage;