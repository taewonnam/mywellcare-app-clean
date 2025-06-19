// usePoints.ts
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const usePoints = (userId: string) => {
  const [todayPoints, setTodayPoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const ref = doc(db, 'userStats', userId);
    const unsub = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTodayPoints(data.todayPoints || 0);
        setTotalPoints(data.totalPoints || 0);
      }
    });

    return () => unsub();
  }, [userId]);

  return { todayPoints, totalPoints };
};

export default usePoints;
