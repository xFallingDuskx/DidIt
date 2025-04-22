import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, TextInput, View } from 'react-native';
import { join } from '../../utils';
import Input from './Input';

interface PasswordInputProps extends React.ComponentProps<typeof TextInput> {
  query: string;
  setQuery?: (query: string) => void;
  inputClassName?: string;
  inFocus?: boolean;
  setInFocus?: (inFocus: boolean) => void;
}

export default function SearchInput({
  className = '',
  inputClassName = '',
  placeholder = 'Search',
  query,
  setQuery,
  inFocus = false,
  setInFocus,
  ...textInputProps
}: PasswordInputProps) {
  return (
    <View className={join('flex-row items-center bg-surface rounded-full overflow-hidden mb-4 h-12', className)}>
      <Input
        value={query}
        onChangeText={(text) => setQuery(text)}
        setInFocus={setInFocus}
        placeholder='Search todos'
        enterKeyHint='search'
        className={join(
          'h-12 px-4 py-0 font-body-medium text-lg flex-1',
          inFocus ? 'border-accent' : 'border-transparent'
        )}
        {...textInputProps}
      />
      {query.length > 0 && (
        <Pressable className='shrink-0 h-fit rounded-r-md px-3 py-2' onPress={() => setQuery('')}>
          <FontAwesome6 name='circle-xmark' size={18} color='#64748b' />
        </Pressable>
      )}
    </View>
  );
}
