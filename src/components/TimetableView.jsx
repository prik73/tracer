import React from 'react';
import { X } from 'lucide-react';

export function TimetableView({ onClose }) {
  const timetableData = {
    days: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
    times: [
      '8:00-8:55',
      '9:00-9:55', 
      '10:00-10:55',
      '11:00-11:55',
      '12:00-12:55',
      '13:30-14:25',
      '14:30-15:25',
      '15:30-16:25',
      '16:30-17:25',
      '17:30-18:25'
    ],
    schedule: {
      'MON': [
        {code: 'MA-102', name: 'Tutorial', room: '', color: 'bg-teal-500'},
        null, null, null, null, null, null, null, null, null
      ],
      'TUE': [
        {code: 'CSE-101', name: 'Data Structures', room: 'LT3 Hall', color: 'bg-purple-400'},
        {code: 'EO-101', name: 'Fund. of EE', room: 'LT3.1A', color: 'bg-indigo-500'},
        {code: 'MA-102', name: 'Eng. Math-II', room: 'LT1.1A', color: 'bg-teal-500'},
        null, null,
        {code: 'EO-202N', name: 'Digital Circuits', room: 'LT3.1A', color: 'bg-red-400'},
        null, null,
        {code: 'LAB-2', name: 'Laboratory', room: 'Lab', color: 'bg-yellow-500', span: 2}
      ],
      'WED': [
        {code: 'CSE-101', name: 'Data Structures', room: 'LT3 Hall', color: 'bg-purple-400'},
        {code: 'EO-101', name: 'Fund. of EE', room: 'LT3.1A', color: 'bg-indigo-500'},
        {code: 'MA-102', name: 'Eng. Math-II', room: 'LT1.1A', color: 'bg-teal-500'},
        null, null,
        {code: 'EO-202N', name: 'Digital Circuits', room: 'LT3.1A', color: 'bg-red-400'},
        null, null,
        {code: 'LAB-3', name: 'Laboratory', room: 'Lab', color: 'bg-yellow-500', span: 2}
      ],
      'THU': [
        null,
        {code: 'EO-101', name: 'Fund. of EE', room: 'LT3.1A', color: 'bg-indigo-500'},
        {code: 'LAB-1', name: 'Laboratory', room: 'Lab', color: 'bg-yellow-500', span: 2},
        null, null, null, null,
        {code: 'EO-202N', name: 'Digital Circuits', room: 'LT3.1A', color: 'bg-red-400'},
        {code: 'HLM-153', name: 'Education & Self', room: 'LT1.2B', color: 'bg-cyan-400', span: 2}
      ],
      'FRI': [
        {code: 'CSE-101', name: 'Data Structures', room: 'LT3 Hall', color: 'bg-purple-400'},
        {code: 'EO-101', name: 'Fund. of EE', room: 'LT3.1A', color: 'bg-indigo-500'},
        {code: 'MA-102', name: 'Eng. Math-II', room: 'LT1.1A', color: 'bg-teal-500'},
        null, null,
        {code: 'EO-202N', name: 'Digital Circuits', room: 'LT3.1A', color: 'bg-red-400'},
        null,
        {code: 'HLM-153', name: 'Education & Self', room: 'LT1.2B', color: 'bg-cyan-400'},
        null, null
      ]
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">CSE B.Tech - BA Batch</h2>
          <p className="text-indigo-100 text-sm">Semester II • 2025-26</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-gray-100 border border-gray-300 px-2 py-3 text-xs font-semibold text-gray-700 w-20"></th>
                {timetableData.times.map((time, idx) => (
                  <th key={idx} className="bg-gray-100 border border-gray-300 px-2 py-3 text-xs font-semibold text-gray-600 min-w-[100px]">
                    {time}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetableData.days.map((day, dayIdx) => (
                <tr key={day}>
                  <td className="bg-gray-700 text-white border border-gray-300 px-2 py-4 text-center font-bold text-sm">
                    {day}
                  </td>
                  {(() => {
                    let skipNext = 0;
                    return timetableData.schedule[day].map((slot, slotIdx) => {
                      if (skipNext > 0) {
                        skipNext--;
                        return null;
                      }

                      if (slot) {
                        const span = slot.span || 1;
                        if (span > 1) skipNext = span - 1;

                        return (
                          <td
                            key={slotIdx}
                            colSpan={span}
                            className={`${slot.color} text-white border border-gray-300 px-2 py-4 text-center`}
                          >
                            <div className="flex flex-col items-center justify-center h-full min-h-[80px]">
                              {slot.room && (
                                <div className="text-xs opacity-90 mb-1">{slot.room}</div>
                              )}
                              <div className="font-bold text-sm mb-1">{slot.code}</div>
                              <div className="text-xs opacity-90">{slot.name}</div>
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td key={slotIdx} className="bg-gray-50 border border-gray-300"></td>
                      );
                    });
                  })()}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <p className="text-sm text-green-600 font-semibold text-center">
          ✓ Chill Monday - Only 1 Class!
        </p>
      </div>
    </div>
  );
}