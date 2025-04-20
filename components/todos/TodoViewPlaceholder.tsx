import { useTodoTab } from '../../contexts/TodoContext';
import T from '../util/T';

export default function TodoViewPlaceholder() {
  const { tabView } = useTodoTab();
  let message = '';

  switch (tabView) {
    case 'all':
      message = 'No todos available';
      break;
    case 'by date':
      message = 'No todos available for this day';
      break;
    case 'unplanned':
      message = 'No unplanned todos';
      break;
    case 'past due':
      message = 'No past due todos, great work!';
      break;
    default:
      message = '';
  }

  return (
    <T weight='medium' className='text-center'>
      {message}
    </T>
  );
}
