export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export enum ActionsTypes {
  'add',
  'remove',
  'done',
  'edit',
  'changeIndex',
  'insertTodo',
}

export type Actions =
  | { type: ActionsTypes.add; payload: string }
  | { type: ActionsTypes.remove; payload: number }
  | { type: ActionsTypes.done; payload: number }
  | { type: ActionsTypes.edit; payload: { id: number; todo: string } }
  | {
      type: ActionsTypes.changeIndex;
      payload: { oldIndex: number; newIndex: number };
    }
  | {
      type: ActionsTypes.insertTodo;
      payload: { todo: Todo; insertIndex: number };
    };
