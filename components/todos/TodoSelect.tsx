import { Pressable, ScrollView, View } from 'react-native';
import T from '../util/T';

function TodoSelectButton({ title }: { title: string }) {
  return (
    <Pressable className='py-2 px-3 mr-2 w-fit rounded-full border border-muted'>
      <T weight='medium'>{title}</T>
    </Pressable>
  );
}

export default function TodoSelect() {
  return (
    <View className='w-screen py-3 overflow-scroll'>
      <ScrollView horizontal={true} className='pl-4 pr-8 w-full'>
        <TodoSelectButton title='All' />
        <TodoSelectButton title='By Date' />
        <TodoSelectButton title='Unplanned' />
        <TodoSelectButton title='Past Due' />
      </ScrollView>
    </View>
  );
}
