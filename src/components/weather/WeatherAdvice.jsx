
import React from 'react';
import { Sun, Cloud, Umbrella, Home, Tent } from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';

const WeatherAdvice = () => {
  const { state } = useWeather();
  const { currentWeather, nextWeekWeather } = state;

  if (!currentWeather || !nextWeekWeather) return null;

  const analyzeWeather = (weather) => {
    const score = {
      temperature: 0,
      conditions: 0,
      humidity: 0,
      windSpeed: 0
    };

    // Temperature analysis (ideal range: 65-80°F)
    const temp = weather.temperature;
    if (temp >= 65 && temp <= 80) score.temperature = 2;
    else if (temp >= 55 && temp <= 85) score.temperature = 1;
    else score.temperature = 0;

    // Conditions analysis
    const conditions = weather.conditions.toLowerCase();
    if (conditions.includes('clear') || conditions.includes('sun')) score.conditions = 2;
    else if (conditions.includes('cloud')) score.conditions = 1;
    else if (conditions.includes('rain') || conditions.includes('storm')) score.conditions = 0;

    // Humidity analysis (ideal < 65%)
    if (weather.humidity < 65) score.humidity = 2;
    else if (weather.humidity < 80) score.humidity = 1;
    else score.humidity = 0;

    // Wind speed analysis (ideal < 15 mph)
    if (weather.windSpeed < 10) score.windSpeed = 2;
    else if (weather.windSpeed < 15) score.windSpeed = 1;
    else score.windSpeed = 0;

    return {
      total: Object.values(score).reduce((a, b) => a + b, 0),
      isGood: Object.values(score).reduce((a, b) => a + b, 0) >= 6
    };
  };

  const currentAnalysis = analyzeWeather(currentWeather);
  const nextWeekAnalysis = analyzeWeather(nextWeekWeather);

  const getBetterDay = () => {
    if (currentAnalysis.total > nextWeekAnalysis.total) return 'this';
    if (nextWeekAnalysis.total > currentAnalysis.total) return 'next';
    return 'either';
  };

  const getActivitySuggestions = (isGoodWeather) => {
    if (isGoodWeather) {
      return [
        'Park picnic',
        'Sports activities',
        'Walking tour',
        'Outdoor games',
        'Garden party'
      ];
    }
    return [
      'Board games café',
      'Indoor sports center',
      'Museum visit',
      'Movie screening',
      'Indoor potluck'
    ];
  };

  const betterDay = getBetterDay();
  const shouldBeOutdoors = betterDay === 'this' ? currentAnalysis.isGood : nextWeekAnalysis.isGood;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Meetup Recommendations</h2>
        {shouldBeOutdoors ? (
          <Tent className="w-6 h-6 text-green-500" />
        ) : (
          <Home className="w-6 h-6 text-blue-500" />
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-lg font-medium text-gray-800">
            Recommended day: {betterDay === 'either' ? 'Either Friday' : `${betterDay === 'this' ? 'This' : 'Next'} Friday`}
          </div>
        </div>
        <div className="text-gray-600">
          {shouldBeOutdoors ? (
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-500" />
              <span>Great conditions for outdoor activities!</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Umbrella className="w-5 h-5 text-blue-500" />
              <span>Indoor activities recommended</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium text-gray-700 mb-3">Suggested Activities:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getActivitySuggestions(shouldBeOutdoors).map((activity, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
            >
              {shouldBeOutdoors ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Home className="w-4 h-4 text-blue-500" />
              )}
              <span className="text-gray-700">{activity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4" />
          <span>Tip: Keep an eye on the forecast as the date approaches</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherAdvice;