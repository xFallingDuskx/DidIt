import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, TextInput } from 'react-native';
import { AuthScreenContainer, PasswordInput } from '../components';
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
    <AuthScreenContainer type='login' isLoading={isLoading} handleClick={handleLogIn}>
      <TextInput
        keyboardType='email-address'
        textContentType='emailAddress'
        placeholder='Email'
        value={formState.email}
        onChangeText={(text) => setFormState({ ...formState, email: text })}
        className='input w-3/4'
      />
      <PasswordInput
        value={formState.password}
        onChange={(text) => setFormState({ ...formState, password: text })}
        className='w-3/4'
      />
    </AuthScreenContainer>
  );
}
