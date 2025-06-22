import React, { useCallback } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuickRecord from './QuickRecord';
import FeedbackMessage from './FeedbackMessage';
import TodayStats from './TodayStats';
import useTodayRecords from '@/hooks/useTodayRecords';
import usePoints from '@/hooks/usePoints';
import { useFocusEffect } from '@react-navigation/native';
import { MAX_POINTS } from '@/constants/maxPoints';

const HomeScreen = () => {
  const userId = 'demoUser';

  const {
    todayPoints,
    currentMaxPoints, // ✅ 추가된 값
    isRewarded,
    refetch: refetchPoints,
  } = usePoints(userId);

  const { counts, refetch: refetchRecords } = useTodayRecords();

  useFocusEffect(
    useCallback(() => {
      console.log('📌 HomeScreen 진입: refetchPoints, refetchRecords 실행');
      refetchPoints();
      refetchRecords();
    }, [refetchPoints, refetchRecords])
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* ✅ 오늘 포인트 + 최대 포인트 분리 표시 */}
        <View style={styles.pointContainer}>
          <Text style={styles.todayPoint}>
            오늘 포인트: {todayPoints}점
          </Text>

          {isRewarded ? (
            <Text style={[styles.maxPoint, styles.maxPointReached]}>
              오늘의 최대 목표치에 도달하였습니다.
            </Text>
          ) : (
            <Text style={styles.maxPoint}>
              최대 포인트: {currentMaxPoints}점 / {MAX_POINTS}점
            </Text>
          )}
        </View>


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
  pointContainer: {
    alignItems: 'center',
    gap: 4,
  },
  todayPoint: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  maxPoint: {
  fontSize: 16,
  fontWeight: '600',
  color: '#000', // ✅ 검정색
  },
  maxPointReached: {
    color: '#ccc', // ✅ 회색
  },

  spacer: {
    height: 12,
  },
});

export default HomeScreen;
