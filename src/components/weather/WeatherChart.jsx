import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { useWeather } from '../../contexts/WeatherContext';

const LegendPanel = ({ activeLine, legendItems, minTemp, maxTemp }) => {
  return (
    <div className="h-full p-4 bg-white rounded-lg border-l border-gray-200">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Temperature Range</h3>
        <div className="space-y-2 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">High</span>
            <span className="font-medium text-gray-900">{maxTemp}°F</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Low</span>
            <span className="font-medium text-gray-900">{minTemp}°F</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Legend</h3>
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center mb-3">
            <span 
              className="w-3 h-3 mr-2"
              style={{ 
                backgroundColor: item.color,
                borderRadius: item.type === 'humidity' ? '50%' : '0'
              }}
            />
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>

      {activeLine && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">Details</h3>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-gray-500">Hour: </span>
              <span className="font-medium text-gray-700">{activeLine.hour}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">This Friday: </span>
              <span className="font-medium text-gray-700">{activeLine.currentTemp}°F</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Next Friday: </span>
              <span className="font-medium text-gray-700">{activeLine.nextWeekTemp}°F</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Current Humidity: </span>
              <span className="font-medium text-gray-700">{activeLine.currentHumidity}%</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Next Week Humidity: </span>
              <span className="font-medium text-gray-700">{activeLine.nextWeekHumidity}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WeatherChart = () => {
  const { state } = useWeather();
  const { currentWeather, nextWeekWeather, loading } = state;
  const [hoveredData, setHoveredData] = useState(null);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="h-[400px] animate-pulse bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (!currentWeather?.hourlyForecast || !nextWeekWeather?.hourlyForecast) {
    return null;
  }

  const processHourlyData = () => {
    const hours = Math.min(
      currentWeather.hourlyForecast.length,
      nextWeekWeather.hourlyForecast.length
    );

    return Array.from({ length: hours }).map((_, index) => ({
      hour: index,
      currentTemp: currentWeather.hourlyForecast[index]?.temperature,
      nextWeekTemp: nextWeekWeather.hourlyForecast[index]?.temperature,
      currentHumidity: currentWeather.hourlyForecast[index]?.humidity,
      nextWeekHumidity: nextWeekWeather.hourlyForecast[index]?.humidity
    }));
  };

  const data = processHourlyData();

  // Calculate min and max temperatures
  const allTemps = data.flatMap(d => [d.currentTemp, d.nextWeekTemp].filter(Boolean));
  const minTemp = Math.floor(Math.min(...allTemps));
  const maxTemp = Math.ceil(Math.max(...allTemps));

  const legendItems = [
    { name: 'This Friday Temp', color: '#0EA5E9', type: 'temperature' },
    { name: 'Next Friday Temp', color: '#8B5CF6', type: 'temperature' },
    { name: 'This Friday Humidity', color: '#F97316', type: 'humidity' },
    { name: 'Next Friday Humidity', color: '#22C55E', type: 'humidity' }
  ];

  const handleMouseMove = (e) => {
    if (e.activePayload) {
      setHoveredData(e.activePayload[0].payload);
    }
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        24-Hour Forecast Comparison
      </h2>
      <div className="flex">
        <div className="w-3/4 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="hour" 
                tick={{ fill: '#64748B' }}
                ticks={[0, 12, 24]}
                domain={[0, 24]}
              />
              <YAxis 
                yAxisId="temp"
                tick={{ fill: '#64748B' }}
                label={{ 
                  value: 'Temperature (°F)', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: '#64748B'
                }}
              />
              <YAxis 
                yAxisId="humidity"
                orientation="right"
                tick={{ fill: '#64748B' }}
                label={{ 
                  value: 'Humidity (%)', 
                  angle: 90, 
                  position: 'insideRight',
                  fill: '#64748B'
                }}
              />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="currentTemp"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: '#0EA5E9', strokeWidth: 2, fill: '#FFFFFF' }}
              />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="nextWeekTemp"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2, fill: '#FFFFFF' }}
              />
              <Line
                yAxisId="humidity"
                type="monotone"
                dataKey="currentHumidity"
                stroke="#F97316"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4, stroke: '#F97316', strokeWidth: 2, fill: '#FFFFFF' }}
              />
              <Line
                yAxisId="humidity"
                type="monotone"
                dataKey="nextWeekHumidity"
                stroke="#22C55E"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{ r: 4, stroke: '#22C55E', strokeWidth: 2, fill: '#FFFFFF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/4 pl-4">
          <LegendPanel 
            activeLine={hoveredData}
            legendItems={legendItems}
            minTemp={minTemp}
            maxTemp={maxTemp}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;