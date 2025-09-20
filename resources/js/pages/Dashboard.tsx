import React, { useState, useEffect } from 'react';
import Shop from './Shop';



type UserRole = 'parent' | 'kid' | null;

interface DashboardProps {
  role?: UserRole;
  username?: string;
}

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
    // Inertia.visit('/login'); // Would redirect to login in real app
    alert('Logged out successfully!');
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

  // Render dashboard content
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-medium opacity-80 mb-2">GOOD MORNING, {userName.toUpperCase()}</h2>
            <h1 className="text-4xl font-bold mb-2">Start Learning</h1>
            <p className="text-lg opacity-90">Ready to explore today?</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-1">🇬🇧</div>
              <p className="text-sm font-medium">English</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Progress & Games */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Progress */}
            <div className="bg-gradient-to-br from-pink-300 to-pink-400 rounded-3xl p-6 text-white shadow-xl">
              <p className="text-sm font-medium opacity-80 mb-2">Be up to date</p>
              <h3 className="text-xl font-bold mb-4">Monthly Progress</h3>
              <div className="flex items-end justify-between mb-4">
                <div className="text-4xl font-bold">+20%</div>
                <div className="bg-white/20 rounded-full p-2">
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs opacity-75">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl">
              <p className="text-sm font-medium opacity-80 mb-2">See achievements</p>
              <h3 className="text-xl font-bold mb-4">Your Rewards</h3>
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                    <span className="text-xs">⭐</span>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-yellow-300 rounded-full flex items-center justify-center">
                    <span className="text-xs">⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scores Section */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {userRole === 'parent' ? "Your Kid's Scores" : "Your Scores"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">👔</span>
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{kidScores.game1}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">Weather Dress-Up</p>
                <p className="text-2xl font-bold text-blue-600">{kidScores.game1}%</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">🌪️</span>
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{kidScores.game2}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">Disaster Types</p>
                <p className="text-2xl font-bold text-green-600">{kidScores.game2}%</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">🍂</span>
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{kidScores.game3}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">Season Matching</p>
                <p className="text-2xl font-bold text-purple-600">{kidScores.game3}%</p>
              </div>
            </div>
          </div>

          {/* Game/Start Game Section */}
          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium opacity-80 mb-1">Challenge friends</p>
                <h3 className="text-2xl font-bold">Start Game</h3>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-3xl">🚀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Schedule/Controls */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {userRole === 'parent' ? 'Parent Controls' : "Today's Schedule"}
              </h3>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
              </span>
            </div>

            {userRole === 'parent' ? (
              <div className="space-y-4">
                <button
                  onClick={() => alert('Opening detailed score view...')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    <span>View Kid Scores</span>
                  </div>
                  <span>→</span>
                </button>
                <button
                  onClick={() => alert('Opening kid account management...')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-2xl transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">👨‍👩‍👧‍👦</span>
                    <span>Manage Accounts</span>
                  </div>
                  <span>→</span>
                </button>
                <button
                  onClick={() => handleNavigation('shop')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🛍️</span>
                    <span>Shop</span>
                  </div>
                  <span>→</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">1 PM</p>
                    <p className="font-semibold text-gray-800">Vocabulary Test</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-lg">📚</span>
                  </div>
                </div>
                <div className="bg-teal-500 rounded-2xl p-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-sm opacity-80">3 PM</p>
                    <p className="font-semibold">Speaking Session</p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🎤</span>
                  </div>
                </div>
                <div className="bg-pink-300 rounded-2xl p-4 flex items-center justify-between text-white">
                  <div>
                    <p className="text-sm opacity-80">6 PM</p>
                    <p className="font-semibold">Learning Games</p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-between">
                    <span className="text-lg">🎮</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kid Zone Games */}
      {userRole === 'kid' && (
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
            <span className="text-4xl mr-4">🎮</span>
            Kid Zone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              onClick={() => handleNavigation('game1')}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-8 px-6 rounded-3xl transition duration-300 transform hover:scale-105 shadow-xl group"
            >
              <span className="text-5xl mb-4 block group-hover:animate-bounce">👔</span>
              <p className="text-lg leading-tight">Weather Dress-Up</p>
            </button>
            <button
              onClick={() => handleNavigation('game2')}
              className="bg-gradient-to-br from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-8 px-6 rounded-3xl transition duration-300 transform hover:scale-105 shadow-xl group"
            >
              <span className="text-5xl mb-4 block group-hover:animate-bounce">🌪️</span>
              <p className="text-lg leading-tight">Learning Disasters</p>
            </button>
            <button
              onClick={() => handleNavigation('game3')}
              className="bg-gradient-to-br from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white font-bold py-8 px-6 rounded-3xl transition duration-300 transform hover:scale-105 shadow-xl group"
            >
              <span className="text-5xl mb-4 block group-hover:animate-bounce">🍂</span>
              <p className="text-lg leading-tight">Season Matching</p>
            </button>
            <button
              onClick={() => setShowStargazingModal(true)}
              className="bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-8 px-6 rounded-3xl transition duration-300 transform hover:scale-105 shadow-xl group"
            >
              <span className="text-5xl mb-4 block group-hover:animate-bounce">⭐</span>
              <p className="text-lg leading-tight">Stargazing Alerts</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );

 const renderContent = () => {
  switch (currentView) {
    case 'game1':
    case 'game2':
    case 'game3':
      return (
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 capitalize">{currentView}</h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🚧</div>
            <p className="text-xl text-gray-600 mb-6">Component would load here</p>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-3 rounded-2xl font-semibold transition duration-300 transform hover:scale-105"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      );

    case 'shop':
      return <Shop />; // Import shop.tsx and show it here

    default:
      return renderDashboard();
  }
};


  if (!userRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-6 text-xl text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
              <span className="text-2xl text-white">
                {userRole === 'parent' ? '👨‍👩‍👧‍👦' : '🎈'}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {userRole === 'parent' ? 'Parent Dashboard' : 'Kid Dashboard'}
              </h1>
              <p className="text-gray-600">Welcome back, {userName}!</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-2 rounded-2xl font-semibold transition duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">{renderContent()}</main>

      {/* Stargazing Modal */}
      {showStargazingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="text-3xl mr-3">⭐</span>
              Stargazing Alert
            </h3>
            {!stargazingMessage ? (
              <>
                <p className="mb-6 text-gray-600">Enter your current area to check stargazing conditions:</p>
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="Enter your city or area..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl mb-6 focus:outline-none focus:border-blue-500 transition duration-300"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleStargazingCheck}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition duration-300 transform hover:scale-105"
                  >
                    Check Sky
                  </button>
                  <button
                    onClick={() => {
                      setShowStargazingModal(false);
                      setUserLocation('');
                      setStargazingMessage('');
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-2xl font-semibold transition duration-300 transform hover:scale-105"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-6 border-2 border-blue-200">
                  <p className="text-gray-800 text-lg">{stargazingMessage}</p>
                </div>
                <button
                  onClick={() => {
                    setShowStargazingModal(false);
                    setUserLocation('');
                    setStargazingMessage('');
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition duration-300 transform hover:scale-105"
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