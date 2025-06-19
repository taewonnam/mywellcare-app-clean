// TodayStats.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TodayStats({ counts }: { counts: Record<string, number> }) {
  const types = ['식사', '운동', '수면', '물'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 기록</Text>
      <View style={styles.statsRow}>
        {types.map((type) => (
          <View key={type} style={styles.statBox}>
            <Text style={styles.count}>{counts[type] || 0}</Text>
            <Text style={styles.label}>{type}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

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
