// Muss zur Backend-Definition passen (backend/src/todos/todo.interface.ts).
// In größeren Projekten teilt man solche Typen über ein gemeinsames Paket.
export interface Todo {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
}
