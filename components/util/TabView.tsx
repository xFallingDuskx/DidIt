import { View } from 'react-native';
import { join } from '../../utils';

interface TabViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function TabView({ children, className = '' }: TabViewProps) {
  // const tabBarHeight = useBottomTabBarHeight();
  // console.log('tabBarHeight', tabBarHeight); // REMOVE

  return <View className={join('flex-1', className)}>{children}</View>;
}
