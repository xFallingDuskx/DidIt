import { Pressable } from 'react-native';
import { join } from '../../utils';
import { T } from '../../components';

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
      <T weight='medium' className={join('text-surface text-center text-lg', disabled && 'opacity-50')}>
        {text}
      </T>
    </Pressable>
  );
}
