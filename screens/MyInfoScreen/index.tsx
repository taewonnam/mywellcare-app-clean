import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../../firebase';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';

const MyInfoScreen = () => {
  const userId = 'demoUser';
  const today = new Date().toISOString().split('T')[0];

  // ✅ 오늘 포인트 초기화
  const resetTodayPoints = async () => {
    try {
      await setDoc(
        doc(db, 'userStats', userId),
        { todayPoints: 0 },
        { merge: true }
      );
      Alert.alert('✅ 오늘 포인트가 초기화되었습니다!');
    } catch (error) {
      console.error('오늘 포인트 초기화 실패:', error);
      Alert.alert('❌ 오류', '오늘 포인트 초기화 중 문제가 발생했습니다.');
    }
  };

  // ✅ 총 포인트 초기화
  const resetTotalPoints = async () => {
    try {
      await setDoc(
        doc(db, 'userStats', userId),
        { totalPoints: 0 },
        { merge: true }
      );
      Alert.alert('✅ 총 포인트가 초기화되었습니다!');
    } catch (error) {
      console.error('총 포인트 초기화 실패:', error);
      Alert.alert('❌ 오류', '총 포인트 초기화 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ 내 정보</Text>

      <TouchableOpacity style={styles.button} onPress={resetTodayPoints}>
        <Text style={styles.buttonText}>오늘 포인트 초기화</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={resetTotalPoints}>
        <Text style={styles.buttonText}>총 포인트 초기화</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#ffccbc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyInfoScreen;
