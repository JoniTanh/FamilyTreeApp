import React, { useRef, useEffect, useState } from "react";
import { TrashIcon } from "../assets/Icons";

const StickyNote = ({ text, x, y, onMove, onDelete }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const noteRef = useRef(null);

  useEffect(() => {
    const handleMouseDown = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const { left, top } = noteRef.current.getBoundingClientRect();
      setDragging(true);
      setOffset({ x: mouseX - left, y: mouseY - top });
    };

    const handleMouseMove = (e) => {
      if (dragging) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const offsetX = mouseX - offset.x;
        const offsetY = mouseY - offset.y;
        const noteWidth = noteRef.current.offsetWidth;
        const noteHeight = noteRef.current.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const maxX = windowWidth - noteWidth;
        const maxY = windowHeight - noteHeight;
        const newX = Math.min(Math.max(0, offsetX), maxX);
        const newY = Math.min(Math.max(0, offsetY), maxY);
        setPosition({ x: newX, y: newY });
        onMove(newX, newY);
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    /*const handleResize = () => {
      const noteElement = noteRef.current;
      if (noteElement) {
        const { left, top } = noteElement.getBoundingClientRect();
        const noteWidth = noteElement.offsetWidth;
        const noteHeight = noteElement.offsetHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const maxX = windowWidth - noteWidth;
        const maxY = windowHeight - noteHeight;
        const newX = Math.min(Math.max(0, left), maxX);
        const newY = Math.min(Math.max(0, top), maxY);
        setPosition({ x: newX, y: newY });
        onMove(newX, newY);
      }
    };*/

    const noteElement = noteRef.current;

    if (noteElement) {
      noteElement.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    //window.addEventListener("resize", handleResize);

    return () => {
      if (noteElement) {
        noteElement.removeEventListener("mousedown", handleMouseDown);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      //window.removeEventListener("resize", handleResize);
    };
  }, [dragging, offset, onMove]);

  return (
    <div
      ref={noteRef}
      style={{
        backgroundColor: "yellow",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: dragging ? 1 : 0,
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-13px",
          right: "8px",
          width: "0",
          height: "0",
          zIndex: 1,
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={onDelete}>
          <TrashIcon />
        </div>
      </div>
      <div>{text}</div>
    </div>
  );
};

export default StickyNote;
