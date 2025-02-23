import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';
import { weatherApi } from '../../services/api/weatherApi';

const LocationPicker = () => {
  const [inputValue, setInputValue] = useState('');
  const { state, dispatch } = useWeather();
  const { loading } = state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const weatherData = await weatherApi.fetchWeatherData(inputValue.trim());
      
      dispatch({
        type: 'SET_WEATHER_DATA',
        payload: {
          currentWeather: weatherData.currentWeather,
          nextWeekWeather: weatherData.nextWeekWeather
        }
      });
      
      dispatch({ type: 'SET_LOCATION', payload: inputValue.trim() });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter city name or zip code"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          disabled={loading}
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
      <button
        type="submit"
        disabled={!inputValue.trim() || loading}
        className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg
          text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
          ${(!inputValue.trim() || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          'Get Weather'
        )}
      </button>
    </form>
  );
};

export default LocationPicker;