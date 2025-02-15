const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Yhdistä SQLite-tietokantaan
const db = new Database('./database.db');

// Luo taulu, jos sitä ei ole olemassa
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE
  )
`).run();

// Luo uusi käyttäjä (Create)
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Nimi ja sähköposti vaaditaan' });
  }

  try {
    const stmt = db.prepare(`INSERT INTO users (name, email) VALUES (?, ?)`);
    const result = stmt.run(name, email);
    res.status(201).json({ id: result.lastInsertRowid, name, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hae kaikki käyttäjät (Read)
app.get('/users', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Päivitä käyttäjän tiedot (Update)
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nimi ja sähköposti vaaditaan' });
  }

  try {
    const stmt = db.prepare(`UPDATE users SET name = ?, email = ? WHERE id = ?`);
    const result = stmt.run(name, email, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
    }
    res.json({ message: 'Käyttäjän tiedot päivitetty', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Poista käyttäjä (Delete)
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare(`DELETE FROM users WHERE id = ?`);
    const result = stmt.run(id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
    }
    res.json({ message: 'Käyttäjä poistettu', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Käynnistä palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});
