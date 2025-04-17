import { Text } from 'react-native';
import { TabView } from '../../components';

export default function Screen() {
  return (
    <TabView className='relative items-center justify-start'>
      <Text className='text-2xl font-bold'>Todos</Text>
      <Text className='text-lg text-gray-500'>This is the Todos screen.</Text>
      <Text className='absolute bottom-0'>Test</Text>
    </TabView>
  );
}
