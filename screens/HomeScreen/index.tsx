import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QuickRecord from './QuickRecord';
import FeedbackMessage from './FeedbackMessage';
import usePoints from '../../hooks/usePoints';

const HomeScreen = () => {
  const userId = 'demoUser';
  const { todayPoints } = usePoints(userId);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.point}>오늘 기록한 포인트: {todayPoints}점</Text>
        <FeedbackMessage points={todayPoints} />
        <View style={styles.spacer} />
        <QuickRecord />
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
