import { Pressable } from 'react-native';
import { join } from '../../utils';
import T from '../util/T';

interface SecondaryButtonProps {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

export default function SecondaryButton({ text, onPress, disabled = false, className = '' }: SecondaryButtonProps) {
  return (
    <Pressable
      className={join('border-2 border-accent w-3/4 p-3 rounded-full mb-4 disabled:border-slate-600', className)}
      onPress={onPress}
      disabled={disabled}
    >
      <T weight='medium' className={join('text-accent text-center text-lg', disabled && 'opacity-50')}>
        {text}
      </T>
    </Pressable>
  );
}
