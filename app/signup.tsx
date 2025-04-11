import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, TextInput } from 'react-native';
import { AuthScreenContainer, PasswordInput } from '../components';
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
    <AuthScreenContainer type='signup' isLoading={isLoading} handleClick={handleSignUp}>
      <TextInput
        keyboardType='email-address'
        textContentType='emailAddress'
        value={formState.email}
        onChangeText={(text) => setFormState({ ...formState, email: text })}
        placeholder='Email'
        className='input w-3/4'
      />
      <PasswordInput
        value={formState.password}
        onChange={(text) => setFormState({ ...formState, password: text })}
        className='w-3/4'
      />
      <PasswordInput
        placeholder='Confirm Password'
        value={formState.confirmPassword}
        onChange={(text) => setFormState({ ...formState, confirmPassword: text })}
        className='w-3/4'
      />
    </AuthScreenContainer>
  );
}
