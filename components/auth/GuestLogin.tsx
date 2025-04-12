import { Alert, Text } from 'react-native';

// FUTURE: GuestLogin
export default function GuestLogin() {
  const handlePress = () => {
    Alert.alert('Guest login is not implemented yet.');
  };

  return (
    <Text role='button' className='my-4 font-body-light' onPress={handlePress}>
      Or continue without an account
    </Text>
  );
}
