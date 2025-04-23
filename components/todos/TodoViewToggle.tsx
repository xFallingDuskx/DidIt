import { ScrollView, View } from 'react-native';
import TodoSelectButton from './TodoSelectButton';

export default function TodoSelect() {
  return (
    <View className='w-screen py-3 overflow-scroll'>
      <ScrollView horizontal={true} className='pl-4 pr-8 w-full'>
        <TodoSelectButton view='all' />
        <TodoSelectButton view='by date' />
        <TodoSelectButton view='unplanned' />
        <TodoSelectButton view='past due' />
      </ScrollView>
    </View>
  );
}
