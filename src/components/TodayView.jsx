import React from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { calculateAttendanceStats, getTodayAttendanceStatus } from '../utils/calculations';

export const TodayView = ({ courses, attendance, onMarkAttendance, syncing }) => {
  const today = new Date().toISOString().split('T')[0];

  const handleCellClick = (courseCode, currentStatus) => {
    if (currentStatus === 'present') {
      onMarkAttendance(courseCode, today, 'absent');
    } else if (currentStatus === 'absent') {
      onMarkAttendance(courseCode, today, null);
    } else {
      onMarkAttendance(courseCode, today, 'present');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h2 className="text-sm font-medium text-gray-700">Today's Attendance</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {courses.map(course => {
          const stats = calculateAttendanceStats(attendance, course.code);
          const status = getTodayAttendanceStatus(attendance, course.code, today);
          const isSyncing = syncing[`${course.code}-${today}`];
          
          return (
            <div key={course.code} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{course.name}</h3>
                  <p className="text-xs text-gray-500">{course.code}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      parseFloat(stats.percentage) < course.required ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {stats.percentage}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {stats.present}/{stats.total}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleCellClick(course.code, status)}
                    disabled={isSyncing}
                    className={`relative w-20 h-10 rounded-md flex items-center justify-center transition-all ${
                      status === 'present' 
                        ? 'bg-green-100 hover:bg-green-200 text-green-700' 
                        : status === 'absent'
                        ? 'bg-red-100 hover:bg-red-200 text-red-700'
                        : 'border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-400'
                    }`}
                  >
                    {isSyncing ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : status === 'present' ? (
                      <Check size={18} />
                    ) : status === 'absent' ? (
                      <X size={18} />
                    ) : (
                      <span className="text-xs">Mark</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

