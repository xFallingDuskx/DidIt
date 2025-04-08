import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Screen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl font-bold mb-4">Log In</Text>
      <TextInput
        placeholder="Email"
        className="w-3/4 p-2 mb-4 bg-white rounded"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="w-3/4 p-2 mb-4 bg-white rounded"
      />
      <TouchableOpacity className="bg-blue-500 w-3/4 p-3 rounded mb-4">
        <Text className="text-white text-center">Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text className="text-blue-700">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}