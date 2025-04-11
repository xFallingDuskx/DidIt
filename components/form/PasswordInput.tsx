import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  className?: string;
  placeholder?: string;
}

export default function PasswordInput({ value, onChange, className = '', placeholder = 'Password',  }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`flex-row items-center bg-input rounded-md overflow-hidden mb-4 ${className}`}>
      <TextInput
        textContentType='password'
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={!showPassword}
        className='input !rounded-r-none !mb-0 flex-1'
      />
      <Pressable
        className='shrink-0 h-fit rounded-r-md px-3 py-2'
        onPress={() => setShowPassword((prev) => !prev)}
      >
        <FontAwesome6 name={showPassword ? 'eye-slash' : 'eye'} size={18} />
      </Pressable>
    </View>
  );
}
