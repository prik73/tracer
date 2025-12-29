import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { COURSES } from './config/courses';
import { useAttendance } from './hooks/useAttendance';
import { DateSelector } from './components/DateSelector';
import { CourseCard } from './components/CourseCard';
import { StatsOverview } from './components/StatsOverview';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const { attendance, loading, error, markAttendance } = useAttendance();

  const handleMarkAttendance = async (courseCode, status) => {
    await markAttendance(courseCode, selectedDate, status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <div className="text-red-600 text-xl font-bold mb-2">Error</div>
          <div className="text-gray-700">{error}</div>
          <div className="mt-4 text-sm text-gray-600">
            Make sure your Supabase credentials are set correctly in .env.local
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Calendar className="text-indigo-600" />
                Attendance Tracker
              </h1>
              <p className="text-gray-600 mt-2">Track your college attendance effortlessly</p>
            </div>
            <DateSelector 
              selectedDate={selectedDate} 
              onDateChange={setSelectedDate} 
            />
          </div>

          <div className="space-y-4">
            {COURSES.map(course => (
              <CourseCard
                key={course.code}
                course={course}
                attendance={attendance}
                selectedDate={selectedDate}
                onMarkAttendance={handleMarkAttendance}
              />
            ))}
          </div>
        </div>

        <StatsOverview courses={COURSES} attendance={attendance} />
      </div>
    </div>
  );
}