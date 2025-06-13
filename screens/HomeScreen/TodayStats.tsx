// TodayStats.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 임시로 오늘 기록된 항목 수를 하드코딩 (내일 Firestore 연동 예정)
const mockStats = {
  식사: 2,
  운동: 1,
  수면: 1,
  물: 3,
};

export default function TodayStats() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 기록</Text>
      <View style={styles.statsRow}>
        {Object.entries(mockStats).map(([key, value]) => (
          <View key={key} style={styles.statBox}>
            <Text style={styles.count}>{value}</Text>
            <Text style={styles.label}>{key}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff3e0',
    borderRadius: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
});
