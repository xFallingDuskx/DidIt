import { Pressable } from 'react-native';
import { TodoTabView, useTodoTab } from '../../contexts/TodoContext';
import { capitalize, join } from '../../utils';
import T from '../util/T';

export default function TodoSelectButton({ view }: { view: TodoTabView }) {
  const { tabView, setTabView } = useTodoTab();
  const handlePress = () => {
    setTabView(view);
  };

  return (
    <Pressable
      className={join(
        'py-2 px-3 mr-2 w-fit rounded-full border',
        tabView === view && 'bg-accent border-accent',
        tabView !== view && 'border-muted',
      )}
      onPress={handlePress}
    >
      <T weight="medium" className={join(tabView === view && 'text-surface')}>
        {capitalize(view)}
      </T>
    </Pressable>
  );
}
