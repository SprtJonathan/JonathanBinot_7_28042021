const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/register", userCtrl.register); // Route pour l'inscription d'un utilisateur / On vérifie que le mot de passe corresponde
router.post("/login", userCtrl.login); // Route pour la connexion d'un utilisateur
router.delete("/users/:id", auth, userCtrl.deleteAccount); // Route pour la connexion d'un utilisateur
router.get('/', auth, userCtrl.getOneUser); // Route pour la récupération d'un utilisateur en particulier
router.get('/users', auth, userCtrl.getAllUsers); // Route pour la récupération de tous les utilisateurs

module.exports = router;