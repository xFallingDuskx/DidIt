import { Stack } from 'expo-router';
import '.././global.css';
import { SessionProvider, useSession } from '../contexts/SessionContext';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isLoading } = useSession();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name='login' />
        <Stack.Screen name='signup' />
      </Stack>
    </SessionProvider>
  );
}
