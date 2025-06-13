// QuickRecord.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// 빠른 기록을 위한 버튼 컴포넌트 정의
export default function QuickRecord() {
  // 버튼 항목 리스트 (화면에 동그란 버튼으로 나올 것들)
  const records = [
    { type: '식사', emoji: '🍱' },
    { type: '운동', emoji: '💪' },
    { type: '수면', emoji: '😴' },
    { type: '물', emoji: '💧' },
  ];

  return (
    <View style={styles.container}>
      {records.map((item) => (
        <TouchableOpacity
          key={item.type}
          style={styles.button}
          onPress={() => {
            // 추후 Firebase 기록 저장 로직 들어갈 자리
            console.log(`${item.type} 기록됨!`);
          }}
        >
          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.label}>{item.type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// 버튼 스타일 정의
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',       // 가로 배치
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    aspectRatio: 1,             // 정사각형 → 원으로 만들기 위해
    backgroundColor: '#e0f7fa',
    borderRadius: 999,          // 완전한 원 만들기
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
