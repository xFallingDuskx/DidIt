import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { join } from '../../utils';
import T from '../util/T';

interface PasswordCriteriaProps {
  password: string;
  expanded: boolean;
  setCriteriaMet: (value: boolean) => void;
}

export default function PasswordCriteria({ password, expanded, setCriteriaMet }: PasswordCriteriaProps) {
  const criteria = useMemo(
    () => [
      { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
      { label: 'At least 1 digit', test: (pwd: string) => /\d/.test(pwd) },
      { label: 'At least 1 lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
      { label: 'At least 1 uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
      { label: 'At least 1 symbol', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
    ],
    []
  );

  const allCriteriaMet = useMemo(() => criteria.every((criterion) => criterion.test(password)), [criteria, password]);
  useEffect(() => {
    setCriteriaMet(allCriteriaMet);
  }, [allCriteriaMet, setCriteriaMet]);

  return (
    <View className='mb-4'>
      {!expanded && (
        <T className={join(allCriteriaMet ? 'text-success' : 'text-muted')}>
          {allCriteriaMet ? 'Password meets criteria' : 'Password does not meet criteria'}
        </T>
      )}
      {expanded && (
        <View>
          {criteria.map((criterion, index) => (
            <T key={index} className={join(criterion.test(password) ? 'text-success' : 'text-muted')}>
              {criterion.test(password) ? '✓' : '✗'} {criterion.label}
            </T>
          ))}
        </View>
      )}
    </View>
  );
}
