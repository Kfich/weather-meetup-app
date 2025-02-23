import React, { createContext, useContext, useReducer } from 'react';

const WeatherContext = createContext();

const initialState = {
  location: null,
  currentWeather: null,
  nextWeekWeather: null,
  loading: false,
  error: null
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_WEATHER_DATA':
      return {
        ...state,
        currentWeather: action.payload.current,
        nextWeekWeather: action.payload.nextWeek
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};