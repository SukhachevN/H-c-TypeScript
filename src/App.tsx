import React, { useReducer, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import InputField from './components/InputField';
import { Actions, ActionsTypes, Todo } from './model';
import TodoList from './components/TodoList';

import './App.css';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');

  const todosReducer = (state: Todo[], action: Actions) => {
    switch (action.type) {
      case ActionsTypes.add:
        return [
          ...state,
          { id: Date.now(), todo: action.payload, isDone: false },
        ];
      case ActionsTypes.remove:
        return state.filter(({ id }) => id !== action.payload);
      case ActionsTypes.done:
        return state.map((val) =>
          val.id === action.payload ? { ...val, isDone: !val.isDone } : val
        );
      case ActionsTypes.edit: {
        const { id, todo } = action.payload;
        return state.map((val) => (val.id === id ? { ...val, todo } : val));
      }
      case ActionsTypes.changeIndex: {
        const { oldIndex, newIndex } = action.payload;
        const item = state[oldIndex];
        let stateCopy = [...state];
        stateCopy.splice(oldIndex, 1);
        stateCopy.splice(newIndex, 0, item);
        return stateCopy;
      }
      case ActionsTypes.insertTodo: {
        const { todo, insertIndex } = action.payload;
        const stateCopy = [...state];
        stateCopy.splice(insertIndex, 0, todo);
        return stateCopy;
      }
      default:
        return state;
    }
  };
  const [todos, dispatchTodos] = useReducer(todosReducer, []);
  const [completedTodos, dispatchCompletedTodos] = useReducer(todosReducer, []);

  const getDispatch = (droppableId: string) =>
    droppableId === 'todos' ? dispatchTodos : dispatchCompletedTodos;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const movedTodo =
      source.droppableId === 'todos'
        ? todos[source.index]
        : completedTodos[source.index];
    const sourceDispatch = getDispatch(source.droppableId);
    const destinationDispatch = getDispatch(destination.droppableId);

    if (source.droppableId === destination.droppableId) {
      sourceDispatch({
        type: ActionsTypes.changeIndex,
        payload: { oldIndex: source.index, newIndex: destination.index },
      });
    } else {
      sourceDispatch({ type: ActionsTypes.remove, payload: movedTodo.id });
      destinationDispatch({
        type: ActionsTypes.insertTodo,
        payload: { todo: movedTodo, insertIndex: destination.index },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App'>
        <span className='heading'>Taskify</span>
        <InputField
          todo={todo}
          setTodo={setTodo}
          dispatchTodos={dispatchTodos}
        />
        <TodoList
          todos={todos}
          dispatchTodos={dispatchTodos}
          completedTodos={completedTodos}
          dispatchCompletedTodos={dispatchCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
