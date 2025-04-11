import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Animated, useAnimatedValue, View } from 'react-native';
import { AnimatedFeature, PrimaryButton, SecondaryButton } from '../components';

export default function Screen() {
  const router = useRouter();
  const logoTranslateY = useAnimatedValue(200);
  const text1TranslateX = useAnimatedValue(-500);
  const text2TranslateX = useAnimatedValue(500);
  const text3TranslateX = useAnimatedValue(-500);
  const text4TranslateX = useAnimatedValue(500);
  const text5Opacity = useAnimatedValue(0);
  const buttonGroupOpacity = useAnimatedValue(0);

  useEffect(() => {
    const logoDuration = 1000;
    const textDuration = 1200;
    const textDelayGap = 100;
    Animated.timing(logoTranslateY, {
      toValue: 0,
      duration: logoDuration,
      delay: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(text1TranslateX, {
      toValue: 0,
      duration: textDuration,
      delay: logoDuration,
      useNativeDriver: true,
    }).start();
    Animated.timing(text2TranslateX, {
      toValue: 0,
      duration: textDuration,
      delay: logoDuration + textDelayGap,
      useNativeDriver: true,
    }).start();
    Animated.timing(text3TranslateX, {
      toValue: 0,
      duration: textDuration,
      delay: logoDuration + textDelayGap * 2,
      useNativeDriver: true,
    }).start();
    Animated.timing(text4TranslateX, {
      toValue: 0,
      duration: textDuration,
      delay: logoDuration + textDelayGap * 3,
      useNativeDriver: true,
    }).start();
    Animated.timing(text5Opacity, {
      toValue: 1,
      duration: textDuration,
      delay: logoDuration + textDuration + textDelayGap * 3,
      useNativeDriver: true,
    }).start();
    Animated.timing(buttonGroupOpacity, {
      toValue: 1,
      duration: textDuration,
      delay: logoDuration + textDuration + textDelayGap * 4,
      useNativeDriver: true,
    }).start();
  }, [logoTranslateY, text1TranslateX, text2TranslateX, text3TranslateX, text4TranslateX, buttonGroupOpacity]);

  return (
    <View className='h-screen-safe bg-surface p-8'>
      <Animated.Image
        source={require('../assets/logo-blue-transparent.png')}
        className='w-full h-48 my-5'
        style={{
          transform: [{ translateY: logoTranslateY }],
        }}
      />
      <View className='flex-1 items-center'>
        <View className='gap-4'>
          <AnimatedFeature featureText="Todo's" iconName='check-circle' translateValue={text1TranslateX} />
          <AnimatedFeature featureText='Reminders' iconName='bell' translateValue={text2TranslateX} />
          <AnimatedFeature featureText='Lists' iconName='list-alt' translateValue={text3TranslateX} />
          <AnimatedFeature featureText='Routines' iconName='clock' translateValue={text4TranslateX} />
          <Animated.Text
            className='mx-auto text-center text-2xl font-header-bold text-accent'
            style={{
              opacity: text5Opacity,
            }}
          >
            Get It Done.
            {/* {'\n'}
            And Done Right. */}
            {/* Say "Did It" {'\n'} More Often */}
          </Animated.Text>
        </View>
      </View>
      <Animated.View style={{ opacity: buttonGroupOpacity }}>
        <PrimaryButton text='Get Started' onPress={() => router.replace('/signup')} className='w-full' />
        <SecondaryButton text='Log In' onPress={() => router.replace('/login')} className='w-full' />
      </Animated.View>
    </View>
  );
}
