const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Asetetaan staattisten tiedostojen hakemisto
app.use(express.static(path.join(__dirname, 'public')));

// Asetetaan reitti HTML-tiedoston jakamiseen
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Käynnistetään palvelin
app.listen(port, () => {
  console.log(`Palvelin käynnissä osoitteessa http://localhost:${port}`);
});