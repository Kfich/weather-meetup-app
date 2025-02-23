
import React from 'react';
import { MapPin } from 'lucide-react';
import { useWeatherData } from '../../hooks/useWeatherData';

const LocationDisplay = () => {
  const { currentLocation, isLoading } = useWeatherData();

  if (isLoading) return null;

  return (
    <div className="flex items-center text-gray-700 dark:text-gray-300">
      <MapPin className="mr-2" size={20} />
      <span className="font-medium">
        {currentLocation?.name || 'No location selected'}
      </span>
    </div>
  );
};

export default LocationDisplay;