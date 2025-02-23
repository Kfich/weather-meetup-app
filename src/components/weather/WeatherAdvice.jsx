import React from 'react';
import { 
  Sun, 
  Cloud, 
  Umbrella, 
  Home, 
  Tent, 
  MapPin,
  CalendarCheck,
  ArrowRight,
  CloudSun,
  CloudRain,
  Thermometer
} from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';

const ActivitySuggestion = ({ icon: Icon, title, isRecommended }) => (
  <div className={`
    flex items-center gap-3 p-3 rounded-lg transition-all
    ${isRecommended 
      ? 'bg-white/20 text-white shadow-sm' 
      : 'bg-white/10 text-white/70'
    }
    hover:bg-white/25 cursor-pointer
  `}>
    <Icon className={`w-5 h-5 ${isRecommended ? 'text-white' : 'text-white/70'}`} />
    <span className={`text-sm ${isRecommended ? 'font-semibold' : 'font-medium'}`}>
      {title}
    </span>
    {isRecommended && (
      <span className="ml-auto bg-white/20 text-white text-xs px-2 py-1 rounded-full">
        Recommended
      </span>
    )}
  </div>
);

const WeatherAdvice = () => {
  const { state } = useWeather();
  const { currentWeather, nextWeekWeather } = state;

  if (!currentWeather || !nextWeekWeather) return null;

  const analyzeWeather = (weather) => {
    const score = {
      temperature: 0,
      conditions: 0,
      humidity: 0,
      windSpeed: 0
    };

    const temp = weather.temperature;
    if (temp >= 65 && temp <= 80) score.temperature = 2;
    else if (temp >= 55 && temp <= 85) score.temperature = 1;

    const conditions = weather.conditions.toLowerCase();
    if (conditions.includes('clear') || conditions.includes('sun')) score.conditions = 2;
    else if (conditions.includes('cloud')) score.conditions = 1;

    if (weather.humidity < 65) score.humidity = 2;
    else if (weather.humidity < 80) score.humidity = 1;

    if (weather.windSpeed < 10) score.windSpeed = 2;
    else if (weather.windSpeed < 15) score.windSpeed = 1;

    return {
      total: Object.values(score).reduce((a, b) => a + b, 0),
      isGood: Object.values(score).reduce((a, b) => a + b, 0) >= 6,
      conditions,
      temperature: temp
    };
  };

  const currentAnalysis = analyzeWeather(currentWeather);
  const nextWeekAnalysis = analyzeWeather(nextWeekWeather);

  const getBetterDay = () => {
    if (currentAnalysis.total > nextWeekAnalysis.total) return 'this';
    if (nextWeekAnalysis.total > currentAnalysis.total) return 'next';
    return 'either';
  };

  const betterDay = getBetterDay();
  const activeAnalysis = betterDay === 'this' ? currentAnalysis : nextWeekAnalysis;
  const shouldBeOutdoors = activeAnalysis.isGood;

  // Dynamic background based on conditions and recommendation
  const getBackgroundStyle = () => {
    const conditions = activeAnalysis.conditions;
    const temp = activeAnalysis.temperature;

    if (!shouldBeOutdoors) {
      if (conditions.includes('rain') || conditions.includes('storm')) {
        return 'from-slate-600 to-slate-800'; // Rainy/stormy
      }
      if (temp < 55) {
        return 'from-cyan-600 to-blue-800'; // Cold
      }
      if (temp > 85) {
        return 'from-orange-500 to-red-700'; // Too hot
      }
      return 'from-slate-500 to-slate-700'; // Generally not good
    }

    if (conditions.includes('clear') || conditions.includes('sun')) {
      if (temp >= 75) {
        return 'from-yellow-400 to-orange-500'; // Warm and sunny
      }
      return 'from-blue-400 to-cyan-500'; // Pleasant and sunny
    }

    if (conditions.includes('cloud')) {
      return 'from-blue-500 to-indigo-600'; // Cloudy but nice
    }

    return 'from-emerald-500 to-teal-600'; // Default good conditions
  };

  // Get the appropriate background icon
  const getBackgroundIcon = () => {
    const conditions = activeAnalysis.conditions;
    
    if (conditions.includes('rain') || conditions.includes('storm')) {
      return <CloudRain className="w-32 h-32 text-white" />;
    }
    if (conditions.includes('cloud')) {
      return <Cloud className="w-32 h-32 text-white" />;
    }
    if (activeAnalysis.temperature > 85) {
      return <Thermometer className="w-32 h-32 text-white" />;
    }
    return <CloudSun className="w-32 h-32 text-white" />;
  };

  const backgroundColor = getBackgroundStyle();

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${backgroundColor} rounded-xl shadow-lg p-6 transition-colors duration-500`}>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 opacity-10 transition-transform duration-500 transform hover:rotate-12">
        {getBackgroundIcon()}
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <CalendarCheck className="w-6 h-6 text-white" />
          <h2 className="text-xl font-semibold text-white">
            Meetup Recommendations
          </h2>
        </div>

        {/* Recommended Day */}
        <div className="bg-white/10 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-white/80" />
            <span className="text-white/80">Best day for your meetup</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-white" />
            <span className="text-lg font-semibold text-white">
              {betterDay === 'either' 
                ? 'Either Friday works well!'
                : `${betterDay === 'this' ? 'This' : 'Next'} Friday is better`
              }
            </span>
          </div>
        </div>

        {/* Activity Suggestions */}
        <div className="space-y-3">
          <h3 className="text-white/90 font-medium mb-4">Suggested Activities</h3>
          
          {shouldBeOutdoors ? (
            <>
              <ActivitySuggestion 
                icon={Tent}
                title="Park picnic"
                isRecommended={true}
              />
              <ActivitySuggestion 
                icon={Sun}
                title="Outdoor sports"
                isRecommended={true}
              />
              <ActivitySuggestion 
                icon={Home}
                title="Indoor games"
                isRecommended={false}
              />
            </>
          ) : (
            <>
              <ActivitySuggestion 
                icon={Home}
                title="Indoor venue"
                isRecommended={true}
              />
              <ActivitySuggestion 
                icon={Umbrella}
                title="Covered area activities"
                isRecommended={true}
              />
              <ActivitySuggestion 
                icon={Tent}
                title="Outdoor activities"
                isRecommended={false}
              />
            </>
          )}
        </div>

        {/* Weather tip */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/70">
            <Cloud className="w-4 h-4" />
            <span className="text-sm">
              Keep monitoring the forecast as the date approaches
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAdvice;