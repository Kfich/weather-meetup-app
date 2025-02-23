import React, { useState, useEffect } from 'react';
import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import LocationPicker from '../location/LocationPicker';
import WeatherComparison from './WeatherComparison';
import WeatherChart from './WeatherChart';
import WeatherAdvice from './WeatherAdvice';
import WeatherSummary from './WeatherSummary';
import WeekSelector from '../date/WeekSelector';
import { useWeather } from '../../contexts/WeatherContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { weatherApi } from '../../services/api/weatherApi';

const WeatherDashboard = () => {
  const { state, dispatch } = useWeather();
  const { location, loading, error } = state;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getLocation } = useGeolocation();

  // Fetch weather data for the given location and date
  const fetchWeatherData = async (loc, date) => {
    if (!loc) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await weatherApi.fetchWeatherData(loc, date);
      dispatch({ 
        type: 'SET_WEATHER_DATA',
        payload: data
      });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Fetch weather data when location or date changes
  useEffect(() => {
    if (location) {
      fetchWeatherData(location, selectedDate);
    }
  }, [location, selectedDate]);

  // Handle date change from WeekSelector
  const handleDateChange = (newDate) => {
    console.log('Date changed:', newDate);
    setSelectedDate(newDate);
  };

  const handleRefresh = async () => {
    if (location) {
      setIsRefreshing(true);
      await fetchWeatherData(location, selectedDate);
      setIsRefreshing(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      const position = await getLocation();
      if (position) {
        const locationString = `${position.latitude.toFixed(4)},${position.longitude.toFixed(4)}`;
        dispatch({ 
          type: 'SET_LOCATION', 
          payload: locationString
        });
      }
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message
      });
    }
  };

  // Get the formatted location name
  const getFormattedLocation = () => {
    if (state.weatherData?.location?.fullAddress) {
      return state.weatherData.location.fullAddress;
    }
    return location;
  };

  return (
    <div className="space-y-6">
      {/* Location Selection Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Select Location
            </h2>
            <button
              onClick={handleUseCurrentLocation}
              disabled={loading}
              className={`flex items-center text-sm text-primary-600 hover:text-primary-700
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <MapPin className="w-4 h-4 mr-1" />
              Use my location
            </button>
          </div>
        </div>
        <div className="p-6">
          <LocationPicker />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">
              Error fetching weather data
            </h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Weather Content */}
      {location && !loading && !error && (
        <div className="space-y-6">
          {/* Location and Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {getFormattedLocation()}
                </h2>
                {state.weatherData?.location?.latitude && (
                  <p className="text-sm text-gray-500">
                    {state.weatherData.location.latitude.toFixed(2)}°, 
                    {state.weatherData.location.longitude.toFixed(2)}°
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading || isRefreshing}
              className={`flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 
                ${(loading || isRefreshing) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Week Selector */}
          <WeekSelector 
            currentDate={selectedDate}
            onDateChange={handleDateChange}
          />

          {/* Weather Components */}
          <WeatherSummary 
            weatherData={state.weatherData?.weekData?.[0]} 
            location={state.weatherData?.location}
          />
          <WeatherComparison 
            weekData={state.weatherData?.weekData}
            dateRange={state.weatherData?.dateRange}
          />
          <WeatherAdvice 
            weatherData={state.weatherData?.weekData} 
            selectedDate={selectedDate}
          />
          <WeatherChart 
            weekData={state.weatherData?.weekData}
            dateRange={state.weatherData?.dateRange}
          />
        </div>
      )}

      {/* Empty State */}
      {!location && !loading && !error && (
        <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No location selected
          </h3>
          <p className="text-gray-500 mb-4">
            Enter a location above to see weather forecasts
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;