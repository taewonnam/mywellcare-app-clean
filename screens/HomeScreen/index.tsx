import React, { useCallback } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuickRecord from './QuickRecord';
import FeedbackMessage from './FeedbackMessage';
import TodayStats from './TodayStats';
import usePoints from '../../hooks/usePoints';
import useTodayRecords from '../../hooks/useTodayRecords';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const userId = 'demoUser';
  const { todayPoints, refetch: refetchPoints } = usePoints(userId);
  const { counts, refetch: refetchRecords } = useTodayRecords();

  // ✅ 화면에 들어올 때마다 자동으로 최신화
  useFocusEffect(
    useCallback(() => {
      refetchPoints();
      refetchRecords();
    }, [refetchPoints, refetchRecords])
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.point}>{`오늘 기록한 포인트: ${todayPoints}점`}</Text>
        <FeedbackMessage points={todayPoints} />
        <TodayStats counts={counts} />
        <View style={styles.spacer} />
        <QuickRecord
          onRecordSaved={refetchRecords}
          onPointUpdate={refetchPoints}
          />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 24,
  },
  point: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    height: 12,
  },
});

export default HomeScreen;
