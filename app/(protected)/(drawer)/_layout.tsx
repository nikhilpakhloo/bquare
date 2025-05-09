import CustomDrawerContent from '@/components/DrawerContent';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{headerShown:false}} drawerContent={(props)=> <CustomDrawerContent {...props}/>} />
    </GestureHandlerRootView>
  );
}
