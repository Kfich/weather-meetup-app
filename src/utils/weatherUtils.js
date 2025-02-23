
import { Cloud, Sun, CloudRain, Wind, CloudLightning } from 'lucide-react';

export const getWeatherIcon = (condition) => {
  const conditions = condition.toLowerCase();
  
  if (conditions.includes('rain')) {
    return <CloudRain className="h-6 w-6 text-blue-500" />;
  }
  if (conditions.includes('cloud')) {
    return <Cloud className="h-6 w-6 text-gray-500" />;
  }
  if (conditions.includes('thunder') || conditions.includes('storm')) {
    return <CloudLightning className="h-6 w-6 text-yellow-500" />;
  }
  if (conditions.includes('wind')) {
    return <Wind className="h-6 w-6 text-gray-500" />;
  }
  return <Sun className="h-6 w-6 text-yellow-500" />;
};
