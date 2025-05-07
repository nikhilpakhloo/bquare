import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider } from '@/context/authContext';

export default function RootLayout() {

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
            animation: "none",
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            animation: "none",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            animation: "none",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register-user"
          options={{
            animation: "none",
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="dark"    />
    </AuthProvider>
  );
}
