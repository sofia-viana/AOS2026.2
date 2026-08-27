const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Olá Mundo!');
});

// Importante para o Vercel
module.exports = app; 