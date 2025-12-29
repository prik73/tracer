import React, { useState } from 'react';
import { Check, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { 
  calculateAttendanceStats, 
  getTodayAttendanceStatus, 
  getWeekdaysInRange,
  formatDate 
} from '../utils/calculations';

export const CalendarView = ({ courses, attendance, onMarkAttendance, syncing }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
  const weekdays = getWeekdaysInRange(
    startOfMonth.toISOString().split('T')[0],
    endOfMonth.toISOString().split('T')[0]
  );

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
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
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-700">Calendar View</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left py-2 px-3 font-medium text-gray-700 text-xs sticky left-0 bg-gray-50">
                Course
              </th>
              {weekdays.map(date => (
                <th key={date} className="text-center py-2 px-2 font-medium text-gray-700 text-xs min-w-[50px]">
                  {formatDate(date)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.code} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-3 sticky left-0 bg-white">
                  <div className="text-xs font-medium text-gray-900">{course.code}</div>
                </td>
                {weekdays.map(date => {
                  const status = getTodayAttendanceStatus(attendance, course.code, date);
                  const isSyncing = syncing[`${course.code}-${date}`];
                  
                  return (
                    <td key={date} className="py-1 px-1">
                      <button
                        onClick={() => handleCellClick(course.code, date, status)}
                        disabled={isSyncing}
                        className={`relative w-full h-8 rounded flex items-center justify-center transition-all ${
                          status === 'present' 
                            ? 'bg-green-100 hover:bg-green-200 text-green-700' 
                            : status === 'absent'
                            ? 'bg-red-100 hover:bg-red-200 text-red-700'
                            : 'hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {isSyncing ? (
                          <Loader2 size={14} className="animate-spin text-gray-400" />
                        ) : (
                          <>
                            {status === 'present' && <Check size={14} />}
                            {status === 'absent' && <X size={14} />}
                          </>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
