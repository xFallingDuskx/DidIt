import { useEffect } from 'react';
import { Keyboard, TextInput } from 'react-native';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  className?: string;
  setInFocus?: (inFocus: boolean) => void;
  dismissKeyboard?: boolean;
}

export default function Input({ className = '', setInFocus, dismissKeyboard = true, ...props }: InputProps) {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setInFocus?.(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setInFocus?.(false);
      if (dismissKeyboard) {
        Keyboard.dismiss();
      }
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TextInput {...props} className={className} onFocus={() => setInFocus?.(true)} onBlur={() => setInFocus?.(false)} />
  );
}
