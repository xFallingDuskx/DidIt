import { Pressable, Text } from 'react-native';

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({ text, onPress, disabled = false, className = '' }: PrimaryButtonProps) {
  return (
    <Pressable
      className={`bg-accent w-3/4 p-3 rounded mb-4 disabled:bg-slate-600 ${className}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`text-surface text-center text-lg font-body-medium ${disabled ? 'opacity-50' : ''}`}>
        {text}
      </Text>
    </Pressable>
  );
}
