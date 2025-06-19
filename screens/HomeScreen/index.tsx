// screens/HomeScreen/index.tsx
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import QuickRecord from './QuickRecord';
import TodayStats from './TodayStats';
import FeedbackMessage from './FeedbackMessage';
import WeeklyStats from './WeeklyStats';
import useTodayRecords from '../../hooks/useTodayRecords';

export default function HomeScreen() {
  const { counts, refetch } = useTodayRecords();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <QuickRecord onRecordSaved={refetch} />
      <TodayStats counts={counts} />
      <FeedbackMessage />
      <WeeklyStats />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});
