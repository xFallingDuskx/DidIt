import { FontAwesome6 } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { Platform, Pressable } from 'react-native';
import { useSession } from '../../contexts/SessionContext';

export default function TabLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  // Only require authentication within the (tabs) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/onboarding" />;
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
        tabBarButton: (props) => (
          <Pressable {...props} android_ripple={{ color: 'transparent' }} />
        ),
        tabBarStyle: {
          paddingVertical: 10,
          ...(Platform.OS === 'android' ? { height: 60 } : {}),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ToDos',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={20} name="check-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Lists',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={20} name="list-alt" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          title: 'Routines',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={20} name="clock" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
