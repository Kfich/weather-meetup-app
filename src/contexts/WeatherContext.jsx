import React, { createContext, useContext, useReducer } from 'react';

const WeatherContext = createContext();

const initialState = {
  location: null,
  currentWeather: null,
  nextWeekWeather: null,
  loading: false,
  error: null
};

function weatherReducer(state, action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return {
        ...state,
        location: action.payload,
        error: null
      };
    case 'SET_WEATHER_DATA':
      return {
        ...state,
        currentWeather: action.payload.currentWeather,
        nextWeekWeather: action.payload.nextWeekWeather,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'REFRESH_WEATHER':
      return {
        ...state,
        currentWeather: null,
        nextWeekWeather: null,
        error: null
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function WeatherProvider({ children }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}