import { Stack } from 'expo-router';
import { SessionProvider } from '../contexts/SessionContext';
import '.././global.css';

export default function RootLayout() {
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
