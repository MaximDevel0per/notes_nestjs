import { Todo } from '../types';
import styles from './TodoItem.module.css';

interface Props {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`${styles.item} ${todo.done ? styles.done : ''}`}>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo)} />
        <span>{todo.title}</span>
      </label>
      <button className={styles.delete} onClick={() => onDelete(todo.id)} aria-label="Löschen">
        ✕
      </button>
    </li>
  );
}
