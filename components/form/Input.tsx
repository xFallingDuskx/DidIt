import { forwardRef, useEffect } from 'react';
import { Keyboard, TextInput } from 'react-native';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  className?: string;
  setInFocus?: (inFocus: boolean) => void;
  dismissKeyboard?: boolean;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ className = '', setInFocus, dismissKeyboard = true, ...props }, ref) => {
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
      <TextInput
        ref={ref}
        {...props}
        className={className}
        onFocus={() => setInFocus?.(true)}
        onBlur={() => setInFocus?.(false)}
      />
    );
  }
);

export default Input;
