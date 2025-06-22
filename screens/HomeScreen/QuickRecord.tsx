import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  setDoc,
  increment,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { MAX_POINTS } from '@/constants/maxPoints';

export default function QuickRecord({
  onRecordSaved,
  onPointUpdate,
}: {
  onRecordSaved?: () => void;
  onPointUpdate?: () => void;
}) {
  const records = [
    { type: '식사', emoji: '🍱' },
    { type: '운동', emoji: '💪' },
    { type: '수면', emoji: '😴' },
    { type: '물', emoji: '💧' },
  ];

  const userId = 'demoUser'; // 추후 Firebase Auth 연동 시 교체
  const today = new Date().toISOString().split('T')[0];

 const handleRecord = async (type: string) => {
  try {
    // ✅ 현재 포인트 가져오기
    const statsRef = doc(db, 'userStats', userId);
    const snap = await getDoc(statsRef);
    const data = snap.data();
    const currentMaxPoints = data?.currentMaxPoints || 0;

    const isMaxed = currentMaxPoints >= MAX_POINTS;

    // 1. 기록 저장 (항상 허용)
    await addDoc(collection(db, 'records'), {
      type,
      uid: userId,
      date: today,
      timestamp: Timestamp.now(),
    });
    console.log(`${type} 기록 Firestore에 저장됨`);

    // 2. 포인트 정산
    const willBeMaxed = currentMaxPoints + 1 >= MAX_POINTS;

    await setDoc(
      statsRef,
      {
        todayPoints: increment(1),       // ✅ 항상 증가
        totalPoints: increment(1),       // ✅ 항상 증가
        ...(isMaxed ? {} : { currentMaxPoints: increment(1) }), // ✅ 100 이상이면 증가 ❌
        ...(willBeMaxed && { isRewarded: true }),
      },
      { merge: true }
    );
    console.log('포인트 정산 완료');
    
    // 3. 콜백
    onRecordSaved?.();
    onPointUpdate?.();
  } catch (error) {
    console.error('기록 저장 실패:', error);
  }
};


  return (
    <View style={styles.container}>
      {records.map((item) => (
        <TouchableOpacity
          key={item.type}
          style={styles.button}
          onPress={() => handleRecord(item.type)}
        >
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.label}>{item.type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#e0f7fa',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
  },
});
