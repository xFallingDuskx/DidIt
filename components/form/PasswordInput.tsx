import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { join } from '../../utils';

interface PasswordInputProps extends React.ComponentProps<typeof TextInput> {
  value: string;
  inputClassName?: string;
}

export default function PasswordInput({
  className = '',
  inputClassName = '',
  placeholder = 'Password',
  ...textInputProps
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={join('flex-row items-center bg-input rounded-md overflow-hidden mb-4', className)}>
      <TextInput
        textContentType='password'
        secureTextEntry={!showPassword}
        className={join('input !rounded-r-none !mb-0 flex-1', inputClassName)}
        placeholder={placeholder}
        {...textInputProps}
      />
      <Pressable className='shrink-0 h-fit rounded-r-md px-3 py-2' onPress={() => setShowPassword((prev) => !prev)}>
        <FontAwesome6 name={showPassword ? 'eye-slash' : 'eye'} size={18} />
      </Pressable>
    </View>
  );
}
