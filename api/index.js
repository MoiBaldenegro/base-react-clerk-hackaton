require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

app.use(cors());
app.use(express.json());

// Crear un submission
app.post('/api/submissions', async (req, res) => {
  const { source_code, language_id } = req.body;
  try {
    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false',
      { source_code, language_id },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error creando submission', details: err.message });
  }
});

// Obtener el resultado de un submission
app.get('/api/submissions/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const response = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: 'Error obteniendo resultado', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
