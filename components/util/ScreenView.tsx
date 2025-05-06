import { Platform, View } from 'react-native';
import { join } from '../../utils';

interface ScreenViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScreenView({ children, className }: ScreenViewProps) {
  return (
    <View
      className={join(
        'bg-surface',
        className,
        Platform.OS === 'ios'
          ? 'h-screen pt-[env(safe-area-inset-top)] pb-[calc(env(safe-area-inset-bottom)/2)]' // account for top and bottom bezels
          : 'h-screen-safe',
      )}
    >
      {children}
    </View>
  );
}
