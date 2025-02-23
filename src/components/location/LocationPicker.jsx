import React, { useState } from 'react';
import { useWeather } from '../../contexts/WeatherContext';

const LocationPicker = () => {
  const [location, setLocation] = useState('');
  const { dispatch } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOCATION', payload: location });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="location"
            id="location"
            className="input"
            placeholder="Enter city name or zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="submit"
            className="ml-3 btn btn-primary"
          >
            Set Location
          </button>
        </div>
      </div>
    </form>
  );
};

export default LocationPicker;