const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'shieldtx',
  waitForConnections: true,
  connectionLimit: 10,
});

// Test de connexion au démarrage
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Erreur de connexion MySQL :', err.message);
  } else {
    console.log('✅ ShieldTx connecté à la base de données MySQL');
    connection.release();
  }
});

module.exports = pool.promise();
