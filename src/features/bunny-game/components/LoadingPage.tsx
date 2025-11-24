import React, { useState, useEffect } from 'react';

interface LoadingPageProps {
 onLoadingComplete: () => void;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentAsset, setCurrentAsset] = useState('Загрузка...');

  // List of all assets to preload
  const assets = [
    // Images
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
    // Sounds
    '/sounds/bg.mp3',
    '/sounds/bunny-ouch.mp3',
    '/sounds/carrot-crunch.mp3',
  ];

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = assets.length;

    const preloadAssets = async () => {
      for (const asset of assets) {
        try {
          setCurrentAsset(`Загрузка: ${asset.split('/').pop() || asset}`);
          
          if (asset.endsWith('.mp3')) {
            // Preload audio
            const audio = new Audio();
            audio.src = asset;
            await new Promise((resolve, reject) => {
              audio.oncanplaythrough = resolve;
              audio.onerror = reject;
              // Set a timeout to avoid hanging on failed loads
              setTimeout(reject, 5000);
            });
          } else {
            // Preload image
            await new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = asset;
              // Set a timeout to avoid hanging on failed loads
              setTimeout(reject, 5000);
            });
          }
          
          loadedCount++;
          const newProgress = Math.round((loadedCount / totalAssets) * 100);
          setProgress(newProgress);
        } catch (error) {
          console.warn(`Failed to load asset: ${asset}`, error);
          loadedCount++;
          const newProgress = Math.round((loadedCount / totalAssets) * 100);
          setProgress(newProgress);
        }
      }
      
      // Ensure progress reaches 100%
      setProgress(100);
      setCurrentAsset('Загрузка завершена!');

      // Small delay to show completion before transitioning
      setTimeout(() => {
        onLoadingComplete();
      }, 500);
    };

    preloadAssets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-green-200 to-yellow-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">Добро пожаловать!</h1>
          <p className="text-lg text-gray-600">Игра загружается...</p>
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
          <p>Подготовка игрового поля...</p>
        </div>
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