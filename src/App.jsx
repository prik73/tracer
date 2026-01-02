import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, LogOut } from 'lucide-react';
import { COURSES } from './config/courses';
import { useAttendance } from './hooks/useAttendance';
import { TodayView } from './components/TodayView';
import { CalendarView } from './components/CalendarView';
import { TimetableView } from './components/TimetableView';
import { Stats } from './components/Stats';
import { Login } from './components/Login';
import { isWeekend } from './utils/calculations';
import { isAuthenticated, removeToken } from './lib/auth';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { attendance, loading, error, syncing, markAttendance } = useAttendance();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimetable, setShowTimetable] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const isTodayWeekend = isWeekend(today);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setIsLoggedIn(authenticated);
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <div className="text-sm text-gray-600">Checking authentication...</div>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <div className="text-sm text-gray-600">Loading attendance...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg border border-red-200 p-6 max-w-md">
          <div className="text-red-600 font-semibold mb-2">Connection Error</div>
          <div className="text-sm text-gray-700 mb-4">{error}</div>
          <div className="text-xs text-gray-500">
            Check your Supabase credentials in .env.local
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
            <p className="text-sm text-gray-500 mt-1">
              {isTodayWeekend ? "It's the weekend! Enjoy your time off." : 'Mark your attendance for today'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowTimetable(!showTimetable);
                if (!showTimetable) setShowCalendar(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showTimetable 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Clock size={18} />
              Timetable
            </button>
            <button
              onClick={() => {
                setShowCalendar(!showCalendar);
                if (!showCalendar) setShowTimetable(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showCalendar 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CalendarIcon size={18} />
              {showCalendar ? 'Today View' : 'Calendar'}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {!showTimetable && <Stats courses={COURSES} attendance={attendance} />}
          
          {showTimetable ? (
            <TimetableView onClose={() => setShowTimetable(false)} />
          ) : isTodayWeekend && !showCalendar ? (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <CalendarIcon className="mx-auto text-gray-400 mb-3" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Weekend Break</h3>
              <p className="text-sm text-gray-500 mb-4">
                No classes today. Use the calendar to view or edit past attendance.
              </p>
              <button
                onClick={() => setShowCalendar(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <CalendarIcon size={18} />
                Open Calendar
              </button>
            </div>
          ) : (
            <>
              {showCalendar ? (
                <CalendarView 
                  courses={COURSES} 
                  attendance={attendance}
                  onMarkAttendance={markAttendance}
                  syncing={syncing}
                />
              ) : (
                <TodayView 
                  courses={COURSES} 
                  attendance={attendance}
                  onMarkAttendance={markAttendance}
                  syncing={syncing}
                />
              )}
            </>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          {showTimetable 
            ? 'View your weekly class schedule' 
            : showCalendar 
            ? 'Weekends are automatically hidden • Click any cell to toggle' 
            : 'Click to mark: Present → Absent → Clear'}
        </div>
      </div>
    </div>
  );
}