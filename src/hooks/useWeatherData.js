import { useState, useEffect } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { weatherApi } from '../services/api/weatherApi';

export const useWeatherData = (location) => {
  const { dispatch } = useWeather();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      setIsLoading(true);
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const weatherData = await weatherApi.fetchWeatherData(location);
        
        dispatch({
          type: 'SET_WEATHER_DATA',
          payload: {
            current: weatherData.currentWeather,
            nextWeek: weatherData.nextWeekWeather,
            location: weatherData.location
          }
        });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error.message
        });
      } finally {
        setIsLoading(false);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchData();
  }, [location, dispatch]);

  return { isLoading };
};