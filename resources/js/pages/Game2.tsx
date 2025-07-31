import React, { useState, useEffect, useCallback } from 'react';
import { Cloud, Sun, Snowflake, Zap, Trophy, Timer, RotateCcw } from 'lucide-react';

type GameState = 'menu' | 'playing' | 'gameOver';

interface DisasterCategories {
  [key: string]: string[];
}

interface Category {
  id: keyof DisasterCategories;
  name: string;
  icon: React.FC<{ size?: number }>;
  color: string;
  hoverColor: string;
}

interface Letter {
  letter: string;
  originalIndex: number;
}

const disasters: DisasterCategories = {
  storm: ['HURRICANE', 'TORNADO', 'TYPHOON', 'CYCLONE', 'THUNDERSTORM', 'LIGHTNING', 'HAILSTORM', 'WINDSTORM', 'BLIZZARD'],
  heat: ['DROUGHT', 'HEATWAVE', 'WILDFIRE', 'DESERT', 'SANDSTORM'],
  cold: ['AVALANCHE', 'FROSTBITE', 'ICESTORM', 'SNOWSTORM', 'FREEZE'],
  water: ['FLOOD', 'TSUNAMI', 'MONSOON', 'DELUGE', 'STORM SURGE']
};

const weatherCategories: Category[] = [
  { id: 'storm', name: 'Stormy Weather', icon: Zap, color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600' },
  { id: 'heat', name: 'Hot Weather', icon: Sun, color: 'bg-orange-500', hoverColor: 'hover:bg-orange-600' },
  { id: 'cold', name: 'Cold Weather', icon: Snowflake, color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600' },
  { id: 'water', name: 'Water Weather', icon: Cloud, color: 'bg-teal-500', hoverColor: 'hover:bg-teal-600' }
];

const WeatherDisasterGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [scrambledLetters, setScrambledLetters] = useState<(string | null)[]>([]);
  const [playerAnswer, setPlayerAnswer] = useState<Letter[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [wordsCompleted, setWordsCompleted] = useState<number>(0);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateNewWord = useCallback(() => {
    if (availableWords.length === 0) {
      setGameState('gameOver');
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const word = availableWords[randomIndex];
    const newAvailable = availableWords.filter((_, index) => index !== randomIndex);

    setCurrentWord(word);
    setAvailableWords(newAvailable);
    setScrambledLetters(shuffleArray(word.split('')));
    setPlayerAnswer([]);
  }, [availableWords]);

  const startGame = (category: Category) => {
    setSelectedCategory(category);
    setAvailableWords([...disasters[category.id]]);
    setScore(0);
    setTimeLeft(120);
    setWordsCompleted(0);
    setCurrentWord('');
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing' && availableWords.length > 0 && !currentWord) {
      generateNewWord();
    }
  }, [gameState, availableWords, currentWord, generateNewWord]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('gameOver');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const addLetter = (letter: string, index: number) => {
    if (playerAnswer.length < currentWord.length) {
      setPlayerAnswer(prev => [...prev, { letter, originalIndex: index }]);
      setScrambledLetters(prev => prev.map((l, i) => (i === index ? null : l)));
    }
  };

  const removeLetter = (answerIndex: number) => {
    const removedLetter = playerAnswer[answerIndex];
    setPlayerAnswer(prev => prev.filter((_, i) => i !== answerIndex));
    setScrambledLetters(prev => {
      const newScrambled = [...prev];
      newScrambled[removedLetter.originalIndex] = removedLetter.letter;
      return newScrambled;
    });
  };

  const checkAnswer = () => {
    const playerWord = playerAnswer.map(item => item.letter).join('');
    if (playerWord === currentWord) {
      const points = Math.max(10, Math.floor(timeLeft / 10) + currentWord.length);
      setScore(prev => prev + points);
      setWordsCompleted(prev => prev + 1);
      setTimeout(() => generateNewWord(), 1000);
    } else {
      const answerBoxes = document.querySelectorAll('.answer-box');
      answerBoxes.forEach(box => {
        box.classList.add('animate-pulse', 'bg-red-200');
        setTimeout(() => {
          box.classList.remove('animate-pulse', 'bg-red-200');
        }, 1000);
      });
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setSelectedCategory(null);
    setCurrentWord('');
    setScrambledLetters([]);
    setPlayerAnswer([]);
    setScore(0);
    setTimeLeft(120);
    setWordsCompleted(0);
    setAvailableWords([]);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">🌦️ Weather Disaster Game 🌦️</h1>
          <p className="text-xl text-white drop-shadow mb-10">Match the letters to spell weather disaster names!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {weatherCategories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => startGame(category)}
                  className={`${category.color} ${category.hoverColor} text-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300`}
                >
                  <IconComponent size={64} mx-auto mb-4/>
                  <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
                  <p className="text-lg opacity-90">{disasters[category.id].length} disasters to discover!</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const isComplete = playerAnswer.map(item => item.letter).join('') === currentWord;
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 bg-white/20 backdrop-blur-md rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <Trophy className="text-yellow-300" size={32} />
              <span className="text-2xl font-bold text-white">Score: {score}</span>
            </div>
            <div className="flex items-center gap-4">
              <Timer className={timeLeft < 30 ? 'text-red-300' : 'text-white'} size={32} />
              <span className={`text-2xl font-bold ${timeLeft < 30 ? 'text-red-300 animate-pulse' : 'text-white'}`}>{formatTime(timeLeft)}</span>
            </div>
            <button onClick={resetGame} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
              <RotateCcw size={20} /> Quit
            </button>
          </div>
          <div className="text-center mb-6">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 inline-block">
              <h2 className="text-3xl font-bold text-white mb-2">{selectedCategory?.name}</h2>
              <p className="text-white">Word {wordsCompleted + 1} - Spell the disaster name!</p>
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 bg-white/20 backdrop-blur-md rounded-2xl p-6">
              {currentWord.split('').map((_, index) => (
                <div
                  key={index}
                  onClick={() => playerAnswer[index] && removeLetter(index)}
                  className={`answer-box w-16 h-16 border-4 border-white rounded-xl flex items-center justify-center text-3xl font-bold cursor-pointer transition-all duration-300 ${
                    playerAnswer[index]
                      ? isComplete
                        ? 'bg-green-300 text-green-800'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                      : 'bg-white/30 text-white border-dashed'
                  }`}
                >
                  {playerAnswer[index]?.letter || ''}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-3 bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-md">
              {scrambledLetters.map((letter, index) =>
                letter ? (
                  <button
                    key={index}
                    onClick={() => addLetter(letter, index)}
                    className="w-14 h-14 bg-yellow-400 hover:bg-yellow-300 text-gray-800 rounded-xl text-2xl font-bold shadow-lg transform hover:scale-110 transition-all duration-200"
                  >
                    {letter}
                  </button>
                ) : null
              )}
            </div>
          </div>
          {playerAnswer.length === currentWord.length && (
            <div className="text-center">
              <button
                onClick={checkAnswer}
                className={`px-8 py-4 rounded-2xl text-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  isComplete
                    ? 'bg-green-500 hover:bg-green-600 text-white animate-bounce'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                {isComplete ? '🎉 Correct! Next Word →' : '🤔 Check Answer'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4 flex items-center justify-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 text-center max-w-md mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6">🎮 Game Over! 🎮</h2>
          <div className="space-y-4 mb-8">
            <div className="bg-white/30 rounded-2xl p-4">
              <Trophy className="text-yellow-300 mx-auto mb-2" size={48} />
              <p className="text-3xl font-bold text-white">Final Score: {score}</p>
            </div>
            <div className="bg-white/30 rounded-2xl p-4">
              <p className="text-2xl font-bold text-white">Words Completed: {wordsCompleted}</p>
            </div>
            <div className="bg-white/30 rounded-2xl p-4">
              <p className="text-xl text-white">
                {score >= 200 ? '🌟 Amazing! Weather Expert!' : score >= 100 ? '🌈 Great job! Storm Chaser!' : '⛅ Good try! Keep learning!'}
              </p>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl text-2xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default WeatherDisasterGame;
