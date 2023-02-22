import { useState, useEffect } from "react";
import "../assets/home.css";
import notesService from "../services/notes";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const showWhenVisible = { display: inputVisible ? "" : "none" };

  useEffect(() => {
    const fetchData = async () => {
      const notes = await notesService.getAll();
      setNotes(notes);
    };
    fetchData();
  }, []);

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

  // muuta paremmaksi window.confirmin sijaan
  const removeNote = async (removedNote) => {
    const result = window.confirm(`Delete ${removedNote.text}?`);

    if (result) {
      await notesService.remove(removedNote.id);
      setNotes(notes.filter((note) => note.id !== removedNote.id));
    }
  };

  return (
    <>
      <div className="homeContainer">
        <div className="homeColumn">
          <div>
            <div className="homeHeaderContainer">
              <div>
                <h3 className="homeHeader">Muistiinpanot</h3>
              </div>
              <div className="noteButtonContainer">
                <button
                  onClick={() => {
                    inputVisible
                      ? setInputVisible(false)
                      : setInputVisible(true);
                  }}
                  className="btn noteButton"
                >
                  {inputVisible ? "-" : "+"}
                </button>
                <button
                  onClick={() => {
                    deleteMode ? setDeleteMode(false) : setDeleteMode(true);
                  }}
                  className="btn noteDeleteModeButton"
                >
                  {deleteMode ? "_" : "x"}
                </button>
              </div>
            </div>
          </div>
          <div>
            <ul className="list">
              {notes.map((note) => (
                <li key={note.id}>
                  {note.text}{" "}
                  {deleteMode && (
                    <button
                      onClick={() => removeNote(note)}
                      className="noteDeleteButton"
                    >
                      x
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div style={showWhenVisible}>
            <form onSubmit={addNote}>
              <input
                className="homeInput"
                value={newNote}
                onChange={handleNoteChange}
              />
              <button type="submit" className="btn noteInputButton">
                +
              </button>
            </form>
          </div>
        </div>
        <div className="homeColumn">
          <h3 className="homeHeader">Viimeisimmät & tulevat muutokset</h3>
          <div>
            <ul className="list">
              <li>
                <b>itselle muistiin:</b>
              </li>
              <li>
                muista estää henkilön poisto, jos henkilöllä on lisättynä
                henkilötaulu tai henkilö on lisättynä henkilötaulussa tai muuta
                vastaavaa
              </li>
              <li>perhetauluista puuttuu pari tietoa - lisää ne</li>
              <li>
                perhetaululle / henkilölle omat iconit ja molemmista voi mennä
                kumpaan vaan
              </li>
              <li>
                pitää karsia perhetauluihin tallennettavaa dataa ja/tai
                palautettavaa dataa, koska kaikella ei tee yhtään mitään
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
