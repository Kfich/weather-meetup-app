import React, { useState, useEffect } from 'react';
import { AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import LocationPicker from '../location/LocationPicker';
import WeatherComparison from './WeatherComparison';
import WeatherChart from './WeatherChart';
import WeatherAdvice from './WeatherAdvice';
import WeatherSummary from './WeatherSummary';
import { useWeather } from '../../contexts/WeatherContext';
import { useGeolocation } from '../../hooks/useGeolocation';

const WeatherDashboard = () => {
  const { state, dispatch } = useWeather();
  const { location, loading, error } = state;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { getLocation } = useGeolocation();

  // Reset state on component mount
  useEffect(() => {
    dispatch({ type: 'RESET_STATE' });
  }, [dispatch]);

  const handleRefresh = async () => {
    if (location) {
      setIsRefreshing(true);
      dispatch({ type: 'RESET_STATE' });
      
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        
        // Re-fetch location data
        dispatch({ type: 'SET_LOCATION', payload: location });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to refresh weather data'
        });
      } finally {
        setIsRefreshing(false);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  };

  const handleUseCurrentLocation = async () => {
    try {
      // Reset state before fetching new location
      dispatch({ type: 'RESET_STATE' });
      dispatch({ type: 'SET_LOADING', payload: true });

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
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Reset on beforeunload event
  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch({ type: 'RESET_STATE' });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Location Selection Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md">
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Select Location
            </h2>
            {/* <button
              onClick={handleUseCurrentLocation}
              disabled={loading}
              className={`flex items-center text-sm text-primary-600 hover:text-primary-700
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <MapPin className="w-4 h-4 mr-1" />
              Use my location
            </button> */}
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
          {/* Location and Refresh Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">
                {location}
              </h2>
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

          {/* Weather Summary */}
          <WeatherSummary />

          {/* Weather Advice */}
          <WeatherAdvice />

          {/* Weather Comparison Cards */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Friday Weather Comparison
            </h2>
            <WeatherComparison />
          </div>

          {/* Weather Chart */}
          <WeatherChart />
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
            Enter a location above to see weather comparisons
          </p>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;