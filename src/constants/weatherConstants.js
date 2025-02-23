export const WEATHER_CONDITIONS = {
  SUNNY: "sunny",
  CLOUDY: "cloudy",
  RAINY: "rain",
  STORMY: "thunder",
  WINDY: "wind",
};

export const TEMPERATURE_RANGES = {
  COLD: { min: -Infinity, max: 59, message: "Cold - consider indoor backup" },
  NICE: { min: 60, max: 75, message: "Perfect for outdoor activities" },
  WARM: { min: 76, max: Infinity, message: "Warm - bring water and shade" },
};

export const HUMIDITY_RANGES = {
  LOW: { min: 0, max: 24, message: "Low humidity" },
  MODERATE: { min: 25, max: 75, message: "Comfortable humidity" },
  HIGH: { min: 76, max: 100, message: "High humidity - plan accordingly" },
};
