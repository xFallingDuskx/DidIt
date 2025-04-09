import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../supabase';

interface FormState {
  email: string;
  password: string;
}

export default function Screen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({ email: '', password: '' });

  const handleLogIn = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword(formState);

    if (error) {
      Alert.alert(error.message);
      setIsLoading(false);
      return;
    }

    router.push('/');
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='text-2xl font-bold mb-4'>Log In</Text>
      <TextInput
        placeholder='Email'
        value={formState.email}
        onChangeText={(text) => setFormState({ ...formState, email: text })}
        className='w-3/4 p-2 mb-4 bg-white rounded'
      />
      <TextInput
        placeholder='Password'
        value={formState.password}
        onChangeText={(text) => setFormState({ ...formState, password: text })}
        secureTextEntry
        className='w-3/4 p-2 mb-4 bg-white rounded'
      />
      <TouchableOpacity className='bg-blue-500 w-3/4 p-3 rounded mb-4' disabled={isLoading} onPress={handleLogIn}>
        <Text className='text-white text-center'>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text className='text-blue-700'>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
