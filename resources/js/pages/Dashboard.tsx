import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

type UserRole = 'parent' | 'kid' | null;

interface DashboardProps {
  role?: UserRole;
  username?: string;
}

// Replace with actual game/shop components if available
// import Game1 from './Game1';
// import Game2 from './Game2';
// import Game3 from './Game3';
// import Shop from './Shop';

const Dashboard: React.FC<DashboardProps> = ({ role, username }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [showStargazingModal, setShowStargazingModal] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const [stargazingMessage, setStargazingMessage] = useState('');

  const kidScores = {
    game1: 85,
    game2: 92,
    game3: 78
  };

  // Initialize userRole and userName on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleFromUrl = urlParams.get('role') as UserRole;
    const nameFromUrl = urlParams.get('username') || '';

    const storedRole = localStorage.getItem('userRole') as UserRole | null;
    const storedName = localStorage.getItem('username') || '';

    const finalRole = role || roleFromUrl || storedRole;
    const finalName = username || nameFromUrl || storedName;

    if (finalRole) {
      setUserRole(finalRole);
      setUserName(finalName);

      localStorage.setItem('userRole', finalRole);
      localStorage.setItem('username', finalName);
    }
  }, [role, username]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    Inertia.visit('/login');
  };

  const handleNavigation = (view: string) => setCurrentView(view);

  const handleStargazingCheck = () => {
    if (userLocation.trim()) {
      const messages = [
        "Perfect night for stargazing! The sky is clear in your area.",
        "Some clouds tonight, but you might catch glimpses of stars.",
        "Better wait - it looks like rain is coming to your area.",
        "Great visibility tonight! Don't forget to look for constellations!"
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setStargazingMessage(randomMessage);
    }
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render dashboard content
  const renderDashboard = () => (
    <>
      {/* Scores */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {userRole === 'parent' ? "Your Kid's Scores" : "Your Scores"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Weather Dress-Up</p>
            <p className="text-2xl font-bold text-blue-600">{kidScores.game1}%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Disaster Types</p>
            <p className="text-2xl font-bold text-green-600">{kidScores.game2}%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Season Matching</p>
            <p className="text-2xl font-bold text-purple-600">{kidScores.game3}%</p>
          </div>
        </div>
      </div>

      {/* Parent View */}
      {userRole === 'parent' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Parent Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => alert('Opening detailed score view...')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
            >
              View Kid Scores
            </button>
            <button
              onClick={() => alert('Opening kid account management...')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
            >
              Manage Kid Accounts
            </button>
            <button
              onClick={() => handleNavigation('shop')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
            >
              Shop
            </button>
          </div>
        </div>
      )}

      {/* Kid View */}
      {userRole === 'kid' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">🎮 Kid Zone</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => handleNavigation('game1')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-6 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
            >
              <span className="text-3xl mb-2 block">👔</span>
              Play Game 1: Weather Dress-Up
            </button>
            <button
              onClick={() => handleNavigation('game2')}
              className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-6 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
            >
              <span className="text-3xl mb-2 block">🌪️</span>
              Play Game 2: Learning Disasters
            </button>
            <button
              onClick={() => handleNavigation('game3')}
              className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-6 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
            >
              <span className="text-3xl mb-2 block">🍂</span>
              Play Game 3: Season Matching
            </button>
            <button
              onClick={() => setShowStargazingModal(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-6 px-6 rounded-lg transition duration-200 transform hover:scale-105 shadow-md"
            >
              <span className="text-3xl mb-2 block">⭐</span>
              Stargazing Alerts
            </button>
          </div>
        </div>
      )}
    </>
  );

  // Render games/shop content
  const renderContent = () => {
    switch (currentView) {
      case 'game1':
      case 'game2':
      case 'game3':
      case 'shop':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{currentView.toUpperCase()}</h2>
            <p className="text-gray-600">Component would load here</p>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back to Dashboard
            </button>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {userRole === 'parent' ? '👨‍👩‍👧‍👦 Parent Dashboard' : '🎈 Kid Dashboard'}
            </h1>
            <p className="text-gray-600">Welcome, {userName}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{renderContent()}</main>

      {/* Stargazing Modal */}
      {showStargazingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">⭐ Stargazing Alert</h3>
            {!stargazingMessage ? (
              <>
                <p className="mb-4 text-gray-600">Enter your current area to check stargazing conditions:</p>
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="Enter your city or area..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleStargazingCheck}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    Check Sky
                  </button>
                  <button
                    onClick={() => {
                      setShowStargazingModal(false);
                      setUserLocation('');
                      setStargazingMessage('');
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-800">{stargazingMessage}</p>
                </div>
                <button
                  onClick={() => {
                    setShowStargazingModal(false);
                    setUserLocation('');
                    setStargazingMessage('');
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
