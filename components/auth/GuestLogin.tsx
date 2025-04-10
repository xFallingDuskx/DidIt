import { Alert, Text } from 'react-native';

// FUTURE: GuestLogin
/** Requires that parent has `relative` positioning */
export default function GuestLogin() {
  const handlePress = () => {
    Alert.alert('Guest login is not implemented yet.');
  };

  return (
    <Text role='button' className='absolute bottom-3 font-body-light' onPress={handlePress}>
      Or continue without an account
    </Text>
  );
}
