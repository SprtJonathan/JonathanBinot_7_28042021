const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config") // Récupération du middleware multer pour pouvoir récupérer les images
const passwordValidation = require('../middleware/password-validation')

router.post("/register", passwordValidation, userCtrl.register); // Route pour l'inscription d'un utilisateur / On vérifie que le mot de passe corresponde
router.post("/login", userCtrl.login); // Route pour la connexion d'un utilisateur
router.put("/users/:id", auth, userCtrl.editAccount); // Route pour l'édition d'un utilisateur
router.put("/users/profilepicture/:id", auth, multer, userCtrl.editProfilePicture); // Route pour l'édition d'un utilisateur
router.put("/users/admin/:id", auth, userCtrl.editAccountAdmin); // Route pour l'édition d'un utilisateur
router.delete("/users/:id", auth, userCtrl.deleteAccount); // Route pour la suppression d'un utilisateur
router.get('/users/:id', auth, userCtrl.getOneUser); // Route pour la récupération d'un utilisateur en particulier
router.get('/users/visitor/:id', userCtrl.getOneUserNotConnected); // Route pour la récupération d'un utilisateur en particulier
router.get('/users', auth, userCtrl.getAllUsers); // Route pour la récupération de tous les utilisateurs

module.exports = router;