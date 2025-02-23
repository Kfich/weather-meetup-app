import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle,
  Wind,
  Thermometer
} from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';

const WeatherSummary = () => {
  const { state } = useWeather();
  const { currentWeather } = state;

  if (!currentWeather) return null;

  const getWeatherIcon = (conditions, temperature) => {
    const condition = conditions?.toLowerCase() || '';
    const iconClass = "w-12 h-12";

    if (condition.includes('thunder') || condition.includes('storm')) {
      return <CloudLightning className={`${iconClass} text-purple-500`} />;
    }
    if (condition.includes('rain') && condition.includes('heavy')) {
      return <CloudRain className={`${iconClass} text-blue-600`} />;
    }
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudDrizzle className={`${iconClass} text-blue-400`} />;
    }
    if (condition.includes('snow')) {
      return <CloudSnow className={`${iconClass} text-sky-400`} />;
    }
    if (condition.includes('wind')) {
      return <Wind className={`${iconClass} text-gray-500`} />;
    }
    if (condition.includes('cloud')) {
      return <Cloud className={`${iconClass} text-gray-400`} />;
    }
    if (temperature >= 85) {
      return <Thermometer className={`${iconClass} text-red-500`} />;
    }
    return <Sun className={`${iconClass} text-yellow-500`} />;
  };

  const getWeatherSummary = (conditions, temperature, humidity) => {
    const condition = conditions?.toLowerCase() || '';

    if (temperature >= 85) {
      return "Hot weather expected";
    }
    if (temperature <= 45) {
      return "Cold conditions ahead";
    }
    if (humidity >= 80) {
      return "High humidity levels";
    }
    if (condition.includes('thunder') || condition.includes('storm')) {
      return "Stormy conditions expected";
    }
    if (condition.includes('rain') && condition.includes('heavy')) {
      return "Heavy rain expected";
    }
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return "Rain in the forecast";
    }
    if (condition.includes('snow')) {
      return "Snow expected";
    }
    if (condition.includes('wind')) {
      return "Windy conditions";
    }
    if (condition.includes('cloud')) {
      return "Cloudy skies ahead";
    }
    if (temperature >= 65 && temperature <= 80) {
      return "Pleasant conditions expected";
    }
    return "Clear conditions ahead";
  };

  const getBackgroundColor = (conditions, temperature) => {
    const condition = conditions?.toLowerCase() || '';

    if (temperature >= 85) {
      return 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-100';
    }
    if (temperature <= 45) {
      return 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100';
    }
    if (condition.includes('thunder') || condition.includes('storm')) {
      return 'bg-gradient-to-r from-purple-50 to-slate-50 border-purple-100';
    }
    if (condition.includes('rain')) {
      return 'bg-gradient-to-r from-blue-50 to-slate-50 border-blue-100';
    }
    if (condition.includes('snow')) {
      return 'bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-100';
    }
    if (condition.includes('cloud')) {
      return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-100';
    }
    return 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-100';
  };

  const summary = getWeatherSummary(
    currentWeather.conditions, 
    currentWeather.temperature, 
    currentWeather.humidity
  );

  const backgroundColor = getBackgroundColor(
    currentWeather.conditions, 
    currentWeather.temperature
  );

  return (
    <div className={`${backgroundColor} rounded-xl border p-4 shadow-sm flex items-center gap-4`}>
      {getWeatherIcon(currentWeather.conditions, currentWeather.temperature)}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{summary}</h3>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-gray-600">
            {Math.round(currentWeather.temperature)}°F
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">
            {Math.round(currentWeather.humidity)}% humidity
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">
            {Math.round(currentWeather.windSpeed)} mph wind
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeatherSummary;