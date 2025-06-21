import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TodayStats({ counts }: { counts: Record<string, number> }) {
  const types = [
    { label: '식사', emoji: '🍱' },
    { label: '운동', emoji: '🏃' },
    { label: '수면', emoji: '🛌' },
    { label: '물', emoji: '💧' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 기록</Text>
      <View style={styles.statsGrid}>
        {types.map(({ label, emoji }) => (
          <View key={label} style={styles.card}>
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={styles.count}>{String(counts[label] ?? 0)}</Text>
            <Text style={styles.label}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fffaf0',
    borderRadius: 12,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '48%',
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 16,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  count: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
});
