import React from 'react';
import { useWeather } from '../../contexts/WeatherContext';
import WeatherCard from './WeatherCard';

const WeatherComparison = () => {
  const { state } = useWeather();
  const { currentWeather, nextWeekWeather, loading } = state;

  console.log('WeatherComparison state:', { currentWeather, nextWeekWeather, loading });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!currentWeather || !nextWeekWeather) {
    return (
      <div className="text-center py-4 text-gray-500">
        No weather data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <WeatherCard title="This Friday" weather={currentWeather} />
      <WeatherCard title="Next Friday" weather={nextWeekWeather} />
    </div>
  );
};

export default WeatherComparison;