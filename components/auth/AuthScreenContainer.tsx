import { useRouter } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import GuestLogin from './GuestLogin';

interface AuthScreenContainerProps {
  type: 'login' | 'signup';
  isLoading: boolean;
  handleClick: () => void;
  children: React.ReactNode;
}

export default function AuthScreenContainer({ type, isLoading, handleClick, children }: AuthScreenContainerProps) {
  const router = useRouter();

  const handleSwitch = () => {
    if (type === 'signup') {
      router.back();
    }
    if (type === 'login') {
      router.push('/signup');
    }
  };

  return (
    <View className='h-screen-safe items-center bg-surface'>
      <View className='w-full justify-start items-center flex-1'>
        <Image source={require('../../assets/logo-blue-transparent.png')} className='w-full h-48 mt-20 mb-10' />
        <Text className='text-3xl font-header-bold mb-4'>{type === 'signup' ? 'Sign Up' : 'Log In'}</Text>
        {children}
        <Pressable className='bg-accent w-3/4 p-3 rounded mb-4' onPress={handleClick} disabled={isLoading}>
          <Text className='text-surface text-center text-lg font-body-medium'>
            {type === 'signup' ? 'Sign Up' : 'Log In'}
          </Text>
        </Pressable>
        <Pressable onPress={handleSwitch}>
          <Text className='text-accent font-body'>
            {type === 'signup' ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </Text>
        </Pressable>
      </View>
      <GuestLogin />
    </View>
  );
}
