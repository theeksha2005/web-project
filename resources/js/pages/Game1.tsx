import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, Snowflake, Wind, Shirt, Umbrella, ThermometerSnowflake, ThermometerSun, Smile } from 'lucide-react';

interface WeatherType {
  icon: React.ReactNode;
  bgColor: string;
  clothingSuggestions: string[];
}

interface ClothingItem {
  name: string;
  icon: React.ReactNode;
}

const weatherTypes: Record<string, WeatherType> = {
  sunny: {
    icon: <Sun className="w-10 h-10 text-yellow-400" />,
    bgColor: 'bg-yellow-200',
    clothingSuggestions: ['t-shirt', 'shorts', 'sunglasses']
  },
  rainy: {
    icon: <CloudRain className="w-10 h-10 text-blue-600" />,
    bgColor: 'bg-blue-300',
    clothingSuggestions: ['raincoat', 'umbrella', 'boots']
  },
  snowy: {
    icon: <Snowflake className="w-10 h-10 text-white" />,
    bgColor: 'bg-blue-100',
    clothingSuggestions: ['jacket', 'scarf', 'gloves']
  },
  windy: {
    icon: <Wind className="w-10 h-10 text-gray-500" />,
    bgColor: 'bg-gray-200',
    clothingSuggestions: ['windbreaker', 'hat']
  }
};

const clothingItems: ClothingItem[] = [
  { name: 't-shirt', icon: <Shirt className="w-6 h-6 text-pink-500" /> },
  { name: 'shorts', icon: <Smile className="w-6 h-6 text-green-500" /> },
  { name: 'sunglasses', icon: <Sun className="w-6 h-6 text-yellow-500" /> },
  { name: 'raincoat', icon: <Umbrella className="w-6 h-6 text-blue-800" /> },
  { name: 'umbrella', icon: <Umbrella className="w-6 h-6 text-purple-600" /> },
  { name: 'boots', icon: <ThermometerSnowflake className="w-6 h-6 text-indigo-500" /> },
  { name: 'jacket', icon: <ThermometerSnowflake className="w-6 h-6 text-gray-700" /> },
  { name: 'scarf', icon: <ThermometerSnowflake className="w-6 h-6 text-red-400" /> },
  { name: 'gloves', icon: <ThermometerSnowflake className="w-6 h-6 text-orange-400" /> },
  { name: 'windbreaker', icon: <Wind className="w-6 h-6 text-blue-400" /> },
  { name: 'hat', icon: <Smile className="w-6 h-6 text-pink-600" /> }
];

const WeatherDressUpGame: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<string>('sunny');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const weatherOptions = Object.keys(weatherTypes);
    const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
    setCurrentWeather(randomWeather);
  }, []);

  const handleItemClick = (item: string) => {
    setSelectedItems(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const checkAnswers = () => {
    const suggestions = weatherTypes[currentWeather].clothingSuggestions;
    const correct = selectedItems.every(item => suggestions.includes(item)) &&
                    suggestions.every(item => selectedItems.includes(item));
    setIsCorrect(correct);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${weatherTypes[currentWeather].bgColor}`}>
      <h1 className="text-3xl font-bold mb-4">🌦️ Weather Dress-Up Game</h1>
      <div className="text-xl mb-4 flex items-center gap-2">
        <span>Today's weather is:</span> {weatherTypes[currentWeather].icon}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {clothingItems.map(item => (
          <button
            key={item.name}
            onClick={() => handleItemClick(item.name)}
            className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 text-sm font-medium ${
              selectedItems.includes(item.name) ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'
            }`}
          >
            {item.icon}
            <span className="mt-2">{item.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={checkAnswers}
        className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
      >
        ✅ Check
      </button>

      {isCorrect !== null && (
        <div className={`mt-4 text-lg font-semibold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
          {isCorrect ? '🎉 Great job! You dressed up correctly!' : '❌ Oops! Try again!'}
        </div>
      )}
    </div>
  );
};

export default WeatherDressUpGame;
