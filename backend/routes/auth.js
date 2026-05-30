const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');

// ─── POST /api/auth/inscription ───────────────────────────────────────────
router.post('/inscription', async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;

  if (!nom || !email || !mot_de_passe) {
    return res.status(400).json({ erreur: 'Tous les champs sont obligatoires.' });
  }

  try {
    const [existant] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existant.length > 0) {
      return res.status(409).json({ erreur: 'Cet email est déjà utilisé.' });
    }

    const hash = await bcrypt.hash(mot_de_passe, 10);

    const [result] = await db.query(
      'INSERT INTO users (nom, email, mot_de_passe) VALUES (?, ?, ?)',
      [nom, email, hash]
    );

    res.status(201).json({
      message: 'Compte ShieldTx créé avec succès.',
      userId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la création du compte.' });
  }
});

// ─── POST /api/auth/connexion ─────────────────────────────────────────────
router.post('/connexion', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400).json({ erreur: 'Email et mot de passe requis.' });
  }

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ erreur: 'Email ou mot de passe incorrect.' });
    }

    const user = users[0];
    const motDePasseValide = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!motDePasseValide) {
      return res.status(401).json({ erreur: 'Email ou mot de passe incorrect.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion ShieldTx réussie.',
      token,
      user: { id: user.id, nom: user.nom, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la connexion.' });
  }
});

module.exports = router;
