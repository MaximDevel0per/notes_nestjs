// Formular zum Anlegen. Zeigt ein "kontrolliertes Input":
// Der Wert des Feldes lebt im React-State, nicht im DOM.
import { FormEvent, useState } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export function AddTodo({ onAdd }: Props) {
  const [title, setTitle] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault(); // verhindert den klassischen Seiten-Reload
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Was ist zu tun?"
        aria-label="Neues Todo"
      />
      <button type="submit">Hinzufügen</button>
    </form>
  );
}
