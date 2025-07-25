import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, CheckCircle, RotateCcw, Star, Shirt, Glasses, Zap, ShoppingBag, Package, Footprints, Umbrella, Users, Heart, Sparkles, Shield } from 'lucide-react';

const WeatherDressUpGame = () => {
  const [currentWeather, setCurrentWeather] = useState('rainy');
  const [selectedClothes, setSelectedClothes] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const weatherTypes = {
    rainy: {
      name: 'Rainy Day',
      icon: CloudRain,
      color: 'from-blue-500 to-blue-600',
      correctClothes: ['raincoat', 'rainboots', 'umbrella'],
      description: 'It\'s raining outside! What should we wear?'
    },
    sunny: {
      name: 'Sunny Day',
      icon: Sun,
      color: 'from-yellow-400 to-orange-500',
      correctClothes: ['tshirt', 'shorts', 'sunglasses'],
      description: 'It\'s bright and sunny! Perfect weather for playing outside!'
    },
    cold: {
      name: 'Cold Day',
      icon: Snowflake,
      color: 'from-blue-400 to-purple-600',
      correctClothes: ['jacket', 'scarf', 'gloves'],
      description: 'Brrr! It\'s very cold today!'
    },
    cloudy: {
      name: 'Cloudy Day',
      icon: Cloud,
      color: 'from-gray-400 to-gray-600',
      correctClothes: ['sweater', 'jeans', 'sneakers'],
      description: 'It\'s cloudy but mild today!'
    }
  };

  const clothingItems = {
    raincoat: { name: 'Raincoat', icon: Shield, color: 'bg-yellow-400' },
    boots: { name: 'Rain Boots', icon: Footprints, color: 'bg-red-400' },
    umbrella: { name: 'Umbrella', icon: Umbrella, color: 'bg-blue-400' },
    tshirt: { name: 'T-Shirt', icon: Shirt, color: 'bg-green-400' },
    shorts: { name: 'Shorts', icon: Package, color: 'bg-orange-400' },
    sunglasses: { name: 'Sunglasses', icon: Glasses, color: 'bg-purple-400' },
    jacket: { name: 'Winter Jacket', icon: Shield, color: 'bg-indigo-400' },
    scarf: { name: 'Scarf', icon: Zap, color: 'bg-pink-400' },
    gloves: { name: 'Gloves', icon: Users, color: 'bg-teal-400' },
    sweater: { name: 'Sweater', icon: Shirt, color: 'bg-emerald-400' },
    jeans: { name: 'Jeans', icon: Package, color: 'bg-blue-500' },
    sneakers: { name: 'Sneakers', icon: Footprints, color: 'bg-gray-400' }
  };

  const toggleClothingItem = (item) => {
    if (gameComplete) return;
    
    setSelectedClothes(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const checkAnswer = () => {
    const correctClothes = weatherTypes[currentWeather].correctClothes;
    const isCorrect = correctClothes.every(item => selectedClothes.includes(item)) &&
                     selectedClothes.every(item => correctClothes.includes(item));
    
    setAttempts(prev => prev + 1);
    
    if (isCorrect) {
      setGameComplete(true);
      setScore(prev => prev + Math.max(3 - attempts, 1));
      setShowFeedback(true);
      
      setTimeout(() => {
        nextLevel();
      }, 3000);
    } else {
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  const nextLevel = () => {
    const weatherKeys = Object.keys(weatherTypes);
    const currentIndex = weatherKeys.indexOf(currentWeather);
    const nextIndex = (currentIndex + 1) % weatherKeys.length;
    
    setCurrentWeather(weatherKeys[nextIndex]);
    setSelectedClothes([]);
    setGameComplete(false);
    setShowFeedback(false);
    setAttempts(0);
  };

  const resetGame = () => {
    setSelectedClothes([]);
    setGameComplete(false);
    setShowFeedback(false);
    setAttempts(0);
  };

  const weather = weatherTypes[currentWeather];
  const WeatherIcon = weather.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${weather.color} p-4 transition-all duration-700`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4 animate-bounce">
            <WeatherIcon size={60} className="drop-shadow-lg" />
            Weather Dress-Up Game!
            <Heart size={40} className="text-red-300 animate-pulse" />
          </h1>
          <div className="flex items-center justify-center gap-6 text-white text-xl">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star size={24} className="text-yellow-300" />
              <span>Score: {score}</span>
            </div>
          </div>
        </div>

        {/* Weather Scene */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 mb-8 border-2 border-white/20">
          <div className="text-center">
            <div className="text-6xl mb-4">
              <WeatherIcon size={120} className="mx-auto text-white drop-shadow-lg animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{weather.name}</h2>
            <p className="text-xl text-white/90">{weather.description}</p>
          </div>
        </div>

        {/* Clothing Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(clothingItems).map(([key, item]) => {
            const ItemIcon = item.icon;
            const isSelected = selectedClothes.includes(key);
            const isCorrect = weatherTypes[currentWeather].correctClothes.includes(key);
            
            return (
              <button
                key={key}
                onClick={() => toggleClothingItem(key)}
                className={`
                  ${item.color} hover:scale-110 transform transition-all duration-300
                  ${isSelected ? 'ring-4 ring-white scale-105 shadow-2xl' : 'hover:shadow-xl'}
                  ${gameComplete && isCorrect ? 'animate-bounce' : ''}
                  rounded-2xl p-6 text-white font-bold text-center
                  border-3 border-white/30 backdrop-blur-sm
                  ${!gameComplete ? 'cursor-pointer' : 'cursor-default'}
                  active:scale-95
                `}
                disabled={gameComplete}
              >
                <ItemIcon size={48} className="mx-auto mb-3 drop-shadow-lg" />
                <div className="text-sm font-semibold">{item.name}</div>
                {isSelected && (
                  <CheckCircle size={24} className="mx-auto mt-2 text-green-200 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Items Display */}
        {selectedClothes.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6 border-2 border-white/20">
            <h3 className="text-white text-xl font-bold mb-3 text-center flex items-center justify-center gap-2">
              <ShoppingBag size={24} />
              Your Outfit Choice:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {selectedClothes.map(item => {
                const ItemIcon = clothingItems[item].icon;
                return (
                  <div key={item} className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-2 text-white text-sm">
                    <ItemIcon size={20} />
                    {clothingItems[item].name}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={checkAnswer}
            disabled={selectedClothes.length === 0 || gameComplete}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                     text-white font-bold py-4 px-8 rounded-full text-xl
                     transform hover:scale-105 active:scale-95 transition-all duration-200
                     shadow-lg flex items-center gap-3"
          >
            <CheckCircle size={24} />
            Check My Outfit!
          </button>
          
          <button
            onClick={resetGame}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-xl
                     transform hover:scale-105 active:scale-95 transition-all duration-200
                     shadow-lg flex items-center gap-3"
          >
            <RotateCcw size={24} />
            Try Again
          </button>
        </div>

        {/* Feedback Messages */}
        {showFeedback && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className={`
              ${gameComplete ? 'bg-green-500' : 'bg-red-500'}
              text-white text-3xl font-bold p-8 rounded-3xl text-center
              transform animate-bounce shadow-2xl border-4 border-white
            `}>
              {gameComplete ? (
                <div className="flex flex-col items-center gap-4">
                  <Sparkles size={60} className="animate-spin" />
                  <div>Perfect! You know how to dress for {weather.name.toLowerCase()}!</div>
                  <div className="text-xl">+{Math.max(3 - attempts, 1)} points!</div>
                  <div className="text-lg flex items-center gap-2">
                    <Star size={24} className="text-yellow-300" />
                    Moving to next weather...
                    <Star size={24} className="text-yellow-300" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="text-4xl">🤔</div>
                  <div>Not quite right! Think about what keeps you comfortable in this weather!</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center text-white/80 text-lg">
          <p className="mb-2">👆 Click on the clothes you think are perfect for this weather!</p>
          <p>Choose 3 items that will keep you comfortable and safe! ⭐</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDressUpGame;
