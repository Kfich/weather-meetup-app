import React from 'react';
import LocationPicker from '../location/LocationPicker';
import WeatherComparison from './WeatherComparison';
import WeatherChart from './WeatherChart';
import Loading from '../common/Loading';
import { useWeather } from '../../contexts/WeatherContext';
import { useWeatherData } from '../../hooks/useWeatherData';

const WeatherDashboard = () => {
  const { state } = useWeather();
  const { location, loading, error } = state;

  // Initialize weather data fetching
  useWeatherData(location);

  return (
    <div className="space-y-8">
      {/* Location Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Select Meetup Location
        </h2>
        <LocationPicker />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loading />
        </div>
      )}

      {/* Weather Content */}
      {location && !loading && !error && (
        <div className="space-y-8">
          {/* Location Display */}
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">{location}</h2>
          </div>

          {/* Weather Cards */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Weather Comparison
            </h2>
            <WeatherComparison />
          </div>

          {/* Weather Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Weather Trends
            </h2>
            <WeatherChart />
          </div>

          {/* Weather Summary */}
          <div className="bg-primary-50 rounded-lg p-4 text-primary-800">
            <p className="text-sm">
              Remember to check back regularly for weather updates. The forecast is
              updated every hour.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;