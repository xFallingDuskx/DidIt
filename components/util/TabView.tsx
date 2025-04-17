import { join } from '../../utils';
import ScreenView from './ScreenView';

interface TabViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function TabView({ children, className = '' }: TabViewProps) {
  // const tabBarHeight = useBottomTabBarHeight();
  return <ScreenView className={join('flex-1 bg-slate-200', className)}>{children}</ScreenView>;
}
