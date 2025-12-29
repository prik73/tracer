import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncing, setSyncing] = useState({});

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
    const syncKey = `${courseCode}-${date}`;
    
    // Optimistic update
    setAttendance(prev => {
      const filtered = prev.filter(a => !(a.course_code === courseCode && a.date === date));
      if (status) {
        return [...filtered, { course_code: courseCode, date, status }];
      }
      return filtered;
    });

    // Show subtle loader
    setSyncing(prev => ({ ...prev, [syncKey]: true }));

    try {
      if (status) {
        const { error } = await supabase
          .from('attendance')
          .upsert({ course_code: courseCode, date, status }, { onConflict: 'course_code,date' });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('attendance')
          .delete()
          .match({ course_code: courseCode, date });
        if (error) throw error;
      }
      
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error marking attendance:', err);
      // Revert on error
      await fetchAttendance();
      return { success: false, error: err.message };
    } finally {
      setSyncing(prev => {
        const updated = { ...prev };
        delete updated[syncKey];
        return updated;
      });
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return {
    attendance,
    loading,
    error,
    syncing,
    markAttendance,
    refetch: fetchAttendance
  };
};