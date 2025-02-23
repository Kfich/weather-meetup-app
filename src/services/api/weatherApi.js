import axios from 'axios';
import { format, addDays } from 'date-fns';

const API_KEY = process.env.REACT_APP_VISUAL_CROSSING_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

class WeatherAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'WeatherAPIError';
    this.statusCode = statusCode;
  }
}

const processHourlyData = (hours) => {
  if (!Array.isArray(hours)) return [];
  
  return hours.map(hour => ({
    time: hour.datetime,
    temperature: Math.round(hour.temp),
    humidity: Math.round(hour.humidity),
    windSpeed: Math.round(hour.windspeed),
    conditions: hour.conditions || 'Unknown'
  }));
};

const processDay = (day) => {
  if (!day) return null;

  return {
    temperature: Math.round(day.temp),
    humidity: Math.round(day.humidity),
    windSpeed: Math.round(day.windspeed),
    conditions: day.conditions || 'Unknown',
    hourlyForecast: processHourlyData(day.hours)
  };
};

export const weatherApi = {
  fetchWeatherData: async (location) => {
    if (!API_KEY) {
      throw new WeatherAPIError('API key is missing. Please check your environment variables.', 401);
    }

    try {
      // Calculate dates for this Friday and next Friday
      const today = new Date();
      const daysUntilFriday = (5 - today.getDay() + 7) % 7;
      const thisFriday = addDays(today, daysUntilFriday);
      const nextFriday = addDays(thisFriday, 7);

      const startDate = format(thisFriday, 'yyyy-MM-dd');
      const endDate = format(nextFriday, 'yyyy-MM-dd');

      console.log('Fetching weather for:', {
        location,
        startDate,
        endDate
      });

      const response = await axios.get(
        `${BASE_URL}/${encodeURIComponent(location)}/${startDate}/${endDate}`,
        {
          params: {
            unitGroup: 'us',
            include: 'hours',
            key: API_KEY,
            contentType: 'json',
            elements: 'datetime,temp,humidity,windspeed,conditions,hours'
          }
        }
      );

      if (!response.data || !response.data.days) {
        throw new WeatherAPIError('Invalid response from weather service', 500);
      }

      console.log('Raw API Response:', response.data);

      // Find the correct days in the response
      const currentDayData = response.data.days.find(day => 
        day.datetime === startDate
      );
      
      const nextWeekDayData = response.data.days.find(day => 
        day.datetime === endDate
      );

      if (!currentDayData || !nextWeekDayData) {
        throw new WeatherAPIError('Could not find weather data for the requested dates', 404);
      }

      const processedData = {
        location: response.data.resolvedAddress || location,
        currentWeather: processDay(currentDayData),
        nextWeekWeather: processDay(nextWeekDayData)
      };

      console.log('Processed Weather Data:', processedData);
      return processedData;

    } catch (error) {
      console.error('Weather API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new WeatherAPIError('Invalid API key. Please check your configuration.', 401);
          case 404:
            throw new WeatherAPIError('Location not found. Please check the location name.', 404);
          case 429:
            throw new WeatherAPIError('API rate limit exceeded. Please try again later.', 429);
          default:
            throw new WeatherAPIError(
              `Weather service error: ${error.response.data?.message || error.message || 'Unknown error'}`,
              error.response.status
            );
        }
      }
      throw new WeatherAPIError(error.message || 'Failed to fetch weather data', 500);
    }
  }
};