import React from 'react';
import { format, addDays } from 'date-fns';
import { useWeather } from '../../contexts/WeatherContext';
import WeatherCard from './WeatherCard';

const WeatherComparison = () => {
  const { state } = useWeather();
  const { currentWeather, nextWeekWeather, loading } = state;

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (!currentWeather || !nextWeekWeather) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">This Friday</h2>
        <WeatherCard
          date={format(new Date(), 'MMM d')}
          weather={currentWeather}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Next Friday</h2>
        <WeatherCard
          date={format(addDays(new Date(), 7), 'MMM d')}
          weather={nextWeekWeather}
        />
      </div>
    </div>
  );
};

export default WeatherComparison;