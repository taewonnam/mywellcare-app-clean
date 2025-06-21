// hooks/usePoints.ts
import { useEffect, useState, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function usePoints(userId: string) {
  const [todayPoints, setTodayPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const fetchPoints = useCallback(async () => {
    const userStatsRef = doc(db, 'userStats', userId);
    const docSnap = await getDoc(userStatsRef);
    const data = docSnap.data();

    if (data) {
      setTodayPoints(data.todayPoints || 0);
      setTotalPoints(data.totalPoints || 0);
    }
  }, [userId]);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  return {
    todayPoints,
    totalPoints,
    refetch: fetchPoints, // ✅ 여기에 refetch 추가!
  };
}
