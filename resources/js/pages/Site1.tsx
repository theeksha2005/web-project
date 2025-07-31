import React, { useState, useEffect  } from 'react';
import axios from 'axios';

import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind, 
  Rainbow, 
  Snowflake,
  Leaf,
  Search, 
  Home, 
  BookOpen, 
  Gamepad2, 
  Star, 
  ShoppingBag, 
  Info, 
  UserPlus,
  LogIn,   
  ChevronLeft,
  ChevronRight,
  CloudLightning,
  Shirt,
  FileText,
  CreditCard,
  MapPin,
  Thermometer,
  Droplets,
  Eye,
  Gauge,
  Zap,
  Container,
  Umbrella
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';

function goToLogin() {
  router.visit('/site2');
}

interface WeatherInfo  {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
};


const MiniMeteorologists = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchCity, setSearchCity] = useState('');

  const [weatherMessage, setWeatherMessage] = useState('');
  const [WeatherIcon, setWeatherIcon] = useState(() => Sun);
  const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);
  
  

  const weatherCards = [
    {
      title: "It's Sunny!",
      icon: Sun,
      color: "bg-gradient-to-br from-yellow-300 to-orange-400",
      fact: "The sun gives us light and warmth every day!",
      bgPattern: "bg-yellow-100"
    },
    {
      title: "It's Rainy!",
      icon: CloudRain,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      fact: "Rain helps flowers and trees grow big and strong!",
      bgPattern: "bg-blue-100"
    },
    {
      title: "It's Windy!",
      icon: Wind,
      color: "bg-gradient-to-br from-green-400 to-teal-500",
      fact: "Wind can make kites fly high in the sky!",
      bgPattern: "bg-green-100"
    },
    {
      title: "It's Cloudy!",
      icon: Cloud,
      color: "bg-gradient-to-br from-gray-300 to-gray-500",
      fact: "Clouds are made of tiny water droplets floating in the air!",
      bgPattern: "bg-gray-100"
    },
    {
      title: "It's Rainbow Time!",
      icon: Rainbow,
      color: "bg-gradient-to-br from-purple-400 via-pink-400 to-red-400",
      fact: "Rainbows appear when sun shines through rain drops!",
      bgPattern: "bg-purple-100"
    }
  ];

  const interactiveCards = [
    {
      title: "Stargazing Spot",
      icon: Star,
      color: "bg-gradient-to-br from-indigo-500 to-purple-600",
      description: "Explore the night sky and learn about stars!"
    },
    {
      title: "Seasons Explorer",
      icon: Sun,
      color: "bg-gradient-to-br from-orange-400 to-pink-500",
      description: "Discover how seasons change throughout the year!"
    },
    {
      title: "Nature's Safety Games",
      icon: CloudRain,
      color: "bg-gradient-to-br from-green-500 to-teal-600",
      description: "Learn how to stay safe in different weather!"
    },
    {
      title: "Weather Shop",
      icon: ShoppingBag,
      color: "bg-gradient-to-br from-red-400 to-pink-600",
      description: "Get cool weather T-shirts and learning materials!"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % weatherCards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + weatherCards.length) % weatherCards.length);
  };

 const handleSearch = async () => {
  if (!searchCity.trim()) return;

  try {
    const apiKey = '061bfab9a27f537b7e7326cc62625cb0'; 
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=061bfab9a27f537b7e7326cc62625cb0&units=metric`);
    

    const data = response.data;

   const condition = data.weather[0].main.toLowerCase();

    setWeatherData({
      city: data.name,
      temperature: data.main.temp,
      condition: condition, 
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    });
    



switch (condition) {
  case 'rain':
    setWeatherMessage("Don't forget your umbrella!");
    setWeatherIcon(() => CloudRain);
    break;
  case 'clear':
    setWeatherMessage("It's a sunny day! Wear your sunglasses!");
    setWeatherIcon(() => Sun);
    break;
  case 'clouds':
    setWeatherMessage("It's cloudy today. Stay cozy!");
    setWeatherIcon(() => Cloud);
    break;
  case 'snow':
    setWeatherMessage("It's snowing! Time for snow angels!");
    setWeatherIcon(() => Snowflake);
    break;
  case 'thunderstorm':
    setWeatherMessage("Stay indoors and stay safe!");
    setWeatherIcon(() => CloudLightning);
    break;
  default:
    setWeatherMessage("Enjoy the weather and learn something fun!");
    setWeatherIcon(() => Sun);
}


  } catch (error) {
    alert('City not found! Please try again.');
    setWeatherData(null);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl border-b-4 border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Sun className="w-10 h-10 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                <Cloud className="w-8 h-8 text-blue-400 absolute -top-2 -right-2 animate-bounce" />
              </div>
              <span className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Mini Meteorologists
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              {[
                { name: 'Home', href: '/',icon: Home, color: 'bg-red-100 text-red-600 hover:bg-red-200' },
                { name: 'Learn',  href: '/',icon: BookOpen, color: 'bg-green-100 text-green-600 hover:bg-green-200' },
                { name: 'Games', href: '/', icon: Gamepad2, color: 'bg-purple-100 text-purple-600 hover:bg-purple-200' },
                { name: 'Stargazing', href: '/', icon: Star, color: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200' },
                { name: 'Shop', href: '/', icon: ShoppingBag, color: 'bg-pink-100 text-pink-600 hover:bg-pink-200' },
                { name: 'About',  href: '/',icon: Info, color: 'bg-orange-100 text-orange-600 hover:bg-orange-200' },
                { name: 'Sign In', href: '/site2', icon: LogIn, color: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' } // ← ADD THIS

              ].map((item) => (
                <Link
                   key={item.name}
                   href={item.href}
                   className={`hidden md:flex items-center space-x-2 px-4 py-3 rounded-full text-sm font-bold ${item.color} transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl`}
                  >
                  <item.icon className="w-5 h-5" />
                 <span>{item.name}</span>
                  </Link>
                 ))}  
             
             
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Gamepad2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text & Branding */}
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Mini Meteorologists
              </h1>
              
              
              <h2 className="text-2xl lg:text-3xl font-semibold text-blue-700" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Helping your kid safely explore and learn about the amazing world of weather!
              </h2>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
                <p className="text-lg text-gray-700 leading-relaxed mt-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  <strong className="text-purple-600">A fun and safe weather learning site for kids aged 4–10,</strong>! with inspiring games and printables!
                </p>
                </div>
              </div>
                 {/* Right Side - Kids Image Placeholder */ }
              <div className="relative">
               <div className="bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-300 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
    
              {/* White color image container */}
             
             <img 
                 src="/Images/background.png" 
                 alt="Welcome to Mini Meteorologists - Four diverse children representing different weather conditions"
                 className="w-full h-full object-cover rounded-3xl"
               />
            
          

              {/* Caption below white box */}
             <p className="text-lg font-bold text-gray-700 text-center mt-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                 Kids Learning Weather!
             </p>
            </div>
            
            {/* Floating animations */}
              <div className="absolute -top-3 -left-4 animate-bounce">
                <div className="bg-yellow-300 rounded-full p-3">
                  <Sun className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 animate-bounce delay-300">
                <div className="bg-blue-300 rounded-full p-3">
                  <Cloud className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 animate-bounce">
                <div className="bg-white rounded-full p-3 shadow-md">
                  <Snowflake className="w-6 h-6 text-blue-400" />
                </div>
              </div>

            {/* Floating animations - Bottom Right (Leaf) */}
             <div className="absolute -bottom-4 -right-4 animate-bounce delay-300">
               <div className="bg-yellow-100 rounded-full p-3 shadow-md">
                 <Leaf className="w-6 h-6 text-orange-500" />
              </div>
            </div>


            </div>
          </div>
        </div>
      </section>

      {/* Search Forecast Widget */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-2 mb-4">
                <Sun className="w-8 h-8 text-yellow-500" />
                <Cloud className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Check Your City's Weather!
              </h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your city"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-blue-200 focus:border-blue-400 focus:outline-none text-lg"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                />
              </div>
              <button
               onClick={handleSearch}
               
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
            
            {weatherData && (
              <div className="mt-6 bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-4 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Weather in {weatherData.city}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white/20 rounded-xl p-3 text-center">
                    <Thermometer className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Temperature</p>
                    <p className="text-lg font-bold">{weatherData.temperature}°C</p> 
                  </div>
                  <div className="bg-white/20 rounded-xl p-3 text-center">
                    <Sun className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Condition</p>
                    <p className="text-lg font-bold">{weatherData.condition}</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3 text-center">
                    <Droplets className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Humidity</p>
                    <p className="text-lg font-bold">{weatherData.humidity}%</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3 text-center">
                    <Wind className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm">Wind</p>
                    <p className="text-lg font-bold">{weatherData.windSpeed} m/s</p>
                  </div>
                </div>
                 {/* 🎉 Weather Message & Icon */}
               <div className="mt-6 text-center">
               <div className="inline-block animate-bounce drop-shadow-lg">
              <WeatherIcon className="w-12 h-12 mx-auto text-yellow-300" />
              </div>
                <p
                 className="mt-2 text-xl font-bold bg-gradient-to-r from-pink-400 to-yellow-300 bg-clip-text text-transparent animate-pulse"
                 style={{ fontFamily: '"Comic Sans MS", cursive' }}
                >
              {weatherMessage}
              </p>
              </div>
              </div>
            )}
            
            <p className="text-center text-green-600 font-bold mt-4 text-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              The forecast looks great for learning!
            </p>
          </div>
        </div>
      </section>

      {/* Weather Swiper Section */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-blue-600 mb-8" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Explore Different Weather Types!
          </h3>
          
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Swiper Container */}
            <div className="relative h-80 md:h-96">
              {weatherCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
                      index === currentSlide 
                        ? 'translate-x-0 opacity-100 z-10' 
                        : index < currentSlide 
                        ? '-translate-x-full opacity-0 z-0' 
                        : 'translate-x-full opacity-0 z-0'
                    }`}
                  >
                    <div className={`${card.color} h-full flex items-center justify-center text-white p-8`}>
                      <div className="text-center max-w-2xl mx-auto">
                        <div className={`inline-block p-8 rounded-full ${card.bgPattern} mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-20 h-20 text-gray-700" />
                        </div>
                        <h4 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                          {card.title}
                        </h4>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed drop-shadow-md" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                          {card.fact}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-20"
            >
              <ChevronLeft className="w-8 h-8 text-gray-700" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-20"
            >
              <ChevronRight className="w-8 h-8 text-gray-700" />
            </button>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {weatherCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
                    index === currentSlide 
                      ? 'bg-white w-12 transform scale-110' 
                      : 'bg-white/50 w-4 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Weather Type Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {weatherCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    index === currentSlide 
                      ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-xl scale-105' 
                      : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    {card.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Cards Section */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-blue-600 mb-8" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Fun Learning Adventures!
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interactiveCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={index}
                  className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className={`${card.color} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300`}>
                    <div className="text-center">
                      <div className="bg-white/20 rounded-full p-4 inline-block mb-4 group-hover:bg-white/30 transition-colors duration-300">
                        <IconComponent className="w-12 h-12" />
                      </div>
                      <h4 className="text-xl font-bold mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        {card.title}
                      </h4>
                      <p className="text-sm opacity-90" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                        {card.description}
                      </p>
                      <div className="mt-4">
                        <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-bold transition-colors duration-200">
                          Explore Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Shop Preview Section */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-4xl font-bold text-center mb-8" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Weather Shop for Kids!
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-2xl p-6 text-center hover:bg-white/30 transition-colors duration-300">
                <div className="bg-white/20 rounded-full p-4 inline-block mb-4">
                  <Shirt className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Weather T-Shirts
                </h4>
                <p className="text-sm opacity-90">Cool shirts with sun, clouds, and rainbow designs!</p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center hover:bg-white/30 transition-colors duration-300">
                <div className="bg-white/20 rounded-full p-4 inline-block mb-4">
                  <FileText className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Learning Materials
                </h4>
                <p className="text-sm opacity-90">Printable flashcards and coloring sheets!</p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center hover:bg-white/30 transition-colors duration-300">
                <div className="bg-white/20 rounded-full p-4 inline-block mb-4">
                  <CreditCard className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Digital Storybooks
                </h4>
                <p className="text-sm opacity-90">Interactive weather stories and games!</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                Visit Our Shop
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <Sun className="w-10 h-10 text-yellow-300" />
            <span className="text-3xl font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Mini Meteorologists
            </span>
            <Cloud className="w-10 h-10 text-blue-300" />
          </div>
          
          <p className="text-lg mb-6" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Making weather learning fun and safe for kids everywhere!
          </p>
          
          <div className="grid sm:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-xl mb-4">Learn</h4>
              <div className="space-y-2">
                <p>Weather Basics</p>
                <p>Seasons Guide</p>
                <p>Safety Tips</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Play</h4>
              <div className="space-y-2">
                <p>Weather Games</p>
                <p>Interactive Quiz</p>
                <p>Dress-up Fun</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-4">Shop</h4>
              <div className="space-y-2">
                <p>T-Shirts</p>
                <p>Learning Cards</p>
                <p>Storybooks</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6">
            <p className="text-sm opacity-90">
              © 2025 Mini Meteorologists. Making weather learning magical for young minds! 🌈
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
 };

export default MiniMeteorologists;