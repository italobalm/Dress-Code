const express = require('express');
const router = express.Router();
const sugestoesPorEvento = require('../data/sugestoesData');

router.get('/:evento', (req, res) => {
  const evento = req.params.evento.toLowerCase();
  const sugestoes = sugestoesPorEvento[evento];

  if (!sugestoes) {
    return res.status(404).json({ erro: 'Evento não encontrado' });
  }

  res.json({ evento, sugestoes });
});

module.exports = router;
