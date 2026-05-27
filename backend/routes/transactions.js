const express = require('express');
const router = express.Router();
const db = require('../models/db');
const verifierToken = require('../middleware/auth');

// Seuil au-delà duquel une transaction est automatiquement suspecte (en FCFA)
const SEUIL_SUSPICION = 500000;

// ─── GET /api/transactions ─────────────────────────────────────────────────
router.get('/', verifierToken, async (req, res) => {
  try {
    const [transactions] = await db.query(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
      [req.utilisateur.id]
    );
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la récupération des transactions.' });
  }
});

// ─── POST /api/transactions ────────────────────────────────────────────────
router.post('/', verifierToken, async (req, res) => {
  const { montant, type } = req.body;

  if (!montant || !type) {
    return res.status(400).json({ erreur: 'Montant et type sont obligatoires.' });
  }

  const typesValides = ['envoi', 'reception', 'retrait'];
  if (!typesValides.includes(type)) {
    return res.status(400).json({ erreur: 'Type invalide. Valeurs : envoi, reception, retrait.' });
  }

  let statut = 'normale';
  if (parseFloat(montant) > SEUIL_SUSPICION) {
    statut = 'suspecte';
  }

  try {
    const [result] = await db.query(
      'INSERT INTO transactions (user_id, montant, type, statut) VALUES (?, ?, ?, ?)',
      [req.utilisateur.id, montant, type, statut]
    );

    res.status(201).json({
      message: statut === 'suspecte'
        ? '⚠️ Transaction créée mais marquée comme suspecte (montant élevé).'
        : '✅ Transaction créée avec succès.',
      transactionId: result.insertId,
      statut,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la création de la transaction.' });
  }
});

// ─── GET /api/transactions/stats ──────────────────────────────────────────
router.get('/stats', verifierToken, async (req, res) => {
  try {
    const [stats] = await db.query(
      `SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN statut = 'suspecte' THEN 1 ELSE 0 END) AS suspectes,
        SUM(CASE WHEN statut = 'bloquee' THEN 1 ELSE 0 END) AS bloquees,
        SUM(montant) AS montant_total
       FROM transactions WHERE user_id = ?`,
      [req.utilisateur.id]
    );
    res.json(stats[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors du calcul des statistiques.' });
  }
});

module.exports = router;
