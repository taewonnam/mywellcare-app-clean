// QuickRecord.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export default function QuickRecord({ onRecordSaved }: { onRecordSaved?: () => void }) {
  const records = [
    { type: '식사', emoji: '🍱' },
    { type: '운동', emoji: '💪' },
    { type: '수면', emoji: '😴' },
    { type: '물', emoji: '💧' },
  ];

  const handleRecord = async (type: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await addDoc(collection(db, 'records'), {
        type,
        date: today,
        timestamp: Timestamp.now(),
      });
      console.log(`${type} 기록 Firestore에 저장됨`);

      // ✅ 기록 저장 후 수치 갱신 트리거
      if (onRecordSaved) onRecordSaved();
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

