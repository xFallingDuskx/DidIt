import { Pressable, Text } from 'react-native';
import { join } from '../../utils';

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({ text, onPress, disabled = false, className = '' }: PrimaryButtonProps) {
  return (
    <Pressable
      className={join('bg-accent w-3/4 p-3 rounded-full mb-4 disabled:bg-slate-300', className)}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className={`text-surface text-center text-lg font-body-medium ${disabled ? 'opacity-50' : ''}`}>
        {text}
      </Text>
    </Pressable>
  );
}
