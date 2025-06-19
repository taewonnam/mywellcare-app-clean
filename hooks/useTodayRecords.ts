// hooks/useTodayRecords.ts
import { useEffect, useState, useCallback } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

type RecordType = '식사' | '운동' | '수면' | '물';

export default function useTodayRecords() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const fetchTodayRecords = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
      const q = query(collection(db, 'records'), where('date', '==', today));
      const snapshot = await getDocs(q);

      const newCounts: Record<string, number> = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        const type = data.type as RecordType;
        newCounts[type] = (newCounts[type] || 0) + 1;
      });

      setCounts(newCounts);
    } catch (error) {
      console.error('오늘 기록 불러오기 실패:', error);
    }
  }, []);

  useEffect(() => {
    fetchTodayRecords();
  }, [fetchTodayRecords]);

  return { counts, refetch: fetchTodayRecords };
}
