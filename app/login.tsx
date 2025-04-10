import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
    <View className='flex-1 justify-center items-center bg-surface'>
      <Image source={require('../assets/logo-blue-transparent.png')} className='w-full h-48 -translate-y-1/4' />
      <Text className='text-3xl font-header-bold mb-4'>
        Log In
      </Text>
      <TextInput
        keyboardType='email-address'
        textContentType='emailAddress'
        placeholder='Email'
        value={formState.email}
        onChangeText={(text) => setFormState({ ...formState, email: text })}
        className='input w-3/4'
      />
      <TextInput
        textContentType='password'
        placeholder='Password'
        value={formState.password}
        onChangeText={(text) => setFormState({ ...formState, password: text })}
        secureTextEntry
        className='input w-3/4'
      />
      <TouchableOpacity className='bg-accent w-3/4 p-3 rounded mb-4' disabled={isLoading} onPress={handleLogIn}>
        <Text className='text-surface text-center text-lg font-body-medium'>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/signup')}>
        <Text className='text-accent font-body'>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
