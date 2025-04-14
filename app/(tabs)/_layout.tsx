import { FontAwesome6 } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useSession } from '../../contexts/SessionContext';

export default function TabLayout() {
  const { session, isLoading } = useSession();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session && !isLoading) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/onboarding' />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome6 size={24} name='check-circle' color={color} />,
        }}
      />
      <Tabs.Screen
        name='lists'
        options={{
          title: 'Lists',
          tabBarIcon: ({ color }) => <FontAwesome6 size={24} name='list-alt' color={color} />,
        }}
      />
      <Tabs.Screen
        name='routines'
        options={{
          title: 'Routines',
          tabBarIcon: ({ color }) => <FontAwesome6 size={24} name='clock' color={color} />,
        }}
      />
    </Tabs>
  );
}
