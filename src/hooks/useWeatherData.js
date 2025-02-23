import { useEffect } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { weatherApi } from '../services/api/weatherApi';

export const useWeatherData = (location) => {
  const { dispatch } = useWeather();

  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const data = await weatherApi.fetchWeatherData(location);
        dispatch({
          type: 'SET_WEATHER_DATA',
          payload: {
            currentWeather: data.currentWeather,
            nextWeekWeather: data.nextWeekWeather
          }
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

    fetchData();
  }, [location, dispatch]);
};