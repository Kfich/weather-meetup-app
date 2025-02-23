export const formatUtils = {
  temperature: (temp) => `${Math.round(temp)}°F`,
  windSpeed: (speed) => `${Math.round(speed)} mph`,
  humidity: (humidity) => `${Math.round(humidity)}%`,

  getTemperatureClass: (temp) => {
    if (temp < 60) return "text-blue-500";
    if (temp > 75) return "text-red-500";
    return "text-green-500";
  },
};
