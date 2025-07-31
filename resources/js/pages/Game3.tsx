import React, { useState, useEffect } from 'react';
import { 
  Snowflake, 
  Sun, 
  Leaf, 
  Cloud,
  Heart,
  Star,
  CheckCircle,
  RotateCcw
} from 'lucide-react';

// Add types for activities and heart animations
type Activity = {
  name: string;
  season: string;
  emoji: string;
};

type HeartAnimation = {
  id: number;
  x: number;
  y: number;
};

const SeasonalMatchingGame = () => {
  const [score, setScore] = useState<number>(0);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [usedActivities, setUsedActivities] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<string>('');
  const [hearts, setHearts] = useState<HeartAnimation[]>([]);

  const seasons = [
    {
      name: 'Winter',
      icon: Snowflake,
      color: 'bg-blue-200 hover:bg-blue-300',
      textColor: 'text-blue-800',
      emoji: '❄️'
    },
    {
      name: 'Spring',
      icon: Leaf,
      color: 'bg-green-200 hover:bg-green-300',
      textColor: 'text-green-800',
      emoji: '🌸'
    },
    {
      name: 'Summer',
      icon: Sun,
      color: 'bg-yellow-200 hover:bg-yellow-300',
      textColor: 'text-yellow-800',
      emoji: '☀️'
    },
    {
      name: 'Fall',
      icon: Cloud,
      color: 'bg-orange-200 hover:bg-orange-300',
      textColor: 'text-orange-800',
      emoji: '🍂'
    }
  ];

  const activities: Activity[] = [
    { name: 'Building Snowmen', season: 'Winter', emoji: '⛄' },
    { name: 'Ice Skating', season: 'Winter', emoji: '⛸️' },
    { name: 'Drinking Hot Cocoa', season: 'Winter', emoji: '☕' },
    { name: 'Planting Flowers', season: 'Spring', emoji: '🌱' },
    { name: 'Flying Kites', season: 'Spring', emoji: '🪁' },
    { name: 'Picking Berries', season: 'Spring', emoji: '🫐' },
    { name: 'Swimming', season: 'Summer', emoji: '🏊' },
    { name: 'Beach Volleyball', season: 'Summer', emoji: '🏐' },
    { name: 'Eating Ice Cream', season: 'Summer', emoji: '🍦' },
    { name: 'Jumping in Leaves', season: 'Fall', emoji: '🍁' },
    { name: 'Apple Picking', season: 'Fall', emoji: '🍎' },
    { name: 'Wearing Sweaters', season: 'Fall', emoji: '🧥' }
  ];

  const getRandomActivity = (): Activity | null => {
    const availableActivities = activities.filter(
      activity => !usedActivities.includes(activity.name)
    );

    if (availableActivities.length === 0) {
      setGameCompleted(true);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableActivities.length);
    return availableActivities[randomIndex];
  };

  const handleSeasonClick = (seasonName: string) => {
    if (!currentActivity) return;

    const isCorrect = currentActivity.season === seasonName;

    if (isCorrect) {
      setScore(score + 1);
      setShowFeedback('correct');
      setUsedActivities([...usedActivities, currentActivity.name]);

      const newHearts: HeartAnimation[] = Array.from({ length: 3 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 300,
        y: Math.random() * 200
      }));
      setHearts(newHearts);

      setTimeout(() => {
        setHearts([]);
        setShowFeedback('');
        setCurrentActivity(getRandomActivity());
      }, 1500);
    } else {
      setShowFeedback('incorrect');
      setTimeout(() => setShowFeedback(''), 1000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setUsedActivities([]);
    setGameCompleted(false);
    setShowFeedback('');
    setHearts([]);
    setCurrentActivity(getRandomActivity());
  };

  useEffect(() => {
    setCurrentActivity(getRandomActivity());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4 relative overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-bounce text-4xl pointer-events-none z-20"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animation: 'float 1.5s ease-out forwards'
          }}
        >
          💖
        </div>
      ))}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🌈 Seasonal Fun Match! 🌈
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
            <p className="text-xl text-white font-semibold">
              Score: {score} / {activities.length}
            </p>
          </div>
        </div>

        {currentActivity && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-pink-100 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Which season is perfect for...
              </h2>
              <div className="text-6xl mb-4">{currentActivity.emoji}</div>
              <h3 className="text-3xl font-bold text-purple-800 mb-6">
                {currentActivity.name}
              </h3>
              <p className="text-lg text-gray-600">
                Click on the right season below! 👇
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {seasons.map((season) => {
            const IconComponent = season.icon;
            return (
              <button
                key={season.name}
                onClick={() => handleSeasonClick(season.name)}
                className={`${season.color} ${season.textColor} rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                disabled={!currentActivity}
              >
                <div className="text-4xl mb-2">{season.emoji}</div>
                <IconComponent className="w-8 h-8 mx-auto mb-2" />
                <h3 className="text-xl font-bold">{season.name}</h3>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className={`text-6xl font-bold animate-bounce ${
              showFeedback === 'correct' 
                ? 'text-green-500' 
                : 'text-red-500'
            }`}>
              {showFeedback === 'correct' ? (
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-16 h-16" />
                  <span>Great Job!</span>
                  <Star className="w-16 h-16" />
                </div>
              ) : (
                <div>Try Again! 🤔</div>
              )}
            </div>
          </div>
        )}

        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="w-full bg-white/30 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(score / activities.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-white text-center mt-2 font-semibold">
            Progress: {score} out of {activities.length} activities matched!
          </p>
        </div>

        {gameCompleted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-pink-200 opacity-50"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-3xl font-bold text-purple-800 mb-4">
                  Congratulations!
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                  You matched all {activities.length} activities correctly!
                </p>
                <div className="text-4xl font-bold text-green-600 mb-6">
                  Final Score: {score}/{activities.length}
                </div>
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-5 h-5" />
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SeasonalMatchingGame;
