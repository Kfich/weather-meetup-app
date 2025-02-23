
import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle 
} from 'lucide-react';
import { WEATHER_CONDITIONS } from '../../constants/weatherConditions';

const WeatherIcon = ({ 
  condition, 
  size = 48, 
  className = '' 
}) => {
  const iconProps = {
    size,
    className: `text-gray-600 dark:text-gray-300 ${className}`
  };

  const iconMap = {
    [WEATHER_CONDITIONS.CLEAR.icon]: <Sun {...iconProps} />,
    [WEATHER_CONDITIONS.PARTLY_CLOUDY.icon]: <Cloud {...iconProps} />,
    [WEATHER_CONDITIONS.CLOUDY.icon]: <Cloud {...iconProps} />,
    [WEATHER_CONDITIONS.RAIN.icon]: <CloudRain {...iconProps} />,
    [WEATHER_CONDITIONS.THUNDERSTORM.icon]: <CloudLightning {...iconProps} />,
    [WEATHER_CONDITIONS.SNOW.icon]: <CloudSnow {...iconProps} />
  };

  return iconMap[condition] || <CloudDrizzle {...iconProps} />;
};

export default WeatherIcon;