import { Alert } from 'react-native';
import T from '../util/T';

// FUTURE: GuestLogin
export default function GuestLogin() {
  const handlePress = () => {
    Alert.alert('Guest login is not implemented yet.');
  };

  return (
    <T weight="light" className="my-4" role="button" onPress={handlePress}>
      Or continue without an account
    </T>
  );
}
