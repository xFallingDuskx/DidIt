import { FontAwesome6 } from '@expo/vector-icons';
import { Animated, Text } from 'react-native';

interface AnimatedFeatureProps {
  translateValue: Animated.Value;
  iconName: string;
  featureText: string;
}

export default function AnimatedFeature({ translateValue, iconName, featureText }: AnimatedFeatureProps) {
  return (
    <Animated.View className='flex-row items-center gap-3' style={{ transform: [{ translateX: translateValue }] }}>
      <FontAwesome6 name={iconName} size={24} />
      <Text className='text-4xl font-header'>{featureText}</Text>
    </Animated.View>
  );
}
