// hooks/useTodayRecords.ts
import { useEffect, useState, useCallback } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

type RecordType = '식사' | '운동' | '수면' | '물';

export default function useTodayRecords() {
  const [counts, setCounts] = useState<Record<string, number>>({
  식사: 0,
  운동: 0,
  수면: 0,
  물: 0,
  });
  const [total, setTotal] = useState<number>(0); // ✅ 총 기록 수 추가

  const fetchTodayRecords = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const q = query(collection(db, 'records'), where('date', '==', today));
      const snapshot = await getDocs(q);

      const newCounts: Record<string, number> = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        const type = data.type as RecordType;
        newCounts[type] = (newCounts[type] || 0) + 1;
      });

      setCounts(newCounts);
      setTotal(snapshot.size); // ✅ 총 개수 저장
    } catch (error) {
      console.error('오늘 기록 불러오기 실패:', error);
    }
  }, []);

  useEffect(() => {
    fetchTodayRecords();
  }, [fetchTodayRecords]);

  return { counts, total, refetch: fetchTodayRecords }; // ✅ total 추가 반환
}
