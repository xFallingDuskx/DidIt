import { useLocalSearchParams } from 'expo-router';
import { ScreenView, T } from '../../components';

export default function TodosDetailedView() {
  const { todoId } = useLocalSearchParams();

  return (
    <ScreenView>
      <T>Todo ID: {todoId}</T>
    </ScreenView>
  );
}
