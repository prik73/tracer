import React from 'react';
import { Check, X } from 'lucide-react';
import { 
  calculateAttendanceStats, 
  getTodayAttendanceStatus, 
  isAttendanceLow,
  getLast7Days,
  formatDate 
} from '../utils/calculations';

export const AttendanceTable = ({ courses, attendance, onMarkAttendance }) => {
  const last7Days = getLast7Days();
  const today = new Date().toISOString().split('T')[0];

  const getStatusForDate = (courseCode, date) => {
    return getTodayAttendanceStatus(attendance, courseCode, date);
  };

  const handleCellClick = (courseCode, date, currentStatus) => {
    if (currentStatus === 'present') {
      onMarkAttendance(courseCode, date, 'absent');
    } else if (currentStatus === 'absent') {
      onMarkAttendance(courseCode, date, null);
    } else {
      onMarkAttendance(courseCode, date, 'present');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Course</th>
              {last7Days.map(date => (
                <th key={date} className="text-center py-3 px-2 font-medium text-gray-700 text-xs min-w-[60px]">
                  {formatDate(date)}
                </th>
              ))}
              <th className="text-center py-3 px-4 font-medium text-gray-700 text-sm">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => {
              const stats = calculateAttendanceStats(attendance, course.code);
              const isLow = isAttendanceLow(stats.percentage, course.required);
              
              return (
                <tr key={course.code} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium text-gray-900">{course.name}</div>
                    <div className="text-xs text-gray-500">{course.code}</div>
                  </td>
                  {last7Days.map(date => {
                    const status = getStatusForDate(course.code, date);
                    const isToday = date === today;
                    
                    return (
                      <td key={date} className="py-2 px-2">
                        <button
                          onClick={() => handleCellClick(course.code, date, status)}
                          className={`w-full h-8 rounded flex items-center justify-center transition-all ${
                            status === 'present' 
                              ? 'bg-green-100 hover:bg-green-200 text-green-700' 
                              : status === 'absent'
                              ? 'bg-red-100 hover:bg-red-200 text-red-700'
                              : isToday
                              ? 'border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {status === 'present' && <Check size={16} />}
                          {status === 'absent' && <X size={16} />}
                        </button>
                      </td>
                    );
                  })}
                  <td className="py-3 px-4 text-center">
                    <div className={`inline-flex items-center gap-2 ${
                      isLow ? 'text-red-600' : 'text-green-600'
                    }`}>
                      <span className="font-semibold text-sm">{stats.percentage}%</span>
                      <span className="text-xs text-gray-500">({stats.present}/{stats.total})</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};