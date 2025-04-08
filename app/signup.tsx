import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Screen() {
  const router = useRouter();

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-2xl font-bold mb-4'>Sign Up</Text>
      <TextInput placeholder='Email' className='w-3/4 p-2 mb-4 bg-white rounded' />
      <TextInput placeholder='Password' secureTextEntry className='w-3/4 p-2 mb-4 bg-white rounded' />
      <TouchableOpacity className='bg-blue-500 w-3/4 p-3 rounded mb-4'>
        <Text className='text-white text-center'>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className='text-blue-700'>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
