import React from 'react';
import { getWeatherIcon } from '../../utils/weatherUtils';

const WeatherCard = ({ date, weather }) => {
  const getWeatherMessage = (temp, humidity) => {
    if (temp >= 60 && temp <= 75) return "Nice day";
    if (humidity >= 25 && humidity <= 75) return "Chance of rain";
    return "Check weather details";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold">{date}</div>
        {getWeatherIcon(weather.conditions)}
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold">{Math.round(weather.temp)}°F</div>
        <div className="text-gray-600">
          {getWeatherMessage(weather.temp, weather.humidity)}
        </div>
        <div className="text-sm text-gray-500">
          <div>Humidity: {weather.humidity}%</div>
          <div>Wind: {Math.round(weather.windspeed)} mph</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;