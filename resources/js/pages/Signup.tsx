import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Eye, EyeOff, Sparkles, Heart, UserPlus, Mail, Lock, User, Baby, Calendar, Shield, Users } from 'lucide-react';


const ParentSignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    kidName: '',
    kidNickname: '',
    kidAge: '',
    kidBirthMonth: '',
    parentPassword: '',
    confirmParentPassword: '',
    kidPassword: '',
    confirmKidPassword: '',
    agreeTerms: false,
    newsletter: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showParentPassword, setShowParentPassword] = useState(false);
  const [showConfirmParentPassword, setShowConfirmParentPassword] = useState(false);
  const [showKidPassword, setShowKidPassword] = useState(false);
  const [showConfirmKidPassword, setShowConfirmKidPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [parentPasswordMatch, setParentPasswordMatch] = useState(true);
  const [kidPasswordMatch, setKidPasswordMatch] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const birthMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

  // Generate sparkles randomly
  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
      };
      setSparkles(prev => [...prev.slice(-3), newSparkle]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Check parent password match
  useEffect(() => {
    if (formData.confirmParentPassword && formData.parentPassword) {
      setParentPasswordMatch(formData.parentPassword === formData.confirmParentPassword);
    } else {
      setParentPasswordMatch(true);
    }
  }, [formData.parentPassword, formData.confirmParentPassword]);

  // Check kid password match
  useEffect(() => {
    if (formData.confirmKidPassword && formData.kidPassword) {
      setKidPasswordMatch(formData.kidPassword === formData.confirmKidPassword);
    } else {
      setKidPasswordMatch(true);
    }
  }, [formData.kidPassword, formData.confirmKidPassword]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.email || !formData.kidName || !formData.kidAge || 
        !formData.parentPassword || !formData.confirmParentPassword || 
        !formData.kidPassword || !formData.confirmKidPassword || !formData.agreeTerms) return;
   

    setIsLoading(true);
     try {
    const response = await fetch('http://localhost:8000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
       parentName: formData.parentName,
        email: formData.email,
        parentPassword: formData.parentPassword,
        kidName: formData.kidName,
        kidPassword: formData.kidPassword,
        kidNickname: formData.kidNickname,
        kidAge: parseInt(formData.kidAge, 10),
        kidBirthMonth: formData.kidBirthMonth
  })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Laravel error response:', data);
      if (data.errors) {
        const messages = Object.values(data.errors).flat().join('\n');
        alert(`Validation errors:\n${messages}`);
      } else if (data.message) {
        alert(`Error: ${data.message}`);
      } else {
        alert('Unknown error occurred');
      }
      return;
    }

    alert(data.message || 'Accounts created successfully');
    setIsSuccess(true);

  } catch (error: any) {
    console.error('Fetch failed:', error);
    alert(`Something went wrong:\n${error.message}`);
  } finally {
    setIsLoading(false);
  }
};


  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 flex items-center justify-center p-4 relative overflow-hidden"
      style={{ fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-16 h-16 text-white/20 animate-bounce"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            animationDelay: '-2s',
            animationDuration: '3s',
          }}
        >
          <Cloud size={64} />
        </div>
        <div
          className="absolute top-3/4 right-1/4 w-12 h-12 text-white/20 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
            animationDelay: '-1s',
          }}
        >
          <CloudRain size={48} />
        </div>
        <div
          className="absolute top-1/2 right-1/3 w-10 h-10 text-yellow-300/30 animate-spin"
          style={{
            transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)`,
            animationDuration: '4s',
          }}
        >
          <Sun size={40} />
        </div>

        {/* Sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute w-3 h-3 text-yellow-300/50 animate-ping"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              animationDuration: '2s',
            }}
          >
            <Sparkles size={12} />
          </div>
        ))}
      </div>

      {/* Main SignUp Container */}
      <div className={`bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl relative z-10 transition-all duration-500 transform ${isSuccess ? 'scale-105 rotate-1' : ''} ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}>
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          
          {/* Logo */}
          <div className="flex items-center justify-center mb-4 relative z-10">
            <div className="relative">
              <Sun className="w-8 h-8 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
              <Baby className="w-6 h-6 text-white absolute -top-2 -right-2 animate-bounce" />
            </div>
            <h1 className="text-2xl font-bold text-white ml-3">Family Weather Fun</h1>
          </div>

          <div className="flex justify-center space-x-4 relative z-10">
            <Sun size={24} className="text-yellow-300 animate-bounce" />
            <Cloud size={24} className="text-white animate-pulse" />
            <CloudRain size={24} className="text-blue-300 animate-bounce" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <p className="text-white/95 mt-4 text-lg font-bold relative z-10">
            Create your family weather accounts
          </p>

          {/* Step Progress */}
          <div className="flex justify-center space-x-2 mt-4 relative z-10">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  step <= currentStep ? 'bg-yellow-300 scale-110' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 bg-gradient-to-br from-white to-emerald-50/50">
          
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-700 flex items-center justify-center">
                  <Users className="w-5 h-5 mr-2 text-emerald-500" />
                  Family Information
                </h2>
              </div>

              {/* Parent Name */}
              <div className="group">
                <label htmlFor="parentName" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-emerald-500" />
                  Parent Name
                </label>
                <input
                  type="text"
                  id="parentName"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl text-sm bg-gradient-to-r from-white to-emerald-50 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 font-bold transform hover:scale-105"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-blue-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl text-sm bg-gradient-to-r from-white to-blue-50 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 font-bold transform hover:scale-105"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Kid's Information */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200 transform hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-purple-700 mb-4 flex items-center">
                  <Baby className="w-5 h-5 mr-2 animate-bounce" />
                  Kid's Information
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="kidName" className="block text-sm font-bold text-gray-700 mb-2">
                      Kid's Name
                    </label>
                    <input
                      type="text"
                      id="kidName"
                      name="kidName"
                      value={formData.kidName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-3 border-2 border-purple-200 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-bold"
                      placeholder="Full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="kidNickname" className="block text-sm font-bold text-gray-700 mb-2">
                      Nickname (Optional)
                    </label>
                    <input
                      type="text"
                      id="kidNickname"
                      name="kidNickname"
                      value={formData.kidNickname}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-purple-200 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-bold"
                      placeholder="Fun nickname"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="kidAge" className="block text-sm font-bold text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      id="kidAge"
                      name="kidAge"
                      value={formData.kidAge}
                      onChange={handleInputChange}
                      required
                      min="1"
                      max="18"
                      className="w-full px-3 py-3 border-2 border-purple-200 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-bold"
                      placeholder="Age"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="kidBirthMonth" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Birth Month
                    </label>
                    <select
                      id="kidBirthMonth"
                      name="kidBirthMonth"
                      value={formData.kidBirthMonth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border-2 border-purple-200 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-bold"
                    >
                      <option value="">Select month</option>
                      {birthMonths.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Parent Password */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-700 flex items-center justify-center">
                  <Shield className="w-5 h-5 mr-2 text-green-500 animate-pulse" />
                  Parent Account Security
                </h2>
                <p className="text-gray-600 text-sm mt-2">Create a secure password for your parent account</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 transform hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-green-700 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Parent Login Credentials
                </h3>

                <div className="space-y-4">
                  <div className="group">
                    <label htmlFor="parentPassword" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-green-500" />
                      Parent Password
                    </label>
                    <div className="relative">
                      <input
                        type={showParentPassword ? 'text' : 'password'}
                        id="parentPassword"
                        name="parentPassword"
                        value={formData.parentPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pr-10 border-2 border-green-200 rounded-xl text-sm bg-gradient-to-r from-white to-green-50 focus:outline-none focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20 transition-all duration-300 font-bold"
                        placeholder="Create parent password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowParentPassword(!showParentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors hover:scale-110"
                      >
                        {showParentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="confirmParentPassword" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-emerald-500" />
                      Confirm Parent Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmParentPassword ? 'text' : 'password'}
                        id="confirmParentPassword"
                        name="confirmParentPassword"
                        value={formData.confirmParentPassword}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 pr-10 border-2 rounded-xl text-sm bg-gradient-to-r from-white to-emerald-50 focus:outline-none focus:ring-2 transition-all duration-300 font-bold ${
                          parentPasswordMatch 
                            ? 'border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20' 
                            : 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        }`}
                        placeholder="Confirm parent password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmParentPassword(!showConfirmParentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors hover:scale-110"
                      >
                        {showConfirmParentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {!parentPasswordMatch && formData.confirmParentPassword && (
                      <p className="text-red-500 text-xs mt-1 font-bold animate-pulse">Parent passwords don't match!</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Kid Password */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-700 flex items-center justify-center">
                  <Baby className="w-5 h-5 mr-2 text-purple-500 animate-bounce" />
                  Kid Account Security
                </h2>
                <p className="text-gray-600 text-sm mt-2">Create a fun and secure password for {formData.kidName || 'your kid'}</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 transform hover:scale-105 transition-all duration-300">
                <h3 className="font-bold text-purple-700 mb-4 flex items-center">
                  <Baby className="w-5 h-5 mr-2 animate-bounce" />
                  Kid Login Credentials
                </h3>

                <div className="space-y-4">
                  <div className="group">
                    <label htmlFor="kidPassword" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-purple-500" />
                      Kid Password
                    </label>
                    <div className="relative">
                      <input
                        type={showKidPassword ? 'text' : 'password'}
                        id="kidPassword"
                        name="kidPassword"
                        value={formData.kidPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pr-10 border-2 border-purple-200 rounded-xl text-sm bg-gradient-to-r from-white to-purple-50 focus:outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 font-bold"
                        placeholder="Create kid password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKidPassword(!showKidPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors hover:scale-110"
                      >
                        {showKidPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="confirmKidPassword" className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
                      <Lock className="w-4 h-4 mr-2 text-pink-500" />
                      Confirm Kid Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmKidPassword ? 'text' : 'password'}
                        id="confirmKidPassword"
                        name="confirmKidPassword"
                        value={formData.confirmKidPassword}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 pr-10 border-2 rounded-xl text-sm bg-gradient-to-r from-white to-pink-50 focus:outline-none focus:ring-2 transition-all duration-300 font-bold ${
                          kidPasswordMatch 
                            ? 'border-pink-200 focus:border-pink-500 focus:ring-pink-500/20' 
                            : 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                        }`}
                        placeholder="Confirm kid password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmKidPassword(!showConfirmKidPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors hover:scale-110"
                      >
                        {showConfirmKidPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {!kidPasswordMatch && formData.confirmKidPassword && (
                      <p className="text-red-500 text-xs mt-1 font-bold animate-pulse">Kid passwords don't match!</p>
                    )}
                  </div>
                </div>

                {/* Terms and Newsletter */}
                <div className="space-y-3 mt-6">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      required
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 mt-1"
                    />
                    <label htmlFor="agreeTerms" className="text-gray-700 font-bold text-sm leading-tight">
                      I agree to the <span className="text-emerald-600 underline cursor-pointer hover:text-emerald-800">Terms & Conditions</span> and <span className="text-emerald-600 underline cursor-pointer hover:text-emerald-800">Privacy Policy</span>
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                    />
                    <label htmlFor="newsletter" className="text-gray-700 font-bold text-sm leading-tight">
                      Send me weather tips and family updates
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl font-bold hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.parentName || !formData.email || !formData.kidName || !formData.kidAge)) ||
                  (currentStep === 2 && (!formData.parentPassword || !formData.confirmParentPassword || !parentPasswordMatch))
                }
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl font-bold hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 flex items-center ml-auto"
              >
                Next
                <Baby className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!formData.agreeTerms || !parentPasswordMatch || !kidPasswordMatch || !formData.kidPassword || !formData.confirmKidPassword}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl font-bold hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 flex items-center ml-auto"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Creating Accounts...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Family Accounts
                  </>
                )}
              </button>
            )}
          </div>

          {/* Sign In Link */}
          <div className="text-center pt-4 border-t border-gray-200 mt-4">
            <p className="text-gray-600 text-sm mb-3">
              Already have an account?
            </p>
            <button
              type="button"
              className="px-6 py-2 bg-gradient-to-r from-purple-400 to-blue-500 text-white rounded-xl font-bold text-sm hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center mx-auto"
            >
              <Heart className="w-4 h-4 mr-2" />
              Sign In Here
            </button>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="mt-4 p-4 bg-green-100 border-2 border-green-300 rounded-xl text-center animate-bounce">
              <p className="text-green-700 font-bold text-sm flex items-center justify-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Welcome to the weather family! Both accounts created successfully!
                <Heart className="w-4 h-4 ml-2" />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentSignUp;