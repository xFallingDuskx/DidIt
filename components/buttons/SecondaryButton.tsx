import { Pressable, Text } from 'react-native';

interface SecondaryButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

export default function SecondaryButton({ text, onPress, disabled = false, className = '' }: SecondaryButtonProps) {
  return (
    <Pressable
      className={`border-2 border-accent w-3/4 p-3 rounded mb-4 disabled:border-slate-600 ${className}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`text-accent text-center text-lg font-body-medium ${disabled ? 'opacity-50' : ''}`}>
        {text}
      </Text>
    </Pressable>
  );
}
