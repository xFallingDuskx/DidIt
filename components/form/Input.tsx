import { forwardRef, useEffect } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { join } from '../../utils';

interface InputProps extends React.ComponentProps<typeof TextInput> {
  className?: string;
  inFocus?: boolean;
  setInFocus?: (inFocus: boolean) => void;
  dismissKeyboard?: boolean;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ className = '', inFocus, setInFocus, dismissKeyboard = true, ...props }, ref) => {
    useEffect(() => {
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setInFocus?.(false);
        if (dismissKeyboard) {
          Keyboard.dismiss();
        }
      });

      return () => {
        keyboardDidHideListener.remove();
      };
    }, [inFocus, setInFocus, dismissKeyboard]);

    return (
      <TextInput
        ref={ref}
        {...props}
        className={join('font-body placeholder:text-muted', className)}
        onFocus={() => setInFocus?.(true)}
        onBlur={() => setInFocus?.(false)}
      />
    );
  }
);

export default Input;
