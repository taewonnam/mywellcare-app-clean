import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import QuickRecord from './QuickRecord';
import TodayStats from './TodayStats';
import FeedbackMessage from './FeedbackMessage';
import WeeklyStats from './WeeklyStats';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 빠른 기록 버튼 (예: 식사, 운동 등) */}
      <QuickRecord />

      {/* 오늘 내가 기록한 것들의 간단한 요약 */}
      <TodayStats />

      {/* 오늘 기록한 포인트에 따라 나오는 응원/경고 메시지 */}
      <FeedbackMessage />

      {/* 주간 기록 통계 시각화 */}
      <WeeklyStats />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fdfdfd',
    gap: 24,
  },
});
