import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { calculateAttendanceStats, getTodayAttendanceStatus, isAttendanceLow } from '../utils/calculations';

export const CourseCard = ({ course, attendance, selectedDate, onMarkAttendance }) => {
  const stats = calculateAttendanceStats(attendance, course.code);
  const todayStatus = getTodayAttendanceStatus(attendance, course.code, selectedDate);
  const isLow = isAttendanceLow(stats.percentage, course.required);

  return (
    <div 
      className={`p-6 rounded-xl border-2 transition-all ${
        isLow ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
          <p className="text-sm text-gray-600">{course.code}</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${
            isLow ? 'text-red-600' : 'text-green-600'
          }`}>
            {stats.percentage}%
          </div>
          <div className="text-sm text-gray-600">
            {stats.present}/{stats.total} classes
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onMarkAttendance(course.code, 'present')}
          className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            todayStatus === 'present'
              ? 'bg-green-600 text-white'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          <CheckCircle size={20} />
          Present
        </button>
        <button
          onClick={() => onMarkAttendance(course.code, 'absent')}
          className={`flex-1 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            todayStatus === 'absent'
              ? 'bg-red-600 text-white'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          <XCircle size={20} />
          Absent
        </button>
      </div>

      {isLow && stats.total > 0 && (
        <div className="mt-4 p-3 bg-red-100 rounded-lg text-sm text-red-800 flex items-start gap-2">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <div>
            <strong>Below {course.required}% requirement.</strong> Attend next classes to improve!
          </div>
        </div>
      )}
    </div>
  );
};