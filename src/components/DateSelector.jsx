import React from 'react';
import { Calendar } from 'lucide-react';

export const DateSelector = ({ selectedDate, onDateChange }) => {
  return (
    <div className="flex items-center gap-3">
      <Calendar className="text-indigo-600" size={24} />
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="px-4 py-2 border-2 border-indigo-200 rounded-lg focus:outline-none focus:border-indigo-500 text-gray-700"
      />
    </div>
  );
};