import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, query, where, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import useTodayRecords from '@/hooks/useTodayRecords';
import usePoints from '@/hooks/usePoints';

export default function MyInfoScreen() {
  const userId = 'demoUser';
  const { refetch: refetchRecords } = useTodayRecords();
  const { refetch: refetchPoints } = usePoints(userId);

  // ✅ 포인트 초기화
  const resetPoints = async () => {
    try {
      await setDoc(
        doc(db, 'userStats', userId),
        { todayPoints: 0, totalPoints: 0, isRewarded: false },
        { merge: true }
      );
      await refetchPoints();
      Alert.alert('초기화 완료', '포인트가 초기화되었습니다.');
    } catch (error) {
      console.error('포인트 초기화 실패:', error);
    }
  };

  // ✅ 오늘 기록 초기화
  const resetTodayRecords = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const q = query(
        collection(db, 'records'),
        where('uid', '==', userId),
        where('date', '==', today)
      );
      const snapshot = await getDocs(q);
      const deletes = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
      await Promise.all(deletes);
      await refetchRecords();
      Alert.alert('초기화 완료', '오늘의 기록이 모두 삭제되었습니다.');
    } catch (error) {
      console.error('기록 초기화 실패:', error);
    }
  };

    // ✅ 최대 포인트 수치(currentMaxPoints)만 초기화
    const resetRewardStatus = async () => {
      try {
        await setDoc(
          doc(db, 'userStats', userId),
          {
            currentMaxPoints: 0, // ✅ 최대 포인트 수치만 초기화
            isRewarded: false,   // ✅ 회색 표시 제거
          },
          { merge: true }
        );
        await refetchPoints();
        Alert.alert('초기화 완료', '최대 포인트 수치가 초기화되었습니다.');
      } catch (error) {
        console.error('최대 포인트 상태 초기화 실패:', error);
      }
    };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 정보</Text>

      <TouchableOpacity style={styles.button} onPress={resetPoints}>
        <Text style={styles.buttonText}>🔄 포인트 초기화</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={resetTodayRecords}>
        <Text style={styles.buttonText}>🧹 오늘의 기록 초기화</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.dimButton]}
        onPress={resetRewardStatus}
      >
        <Text style={[styles.buttonText, styles.dimButtonText]}>
          🧯 최대 포인트 상태 초기화
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 32,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#fce4ec',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c2185b',
  },
  dimButton: {
    backgroundColor: '#eeeeee',
  },
  dimButtonText: {
    color: '#666',
  },
});
