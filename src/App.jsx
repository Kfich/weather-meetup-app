
import React from 'react';
import { WeatherProvider } from './contexts/WeatherContext';
import Layout from './components/layout/Layout';
import WeatherDashboard from './components/weather/WeatherDashboard';

const App = () => {
  return (
    <WeatherProvider>
      <Layout>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Weather Meetup Planner
          </h1>
          <p className="mt-2 text-gray-600">
          Compare weather conditions between this Friday and next Friday to make the best 
          plans for your outdoor meetup. Set your location to see temperature, 
          humidity, and wind conditions.
          </p>
        </header>
        <WeatherDashboard />
      </Layout>
    </WeatherProvider>
  );
};

export default App;

