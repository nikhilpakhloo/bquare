import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

interface UserCellProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export default function DrawerButton({ avatarUrl }: UserCellProps) {
  const navigation = useNavigation();

  const handleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <TouchableOpacity style={styles.menuButton} onPress={handleDrawer} >
      <View style={styles.menuLine}></View>
      <View style={styles.menuLine}></View>
      <View style={styles.menuLine}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    width: 30,
    height: 30,
    justifyContent: 'space-around',
    padding: 5,
  },
  menuLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#000',
  },
});
