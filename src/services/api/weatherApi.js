import axios from 'axios';
import { format, startOfWeek, endOfWeek } from 'date-fns';

const API_KEY = process.env.REACT_APP_VISUAL_CROSSING_API_KEY;
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const processDay = (day) => {
  if (!day) return null;

  return {
    date: day.datetime,
    temperature: Math.round(day.temp),
    humidity: Math.round(day.humidity),
    windSpeed: Math.round(day.windspeed),
    conditions: day.conditions || 'Clear',
    precipprob: day.precipprob || 0,
    hourlyForecast: (day.hours || []).map(hour => ({
      time: hour.datetime,
      temperature: Math.round(hour.temp),
      humidity: Math.round(hour.humidity),
      windSpeed: Math.round(hour.windspeed),
      conditions: hour.conditions,
      precipprob: hour.precipprob || 0
    }))
  };
};

export const weatherApi = {
  fetchWeatherData: async (location, selectedDate = new Date()) => {
    if (!API_KEY) {
      throw new Error('API key is missing. Please check your environment variables.');
    }

    try {
      // Calculate the week range for the selected date
      const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start from Monday
      const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 }); // End on Sunday

      const startDate = format(weekStart, 'yyyy-MM-dd');
      const endDate = format(weekEnd, 'yyyy-MM-dd');

      console.log('Fetching weather data:', {
        location,
        startDate,
        endDate,
        selectedDate: format(selectedDate, 'yyyy-MM-dd')
      });

      const response = await axios.get(
        `${BASE_URL}/${encodeURIComponent(location)}/${startDate}/${endDate}`,
        {
          params: {
            unitGroup: 'us',
            include: 'hours,current',
            key: API_KEY,
            contentType: 'json'
          }
        }
      );

      if (!response.data || !response.data.days) {
        throw new Error('Invalid response from weather service');
      }

      // Find the weekdays in the response
      const weekData = response.data.days.map(processDay);

      return {
        location: {
          fullAddress: response.data.resolvedAddress,
          address: response.data.address,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
          timezone: response.data.timezone
        },
        currentWeather: weekData[0],
        nextWeekWeather: weekData[weekData.length - 1],
        weekData: weekData,
        dateRange: {
          start: startDate,
          end: endDate,
          selected: format(selectedDate, 'yyyy-MM-dd')
        }
      };

    } catch (error) {
      console.error('Weather API Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });

      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error('Invalid API key. Please check your configuration.');
          case 404:
            throw new Error('Location not found. Please check the location name.');
          case 429:
            throw new Error('API rate limit exceeded. Please try again later.');
          default:
            throw new Error(
              `Weather service error: ${error.response.data?.message || error.message || 'Unknown error'}`
            );
        }
      }
      throw new Error(error.message || 'Failed to fetch weather data');
    }
  }
};