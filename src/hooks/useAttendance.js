import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('attendance')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      setAttendance(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (courseCode, date, status) => {
    try {
      const { error } = await supabase
        .from('attendance')
        .upsert({ 
          course_code: courseCode, 
          date, 
          status 
        }, { 
          onConflict: 'course_code,date' 
        });

      if (error) throw error;
      await fetchAttendance();
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error marking attendance:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteAttendance = async (courseCode, date) => {
    try {
      const { error } = await supabase
        .from('attendance')
        .delete()
        .match({ course_code: courseCode, date });

      if (error) throw error;
      await fetchAttendance();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return {
    attendance,
    loading,
    error,
    markAttendance,
    deleteAttendance,
    refetch: fetchAttendance
  };
};