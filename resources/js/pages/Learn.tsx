import React, { useState } from 'react';
import Layout from '@/layouts/Layout'; 
import { 
  Cloud, 
  CloudRain, 
  Zap, 
  Sun, 
  Snowflake, 
  Wind, 
  Thermometer, 
  Waves,
  Shield,
  Umbrella,
  Home,
  AlertTriangle,
  Heart,
  Eye,
  Mountain,
  TreePine,
  Flower,
  Leaf
} from 'lucide-react';

const WeatherLearningPage = () => {
  const [activeTab, setActiveTab] = useState('disasters');


 
  const disasters = {
    water: [
      { 
        name: 'FLOOD', 
        icon: Waves, 
        description: 'When too much water covers the land! Rivers and lakes overflow and water goes everywhere.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-600'
      },
      { 
        name: 'TSUNAMI', 
        icon: Waves, 
        description: 'Giant waves from the ocean that move very fast! They happen when the earth shakes underwater.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-800'
      },
      { 
        name: 'MONSOON', 
        icon: CloudRain, 
        description: 'Very heavy rains that last for many days! They bring lots of water to help plants grow.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-500'
      },
      { 
        name: 'DELUGE', 
        icon: CloudRain, 
        description: 'When it rains so much that everything gets flooded! Like someone poured buckets of water from the sky.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-700'
      },
      { 
        name: 'STORM SURGE', 
        icon: Waves, 
        description: 'When strong storms push ocean water onto the land! The waves become very big and powerful.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-900'
      }
    ],
    storm: [
      { 
        name: 'HURRICANE', 
        icon: Wind, 
        description: 'A huge spinning storm with very strong winds! It looks like a giant spinning top from space.', 
        color: 'bg-gray-100 border-gray-300',
        iconColor: 'text-gray-600'
      },
      { 
        name: 'TORNADO', 
        icon: Wind, 
        description: 'A spinning funnel of air that touches the ground! It spins very fast like a spinning top.', 
        color: 'bg-gray-100 border-gray-300',
        iconColor: 'text-gray-700'
      },
      { 
        name: 'TYPHOON', 
        icon: Wind, 
        description: 'Like a hurricane but in a different part of the world! It has very strong spinning winds.', 
        color: 'bg-gray-100 border-gray-300',
        iconColor: 'text-gray-800'
      },
      { 
        name: 'CYCLONE', 
        icon: Wind, 
        description: 'Another name for a big spinning storm! The winds go round and round in circles.', 
        color: 'bg-gray-100 border-gray-300',
        iconColor: 'text-gray-500'
      },
      { 
        name: 'THUNDERSTORM', 
        icon: Cloud, 
        description: 'Dark clouds that make loud thunder sounds! You see lightning and hear big BOOM sounds.', 
        color: 'bg-gray-100 border-gray-300',
        iconColor: 'text-gray-600'
      },
      { 
        name: 'LIGHTNING', 
        icon: Zap, 
        description: 'Bright flashes of electricity in the sky! It looks like giant sparks during storms.', 
        color: 'bg-yellow-100 border-yellow-300',
        iconColor: 'text-yellow-600'
      },
      { 
        name: 'HAILSTORM', 
        icon: Cloud, 
        description: 'When ice balls fall from the sky! They can be as small as peas or as big as golf balls.', 
        color: 'bg-gray-100 border-gray-300',
        iconColor: 'text-gray-400'
      },
      { 
        name: 'WINDSTORM', 
        icon: Wind, 
        description: 'Very strong winds that can blow things around! Trees bend and leaves fly everywhere.', 
        color: 'bg-gray-100 border-gray-300',
        iconColor: 'text-gray-600'
      },
      { 
        name: 'BLIZZARD', 
        icon: Snowflake, 
        description: 'A snowstorm with very strong winds! Snow blows everywhere and you cannot see far.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-300'
      }
    ],
    heat: [
      { 
        name: 'DROUGHT', 
        icon: Sun, 
        description: 'When there is no rain for a very long time! Plants and rivers dry up and need water.', 
        color: 'bg-yellow-100 border-yellow-300',
        iconColor: 'text-yellow-600'
      },
      { 
        name: 'HEATWAVE', 
        icon: Thermometer, 
        description: 'When it gets very, very hot for many days! Everyone needs to stay cool and drink water.', 
        color: 'bg-red-100 border-red-300',
        iconColor: 'text-red-600'
      },
      { 
        name: 'WILDFIRE', 
        icon: Zap, 
        description: 'Fires that spread in forests and grass! They move fast and firefighters work hard to stop them.', 
        color: 'bg-orange-100 border-orange-300',
        iconColor: 'text-orange-600'
      },
      { 
        name: 'DESERT', 
        icon: Sun, 
        description: 'Very dry places with lots of sand! It is hot during the day and cold at night.', 
        color: 'bg-yellow-100 border-yellow-300',
        iconColor: 'text-yellow-700'
      },
      { 
        name: 'SANDSTORM', 
        icon: Wind, 
        description: 'Strong winds that blow sand everywhere! The sand makes it hard to see anything.', 
        color: 'bg-yellow-100 border-yellow-300',
        iconColor: 'text-yellow-800'
      }
    ],
    cold: [
      { 
        name: 'AVALANCHE', 
        icon: Mountain, 
        description: 'When lots of snow slides down a mountain very fast! It is like a snowy waterfall.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-600'
      },
      { 
        name: 'FROSTBITE', 
        icon: Snowflake, 
        description: 'When your body gets too cold and starts to hurt! Always wear warm clothes in cold weather.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-400'
      },
      { 
        name: 'ICESTORM', 
        icon: Snowflake, 
        description: 'When everything gets covered in thick ice! Roads and trees become very slippery.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-500'
      },
      { 
        name: 'SNOWSTORM', 
        icon: Snowflake, 
        description: 'When lots of snow falls from the sky! Everything becomes white and fluffy.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-300'
      },
      { 
        name: 'FREEZE', 
        icon: Snowflake, 
        description: 'When water turns into ice because it is so cold! Puddles become slippery ice patches.', 
        color: 'bg-blue-100 border-blue-300',
        iconColor: 'text-blue-600'
      }
    ]
  };

  const seasons = [
    {
      name: 'Spring',
      icon: Flower,
      color: 'bg-green-100 border-green-300',
      iconColor: 'text-green-600',
      description: 'Flowers bloom and trees grow new leaves!',
      activities: [
        'Plant seeds in the garden',
        'Go on nature walks',
        'Watch birds build nests',
        'Enjoy mild warm weather'
      ],
      care: [
        'Wear light jackets for cool mornings',
        'Watch for spring allergies',
        'Be careful of slippery wet ground from rain'
      ]
    },
    {
      name: 'Summer',
      icon: Sun,
      color: 'bg-yellow-100 border-yellow-300',
      iconColor: 'text-yellow-600',
      description: 'Hot and sunny days perfect for outdoor fun!',
      activities: [
        'Go swimming and to the beach',
        'Have picnics in the park',
        'Play outdoor sports',
        'Go camping with family'
      ],
      care: [
        'Drink lots of water to stay hydrated',
        'Use sunscreen to protect your skin',
        'Wear hats and light colored clothes',
        'Stay in shade during the hottest part of day'
      ]
    },
    {
      name: 'Autumn/Fall',
      icon: Leaf,
      color: 'bg-orange-100 border-orange-300',
      iconColor: 'text-orange-600',
      description: 'Leaves change colors and fall from trees!',
      activities: [
        'Jump in piles of colorful leaves',
        'Pick apples and pumpkins',
        'Go on hiking trips',
        'Prepare for colder weather'
      ],
      care: [
        'Start wearing warmer clothes',
        'Be careful of slippery wet leaves',
        'Get ready for shorter days'
      ]
    },
    {
      name: 'Winter',
      icon: Snowflake,
      color: 'bg-blue-100 border-blue-300',
      iconColor: 'text-blue-600',
      description: 'Cold weather with snow and ice!',
      activities: [
        'Build snowmen and have snowball fights',
        'Go ice skating and sledding',
        'Make hot chocolate',
        'Celebrate winter holidays'
      ],
      care: [
        'Wear warm coats, hats, and gloves',
        'Be careful on icy sidewalks',
        'Stay warm and dry',
        'Check on elderly neighbors'
      ]
    }
  ];

  const safetyTips = [
    {
      icon: Home,
      title: 'At Home Safety',
      tips: [
        'Always listen to your parents and teachers',
        'Know where to go during emergencies',
        'Keep a flashlight and batteries ready',
        'Learn your family emergency phone numbers'
      ]
    },
    {
      icon: Eye,
      title: 'Weather Watching',
      tips: [
        'Watch weather reports on TV or phone',
        'Look at the sky for dark clouds',
        'Feel if the wind is getting stronger',
        'Notice if animals act differently'
      ]
    },
    {
      icon: Shield,
      title: 'Emergency Kit',
      tips: [
        'Keep water and healthy snacks stored',
        'Have a first aid kit with bandages',
        'Store warm blankets and extra clothes',
        'Keep a battery-powered radio'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'During Disasters',
      tips: [
        'Stay calm and follow adult instructions',
        'Go to safe places like basements for tornadoes',
        'Stay away from windows during storms',
        'Never go outside during dangerous weather'
      ]
    },
    {
      icon: Heart,
      title: 'Help Others',
      tips: [
        'Check on neighbors, especially elderly ones',
        'Share supplies if others need help',
        'Be kind and patient during scary times',
        'Follow community helper instructions'
      ]
    }
  ];

  const DisasterCard = ({ disaster }) => {
    return (
      <div className={`${disaster.color} p-6 rounded-xl border-2 transform hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer`}>
        {/* Image placeholder space */}
        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 h-32 mb-4 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-xs mb-1">Image Space</div>
            <div className="text-xs">{disaster.name}</div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          {disaster.name}
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          {disaster.description}
        </p>
      </div>
    );
  };

  const SeasonCard = ({ season }) => {
    const IconComponent = season.icon;
    return (
      <div className={`${season.color} p-6 rounded-xl border-2 transform hover:scale-105 transition-all duration-300 hover:shadow-lg`}>
        <div className="flex items-center justify-center mb-4">
          <IconComponent 
            className={`w-12 h-12 ${season.iconColor} animate-pulse`} 
          />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          {season.name}
        </h3>
        <p className="text-gray-700 text-sm mb-4 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          {season.description}
        </p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            <Heart className="w-4 h-4 mr-1 text-red-500" />
            Fun Activities:
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {season.activities.map((activity, idx) => (
              <li key={idx} className="flex items-start" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                {activity}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            <Shield className="w-4 h-4 mr-1 text-blue-500" />
            Stay Safe:
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {season.care.map((tip, idx) => (
              <li key={idx} className="flex items-start" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const SafetyCard = ({ safety }) => {
    const IconComponent = safety.icon;
    return (
      <div className="bg-green-50 border-2 border-green-200 p-6 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <IconComponent 
            className="w-10 h-10 text-green-600 animate-pulse" 
          />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          {safety.title}
        </h3>
        <ul className="space-y-2">
          {safety.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start text-sm text-gray-700" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            <Cloud className="w-10 h-10 mr-3 text-blue-500 animate-bounce" />
            Weather Learning for Kids
            <Sun className="w-10 h-10 ml-3 text-yellow-500 animate-spin" />
          </h1>
          <p className="text-gray-600 text-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>Learn about weather, seasons, and how to stay safe!</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-lg border flex flex-row space-x-2">
            {[
              { id: 'disasters', label: 'Disasters', icon: AlertTriangle },
              { id: 'seasons', label: 'Seasons', icon: TreePine },
              { id: 'safety', label: 'Safety Measures', icon: Shield }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-md transform scale-105'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'disasters' && (
          <div className="space-y-8">
            {Object.entries(disasters).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center capitalize flex items-center justify-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  {category === 'water' && <Waves className="w-8 h-8 mr-3 text-blue-500 animate-bounce" />}
                  {category === 'storm' && <Wind className="w-8 h-8 mr-3 text-gray-500 animate-spin" />}
                  {category === 'heat' && <Sun className="w-8 h-8 mr-3 text-yellow-500 animate-pulse" />}
                  {category === 'cold' && <Snowflake className="w-8 h-8 mr-3 text-blue-300 animate-spin" />}
                  {category} Disasters
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((disaster, idx) => (
                    <DisasterCard key={idx} disaster={disaster} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'seasons' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              <TreePine className="w-8 h-8 mr-3 text-green-500 animate-bounce" />
              The Four Seasons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seasons.map((season, idx) => (
                <SeasonCard key={idx} season={season} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'safety' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              <Shield className="w-8 h-8 mr-3 text-green-500 animate-bounce" />
              Safety First!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyTips.map((safety, idx) => (
                <SafetyCard key={idx} safety={safety} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600 flex items-center justify-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            <Heart className="w-5 h-5 mr-2 text-red-500 animate-pulse" />
            Stay safe, stay curious, and keep learning!
            <Umbrella className="w-5 h-5 ml-2 text-blue-500 animate-bounce" />
          </p>
        </div>
      </div>
    </div>
  
</Layout>
  );
};

export default WeatherLearningPage;