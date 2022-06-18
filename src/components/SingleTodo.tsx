import { Actions, ActionsTypes, Todo } from '../model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

import './styles.css';
import classNames from 'classnames';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  index: number;
  todo: Todo;
  dispatchTodos: React.Dispatch<Actions>;
};

const SingleTodo: React.FC<Props> = ({
  index,
  todo: { id, todo, isDone },
  dispatchTodos,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<string>(todo);

  const hanldeDone = () =>
    dispatchTodos({ type: ActionsTypes.done, payload: id });

  const handleDelete = () =>
    dispatchTodos({ type: ActionsTypes.remove, payload: id });

  const handleEdit = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      dispatchTodos({
        type: ActionsTypes.edit,
        payload: { id, todo: editedTodo },
      });
      setIsEditing(false);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <form
          className='todos__single'
          onKeyDown={(e) => handleEdit(e)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <input
              ref={inputRef}
              className='todos__single--text'
              value={editedTodo}
              onChange={(e) => setEditedTodo(e.target.value)}
            />
          ) : (
            <span
              className={classNames('todos__single--text', {
                'todos__single--completed': isDone,
              })}
            >
              {todo}
            </span>
          )}

          <div>
            <button
              className='icon'
              onClick={(e) => {
                e.preventDefault();
                !isDone && setIsEditing((state) => !state);
              }}
            >
              <AiFillEdit />
            </button>
            <button
              className='icon'
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              <AiFillDelete />
            </button>
            <button
              className='icon'
              onClick={(e) => {
                e.preventDefault();
                hanldeDone();
              }}
            >
              <MdDone />
            </button>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default memo(SingleTodo);
