import { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={todo.done ? 'done' : ''}>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo)} />
        <span>{todo.title}</span>
      </label>
      <button className="delete" onClick={() => onDelete(todo.id)} aria-label="Löschen">
        ✕
      </button>
    </li>
  );
}
