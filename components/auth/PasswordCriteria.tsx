import { Text, View } from 'react-native';
import { join } from '../../utils';

interface PasswordCriteriaProps {
  password: string;
  expanded: boolean;
}

export default function PasswordCriteria({ password, expanded }: PasswordCriteriaProps) {
  const criteria = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'At least 1 digit', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'At least 1 lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'At least 1 uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'At least 1 symbol', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  const allCriteriaMet = criteria.every((criterion) => criterion.test(password));

  return (
    <View className='mb-4'>
      {!expanded && (
        <Text className={join('font-body', allCriteriaMet ? 'text-green-500' : 'text-gray-500')}>
          {allCriteriaMet ? 'Password meets criteria' : 'Password does not meet criteria'}
        </Text>
      )}
      {expanded && (
        <View>
          {criteria.map((criterion, index) => (
            <Text key={index} className={join('font-body', criterion.test(password) ? 'text-green-500' : 'text-gray-500')}>
              {criterion.test(password) ? '✓' : '✗'} {criterion.label}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}
