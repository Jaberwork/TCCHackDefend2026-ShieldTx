const express = require('express');
const router = express.Router();
const db = require('../models/db');
const verifierToken = require('../middleware/auth');

// ─── POST /api/alertes ─────────────────────────────────────────────────────
router.post('/', verifierToken, async (req, res) => {
  const { transaction_id, motif } = req.body;

  if (!transaction_id || !motif) {
    return res.status(400).json({ erreur: 'transaction_id et motif sont obligatoires.' });
  }

  try {
    const [transactions] = await db.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [transaction_id, req.utilisateur.id]
    );

    if (transactions.length === 0) {
      return res.status(404).json({ erreur: 'Transaction introuvable.' });
    }

    await db.query(
      'INSERT INTO alertes (transaction_id, motif, signale_par) VALUES (?, ?, ?)',
      [transaction_id, motif, req.utilisateur.id]
    );

    await db.query(
      "UPDATE transactions SET statut = 'suspecte' WHERE id = ?",
      [transaction_id]
    );

    res.status(201).json({ message: '🚨 Alerte ShieldTx enregistrée. Transaction marquée comme suspecte.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: "Erreur lors de l'enregistrement de l'alerte." });
  }
});

// ─── GET /api/alertes ──────────────────────────────────────────────────────
router.get('/', verifierToken, async (req, res) => {
  try {
    const [alertes] = await db.query(
      `SELECT a.*, t.montant, t.type, t.statut
       FROM alertes a
       JOIN transactions t ON a.transaction_id = t.id
       WHERE a.signale_par = ?
       ORDER BY a.created_at DESC`,
      [req.utilisateur.id]
    );
    res.json(alertes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la récupération des alertes.' });
  }
});
router.get('/:numero', async (req, res) => {
  const { numero } = req.params;
  try {
    const [fraude] = await db.query(
      'SELECT * FROM numeros_frauduleux WHERE numero = ?',
      [numero]
    );
    if (fraude.length > 0) {
      return res.json({
        numero,
        statut: 'DANGEREUX',
        score: 100,
        type_fraude: fraude[0].type_fraude,
        nb_signalements: fraude[0].nb_signalements,
        message: 'Ce numéro a été signalé comme frauduleux.'
      });
    }
    res.json({
      numero,
      statut: 'FIABLE',
      score: 0,
      message: 'Aucun signalement pour ce numéro.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la vérification.' });
  }
});

module.exports = router;