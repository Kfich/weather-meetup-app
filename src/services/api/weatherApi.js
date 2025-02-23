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

const validateWeatherData = (data) => {
  if (!data) throw new Error('No data received from API');
  if (!Array.isArray(data.days)) throw new Error('Weather data days not found');
  if (data.days.length === 0) throw new Error('No weather data days available');
  
  return true;
};

const processDay = (day) => {
  if (!day) {
    console.error('Invalid day data:', day);
    throw new Error('Invalid day data received');
  }

  return {
    date: day.datetime || format(new Date(), 'yyyy-MM-dd'),
    temperature: Math.round(day.temp || 0),
    humidity: Math.round(day.humidity || 0),
    windSpeed: Math.round(day.windspeed || 0),
    conditions: day.conditions || 'Unknown',
    icon: day.icon || 'unknown',
    description: getWeatherDescription(day.temp || 0, day.humidity || 0),
    hourlyForecast: Array.isArray(day.hours) 
      ? day.hours.map(hour => ({
          time: hour.datetime || '',
          temperature: Math.round(hour.temp || 0),
          humidity: Math.round(hour.humidity || 0),
          windSpeed: Math.round(hour.windspeed || 0),
          conditions: hour.conditions || 'Unknown'
        }))
      : []
  };
};

const getWeatherDescription = (temp, humidity) => {
  if (temp >= 60 && temp <= 75) return "Perfect for a meetup!";
  if (temp > 75) return "It might be hot, bring water!";
  if (temp < 60) return "It might be chilly, bring layers!";
  if (humidity > 75) return "High humidity, plan indoor activities";
  return "Check weather details";
};

export const weatherApi = {
  fetchWeatherData: async (location) => {
    if (!API_KEY) {
      throw new WeatherAPIError('API key is missing. Please check your environment variables.', 401);
    }

    try {
      // Calculate dates for this Friday and next Friday
      const today = new Date();
      const thisWeek = new Date();
      const nextWeek = addDays(today, 7);

      // Set to next Friday if we're past Friday this week
      const currentDay = today.getDay();
      const daysUntilFriday = (5 - currentDay + 7) % 7;
      thisWeek.setDate(today.getDate() + daysUntilFriday);

      const encodedLocation = encodeURIComponent(location);
      const startDate = format(thisWeek, 'yyyy-MM-dd');
      const endDate = format(nextWeek, 'yyyy-MM-dd');

      console.log('Fetching weather data:', {
        location: encodedLocation,
        startDate,
        endDate,
        url: `${BASE_URL}/${encodedLocation}/${startDate}/${endDate}`
      });

      const response = await axios.get(
        `${BASE_URL}/${encodedLocation}/${startDate}/${endDate}`,
        {
          params: {
            unitGroup: 'us',
            include: 'hours,current',
            key: API_KEY,
            contentType: 'json'
          }
        }
      );

      console.log('Raw API Response:', response.data);

      // Validate the response data
      validateWeatherData(response.data);

      // Process the data
      const weatherData = {
        location: response.data.resolvedAddress || location,
        timezone: response.data.timezone || 'Unknown',
        currentWeather: processDay(response.data.days[0]),
        nextWeekWeather: processDay(response.data.days[7] || response.data.days[response.data.days.length - 1])
      };

      console.log('Processed Weather Data:', weatherData);
      return weatherData;

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