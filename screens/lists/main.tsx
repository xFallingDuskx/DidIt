import { Text } from 'react-native';
import { TabView } from '../../components';

export default function Screen() {
  return (
    <TabView className='relative items-center justify-center'>
      <Text className='text-2xl font-bold'>Lists</Text>
      <Text className='text-lg text-gray-500'>This is the Lists screen.</Text>
      <Text className='absolute bottom-0'>Test</Text>
    </TabView>
  );
}
