import { FontAwesome6 } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useSession } from '../../contexts/SessionContext';
import { Platform } from 'react-native';

export default function TabLayout() {
  const { session } = useSession();

  // Only require authentication within the (tabs) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/onboarding' />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1877f2',
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'BodyRegular',
          fontWeight: 300,
        },
        tabBarStyle: {
          paddingVertical: 10,
          ...(Platform.OS === 'android' ? { height: 65 } : {}),
        },
        tabBarItemStyle: {
          ...(Platform.OS === 'ios' ? { paddingVertical: 5 } : { paddingVertical: 3 }),
        },
      }}
    >
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
