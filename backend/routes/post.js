const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post"); // Récupération du controlleur lié à la post
const auth = require("../middleware/auth"); // Récupération du middleware d'authentification pour sécuriser toutes les routes
const multer = require("../middleware/multer-config") // Récupération du middleware multer pour pouvoir récupérer les images

router.post("/", auth, multer, postCtrl.addPost); // Route POST pour la création de post
router.put("/:id", auth, multer, postCtrl.modifyPost); // Route PUT pour la modification de la post
router.delete("/:id", auth, postCtrl.deletePost); // Route DELETE pour la suppresion d'une post (avec son ID)
router.get("/:id", auth, postCtrl.getOnePost); // Route GET pour la récupération d'une post (avec son ID)
router.get("/", auth, postCtrl.getAllPosts); // Route GET pour la récupération de toutes les posts
router.post("/:id/like", auth, postCtrl.ratePost); // Route POST pour l'ajout ou la suppression d'un avis (like ou dislike)

module.exports = router;
