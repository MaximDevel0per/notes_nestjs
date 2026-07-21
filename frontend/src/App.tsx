// Die Hauptkomponente. Sie hält den State (die Todo-Liste) und
// reicht Daten und Callbacks an die Kindkomponenten weiter.
import { useEffect, useState } from 'react';
import * as api from './api';
import { Todo } from './types';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
// styles ist ein Objekt: styles.app enthält den generierten,
// eindeutigen Klassennamen für die .app-Regel aus App.module.css.
import styles from './App.module.css';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect mit leerem Dependency-Array [] läuft genau einmal
  // nach dem ersten Rendern – hier laden wir die Todos vom Backend.
  useEffect(() => {
    api
      .getTodos()
      .then(setTodos)
      .catch((e: Error) => setError(`Backend nicht erreichbar? ${e.message}`))
      .finally(() => setLoading(false));
  }, []);

  async function handleAdd(title: string) {
    try {
      const created = await api.createTodo(title);
      // State nie direkt verändern – immer ein neues Array erzeugen.
      setTodos((prev) => [...prev, created]);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function handleToggle(todo: Todo) {
    try {
      const updated = await api.updateTodo(todo.id, { done: !todo.done });
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  async function handleDelete(id: number) {
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError((e as Error).message);
    }
  }

  const openCount = todos.filter((t) => !t.done).length;

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>Todos</h1>
      <p className={styles.subtitle}>
        {loading ? 'Lade…' : `${openCount} von ${todos.length} offen`}
      </p>

      <AddTodo onAdd={handleAdd} />

      {error && <p className={styles.error}>{error}</p>}

      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
    </main>
  );
}
