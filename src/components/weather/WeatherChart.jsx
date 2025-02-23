import React from 'react';
import { format, parse } from 'date-fns';
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
  const { currentWeather, nextWeekWeather } = state;

  // Custom colors
  const colors = {
    currentTemp: '#0ea5e9', // Blue
    nextWeekTemp: '#8b5cf6', // Purple
    currentHumidity: '#f97316', // Orange
    nextWeekHumidity: '#22c55e', // Green
    grid: '#e2e8f0', // Light gray
    text: '#64748b', // Slate gray
    tooltip: {
      bg: 'rgba(255, 255, 255, 0.95)',
      border: '#e2e8f0'
    }
  };

  // Custom tooltip styles
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-2">{label}</p>
          {payload.map((item, index) => (
            <p 
              key={index} 
              className="text-sm"
              style={{ color: item.stroke }}
            >
              {item.name}: {item.value}
              {item.name.includes('Temp') ? '°F' : '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const formatHour = (timeString) => {
    try {
      const time = parse(timeString, 'HH:mm:ss', new Date());
      return format(time, 'ha');
    } catch (error) {
      console.error('Error parsing time:', timeString, error);
      return timeString;
    }
  };

  const formatChartData = () => {
    if (!currentWeather?.hourlyForecast || !nextWeekWeather?.hourlyForecast) {
      return [];
    }

    return currentWeather.hourlyForecast.slice(0, 24).map((hour, index) => ({
      hour: formatHour(hour.time),
      currentTemp: hour.temperature,
      currentHumidity: hour.humidity,
      nextWeekTemp: nextWeekWeather.hourlyForecast[index]?.temperature,
      nextWeekHumidity: nextWeekWeather.hourlyForecast[index]?.humidity
    }));
  };

  const data = formatChartData();

  if (data.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No weather data available for the chart.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        24-Hour Weather Comparison
      </h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={colors.grid}
              vertical={false}
            />
            <XAxis 
              dataKey="hour" 
              tick={{ fill: colors.text }}
              axisLine={{ stroke: colors.grid }}
              tickLine={{ stroke: colors.grid }}
            />
            <YAxis 
              yAxisId="temp"
              tick={{ fill: colors.text }}
              axisLine={{ stroke: colors.grid }}
              tickLine={{ stroke: colors.grid }}
              label={{ 
                value: 'Temperature (°F)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: colors.text }
              }}
            />
            <YAxis 
              yAxisId="humidity"
              orientation="right"
              tick={{ fill: colors.text }}
              axisLine={{ stroke: colors.grid }}
              tickLine={{ stroke: colors.grid }}
              label={{ 
                value: 'Humidity (%)', 
                angle: 90, 
                position: 'insideRight',
                style: { fill: colors.text }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px'
              }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="currentTemp"
              stroke={colors.currentTemp}
              name="This Friday Temp"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="nextWeekTemp"
              stroke={colors.nextWeekTemp}
              name="Next Friday Temp"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
            />
            <Line
              yAxisId="humidity"
              type="monotone"
              dataKey="currentHumidity"
              stroke={colors.currentHumidity}
              name="This Friday Humidity"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
            />
            <Line
              yAxisId="humidity"
              type="monotone"
              dataKey="nextWeekHumidity"
              stroke={colors.nextWeekHumidity}
              name="Next Friday Humidity"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
              activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherChart;