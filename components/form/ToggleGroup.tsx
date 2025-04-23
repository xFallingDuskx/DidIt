import { Pressable, View } from 'react-native';
import { join } from '../../utils';
import T from '../util/T';

export interface ToggleGroupOption {
  label: string;
  value: string;
}

interface ToggleGroupProps {
  selectedValue: string;
  onChange: (value: string) => void;
  options: ToggleGroupOption[];
  optionWidth?: 'fit' | 'even';
  className?: string;
}

export default function ToggleGroup({
  selectedValue,
  onChange,
  options,
  optionWidth = 'even',
  className,
}: ToggleGroupProps) {
  return (
    <View className={join('flex-row rounded-lg overflow-hidden', optionWidth === 'fit' && 'w-fit', className)}>
      {options.map((option, index) => (
        <Pressable
          key={option.value}
          onPress={() => onChange(option.value)}
          className={join(
            'p-2 border border-accent',
            optionWidth === 'even' ? 'flex-1' : 'w-fit',
            selectedValue === option.value && 'bg-accent',
            index === 0 && 'rounded-l-lg',
            index === options.length - 1 && 'rounded-r-lg'
          )}
        >
          <T className={join('text-center', selectedValue === option.value && 'text-white')}>{option.label}</T>
        </Pressable>
      ))}
    </View>
  );
}
