const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('database.sqlite'); // Use a file-based database

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
        if (err) {
            return console.error(err.message);
        }
        res.send('Data submitted successfully!');
    });
});

// Fetch and display data
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(`
            <h1>User List</h1>
            <ul>
                ${rows.map(row => `<li>${row.name} - ${row.email}</li>`).join('')}
            </ul>
        `);
    });
});

// Create users table if it doesn't exist
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (name TEXT, email TEXT)');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});