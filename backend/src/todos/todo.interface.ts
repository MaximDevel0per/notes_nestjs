// Ein einfaches TypeScript-Interface als Datenmodell.
// Interfaces existieren nur zur Compile-Zeit (kein JavaScript-Output).
export interface Todo {
  id: number;
  title: string;
  done: boolean;
  createdAt: string; // ISO-Datum
}
