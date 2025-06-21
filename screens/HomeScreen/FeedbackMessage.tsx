import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getFeedbackMessage = (points: number): string => {
  if (points === 0) return "🐣 아직 기록이 없어요. 오늘 한 번 시작해볼까요?";
  if (points <= 10) return "✨ 시작이 반이에요! 꾸준함이 답이에요!";
  if (points <= 30) return "💪 좋아요! 오늘도 건강한 하루네요!";
  if (points <= 50) return "🔥 엄청나요! 자신과의 약속을 지키고 있어요!";
  return "🏆 대단해요! 이대로만 가면 목표 달성은 시간문제!";
};

const FeedbackMessage = ({ points }: { points: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{String(getFeedbackMessage(points))}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});

export default FeedbackMessage;
