// Corps de l'application Express

const express = require("express"); // Utilisation du framework node Express afin de simplifier la création de l'application
const rateLimit = require('express-rate-limit'); // Package permettant de limiter les attaques par brute force en limitant le nombre de requêtes par IP
const bodyParser = require("body-parser"); // Package permettant d'analyser le corps des requêtes
const path = require("path"); // Package permettant le travail sur les fichiers locaux (utile pour la gestion des images)
const db = require("./config/config"); // Importation de la configuration de la connexion à la BDD
const cors = require("cors")

// Utilisation de helmet :
// Il protège l'application de vulnérabilités répandues.
// C'est une collection de middlewares liés à la sécurité des requêtes HTTP
let helmet = require("helmet");

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to database!");
});

const app = express(); // Création de l'application utilisant express
app.use(cors())
// Middleware permettant de corriger les erreurs CORS pouvant survenir à cause de sécurités et ainsi permettre la connexion à tout utilisateur
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Les différents types de requêtes autorisées
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  // Les headers autorisés
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  // On passe au middleware suivant
  next();
});

// Définition des paramètres du limiteur de requête
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,       // = 15 minutes
  max: 100 // Chaque IP est limitée à 100 requêtes toutes les 15min
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images"))); // Permet de charger les images contenues dans le dossier image de l'application

const postRoutes = require("./routes/post"); // Routes utilisées pour les sauces
const userRoutes = require("./routes/user"); // Routes utilisées pour les utilisateurs;
const commentRoutes = require('./routes/comment');

app.use("/api/posts", postRoutes);
app.use("/api/auth", /*limiter,*/ userRoutes); // Utilisation du limiteur de requêtes par IP pour la route d'authentification
app.use("/api/comments", /*limiter,*/ commentRoutes); // Utilisation du limiteur de requêtes par IP pour la route d'authentification

module.exports = app; // Exportation afin d'importer l'application dans le server.js
