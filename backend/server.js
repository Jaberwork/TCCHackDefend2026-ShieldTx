const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const alerteRoutes = require('./routes/alertes');

const app = express();
app.set('trust proxy', 1);
app.use('/api/verifier', alerteRoutes);

// ─── Middlewares de sécurité ───────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(express.json());

// Limite : 100 requêtes max par 15 minutes par IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { erreur: 'Trop de requêtes, réessaie dans 15 minutes.' },
});
app.use(limiter);

// ─── Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/alertes', alerteRoutes);

// ─── Route de test ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '🛡️ ShieldTx API opérationnelle' });
});

// ─── Gestion des erreurs globales ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erreur: 'Erreur interne du serveur' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur ShieldTx démarré sur le port ${PORT}`);
});
