import { useRef } from 'react';
import { Actions, ActionsTypes } from '../model';

import './styles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  dispatchTodos: React.Dispatch<Actions>;
}

const InputField: React.FC<Props> = ({ todo, setTodo, dispatchTodos }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className='input'
      onSubmit={(e) => {
        e.preventDefault();
        dispatchTodos({ type: ActionsTypes.add, payload: todo });
        setTodo('');
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        placeholder='Enter a task'
        className='input__box'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className='input_submit' type='submit'>
        GO
      </button>
    </form>
  );
};

export default InputField;
