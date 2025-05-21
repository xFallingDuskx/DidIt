import { TODO_ACTION_DID_IT } from './constants';

export type PressAction = { id: string; title: string };

export const TODO_PRESS_ACTIONS: PressAction[] = [
  {
    id: TODO_ACTION_DID_IT,
    title: 'Did it!',
  },
];
