import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import PrimaryButton from '../buttons/PrimaryButton';
import ScreenView from '../util/ScreenView';
import GuestLogin from './GuestLogin';

interface AuthScreenContainerProps {
  type: 'login' | 'signup';
  disableCtaButton: boolean;
  handleClick: () => void;
  children: React.ReactNode;
}

export default function AuthScreenContainer({
  type,
  disableCtaButton,
  handleClick,
  children,
}: AuthScreenContainerProps) {
  const router = useRouter();
  const keyboardVerticalOffset = useMemo(() => {
    if (Platform.OS === 'ios' && type === 'signup') {
      return -150;
    }
    if (Platform.OS === 'ios' && type === 'login') {
      return -250;
    }
    if (Platform.OS === 'android' && type === 'signup') {
      return -50;
    }
    if (Platform.OS === 'android' && type === 'login') {
      return -150;
    }
    return undefined;
  }, [type]);

  const handleSwitch = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    const route = type === 'signup' ? '/login' : '/signup';
    router.push(route);
  };

  return (
    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>
      <ScreenView className='items-center'>
        <View className='w-full justify-start items-center flex-1'>
          <Image source={require('../../assets/logo-blue-transparent.png')} className='w-full h-48 mt-20 mb-4' />
          <Text className='text-3xl font-header-bold mb-4'>{type === 'signup' ? 'Sign Up' : 'Log In'}</Text>
          {children}
          <PrimaryButton
            text={type === 'signup' ? 'Sign Up' : 'Log In'}
            onPress={handleClick}
            disabled={disableCtaButton}
            className='mt-2'
          />
          <Pressable onPress={handleSwitch}>
            <Text className='text-accent font-body'>
              {type === 'signup' ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </Text>
          </Pressable>
        </View>
        <GuestLogin />
      </ScreenView>
    </KeyboardAvoidingView>
  );
}
