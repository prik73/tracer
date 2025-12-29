import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { calculateAttendanceStats, isAttendanceLow } from '../utils/calculations';

export const QuickStats = ({ courses, attendance }) => {
  const lowAttendanceCourses = courses.filter(course => {
    const stats = calculateAttendanceStats(attendance, course.code);
    return isAttendanceLow(stats.percentage, course.required);
  });

  const overallStats = courses.map(course => {
    const stats = calculateAttendanceStats(attendance, course.code);
    return { present: stats.present, total: stats.total };
  }).reduce((acc, curr) => ({
    present: acc.present + curr.present,
    total: acc.total + curr.total
  }), { present: 0, total: 0 });

  const overallPercentage = overallStats.total > 0 
    ? ((overallStats.present / overallStats.total) * 100).toFixed(1) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Overall</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{overallPercentage}%</p>
            <p className="text-xs text-gray-500 mt-1">
              {overallStats.present}/{overallStats.total} classes
            </p>
          </div>
          <TrendingUp className="text-indigo-600" size={32} />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total Courses</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{courses.length}</p>
            <p className="text-xs text-gray-500 mt-1">Being tracked</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Low Attendance</p>
            <p className={`text-2xl font-bold mt-1 ${
              lowAttendanceCourses.length > 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {lowAttendanceCourses.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {lowAttendanceCourses.length > 0 ? 'Needs attention' : 'All good!'}
            </p>
          </div>
          {lowAttendanceCourses.length > 0 && (
            <AlertCircle className="text-red-600" size={32} />
          )}
        </div>
      </div>
    </div>
  );
};
