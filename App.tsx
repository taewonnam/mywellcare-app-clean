import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // ✅ 아이콘 라이브러리 추가

import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen/index';
import MyInfoScreen from './screens/MyInfoScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // ✅ 탭 아이콘 설정
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === '기록') iconName = 'checkmark-circle-outline';
            else if (route.name === '통계') iconName = 'bar-chart-outline';
            else iconName = 'person-circle-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // 상단 헤더 제거
        })}
      >
        <Tab.Screen name="기록" component={HomeScreen} />
        <Tab.Screen name="통계" component={StatsScreen} />
        <Tab.Screen name="내 정보" component={MyInfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
