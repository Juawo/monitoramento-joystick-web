const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8080; // Porta que a Pico vai usar

app.use(express.json());

app.post('/dados', async (req, res) => {
  console.log('Recebido da Pico:', req.body);

  try {
    const response = await axios.post('https://monitoramento-joystick-web-production.up.railway.app/dados', req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Encaminhado para Railway. Resposta:', response.status);
    res.sendStatus(200);
  } catch (err) {
    console.error('Erro ao encaminhar para Railway:', err.message);
    res.status(500).send('Erro ao encaminhar para Railway');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy HTTP rodando em http://localhost:${PORT}`);
});
