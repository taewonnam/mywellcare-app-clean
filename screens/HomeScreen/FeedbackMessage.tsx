// FeedbackMessage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 임시 포인트 수치 (내일 DB에서 계산하도록 바꿀 예정)
const todayPoints = 7;

// 포인트에 따른 피드백 메시지 반환 함수
const getFeedbackMessage = (points: number): string => {
  if (points === 0) return '🐣 아직 기록이 없어요. 오늘 한 번 시작해볼까요?';
  if (points <= 5) return '🌱 시작이 반이에요! 아주 좋아요!';
  if (points <= 10) return '💪 꾸준히 기록하는 당신! 멋져요!';
  return '🎉 훌륭해요! 오늘 목표를 모두 달성했어요!';
};

export default function FeedbackMessage() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getFeedbackMessage(todayPoints)}</Text>
    </View>
  );
}

// 스타일
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
});
