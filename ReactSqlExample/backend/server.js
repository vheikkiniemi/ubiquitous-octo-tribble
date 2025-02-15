const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Yhdistä SQLite-tietokantaan Sequelizea käyttäen
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
  logging: true // Tulostetaan SQL-komentoja
});

// Määrittele User-malli
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

// Synkronoi tietokanta
sequelize.sync()
  .then(() => console.log("Tietokanta synkronoitu"))
  .catch(err => console.error("Virhe tietokannan synkronoinnissa:", err));

// Luo uusi käyttäjä (Create)
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Nimi ja sähköposti vaaditaan' });
    }
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Hae kaikki käyttäjät (Read)
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Päivitä käyttäjän tiedot (Update)
app.put('/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;
    if (!name || !email) {
      return res.status(400).json({ error: 'Nimi ja sähköposti vaaditaan' });
    }
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
    }
    user.name = name;
    user.email = email;
    await user.save();
    res.json({ message: 'Käyttäjän tiedot päivitetty', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Poista käyttäjä (Delete)
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Käyttäjää ei löytynyt' });
    }
    await user.destroy();
    res.json({ message: 'Käyttäjä poistettu', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Käynnistä palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});

/*
Tarvittavat moduulit voidaan asentaa yhdellä komennolla:
npm install express sequelize sqlite3 cors
*/
