import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Actions, Todo } from '../model';
import SingleTodo from './SingleTodo';

import './styles.css';

interface Props {
  todos: Todo[];
  completedTodos: Todo[];
  dispatchTodos: React.Dispatch<Actions>;
  dispatchCompletedTodos: React.Dispatch<Actions>;
}

const TodoList: React.FC<Props> = ({
  todos,
  completedTodos,
  dispatchTodos,
  dispatchCompletedTodos,
}) => {
  return (
    <div className='container'>
      <Droppable droppableId='todos'>
        {(provided) => (
          <div
            className='todos'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                dispatchTodos={dispatchTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId='completedTodos'>
        {(provided) => (
          <div
            className='todos remove'
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className='todos__heading'>Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                dispatchTodos={dispatchCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default memo(TodoList);
