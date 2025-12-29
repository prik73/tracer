import React from 'react';
import { AlertCircle } from 'lucide-react';
import { calculateAttendanceStats, isAttendanceLow } from '../utils/calculations';

export const Stats = ({ courses, attendance }) => {
  const lowAttendanceCourses = courses.filter(course => {
    const stats = calculateAttendanceStats(attendance, course.code);
    return stats.total > 0 && isAttendanceLow(stats.percentage, course.required);
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Low Attendance Alert</p>
          <p className={`text-2xl font-bold mt-1 ${
            lowAttendanceCourses.length > 0 ? 'text-red-600' : 'text-green-600'
          }`}>
            {lowAttendanceCourses.length}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {lowAttendanceCourses.length > 0 ? (
              <>
                {lowAttendanceCourses.map(c => c.code).join(', ')} need attention
              </>
            ) : (
              'All courses above 75%'
            )}
          </p>
        </div>
        {lowAttendanceCourses.length > 0 && (
          <AlertCircle className="text-red-600" size={32} />
        )}
      </div>
    </div>
  );
};
