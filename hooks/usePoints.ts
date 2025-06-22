import { useEffect, useState, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { MAX_POINTS } from '../constants/maxPoints'; // ✅ 추가

export default function usePoints(userId: string) {
  const [todayPoints, setTodayPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentMaxPoints, setCurrentMaxPoints] = useState(0);
  const [isRewarded, setIsRewarded] = useState(false);

  const fetchPoints = useCallback(async () => {
    try {
      const userStatsRef = doc(db, 'userStats', userId);
      const docSnap = await getDoc(userStatsRef);
      const data = docSnap.data();
      console.log('📦 받은 데이터:', data);

      if (data) {
        const today = data.todayPoints || 0;
        const isMaxed = today >= MAX_POINTS;

        setTodayPoints(today);
        setTotalPoints(data.totalPoints || 0);
        setCurrentMaxPoints(data.currentMaxPoints || 0);

        // ✅ MAX 도달 여부 체크
        setIsRewarded(isMaxed || data.isRewarded || false);
      }
    } catch (error) {
      console.error('포인트 불러오기 실패:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchPoints();
  }, [fetchPoints]);

  return {
    todayPoints,
    totalPoints,
    currentMaxPoints,
    isRewarded,
    refetch: fetchPoints,
  };
}
