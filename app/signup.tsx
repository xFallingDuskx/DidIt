import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Text, TextInput } from 'react-native';
import { AuthScreenContainer, PasswordInput } from '../components';
import PasswordCriteria from '../components/auth/PasswordCriteria';
import { supabase } from '../supabase';
import { join } from '../utils';

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
  const [showCriteria, setShowCriteria] = useState(false);
  const [criteriaMet, setCriteriaMet] = useState(false);
  const passwordsMatch = useMemo(
    () => formState.password === formState.confirmPassword,
    [formState.password, formState.confirmPassword]
  );

  const handleSignUp = async () => {
    if (!passwordsMatch) {
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
    <AuthScreenContainer
      type='signup'
      disableCtaButton={isLoading || !criteriaMet || !passwordsMatch}
      handleClick={handleSignUp}
    >
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
        onChangeText={(text) => setFormState({ ...formState, password: text })}
        onFocus={() => setShowCriteria(true)}
        onBlur={() => setShowCriteria(false)}
        className='w-3/4 !mb-1'
      />
      <PasswordCriteria password={formState.password} expanded={showCriteria} setCriteriaMet={setCriteriaMet} />
      <PasswordInput
        placeholder='Confirm Password'
        value={formState.confirmPassword}
        onChangeText={(text) => setFormState({ ...formState, confirmPassword: text })}
        className={join('w-3/4', criteriaMet && '!mb-1')}
      />
      {criteriaMet && (
        <Text className={join('mb-4 font-body', passwordsMatch ? 'text-success' : 'text-muted')}>
          {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
        </Text>
      )}
    </AuthScreenContainer>
  );
}
