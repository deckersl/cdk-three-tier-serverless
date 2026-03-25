import React, { useEffect, useState } from 'react';

import { NoteType } from '../fns/notesTable';
import { getNotes, saveNote } from './utils';

const App = () => {
  const [body, setBody] = useState('');
  const [notes, setNotes] = useState([]);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    getNotes().then((n) => setNotes(n));
  }, []);

  const clickHandler = async () => {
    if (body && subject) {
      setBody('');
      setSubject('');
      await saveNote({
        date: new Date().toISOString(),
        note: body,
        subject,
        type: 'note',
      });
      setNotes(await getNotes());
    }
  };

  return (
    <>
      <div className="app">
        <h1>📝 Serverless Notes</h1>
        <p className="subtitle">Three-tier serverless app — API Gateway · Lambda · DynamoDB</p>

        <div className="form">
          <input
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            type="text"
            value={subject}
          />
          <textarea
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a note…"
            value={body}
            rows={3}
          />
          <button onClick={clickHandler}>Save Note</button>
        </div>

        {notes.length === 0 ? (
          <p className="empty">No notes yet — create one above.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Note</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note: NoteType) => (
                <tr key={note.date}>
                  <td>{note.subject}</td>
                  <td>{note.note}</td>
                  <td>{new Date(note.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer>
        <span>React 17.0.2</span><span className="sep">·</span>
        <span>CDK 2.100.0</span><span className="sep">·</span>
        <span>Vite 2.7.7</span><span className="sep">·</span>
        <span>TypeScript 3.9</span><span className="sep">·</span>
        <span>OneTable 2.2.0</span><span className="sep">·</span>
        <span>Node 18</span>
      </footer>
    </>
  );
};

export default App;
