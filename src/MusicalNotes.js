import { useState, useEffect } from "react";

export default function MusicalNotes() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const generatedNotes = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`, // Ensuring the range between 5% to 95%
      animationDuration: `${Math.random() * 8 + 5}s`, // Duration between 5s and 10s
      animationDelay: `${Math.random() * 10}s`, // Delay between 0s and 10s
    }));
    setNotes(generatedNotes);
  }, []);

  return (
    <div className="musical-notes">
      {notes.map((note) => (
        <div
          key={note.id}
          className="musical-note"
          style={{
            left: note.left,
            animationDuration: note.animationDuration,
            animationDelay: note.animationDelay,
          }}
        >
          ♫
        </div>
      ))}
    </div>
  );
}
