import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Sun, Cloud, CloudRain, Eye, EyeOff, Sparkles, Heart, User, Shield, Star, Smile, Crown, Users } from 'lucide-react';

const Login: React.FC = () => {
  
  
  const [isParentMode, setIsParentMode] = useState(false);
  const [formData, setFormData] = useState({
    kidUsername: '',
    parentName: '',
    kidName: '',
    password: '',
    remember: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate sparkles randomly
  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      setSparkles(prev => [...prev.slice(-5), newSparkle]);
    }, isParentMode ? 4000 : 1500);

    return () => clearInterval(interval);
  }, [isParentMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    let payload;

    if (isParentMode) {
      if (!formData.parentName || !formData.kidName || !formData.password) return;
      payload = {
        name: formData.parentName,
        password: formData.password,
        role: "parent"
      };
    } else {
      if (!formData.kidUsername || !formData.password) return;
      payload = {
        name: formData.kidUsername,
        password: formData.password,
        role: "kid"
      };
    }

    setIsLoading(true);
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    
      // Success handling
  if (response.ok) {
  setIsSuccess(true);
  // Save role and username in localStorage if needed
  const userRole = isParentMode ? 'parent' : 'kid';
  const username = isParentMode ? formData.parentName : formData.kidUsername;
 
  localStorage.setItem('role', userRole);
  localStorage.setItem('username', username);

      // Navigate to Dashboard using Inertia
        Inertia.visit('/dashboard', { data: { role: userRole, username } });

      setTimeout(() => {
        const message = isParentMode
          ? `Welcome ${formData.parentName}! Managing ${formData.kidName}'s dashboard...`
          : `🌟 Welcome ${formData.kidUsername}! Let's explore the weather together! 🌈`;
        alert(message);
      }, 500);



} else {
  alert(data.message || "Login failed. Please check your credentials.");
}

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};


  const switchMode = () => {
    setIsParentMode(!isParentMode);
    setFormData({
      kidUsername: '',
      parentName: '',
      kidName: '',
      password: '',
      remember: false,
    });
    setIsSuccess(false);
  };

  return (
    <div 
      className={`min-h-screen ${isParentMode 
        ? 'bg-gradient-to-br from-slate-600 via-blue-800 to-indigo-900' 
        : 'bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400'
      } flex items-center justify-center relative overflow-hidden transition-all duration-1000`}
      style={{ fontFamily: isParentMode ? 'system-ui, sans-serif' : 'Comic Sans MS, cursive, sans-serif' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Weather Icons */}
        <div
          className={`absolute top-1/4 left-1/4 w-20 h-20 ${isParentMode ? 'text-white/20' : 'text-white/30'} animate-bounce`}
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
            animationDelay: '-2s',
            animationDuration: isParentMode ? '4s' : '3s',
          }}
        >
          <Cloud size={80} />
        </div>
        <div
          className={`absolute top-3/4 right-1/4 w-16 h-16 ${isParentMode ? 'text-white/15' : 'text-white/30'} animate-pulse`}
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
            animationDelay: '-1s',
          }}
        >
          <CloudRain size={64} />
        </div>
        <div
          className={`absolute top-1/2 right-1/3 w-12 h-12 ${isParentMode ? 'text-yellow-400/30' : 'text-yellow-300/40'} animate-spin`}
          style={{
            transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)`,
            animationDuration: isParentMode ? '6s' : '4s',
          }}
        >
          <Sun size={48} />
        </div>

        {/* Sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className={`absolute w-4 h-4 ${isParentMode ? 'text-blue-300' : 'text-yellow-300'} animate-ping`}
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDuration: isParentMode ? '3s' : '2s',
            }}
          >
            <Sparkles size={16} />
          </div>
        ))}
      </div>

      {/* Main Login Container */}
      <div className={`flex bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl mx-4 min-h-[650px] relative z-10 transition-all duration-500 transform ${isSuccess ? 'scale-105 rotate-1' : ''} ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}>
        
        {/* Left Panel - Weather Animation */}
        <div className={`flex-1 ${isParentMode 
          ? 'bg-gradient-to-br from-slate-700 via-blue-600 to-indigo-700' 
          : 'bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-500'
        } flex flex-col items-center justify-center p-10 relative overflow-hidden transition-all duration-1000`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          
          {/* Weather Animation Container */}
          <div className="inline-block rounded-3xl overflow-hidden mb-8 bg-white/20 backdrop-blur-md shadow-2xl border-4 border-white/30 transform hover:scale-105 transition-all duration-300">
            <img src="Images/little_kids.webp" alt="Kids waving" className="w-full h-auto" />
            
            <div className="text-center text-white p-6">
              <div className={`text-8xl mb-6 flex justify-center ${isParentMode ? 'animate-pulse' : 'animate-bounce'}`}>
                {isParentMode ? <Shield size={120} className="text-blue-300" /> : <Sun size={120} className="text-yellow-300" />}
              </div>
              <p className="opacity-90 text-xl font-bold">
                {isParentMode ? 'Parent Dashboard 👨‍👩‍👧‍👦' : 'Weather Fun! ☀️'}
              </p>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-center text-white relative z-10">
            <h2 className={`text-4xl font-bold mb-6 drop-shadow-lg ${isParentMode ? 'animate-pulse' : 'animate-pulse'}`}>
              {isParentMode 
                ? 'Parent Access Control 🔐' 
                : 'Welcome Back, Weather Friend! 🌤️'
              }
            </h2>
            <p className="text-white/95 leading-relaxed max-w-sm text-lg">
              {isParentMode 
                ? 'Manage your child\'s weather learning experience with advanced parental controls and monitoring.'
                : 'Get super accurate weather forecasts and stay prepared for any weather adventure with our magical prediction system! ✨'
              }
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              {isParentMode ? (
                <>
                  <Shield className="w-6 h-6 text-blue-300 animate-pulse" />
                  <Users className="w-6 h-6 text-indigo-300 animate-pulse" />
                  <Crown className="w-6 h-6 text-blue-300 animate-pulse" />
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6 text-red-300 animate-pulse" />
                  <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" />
                  <Heart className="w-6 h-6 text-red-300 animate-pulse" />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className={`flex-1 p-12 flex flex-col justify-center ${isParentMode 
          ? 'bg-gradient-to-br from-slate-50 to-blue-50/30' 
          : 'bg-gradient-to-br from-white to-blue-50/50'
        } transition-all duration-1000`}>
          
          {/* Logo Section */}
          <div className="flex items-center mb-12 justify-center">
            <div className="relative">
              {isParentMode ? (
                <>
                  <Shield className="w-12 h-12 text-blue-600 animate-pulse" />
                  <Crown className="w-8 h-8 text-indigo-500 absolute -top-2 -right-2 animate-pulse" />
                </>
              ) : (
                <>
                  <Sun className="w-12 h-12 text-yellow-500 animate-spin" style={{ animationDuration: '4s' }} />
                  <Cloud className="w-10 h-10 text-blue-400 absolute -top-3 -right-3 animate-bounce" />
                  <Sparkles className="w-6 h-6 text-purple-400 absolute -bottom-2 -left-2 animate-pulse" />
                </>
              )}
            </div>
            <div className={`text-3xl font-bold text-transparent bg-clip-text ${isParentMode 
              ? 'bg-gradient-to-r from-slate-700 to-blue-700' 
              : 'bg-gradient-to-r from-purple-600 to-blue-600'
            } ml-4 transition-all duration-1000`}>
              {isParentMode ? 'Parent Control 👨‍👩‍👧‍👦' : 'Mini Meteorologists! 🌈'}
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-10 text-center">
            <h1 className={`text-4xl font-bold text-transparent bg-clip-text ${isParentMode 
              ? 'bg-gradient-to-r from-slate-600 to-blue-600' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600'
            } mb-4 transition-all duration-1000`}>
              {isParentMode ? 'Parent Sign In 👨‍💼' : 'Sign In to Weather Fun! 🌟'}
            </h1>
            <p className={`${isParentMode ? 'text-slate-600' : 'text-gray-600'} text-lg transition-all duration-1000`}>
              {isParentMode 
                ? 'Enter your credentials to access parental controls and manage your child\'s account.'
                : 'Enter your super secret credentials to access your amazing weather dashboard!'
              }
            </p>
          </div>

          {/* Form */}
          <div className="space-y-8">
            {/* Kid Mode Form */}
            {!isParentMode && (
              <>
                <div className="group">
                  <label htmlFor="kidUsername" className="flex items-center text-lg font-bold text-gray-700 mb-3">
                    <User className="w-5 h-5 mr-2 text-purple-500" />
                    Your Cool name 😊
                  </label>
                  <input
                    type="text"
                    id="kidUsername"
                    name="kidUsername"
                    value={formData.kidUsername}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-5 border-3 border-purple-200 rounded-2xl text-lg bg-gradient-to-r from-white to-purple-50 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg font-bold"
                    placeholder="What should we call you? 🌟"
                  />
                </div>

                <div className="group">
                  <label htmlFor="password" className="flex items-center text-lg font-bold text-gray-700 mb-3">
                    <Star className="w-5 h-5 mr-2 text-pink-500" />
                    Super Secret Password 🔐
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-5 pr-16 border-3 border-pink-200 rounded-2xl text-lg bg-gradient-to-r from-white to-pink-50 focus:outline-none focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg font-bold"
                      placeholder="Shh... it's a secret! 🤫"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors hover:scale-110"
                    >
                      {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Parent Mode Form */}
            {isParentMode && (
              <>
                <div className="group">
                  <label htmlFor="parentName" className="flex items-center text-lg font-bold text-slate-700 mb-3">
                    <Crown className="w-5 h-5 mr-2 text-blue-600" />
                    Parent Name
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-medium"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="group">
                  <label htmlFor="kidName" className="flex items-center text-lg font-bold text-slate-700 mb-3">
                    <Smile className="w-5 h-5 mr-2 text-indigo-500" />
                    Child's name
                  </label>
                  <input
                    type="text"
                    id="kidName"
                    name="kidName"
                    value={formData.kidName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl text-lg bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 font-medium"
                    placeholder="Enter child's nickname"
                  />
                </div>

                <div className="group">
                  <label htmlFor="password" className="flex items-center text-lg font-bold text-slate-700 mb-3">
                    <Shield className="w-5 h-5 mr-2 text-slate-600" />
                    Account Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 pr-16 border-2 border-slate-300 rounded-xl text-lg bg-white focus:outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 transition-all duration-300 font-medium"
                      placeholder="Enter account password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Remember Me Checkbox */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
                className={`w-5 h-5 ${isParentMode ? 'text-blue-600' : 'text-purple-600'} rounded focus:ring-2 ${isParentMode ? 'focus:ring-blue-500' : 'focus:ring-purple-500'}`}
              />
              <label htmlFor="remember" className={`${isParentMode ? 'text-slate-700' : 'text-gray-700'} font-bold`}>
                {isParentMode ? 'Remember this device' : 'Remember me (pretty please! 🥺)'}
              </label>
            </div>

            {/* Submit Button and Mode Switch */}
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className={`flex-1 py-5 px-8 ${isParentMode 
                  ? 'bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700' 
                  : 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500'
                } text-white rounded-2xl font-bold text-xl hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
              >
                {isLoading 
                  ? (isParentMode ? 'Authenticating...' : '🌟 Signing You In... 🌟')
                  : (isParentMode ? 'Sign In as Parent' : '🚀 Let\'s Go Weather Exploring! 🌈')
                }
              </button>
              
              <button
                type="button"
                onClick={switchMode}
                className={`px-6 py-5 ${isParentMode 
                  ? 'bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600' 
                  : 'bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700'
                } text-white rounded-2xl font-bold text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap`}
              >
                {isParentMode ? (
                  <div className="flex items-center">
                    <Smile className="w-5 h-5 mr-2" />
                    Kid Mode 🌈
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Parent Mode 👨‍💼
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Sign Up Section */}
          <div className="mt-8 text-center">
            <p className={`${isParentMode ? 'text-slate-600' : 'text-gray-600'} text-lg mb-4 transition-all duration-1000`}>
              {isParentMode 
                ? "Don't have an account yet? 🤔"
                : "Aren't you have an account yet? 🤔"
              }
            </p>
            <button
              type="button"
              className={`px-8 py-3 ${isParentMode 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700' 
                : 'bg-gradient-to-r from-green-400 to-blue-500'
              } text-white rounded-2xl font-bold text-lg hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            >
              {isParentMode ? (
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Sign Up Now
                </div>
              ) : (
                '🌟 Sign Up Now - It\'s Free! 🌟'
              )}
            </button>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className={`mt-6 p-4 ${isParentMode 
              ? 'bg-blue-50 border-2 border-blue-300' 
              : 'bg-green-100 border-2 border-green-300'
            } rounded-2xl text-center transition-all duration-500`}>
              <p className={`${isParentMode ? 'text-blue-700' : 'text-green-700'} font-bold text-lg`}>
                {isParentMode 
                  ? '✅ Parent access granted! Welcome to the control panel.'
                  : '🎉 Woohoo! Welcome aboard the weather train! 🚂☀️'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;