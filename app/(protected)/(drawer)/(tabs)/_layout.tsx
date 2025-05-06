import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'index') {
            return <FontAwesome name="home" size={size} color={color} />;
          } else if (route.name === 'calendar') {
            return <FontAwesome6 name="calendar" size={size} color={color} />;
          } else if (route.name === 'notes') {
            return <FontAwesome6 name="notes-medical" size={size} color={color} />;
          } else {
            return <FontAwesome6 name="message" size={size} color={color} />;
          }
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#D9D9D9',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          position: 'absolute',
          overflow: 'hidden',
          paddingBottom: 10,
        },
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        },
        tabBarActiveTintColor: '#47C2C4',
        tabBarInactiveTintColor: '#3C3B3B',
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Tabs.Screen name="notes" options={{ title: 'Notes' }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages' }} />
    </Tabs>
  );
}
