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
    <View className='flex-1 justify-start items-center bg-surface'>
      <Image source={require('../assets/logo-blue-transparent.png')} className='w-full h-48 mt-20 mb-10' />
      <Text className='text-3xl font-header-bold mb-4'>Sign Up</Text>
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
      <TouchableOpacity className='bg-accent w-3/4 p-3 rounded mb-4' onPress={handleSignUp} disabled={isLoading}>
        <Text className='text-surface text-center text-lg font-body-medium'>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text className='text-accent font-body'>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
