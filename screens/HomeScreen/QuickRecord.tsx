import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { addDoc, collection, Timestamp, doc, setDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase';

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
      // 1. 기록 저장
      await addDoc(collection(db, 'records'), {
        type,
        uid: userId,
        date: today,
        timestamp: Timestamp.now(),
      });
      console.log(`${type} 기록 Firestore에 저장됨`);

      // 2. 포인트 정산 (todayPoints +1, totalPoints +1)
      await setDoc(
        doc(db, 'userStats', userId),
        {
          todayPoints: increment(1),
          totalPoints: increment(1),
        },
        { merge: true }
      );
      console.log('포인트 +1 누적 완료');

      // 3. 수치 갱신 콜백
      if (onRecordSaved) onRecordSaved();       // 기록 수치 업데이트
      if (onPointUpdate) onPointUpdate();       // 포인트 수치 업데이트
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
