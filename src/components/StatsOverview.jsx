import React from 'react';
import { TrendingUp } from 'lucide-react';
import { calculateAttendanceStats } from '../utils/calculations';

export const StatsOverview = ({ courses, attendance }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <TrendingUp className="text-indigo-600" />
        Overall Statistics
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {courses.map(course => {
          const stats = calculateAttendanceStats(attendance, course.code);
          const isLow = parseFloat(stats.percentage) < course.required;
          
          return (
            <div key={course.code} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`text-2xl font-bold ${
                isLow ? 'text-red-600' : 'text-indigo-600'
              }`}>
                {stats.percentage}%
              </div>
              <div className="text-sm text-gray-600 mt-1">{course.code}</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.present}/{stats.total}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};