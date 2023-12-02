import { useState } from "react";
import styles from "../assets/home.module.css";
import notesService from "../services/notes";
import DeleteModal from "../components/DeleteModal";
import { Await, useLoaderData } from "react-router";

const Home = () => {
  const data = useLoaderData();
  const [notes, setNotes] = useState(data || []);
  const [newNote, setNewNote] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const showWhenVisible = { display: inputVisible ? "" : "none" };

  const addNote = async (event) => {
    event.preventDefault();
    const returnedNote = await notesService.create({ text: newNote });
    setNotes(notes.concat(returnedNote));
    setNewNote("");
    setInputVisible(false);
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const removeNote = async (removedNote) => {
    await notesService.remove(removedNote.id);
    setNotes(notes.filter((note) => note.id !== removedNote.id));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.column}>
          <div>
            <div className={styles.headerContainer}>
              <div>
                <h3 className={styles.header}>Muistiinpanot</h3>
              </div>
              <div>
                <button
                  onClick={() => {
                    inputVisible
                      ? setInputVisible(false)
                      : setInputVisible(true);
                  }}
                  className={`btn ${styles.noteButton}`}
                >
                  {inputVisible ? "-" : "+"}
                </button>
                <button
                  onClick={() => {
                    deleteMode ? setDeleteMode(false) : setDeleteMode(true);
                  }}
                  className={`btn ${styles.deleteModeButton}`}
                >
                  {deleteMode ? "_" : "x"}
                </button>
              </div>
            </div>
          </div>
          <div>
            <Await resolve={notes}>
              <ul className="list">
                {notes.map((note) => (
                  <li key={note.id}>
                    <div className={styles.noteContainer}>
                      {note.text}
                      {deleteMode && (
                        <DeleteModal
                          headerTextPart={"muistiinpanon"}
                          removeNote={removeNote}
                          note={note}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Await>
          </div>
          <div style={showWhenVisible}>
            <form onSubmit={addNote}>
              <input
                className={styles.homeInput}
                value={newNote}
                onChange={handleNoteChange}
              />
              <button type="submit" className={`btn ${styles.noteButton}`}>
                +
              </button>
            </form>
          </div>
        </div>
        <div className={styles.column}>
          <h3 className={styles.header}>Päivitykset</h3>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Home;

async function loadNotes() {
  const data = await notesService.getAll();
  return data;
}

export function loader() {
  return loadNotes();
}
