// WeeklyStats.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 아직 데이터 연동은 안 됐지만, UI 구조만 먼저 만들기
export default function WeeklyStats() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>주간 통계</Text>
      {/* 나중에 막대 그래프나 요약 데이터가 들어갈 자리 */}
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>📊 그래프 준비 중...</Text>
      </View>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  placeholder: {
    height: 120,
    backgroundColor: '#bbdefb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#333',
  },
});
