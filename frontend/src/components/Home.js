import React, { useState, useEffect } from "react";
import "../assets/home.css";
import notesService from "../services/notes";
import DeleteModal from "./modal/DeleteModal";

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

  const removeNote = async (removedNote) => {
    await notesService.remove(removedNote.id);
    setNotes(notes.filter((note) => note.id !== removedNote.id));
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
                  <div className="noteContainer">
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
          <h3 className="homeHeader">Viimeisimm??t & tulevat muutokset</h3>
          <div>
            <ul className="list">
              <li>
                <b>To do:</b>
              </li>
              <li>Footer?</li>
              <li>Sukupuu - perhetaulujen mukaan vai laajemmin?</li>
              <li>Tulostus</li>
              <li>Etsi toimintakuntoon</li>
              <li>Responsiivisuus/mobiili?</li>
              <li>Ylipitk??t nimet, vaikka niit?? ei tod.n??k. ole</li>
              <li>Iconit?</li>
              <li>Tarviiko taulukkoja s????t?????</li>
              <li>Siivoa koodi/tyylittely yms. yms.</li>
              <li>Required tiedot front/backend</li>
              <li>Virheenk??sittely</li>
              <li>
                Lis???? t??h??n ominaisuus, ett?? admin voi kirjoittaa t??h??n suoraan
                ilman, ett?? tarvitsee kovakoodata. Tarvinneeko?
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
