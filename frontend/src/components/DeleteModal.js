import { useState } from "react";
import { TrashIcon } from "../assets/Icons";
import Modal from "react-modal";
import styles from "../assets/deleteModal.module.css";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
  },
};

Modal.setAppElement("#root");

const DeleteButton = ({ onClick }) => (
  <button
    className={`btn btn-outline-danger ${styles.deleteButton}`}
    onClick={onClick}
  >
    Poista
  </button>
);

const DeleteModal = ({
  removeNote,
  removePerson,
  removeFamilyTable,
  note,
  person,
  familytable,
  headerTextPart,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {note && (
        <button className={styles.modalXButton} onClick={openModal}>
          x
        </button>
      )}
      {(person || familytable) && (
        <div className="mx-1" style={{ cursor: "pointer" }} onClick={openModal}>
          <TrashIcon />
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h4 className={styles.header}>
          Haluatko varmasti poistaa {headerTextPart}?
        </h4>
        <div className={styles.text}>
          <p>
            {note?.text} {person?.firstNames} {person?.lastName}{" "}
            {familytable?.person.firstNames} {familytable?.person.lastName}
          </p>
        </div>
        <div>
          {note ? (
            <DeleteButton onClick={() => removeNote(note)} />
          ) : person ? (
            <DeleteButton
              onClick={() => {
                removePerson(person);
                closeModal();
              }}
            />
          ) : familytable ? (
            <DeleteButton
              onClick={() => {
                removeFamilyTable(familytable);
                closeModal();
              }}
            />
          ) : null}
          <button
            className={`btn btn-outline-secondary ${styles.cancelButton}`}
            onClick={closeModal}
          >
            Peruuta
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
