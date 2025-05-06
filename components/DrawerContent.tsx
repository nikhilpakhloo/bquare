import { getAuth, signOut } from '@react-native-firebase/auth';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserCell from './UserCell'; // Optional: Display user info

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const handleSignOut = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Sign Out Failed', 'Please try again later.');
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
     
      <UserCell name='Nikhil Pakhloo' email='@nikhilpakhloo'/>

  

      {/* Sign Out Button */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  signOutButton: {
    backgroundColor: '#5391B4',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
