import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../supabase';

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Screen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = async () => {
    if (formState.password !== formState.confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email: formState.email,
      password: formState.password,
    });

    if (error) {
      Alert.alert(error.message);
      setIsLoading(false);
      return;
    }

    Alert.alert('Check your email for the confirmation link');
    router.push('/');
  };

  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <Image source={require('../assets/logo-blue-transparent.png')} className='w-full h-48 -translate-y-1/4' />
      <Text className='text-2xl font-bold mb-4'>Sign Up</Text>
      <TextInput
        keyboardType='email-address'
        textContentType='emailAddress'
        value={formState.email}
        onChangeText={(text) => setFormState({ ...formState, email: text })}
        placeholder='Email'
        className='input w-3/4'
      />
      <TextInput
        textContentType='password'
        value={formState.password}
        onChangeText={(text) => setFormState({ ...formState, password: text })}
        placeholder='Password'
        secureTextEntry
        className='input w-3/4'
      />
      <TextInput
        textContentType='password'
        value={formState.confirmPassword}
        onChangeText={(text) => setFormState({ ...formState, confirmPassword: text })}
        placeholder='Confirm Password'
        secureTextEntry
        className='input w-3/4'
      />
      <TouchableOpacity className='bg-blue-500 w-3/4 p-3 rounded mb-4' onPress={handleSignUp} disabled={isLoading}>
        <Text className='text-white text-center'>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className='text-accent font-semibold'>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
