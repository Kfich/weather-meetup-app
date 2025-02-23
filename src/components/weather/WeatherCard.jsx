import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle,
  Wind,
  Droplets
} from 'lucide-react';

const WeatherCard = ({ title, weather }) => {
  if (!weather) return null;

  const getWeatherStyles = (conditions, temperature) => {
    const condition = conditions?.toLowerCase() || '';
    
    if (condition.includes('thunder') || condition.includes('storm')) {
      return {
        container: 'bg-gradient-to-br from-purple-50 to-slate-100 border-purple-100',
        text: 'text-purple-900',
        subText: 'text-purple-800',
        icon: 'text-purple-500'
      };
    }
    if (condition.includes('heavy rain')) {
      return {
        container: 'bg-gradient-to-br from-blue-100 to-slate-100 border-blue-200',
        text: 'text-blue-900',
        subText: 'text-blue-800',
        icon: 'text-blue-600'
      };
    }
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return {
        container: 'bg-gradient-to-br from-blue-50 to-slate-100 border-blue-100',
        text: 'text-blue-900',
        subText: 'text-blue-800',
        icon: 'text-blue-500'
      };
    }
    if (condition.includes('snow')) {
      return {
        container: 'bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-100',
        text: 'text-sky-900',
        subText: 'text-sky-800',
        icon: 'text-sky-500'
      };
    }
    if (condition.includes('cloud')) {
      return {
        container: 'bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200',
        text: 'text-gray-900',
        subText: 'text-gray-700',
        icon: 'text-gray-500'
      };
    }
    if (temperature >= 85) {
      return {
        container: 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-100',
        text: 'text-orange-900',
        subText: 'text-orange-800',
        icon: 'text-orange-500'
      };
    }
    // Default sunny/clear conditions
    return {
      container: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-100',
      text: 'text-yellow-900',
      subText: 'text-yellow-800',
      icon: 'text-yellow-500'
    };
  };

  const getWeatherIcon = (conditions, temperature) => {
    const condition = conditions?.toLowerCase() || '';
    const iconClass = "w-8 h-8";
    const styles = getWeatherStyles(conditions, temperature);

    if (condition.includes('thunder') || condition.includes('storm')) {
      return <CloudLightning className={`${iconClass} ${styles.icon}`} />;
    }
    if (condition.includes('heavy rain')) {
      return <CloudRain className={`${iconClass} ${styles.icon}`} />;
    }
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudDrizzle className={`${iconClass} ${styles.icon}`} />;
    }
    if (condition.includes('snow')) {
      return <CloudSnow className={`${iconClass} ${styles.icon}`} />;
    }
    if (condition.includes('wind')) {
      return <Wind className={`${iconClass} ${styles.icon}`} />;
    }
    if (condition.includes('cloud')) {
      return <Cloud className={`${iconClass} ${styles.icon}`} />;
    }
    return <Sun className={`${iconClass} ${styles.icon}`} />;
  };

  const getPrecipitationInfo = (conditions) => {
    const condition = conditions?.toLowerCase() || '';
    let precipProb = 0;

    if (condition.includes('heavy rain') || condition.includes('storm')) {
      precipProb = 90;
    } else if (condition.includes('rain')) {
      precipProb = 70;
    } else if (condition.includes('drizzle')) {
      precipProb = 50;
    } else if (condition.includes('cloud')) {
      precipProb = 30;
    }

    return {
      probability: precipProb,
      style: precipProb >= 70 ? 'bg-white/50 backdrop-blur-sm' : 'bg-white/30 backdrop-blur-sm'
    };
  };

  const styles = getWeatherStyles(weather.conditions, weather.temperature);
  const precipInfo = getPrecipitationInfo(weather.conditions);

  return (
    <div className={`backdrop-blur-sm rounded-lg shadow-sm p-6 border transition-all ${styles.container}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-semibold ${styles.text}`}>{title}</h3>
        {getWeatherIcon(weather.conditions, weather.temperature)}
      </div>
      
      <div className="space-y-4">
        <div>
          <div className={`text-3xl font-bold ${styles.text}`}>
            {Math.round(weather.temperature)}°F
          </div>
          <div className={styles.subText}>
            {weather.conditions}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className={`text-sm ${styles.subText} opacity-80`}>Humidity</div>
            <div className={`text-lg font-medium ${styles.text}`}>
              {weather.humidity}%
            </div>
          </div>
          <div>
            <div className={`text-sm ${styles.subText} opacity-80`}>Wind</div>
            <div className={`text-lg font-medium ${styles.text}`}>
              {weather.windSpeed} mph
            </div>
          </div>
        </div>

        {/* Precipitation Probability */}
        {precipInfo.probability > 0 && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${precipInfo.style}`}>
            <Droplets className={`w-4 h-4 ${styles.icon}`} />
            <span className={`text-sm font-medium ${styles.text}`}>
              {precipInfo.probability}% chance of rain
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;