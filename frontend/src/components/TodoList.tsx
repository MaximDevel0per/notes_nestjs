// Reine Darstellungskomponente: bekommt alles über Props.
import { Todo } from '../types';
import { TodoItem } from './TodoItem';
import styles from './TodoList.module.css';

interface Props {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return <p className={styles.empty}>Noch keine Todos – leg eins an!</p>;
  }

  return (
    <ul className={styles.list}>
      {/* Bei Listen braucht React ein stabiles "key"-Attribut */}
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
