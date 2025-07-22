import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [gifError, setGifError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        alert(`Welcome ${formData.name}! Redirecting to your weather dashboard...`);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-20 h-20 text-white/20 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            animationDelay: '-2s',
          }}
        >
          <Cloud size={80} />
        </div>
        <div
          className="absolute top-3/4 right-1/4 w-16 h-16 text-white/20 animate-float"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
            animationDelay: '-10s',
          }}
        >
          <CloudRain size={64} />
        </div>
      </div>

      <div className={`flex bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl mx-4 min-h-[600px] relative z-10 transition-all duration-300 ${isSuccess ? 'scale-105' : ''} ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}>
        <div className="flex-1 bg-gradient-to-br from-cyan-400 to-blue-500 flex flex-col items-center justify-center p-10 relative overflow-hidden">
          <div className="w-72 h-72 rounded-2xl overflow-hidden mb-8 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-xl">
            {!gifError ? (
              <img
                src="/Images/Windy day.gif"
                alt="Weather Animation"
                className="w-full h-full object-cover rounded-xl"
                onError={() => setGifError(true)}
              />
            ) : (
              <div className="text-center text-white">
                <div className="text-6xl mb-4 flex justify-center">
                  <Sun size={96} />
                </div>
                <p className="opacity-80">Weather Animation</p>
              </div>
            )}
          </div>

          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4 drop-shadow-sm">Welcome Back!</h2>
            <p className="text-white/90 leading-relaxed max-w-xs">
              Get accurate weather forecasts and stay prepared for any weather condition with our advanced prediction system.
            </p>
          </div>
        </div>

        <div className="flex-1 p-12 flex flex-col justify-center">
          <div className="flex items-center mb-10">
            <div className="relative">
                            <Sun className="w-10 h-10 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                            <Cloud className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-bounce" />
                          </div>
            <div className="text-2xl font-bold text-gray-800">Mini Meterologists</div>
          </div>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h1>
            <p className="text-gray-600">Enter your credentials to access your weather dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 group-hover:-translate-y-0.5"
              />
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 group-hover:-translate-y-0.5"
              />
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 pr-12 border-2 border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 group-hover:-translate-y-0.5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition duration-300"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
