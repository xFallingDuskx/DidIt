import { FontAwesome6 } from '@expo/vector-icons';
import { Animated } from 'react-native';
import T from '../util/T';

interface AnimatedFeatureProps {
  translateValue: Animated.Value;
  iconName: string;
  featureText: string;
}

export default function AnimatedFeature({
  translateValue,
  iconName,
  featureText,
}: AnimatedFeatureProps) {
  return (
    <Animated.View
      className="flex-row items-center gap-3"
      style={{ transform: [{ translateX: translateValue }] }}
    >
      <FontAwesome6 name={iconName} size={24} />
      <T font="header" className="text-4xl">
        {featureText}
      </T>
    </Animated.View>
  );
}
