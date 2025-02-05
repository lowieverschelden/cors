// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors()); // Hiermee wordt CORS ingeschakeld voor alle routes


// Route om alle personages op te halen
app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.json(response.data.results); // Verzendt de resultaten van de API
  } catch (error) {
    res.status(500).json({ error: 'Er is iets mis gegaan bij het ophalen van de personages.' });
  }
});

// Route om een specifiek personage op te halen op basis van de naam
app.get('/characters/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
    if (response.data.results && response.data.results.length > 0) {
      res.json(response.data.results[0]); // Verzendt het eerste resultaat (het personage)
    } else {
      res.status(404).json({ error: 'Personage niet gevonden.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Er is iets mis gegaan bij het ophalen van het personage.' });
  }
});

// Start de server
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
