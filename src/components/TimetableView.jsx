import React from 'react';
import { X } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

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
        null,
        {code: 'EO-202N', name: 'Digital Circuits', room: 'LT3.1A', color: 'bg-red-400'},
        null, null, null,
        {code: 'LAB-2', name: 'Laboratory', room: 'Lab', color: 'bg-yellow-500', span: 2}
      ],
      'WED': [
        {code: 'CSE-101', name: 'Data Structures', room: 'LT3 Hall', color: 'bg-purple-400'},
        {code: 'EO-101', name: 'Fund. of EE', room: 'LT3.1A', color: 'bg-indigo-500'},
        {code: 'MA-102', name: 'Eng. Math-II', room: 'LT1.1A', color: 'bg-teal-500'},
        null,
        {code: 'EO-202N', name: 'Digital Circuits', room: 'LT3.1A', color: 'bg-red-400'},
        null, null, null,
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
        null,
        {code: 'EO-202N', name: 'Digital Circuits', room: 'LT3.1A', color: 'bg-red-400'},
        null, null,
        {code: 'HLM-153', name: 'Education & Self', room: 'LT1.2B', color: 'bg-cyan-400'},
        null, null
      ]
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 px-3 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">CSE B.Tech - BA Batch</h2>
          <p className="text-indigo-100 text-sm">Semester II • 2025-26</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-lg p-2 transition-all duration-200 hover:scale-110"
        >
          <X size={24} />
        </button>
      </div>

      <div className="overflow-x-auto sleek-scrollbar">
        <table className="w-full border-collapse table-fixed" style={{ minWidth: '1200px' }}>
          <thead>
            <tr>
              <th className="bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 px-2 py-3 text-xs font-semibold text-gray-700" style={{ width: '70px' }}></th>
              {timetableData.times.map((time, idx) => (
                <th key={idx} className="bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 px-2 py-3 text-xs font-semibold text-gray-600" style={{ width: 'calc((100% - 70px) / 10)' }}>
                  <div className="whitespace-nowrap">{time}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetableData.days.map((day) => (
              <tr key={day}>
                <td className="bg-gradient-to-r from-gray-700 to-gray-600 text-white border border-gray-200 px-2 py-4 text-center font-bold text-sm">
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
                          className="border border-gray-200 p-0 relative group"
                        >
                          <Popover>
                            <PopoverTrigger asChild>
                              <button
                                className={`w-full h-full min-h-[80px] ${slot.color} text-white px-1 py-3 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:z-10 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50`}
                              >
                                <div className="flex flex-col items-center justify-center h-full">
                                  {slot.room && (
                                    <div className="text-[10px] opacity-80 mb-0.5">{slot.room}</div>
                                  )}
                                  <div className="font-bold text-xs mb-0.5">{slot.code}</div>
                                  <div className="text-[10px] opacity-80 line-clamp-1">{slot.name}</div>
                                </div>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-72 p-0 overflow-hidden" sideOffset={8}>
                              <div className={`${slot.color} px-4 py-3`}>
                                <div className="text-white font-bold text-lg">{slot.code}</div>
                                <div className="text-white text-sm opacity-90">{slot.name}</div>
                              </div>
                              <div className="p-4 space-y-3 bg-white">
                                {slot.room && (
                                  <div className="flex items-start gap-2">
                                    <div className="text-gray-500 text-xs font-medium min-w-[60px]">Location:</div>
                                    <div className="text-gray-900 text-sm font-medium">{slot.room}</div>
                                  </div>
                                )}
                                <div className="flex items-start gap-2">
                                  <div className="text-gray-500 text-xs font-medium min-w-[60px]">Day:</div>
                                  <div className="text-gray-900 text-sm">{day}</div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <div className="text-gray-500 text-xs font-medium min-w-[60px]">Time:</div>
                                  <div className="text-gray-900 text-sm">
                                    {timetableData.times[slotIdx]}
                                    {span > 1 && ` - ${timetableData.times[slotIdx + span - 1].split('-')[1]}`}
                                  </div>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </td>
                      );
                    }

                    return (
                      <td key={slotIdx} className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"></td>
                    );
                  });
                })()}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-t border-gray-200">
        <p className="text-sm text-green-600 font-semibold text-center">
          ✓ Chill Monday - Only 1 Class!
        </p>
      </div>
    </div>
  );
}