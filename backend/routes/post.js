// Route pour les posts
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postsCtrl = require('../controllers/post.js');

router.get('/', postsCtrl.getAllPosts); // Récupération de tous les posts
router.get('/:id', auth, postsCtrl.getOnePost); // Récupération d'un post
router.get('/from/:id', auth, postsCtrl.getPostsFromUser); // Récupération de tous les posts d'un utilisateur
router.post('/', auth, postsCtrl.createPost); // Création de post
router.put('/:id', auth, postsCtrl.modifyPost); // Modification de post
router.delete('/:id', auth, postsCtrl.deletePost); // Suppression de post


module.exports = router;