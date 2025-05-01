import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from 'react-native';
import PrimaryButton from '../buttons/PrimaryButton';
import ScreenView from '../util/ScreenView';
import T from '../util/T';
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
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScreenView className="items-center">
        <View className="w-full justify-start items-center flex-1">
          <Image
            source={require('../../assets/logo-blue-transparent.png')}
            className="w-full h-48 mt-20 mb-4"
          />
          <T font="header" weight="bold" className="text-3xl mb-4">
            {type === 'signup' ? 'Sign Up' : 'Log In'}
          </T>
          {children}
          <PrimaryButton
            text={type === 'signup' ? 'Sign Up' : 'Log In'}
            onPress={handleClick}
            disabled={disableCtaButton}
            className="mt-2"
          />
          <Pressable onPress={handleSwitch}>
            <T className="text-accent">
              {type === 'signup'
                ? 'Already have an account? Log In'
                : "Don't have an account? Sign Up"}
            </T>
          </Pressable>
        </View>
        <GuestLogin />
      </ScreenView>
    </KeyboardAvoidingView>
  );
}
