// Alle HTTP-Aufrufe ans Backend, gesammelt an einem Ort.
// fetch() ist im Browser eingebaut – kein Extra-Paket nötig.
import { Todo } from './types';

const BASE_URL = 'http://localhost:3000';

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    // Fehlermeldung des Backends (z. B. Validierungsfehler) weiterreichen
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `HTTP ${res.status}`);
  }
  // 204 No Content hat keinen Body
  return res.status === 204 ? (undefined as T) : res.json();
}

export function getTodos(): Promise<Todo[]> {
  return fetch(`${BASE_URL}/todos`).then((res) => handle<Todo[]>(res));
}

export function createTodo(title: string): Promise<Todo> {
  return fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }).then((res) => handle<Todo>(res));
}

export function updateTodo(id: number, changes: Partial<Pick<Todo, 'title' | 'done'>>): Promise<Todo> {
  return fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  }).then((res) => handle<Todo>(res));
}

export function deleteTodo(id: number): Promise<void> {
  return fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' }).then((res) => handle<void>(res));
}
