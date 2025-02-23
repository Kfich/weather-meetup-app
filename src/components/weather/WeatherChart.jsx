import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useWeather } from '../../contexts/WeatherContext';

const WeatherChart = () => {
  const { state } = useWeather();
  const { currentWeather, nextWeekWeather, loading } = state;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="h-[400px] animate-pulse bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (!currentWeather?.hourlyForecast || !nextWeekWeather?.hourlyForecast) {
    return null;
  }

  // Process data for the chart
  const processHourlyData = () => {
    // Ensure we have equal number of hours for comparison
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

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        24-Hour Forecast Comparison
      </h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="hour" 
              tick={{ fill: '#64748B' }}
              label={{ value: 'Hour', position: 'bottom', fill: '#64748B' }}
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
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E2E8F0',
                borderRadius: '6px'
              }}
            />
            <Legend />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="currentTemp"
              stroke="#0EA5E9"
              name="This Friday Temp"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="nextWeekTemp"
              stroke="#8B5CF6"
              name="Next Friday Temp"
              strokeWidth={2}
              dot={false}
            />
            <Line
              yAxisId="humidity"
              type="monotone"
              dataKey="currentHumidity"
              stroke="#F97316"
              name="This Friday Humidity"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
            <Line
              yAxisId="humidity"
              type="monotone"
              dataKey="nextWeekHumidity"
              stroke="#22C55E"
              name="Next Friday Humidity"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherChart;