# ShieldTx -- Securisation des Transactions Monetaires Mobiles au Togo

**#TCCHackDefend2026** -- Tech Campus Clubs / IPNET Institute of Technology
Finale : 4 Juillet 2026 -- ESGIS Avédji, Lomé, Togo

ShieldTx est la première plateforme communautaire togolaise de détection intelligente de fraudes sur les transactions Mobile Money (Flooz, T-Money). Elle permet à tout utilisateur de vérifier le niveau de risque d'une transaction, de signaler un numéro frauduleux et de consulter en temps réel son tableau de bord sécurisé -- sans expertise technique requise.

\---

## Table des matières

* [Problématique](#problematique)
* [Track](#track)
* [Equipe](#equipe)
* [Stack technique](#stack-technique)
* [Architecture](#architecture)
* [Prérequis](#prerequis)
* [Installation](#installation)
* [Lancement](#lancement)
* [Compte de test](#compte-de-test)
* [API disponible en ligne](#api-disponible-en-ligne)
* [Routes API](#routes-api)

\---

## Problématique

Au Togo, des millions de personnes utilisent Flooz et T-Money pour leurs transactions quotidiennes. La fraude Mobile Money y est massive : usurpation d'identité, vol de carte SIM, phishing par SMS (faux gains, faux agents), arnaques aux transferts. Aucune solution locale de détection n'existe à ce jour pour les citoyens ordinaires.

ShieldTx comble ce vide avec un moteur de scoring multicritères qui analyse chaque transaction en temps réel et détecte automatiquement les comportements frauduleux.

\---

## Track

FinTech + CyberSécu -- Sécurité des transactions monétaires mobiles

\---

## Equipe

|Nom|Role|
|-|-|
|AWESSO Sami Hénoc|Backend -- Node.js / Express / MySQL|
|ABAKAR Brahim Khassim|Frontend -- React / Tailwind CSS|
|ADJAMGBA Roland Sitou Amah|Base de données / Sécurité|
|BIAO-TOURE Sahida|Pitch / Documentation|

\---

## Stack technique

|Composant|Technologie|
|-|-|
|Backend|Node.js 24 + Express|
|Base de données|MySQL 8|
|Frontend|React + Tailwind CSS + Vite|
|Authentification|JWT + bcrypt|
|Sécurité API|Helmet.js + express-rate-limit + CORS|
|Déploiement Backend|Railway|
|Versioning|Git + GitHub|

\---

## Architecture

```
+-----------------------------------------------------+
|                   UTILISATEUR                        |
|              (navigateur / mobile)                   |
+----------------------+------------------------------+
                       |
              +--------+--------+
              |   FRONTEND       |
              |  React/Tailwind  |
              |  (Vite / SPA)    |
              +--------+--------+
                       | HTTP REST
              +--------+--------+
              |   BACKEND API    |
              |  Node.js/Express |
              |  Railway Cloud   |
              +--------+--------+
                       |
         +-------------+-------------+
         |      MOTEUR DE SCORING     |
         |  R(n) = S(wi x fi(n)) x l  |
         +-------------+-------------+
                       |
              +--------+--------+
              |   BASE DE        |
              |   DONNEES MySQL  |
              |   (10 tables)    |
              +-----------------+
```

\---

## Prérequis

* Node.js v18 ou supérieur -- nodejs.org
* MySQL 8.0 -- mysql.com
* Git -- git-scm.com
* npm v9 ou supérieur (inclus avec Node.js)

\---

## Installation

### 1\. Cloner le dépôt

```bash
git clone https://github.com/Jaberwork/TCCHackDefend2026-ShieldTx.git
cd TCCHackDefend2026-ShieldTx
```

### 2\. Installer les dépendances backend

```bash
cd backend
npm install
```

### 3\. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Ouvrir `.env` et remplir :

```
PORT=3000
DB\\\_HOST=localhost
DB\\\_USER=root
DB\\\_PASSWORD=votre\\\_mot\\\_de\\\_passe
DB\\\_NAME=shieldtx
JWT\\\_SECRET=shieldtx\\\_secret\\\_key\\\_2026
```

### 4\. Créer la base de données

Ouvrir MySQL et exécuter :

```sql
CREATE DATABASE shieldtx;
USE shieldtx;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO\\\_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  mot\\\_de\\\_passe VARCHAR(255),
  nb\\\_transactions INT DEFAULT 0,
  derniere\\\_modif\\\_mdp TIMESTAMP NULL DEFAULT NULL,
  created\\\_at TIMESTAMP DEFAULT CURRENT\\\_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO\\\_INCREMENT PRIMARY KEY,
  user\\\_id INT,
  montant DECIMAL(10,2),
  type ENUM('envoi', 'reception', 'retrait'),
  statut ENUM('normale', 'suspecte', 'bloquee') DEFAULT 'normale',
  created\\\_at TIMESTAMP DEFAULT CURRENT\\\_TIMESTAMP,
  FOREIGN KEY (user\\\_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS alertes (
  id INT AUTO\\\_INCREMENT PRIMARY KEY,
  transaction\\\_id INT,
  motif VARCHAR(255),
  signale\\\_par INT,
  created\\\_at TIMESTAMP DEFAULT CURRENT\\\_TIMESTAMP,
  FOREIGN KEY (transaction\\\_id) REFERENCES transactions(id),
  FOREIGN KEY (signale\\\_par) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS numeros\\\_frauduleux (
  id INT AUTO\\\_INCREMENT PRIMARY KEY,
  numero VARCHAR(20) UNIQUE,
  type\\\_fraude ENUM('usurpation','faux\\\_gain','phishing','sim\\\_swap','autre'),
  nb\\\_signalements INT DEFAULT 1,
  score\\\_risque INT DEFAULT 0,
  derniere\\\_activite TIMESTAMP DEFAULT CURRENT\\\_TIMESTAMP,
  created\\\_at TIMESTAMP DEFAULT CURRENT\\\_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profil\\\_global (
  id INT AUTO\\\_INCREMENT PRIMARY KEY,
  montant\\\_moyen DECIMAL(10,2) DEFAULT 45000,
  montant\\\_max\\\_normal DECIMAL(10,2) DEFAULT 500000,
  heure\\\_debut\\\_normal INT DEFAULT 6,
  heure\\\_fin\\\_normal INT DEFAULT 22,
  updated\\\_at TIMESTAMP DEFAULT CURRENT\\\_TIMESTAMP
);

INSERT IGNORE INTO profil\\\_global
(montant\\\_moyen, montant\\\_max\\\_normal, heure\\\_debut\\\_normal, heure\\\_fin\\\_normal)
VALUES (45000, 500000, 6, 22);

CREATE TABLE IF NOT EXISTS profil\\\_utilisateur (
  user\\\_id INT PRIMARY KEY,
  nb\\\_transactions INT DEFAULT 0,
  montant\\\_moyen DECIMAL(10,2) DEFAULT NULL,
  montant\\\_max DECIMAL(10,2) DEFAULT NULL,
  heure\\\_habituelle\\\_debut INT DEFAULT NULL,
  heure\\\_habituelle\\\_fin INT DEFAULT NULL,
  FOREIGN KEY (user\\\_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS regles\\\_scoring (
  id INT AUTO\\\_INCREMENT PRIMARY KEY,
  critere VARCHAR(100),
  seuil DECIMAL(10,2),
  poids INT,
  description VARCHAR(255)
);

INSERT IGNORE INTO regles\\\_scoring (critere, seuil, poids, description) VALUES
('montant\\\_eleve', 500000, 30, 'Transaction > 500 000 FCFA'),
('heure\\\_nuit', 5, 20, 'Transaction entre 00h et 05h'),
('frequence\\\_elevee', 3, 25, 'Plus de 3 transactions en 30 minutes'),
('compte\\\_recent', 7, 15, 'Compte créé il y a moins de 7 jours'),
('montant\\\_inhabituel', 3, 10, 'Montant 3x supérieur à la moyenne');

CREATE TABLE IF NOT EXISTS connexions (
  id INT AUTO\\\_INCREMENT PRIMARY KEY,
  user\\\_id INT,
  ip\\\_address VARCHAR(50),
  user\\\_agent VARCHAR(255),
  statut ENUM('succes','echec') DEFAULT 'succes',
  created\\\_at TIMESTAMP DEFAULT CURRENT\\\_TIMESTAMP,
  FOREIGN KEY (user\\\_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tentatives\\\_echec (
  id INT AUTO\\\_INCREMENT PRIMARY KEY,
  email VARCHAR(100),
  ip\\\_address VARCHAR(50),
  nb\\\_tentatives INT DEFAULT 1,
  derniere\\\_tentative TIMESTAMP DEFAULT CURRENT\\\_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs\\\_activite (
  id INT AUTO\\\_INCREMENT PRIMARY KEY,
  user\\\_id INT,
  type\\\_action ENUM('consultation','transaction','connexion','deconnexion'),
  ip\\\_address VARCHAR(50),
  created\\\_at TIMESTAMP DEFAULT CURRENT\\\_TIMESTAMP,
  FOREIGN KEY (user\\\_id) REFERENCES users(id)
);
```

### 5\. Installer les dépendances frontend

```bash
cd ../
npm install
```

\---

## Lancement

### Backend

```bash
cd backend
node server.js
```

Le serveur démarre sur http://localhost:3000

Vérification : ouvrir http://localhost:3000/ -- réponse attendue :

```json
{ "message": "ShieldTx API operationnelle" }
```

### Frontend

```bash
cd ../
npm run dev
```

L'interface est accessible sur http://localhost:5173

\---

## Compte de test

Utiliser Postman ou l'interface pour créer un compte :

**Inscription :**

```json
POST /api/auth/inscription
{
  "nom": "Test ShieldTx",
  "email": "test@shieldtx.com",
  "mot\\\_de\\\_passe": "test1234"
}
```

**Connexion :**

```json
POST /api/auth/connexion
{
  "email": "test@shieldtx.com",
  "mot\\\_de\\\_passe": "test1234"
}
```

Le token JWT retourné est à utiliser dans le header :

```
Authorization: Bearer <token>
```

\---

## API disponible en ligne

Le backend est déployé sur Railway et accessible publiquement :

```
https://shieldtx-production.up.railway.app
```

\---

## Routes API

### Authentification (sans token)

|Méthode|Route|Description|
|-|-|-|
|POST|/api/auth/inscription|Créer un compte|
|POST|/api/auth/connexion|Se connecter -- retourne un token JWT|
|POST|/api/auth/changer-mot-de-passe|Modifier le mot de passe|

### Transactions (token requis)

|Méthode|Route|Description|
|-|-|-|
|GET|/api/transactions|Lister mes transactions|
|POST|/api/transactions|Créer une transaction + scoring automatique|
|GET|/api/transactions/stats|Statistiques pour le dashboard|

### Alertes (token requis)

|Méthode|Route|Description|
|-|-|-|
|POST|/api/alertes|Signaler une transaction suspecte|
|GET|/api/alertes|Lister mes alertes|

**Header token :** Authorization: Bearer token\_jwt

\---

## Moteur de scoring

Chaque transaction reçoit un score de risque R(n) entre 0 et 100 :

|Score|Niveau|Action|
|-|-|-|
|0 - 30|FIABLE|Transaction autorisée|
|31 - 69|SUSPECT|Alerte envoyée à l'utilisateur|
|70 - 100|DANGEREUX|Transaction bloquée|

\---

ShieldTx -- Hackathon TCC IPNET 2026 -- Equipe ShieldTx



