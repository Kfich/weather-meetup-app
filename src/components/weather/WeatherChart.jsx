import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  Thermometer, 
  Droplets, 
  Clock,
  CalendarDays,
  ArrowRight
} from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';

const LegendItem = ({ color, name, value, icon: Icon, type = 'line' }) => (
  <div className="flex items-center p-2 rounded-lg transition-colors hover:bg-white/50">
    <div className="flex items-center gap-3 flex-1">
      <Icon className="w-5 h-5" style={{ color }} />
      <div 
        className={`w-8 h-${type === 'line' ? '0.5' : '3'}`}
        style={{ 
          backgroundColor: color,
          borderRadius: type === 'dot' ? '9999px' : '0'
        }}
      />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">{name}</span>
        {value !== undefined && (
          <span className="text-sm font-bold" style={{ color }}>
            {value}{name.includes('Humidity') ? '%' : '°F'}
          </span>
        )}
      </div>
    </div>
  </div>
);

const WeatherChart = () => {
  const { state } = useWeather();
  const { currentWeather, nextWeekWeather, loading } = state;
  const [hoveredData, setHoveredData] = useState(null);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
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

  const handleMouseMove = (e) => {
    if (e.activePayload) {
      setHoveredData(e.activePayload[0].payload);
    }
  };

  const handleMouseLeave = () => {
    setHoveredData(null);
  };

  // Find min and max temperatures for reference lines
  const allTemps = data.flatMap(d => [d.currentTemp, d.nextWeekTemp].filter(Boolean));
  const minTemp = Math.floor(Math.min(...allTemps));
  const maxTemp = Math.ceil(Math.max(...allTemps));

  // Custom X Axis Ticks
  const customXAxisTicks = [0, 12, 24];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 md:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Forecast Comparison
      </h2>
      
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Chart Section */}
        <div className="w-full md:w-3/4 h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
                opacity={0.5}
              />
              
              <XAxis
                dataKey="hour"
                tick={{ fill: '#64748B' }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={{ stroke: '#CBD5E1' }}
                ticks={customXAxisTicks}
                domain={[0, 24]}
              />
              
              <YAxis
                yAxisId="temp"
                tick={{ fill: '#64748B' }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={{ stroke: '#CBD5E1' }}
                label={{
                  value: 'Temperature (°F)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#64748B',
                  offset: 10
                }}
              />
              
              <YAxis
                yAxisId="humidity"
                orientation="right"
                tick={{ fill: '#64748B' }}
                axisLine={{ stroke: '#CBD5E1' }}
                tickLine={{ stroke: '#CBD5E1' }}
                label={{
                  value: 'Humidity (%)',
                  angle: 90,
                  position: 'insideRight',
                  fill: '#64748B',
                  offset: 10
                }}
              />

              <ReferenceLine
                y={minTemp}
                yAxisId="temp"
                stroke="#94A3B8"
                strokeDasharray="3 3"
                label={{
                  value: `Min: ${minTemp}°F`,
                  fill: '#64748B',
                  position: 'insideBottomLeft'
                }}
              />
              
              <ReferenceLine
                y={maxTemp}
                yAxisId="temp"
                stroke="#94A3B8"
                strokeDasharray="3 3"
                label={{
                  value: `Max: ${maxTemp}°F`,
                  fill: '#64748B',
                  position: 'insideTopLeft'
                }}
              />

              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="currentTemp"
                stroke="#0EA5E9"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  stroke: '#0EA5E9',
                  strokeWidth: 2,
                  fill: '#FFFFFF'
                }}
                name="This Friday Temp"
              />
              
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="nextWeekTemp"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={false}
                activeDot={{
                  r: 6,
                  stroke: '#8B5CF6',
                  strokeWidth: 2,
                  fill: '#FFFFFF'
                }}
                name="Next Friday Temp"
              />
              
              <Line
                yAxisId="humidity"
                type="monotone"
                dataKey="currentHumidity"
                stroke="#F97316"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: '#F97316',
                  strokeWidth: 2,
                  fill: '#FFFFFF'
                }}
                name="This Friday Humidity"
              />
              
              <Line
                yAxisId="humidity"
                type="monotone"
                dataKey="nextWeekHumidity"
                stroke="#22C55E"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: '#22C55E',
                  strokeWidth: 2,
                  fill: '#FFFFFF'
                }}
                name="Next Friday Humidity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend Panel */}
        <div className="w-full md:w-1/4 bg-gray-50/50 backdrop-blur-sm rounded-lg p-4">
          {/* This Friday Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-500">This Friday</h3>
            </div>
            <div className="space-y-2">
              <LegendItem
                color="#0EA5E9"
                name="Temperature"
                value={hoveredData?.currentTemp}
                icon={Thermometer}
              />
              <LegendItem
                color="#F97316"
                name="Humidity"
                value={hoveredData?.currentHumidity}
                icon={Droplets}
              />
            </div>
          </div>

          {/* Next Friday Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-500">Next Friday</h3>
            </div>
            <div className="space-y-2">
              <LegendItem
                color="#8B5CF6"
                name="Temperature"
                value={hoveredData?.nextWeekTemp}
                icon={Thermometer}
              />
              <LegendItem
                color="#22C55E"
                name="Humidity"
                value={hoveredData?.nextWeekHumidity}
                icon={Droplets}
              />
            </div>
          </div>

          {/* Time Indicator */}
          {hoveredData && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Current Time</span>
              </div>
              <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-white/50 rounded-lg">
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="text-lg font-semibold text-gray-700">
                  {hoveredData.hour}:00
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;
