import React, { useState, useRef } from 'react';
import { Download, Cloud, Sun, Snowflake, Zap, Star, Trophy, Heart } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const WeatherProgressReport = () => {
  const [parentName, setParentName] = useState('');
  const [kidName, setKidName] = useState('');
  const [kidAge, setKidAge] = useState('');
  const [game1Progress, setGame1Progress] = useState(50);
  const [game2Progress, setGame2Progress] = useState(50);
  const [game3Progress, setGame3Progress] = useState(50);
  const reportRef = useRef<HTMLDivElement>(null);

  const overallProgress = Math.round((game1Progress + game2Progress + game3Progress) / 3);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressText = (progress: number) => {
    if (progress >= 80) return 'Excellent!';
    if (progress >= 60) return 'Good Progress!';
    if (progress >= 40) return 'Keep Going!';
    return 'Needs Practice';
  };

  const downloadAsPDF = async () => {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if content is too long
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Progress-Report-${kidName || 'Student'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to print if PDF generation fails
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200 p-4">
      <div 
        ref={reportRef}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* ... rest of your JSX remains exactly the same ... */}
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Sun className="absolute top-4 right-4 w-16 h-16 animate-pulse" />
            <Cloud className="absolute top-12 left-8 w-12 h-12 animate-bounce" />
            <Snowflake className="absolute bottom-8 right-12 w-10 h-10 animate-spin" />
            <Zap className="absolute bottom-4 left-16 w-8 h-8 animate-pulse" />
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold text-center mb-2 tracking-wide">
              🌤️ Progress Report 🌈
            </h1>
            <p className="text-center text-xl opacity-90">Weather Learning Adventure</p>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-b-4 border-yellow-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="mr-3 text-yellow-500" />
            Personal Details
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700">Parent's Name</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none text-lg"
                placeholder="Enter parent's name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700">Kid's Name</label>
              <input
                type="text"
                value={kidName}
                onChange={(e) => setKidName(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none text-lg"
                placeholder="Enter kid's name"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-semibold text-gray-700">Kid's Age</label>
              <input
                type="number"
                value={kidAge}
                onChange={(e) => setKidAge(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-yellow-300 focus:border-yellow-500 focus:outline-none text-lg"
                placeholder="Enter age"
                min="3"
                max="18"
              />
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-8 bg-gradient-to-r from-green-50 to-blue-50">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
            <Trophy className="mr-3 text-green-500" />
            Progress on Gaining Knowledge
          </h2>

          {/* Game Progress Sliders */}
          <div className="space-y-8">
            {/* Game 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Cloud className="mr-2 text-blue-500" />
                Game 1: Cloud Types & Formation
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={game1Progress}
                  onChange={(e) => setGame1Progress(parseInt(e.target.value))}
                  className="flex-1 h-3 rounded-lg appearance-none bg-gray-200 slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${game1Progress}%, #e5e7eb ${game1Progress}%, #e5e7eb 100%)`
                  }}
                />
                <div className={`px-4 py-2 rounded-full text-white font-bold min-w-24 text-center ${getProgressColor(game1Progress)}`}>
                  {game1Progress}%
                </div>
                <span className="text-lg font-semibold text-gray-700 min-w-32">
                  {getProgressText(game1Progress)}
                </span>
              </div>
            </div>

            {/* Game 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Sun className="mr-2 text-yellow-500" />
                Game 2: Weather Patterns & Seasons
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={game2Progress}
                  onChange={(e) => setGame2Progress(parseInt(e.target.value))}
                  className="flex-1 h-3 rounded-lg appearance-none bg-gray-200"
                  style={{
                    background: `linear-gradient(to right, #eab308 0%, #eab308 ${game2Progress}%, #e5e7eb ${game2Progress}%, #e5e7eb 100%)`
                  }}
                />
                <div className={`px-4 py-2 rounded-full text-white font-bold min-w-24 text-center ${getProgressColor(game2Progress)}`}>
                  {game2Progress}%
                </div>
                <span className="text-lg font-semibold text-gray-700 min-w-32">
                  {getProgressText(game2Progress)}
                </span>
              </div>
            </div>

            {/* Game 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Zap className="mr-2 text-purple-500" />
                Game 3: Extreme Weather & Safety
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={game3Progress}
                  onChange={(e) => setGame3Progress(parseInt(e.target.value))}
                  className="flex-1 h-3 rounded-lg appearance-none bg-gray-200"
                  style={{
                    background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${game3Progress}%, #e5e7eb ${game3Progress}%, #e5e7eb 100%)`
                  }}
                />
                <div className={`px-4 py-2 rounded-full text-white font-bold min-w-24 text-center ${getProgressColor(game3Progress)}`}>
                  {game3Progress}%
                </div>
                <span className="text-lg font-semibold text-gray-700 min-w-32">
                  {getProgressText(game3Progress)}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-10 bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4 text-center">Overall Progress</h3>
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{overallProgress}%</div>
                <div className="text-xl">{getProgressText(overallProgress)}</div>
              </div>
              <div className="w-32 h-32 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray={`${overallProgress}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-yellow-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="p-8 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center border-4 border-rainbow">
            <div className="mb-6">
              <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                🎉 Congratulations! 🎉
              </h2>
            </div>
            <div className="text-xl text-gray-800 leading-relaxed space-y-2">
              <p className="font-semibold">
                Great job on gaining knowledge about weather, {kidName || 'little scientist'}! 🌟
              </p>
              <p>
                You've made amazing progress in understanding how our weather works!
              </p>
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Keep exploring and learning - the sky's the limit! ☁️🌈⭐
              </p>
              <p className="text-base text-gray-600 italic">
                Sending best wishes for gaining more knowledge in the future!
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="p-6 bg-gray-50 text-center">
          <button
            onClick={downloadAsPDF}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center mx-auto"
          >
            <Download className="mr-3" />
            Download as PDF
          </button>
          <p className="text-gray-600 mt-2">Click to save this progress report as PDF</p>
        </div>
      </div>

      <style>{`
        @media print {
          body { 
            margin: 0;
            padding: 0;
            background: white !important;
          }
          .min-h-screen { 
            min-height: auto;
            padding: 0;
            background: white !important;
          }
          .max-w-4xl {
            max-width: none;
            margin: 0;
            box-shadow: none;
            border-radius: 0;
          }
          .print-hidden {
            display: none !important;
          }
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          border: 3px solid #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default WeatherProgressReport;