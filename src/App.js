import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      text: '',
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  const updateNoteText = (text) => {
    setNotes(
      notes.map((note) =>
        note.id === selectedNoteId ? { ...note, text } : note
      )
    );
  };

  const getSelectedNoteText = () => {
    const selectedNote = notes.find((note) => note.id === selectedNoteId);
    return selectedNote ? selectedNote.text : '';
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <div className="sidebar">
        <button onClick={addNote} className="add-note-btn">
          Добавить запись
        </button>
        <input
          type="text"
          className="search-input"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul className="notes-list">
          {filteredNotes.map((note) => (
            <li
              key={note.id}
              className={`note-item ${
                note.id === selectedNoteId ? 'active' : ''
              }`}
            >
              <span onClick={() => setSelectedNoteId(note.id)}>
                {note.text.slice(0, 30) || 'Новая запись'}
              </span>
              <button
                className="delete-btn"
                onClick={() => deleteNote(note.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="note-editor">
        {selectedNoteId ? (
          <textarea
            value={getSelectedNoteText()}
            onChange={(e) => updateNoteText(e.target.value)}
            placeholder="Напишите что-нибудь..."
          />
        ) : (
          <p className="no-note-text">Выберите или добавьте запись</p>
        )}
      </div>
    </div>
  );
};

export default App;
