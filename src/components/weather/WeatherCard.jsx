
import React from 'react';
import { Sun, Cloud, CloudRain, Wind, CloudLightning, Snowflake, CloudDrizzle } from 'lucide-react';

const WeatherCard = ({ title, weather }) => {
  if (!weather) {
    console.log('No weather data provided to WeatherCard');
    return null;
  }

  const getWeatherStyles = (conditions, temperature, humidity) => {
    const baseStyle = "rounded-lg shadow-sm p-6 transition-colors duration-300";
    const condition = conditions?.toLowerCase() || '';

    // Heavy Rain or Storms
    if (condition.includes('heavy rain') || condition.includes('storm')) {
      return {
        containerStyle: `${baseStyle} bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600`,
        textColor: "text-gray-100",
        subTextColor: "text-gray-300",
        labelColor: "text-gray-400"
      };
    }

    // Light Rain or Drizzle
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return {
        containerStyle: `${baseStyle} bg-gradient-to-br from-slate-500 to-slate-600 border border-slate-400`,
        textColor: "text-gray-100",
        subTextColor: "text-gray-200",
        labelColor: "text-gray-300"
      };
    }

    // Cloudy
    if (condition.includes('cloud') || condition.includes('overcast')) {
      return {
        containerStyle: `${baseStyle} bg-gradient-to-br from-gray-200 to-slate-300 border border-gray-300`,
        textColor: "text-gray-800",
        subTextColor: "text-gray-700",
        labelColor: "text-gray-600"
      };
    }

    // Clear and Hot (85°F+)
    if (temperature >= 85 && (condition.includes('clear') || condition.includes('sun'))) {
      return {
        containerStyle: `${baseStyle} bg-gradient-to-br from-orange-400 to-amber-500 border border-orange-300`,
        textColor: "text-white",
        subTextColor: "text-orange-100",
        labelColor: "text-orange-200"
      };
    }

    // Clear and Warm
    if (condition.includes('clear') || condition.includes('sun')) {
      return {
        containerStyle: `${baseStyle} bg-gradient-to-br from-blue-400 to-cyan-500 border border-blue-300`,
        textColor: "text-white",
        subTextColor: "text-blue-100",
        labelColor: "text-blue-200"
      };
    }

    // High Humidity
    if (humidity > 80) {
      return {
        containerStyle: `${baseStyle} bg-gradient-to-br from-emerald-500 to-teal-600 border border-emerald-400`,
        textColor: "text-white",
        subTextColor: "text-emerald-100",
        labelColor: "text-emerald-200"
      };
    }

    // Default - Mild conditions
    return {
      containerStyle: `${baseStyle} bg-gradient-to-br from-sky-400 to-indigo-500 border border-sky-300`,
      textColor: "text-white",
      subTextColor: "text-blue-100",
      labelColor: "text-blue-200"
    };
  };

  const getWeatherIcon = (conditions) => {
    const condition = conditions?.toLowerCase() || '';
    const iconClass = "w-10 h-10";

    if (condition.includes('heavy rain') || condition.includes('storm')) {
      return <CloudLightning className={`${iconClass} text-yellow-300`} />;
    }
    if (condition.includes('rain')) {
      return <CloudRain className={`${iconClass} text-blue-200`} />;
    }
    if (condition.includes('drizzle')) {
      return <CloudDrizzle className={`${iconClass} text-blue-200`} />;
    }
    if (condition.includes('snow')) {
      return <Snowflake className={`${iconClass} text-white`} />;
    }
    if (condition.includes('cloud')) {
      return <Cloud className={`${iconClass} text-gray-200`} />;
    }
    if (condition.includes('wind')) {
      return <Wind className={`${iconClass} text-gray-200`} />;
    }
    return <Sun className={`${iconClass} text-yellow-300`} />;
  };

  const styles = getWeatherStyles(weather.conditions, weather.temperature, weather.humidity);

  return (
    <div className={styles.containerStyle}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-semibold ${styles.textColor}`}>
          {title}
        </h3>
        {getWeatherIcon(weather.conditions)}
      </div>
      
      <div className="space-y-4">
        <div>
          <div className={`text-4xl font-bold ${styles.textColor}`}>
            {Math.round(weather.temperature)}°F
          </div>
          <div className={`text-lg ${styles.subTextColor}`}>
            {weather.conditions || 'Clear'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <div className={`text-sm ${styles.labelColor}`}>Humidity</div>
            <div className={`text-lg font-medium ${styles.subTextColor}`}>
              {weather.humidity}%
            </div>
          </div>
          <div>
            <div className={`text-sm ${styles.labelColor}`}>Wind</div>
            <div className={`text-lg font-medium ${styles.subTextColor}`}>
              {weather.windSpeed} mph
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
