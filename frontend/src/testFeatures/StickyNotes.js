import StickyNote from "./StickyNote";
import { useState } from "react";

const StickyNotes = () => {
  const [notes, setNotes] = useState([]);

  const handleNoteMove = (id, x, y) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, x, y } : note)));
  };

  const handleNoteAdd = (text) => {
    const newNote = {
      id: notes.length + 1,
      text,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    setNotes([...notes, newNote]);
  };

  const handleNoteDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const [newNoteText, setNewNoteText] = useState("");

  const handleNewNoteTextChange = (event) => {
    setNewNoteText(event.target.value);
  };

  const handleNewNoteAdd = () => {
    if (newNoteText !== "") {
      handleNoteAdd(newNoteText);
      setNewNoteText("");
    }
  };

  return (
    <div style={{ border: "1px solid black" }}>
      <div>
        <input
          type="text"
          value={newNoteText}
          onChange={handleNewNoteTextChange}
        />
        <button onClick={handleNewNoteAdd}>Add Note</button>
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            text={note.text}
            x={note.x}
            y={note.y}
            onMove={(x, y) => handleNoteMove(note.id, x, y)}
            onDelete={() => handleNoteDelete(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default StickyNotes;
