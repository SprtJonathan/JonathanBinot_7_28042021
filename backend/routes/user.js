const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/register", userCtrl.register); // Route pour l'inscription d'un utilisateur / On vérifie que le mot de passe corresponde
router.post("/login", userCtrl.login); // Route pour la connexion d'un utilisateur

module.exports = router;