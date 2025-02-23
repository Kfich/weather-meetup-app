import React from 'react';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

const WeatherCard = ({ title, weather }) => {
  if (!weather) {
    console.log('No weather data provided to WeatherCard');
    return null;
  }

  console.log('WeatherCard data:', { title, weather });

  const getWeatherIcon = (conditions) => {
    if (!conditions) return <Sun className="w-8 h-8 text-yellow-500" />;
    
    const condition = conditions.toLowerCase();
    if (condition.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (condition.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-500" />;
    if (condition.includes('wind')) return <Wind className="w-8 h-8 text-gray-500" />;
    return <Sun className="w-8 h-8 text-yellow-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {getWeatherIcon(weather.conditions)}
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-gray-900">
            {Math.round(weather.temperature)}°F
          </div>
          <div className="text-gray-500">{weather.conditions || 'Clear'}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Humidity</div>
            <div className="text-lg font-medium text-gray-900">{weather.humidity}%</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Wind</div>
            <div className="text-lg font-medium text-gray-900">{weather.windSpeed} mph</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;