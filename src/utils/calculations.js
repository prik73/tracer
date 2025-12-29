export const calculateAttendanceStats = (attendance, courseCode) => {
  const courseAttendance = attendance.filter(a => a.course_code === courseCode);
  const present = courseAttendance.filter(a => a.status === 'present').length;
  const total = courseAttendance.length;
  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
  
  return { present, total, percentage };
};

export const getTodayAttendanceStatus = (attendance, courseCode, date) => {
  return attendance.find(
    a => a.course_code === courseCode && a.date === date
  )?.status;
};

export const isAttendanceLow = (percentage, required) => {
  return parseFloat(percentage) < required;
};

export const isWeekend = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
};

export const getWeekdaysInRange = (startDate, endDate) => {
  const days = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    if (!isWeekend(dateStr)) {
      days.push(dateStr);
    }
    current.setDate(current.getDate() + 1);
  }
  
  return days;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (dateString === today) return 'Today';
  if (dateString === yesterdayStr) return 'Yesterday';
  
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};