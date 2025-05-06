import { Redirect, Stack } from 'expo-router';
import { useSession } from '../../contexts/SessionContext';

export default function Layout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/onboarding" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
