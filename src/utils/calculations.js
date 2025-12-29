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

export const getClassesToAttend = (present, total, requiredPercentage) => {
  const required = requiredPercentage / 100;
  const classesNeeded = Math.ceil((required * total - present) / (1 - required));
  return Math.max(0, classesNeeded);
};

export const isAttendanceLow = (percentage, required) => {
  return parseFloat(percentage) < required;
};