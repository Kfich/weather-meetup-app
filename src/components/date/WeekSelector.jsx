
import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { format, addWeeks, startOfWeek, endOfWeek } from 'date-fns';

const WeekSelector = ({ currentDate, onDateChange }) => {
  const formatWeekRange = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Start from Monday
    const end = endOfWeek(date, { weekStartsOn: 1 }); // End on Sunday
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  };

  const handlePreviousWeek = () => {
    onDateChange(addWeeks(currentDate, -1));
  };

  const handleNextWeek = () => {
    onDateChange(addWeeks(currentDate, 1));
  };

  return (
    <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-xl shadow-sm p-4 mb-6">
      <button
        onClick={handlePreviousWeek}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-600" />
        <span className="text-gray-700 font-medium">
          {formatWeekRange(currentDate)}
        </span>
      </div>

      <button
        onClick={handleNextWeek}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default WeekSelector;