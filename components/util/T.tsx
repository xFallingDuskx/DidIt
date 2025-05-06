import { Text } from 'react-native';
import { join } from '../../utils';

type FontWeights = {
  body:
    | 'thin'
    | 'extra-light'
    | 'light'
    | 'regular'
    | 'medium'
    | 'semibold'
    | 'bold';
  header: 'regular' | 'medium' | 'semibold' | 'bold';
  brand: 'regular' | 'medium' | 'semibold' | 'bold';
};

interface TProps extends React.ComponentProps<typeof Text> {
  font?: keyof FontWeights;
  weight?: FontWeights[keyof FontWeights];
  className?: string;
}

const FontClasses: Record<keyof FontWeights, Record<string, string>> = {
  body: {
    thin: '!font-body-thin',
    'extra-light': '!font-body-extra-light',
    light: '!font-body-light',
    regular: '!font-body',
    medium: '!font-body-medium',
    semibold: '!font-body-semibold',
    bold: '!font-body-bold',
  },
  header: {
    regular: '!font-header',
    medium: '!font-header-medium',
    semibold: '!font-header-semibold',
    bold: '!font-header-bold',
  },
  brand: {
    regular: '!font-brand',
    medium: '!font-brand-medium',
    semibold: '!font-brand-semibold',
    bold: '!font-brand-bold',
  },
} as const;

export default function T({
  font = 'body',
  weight = 'regular',
  className,
  ...props
}: TProps) {
  const fontClass = FontClasses[font]?.[weight] || '';
  return <Text {...props} className={join(className, fontClass)} />;
}
