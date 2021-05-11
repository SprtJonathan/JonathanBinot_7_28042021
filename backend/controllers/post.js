// Récupération du modèle posts
const post = require("../models/Post");

// Import de fs qui permet d'accéder au file-system (pour l'enregistrement d'images)
const fs = require("fs");

exports.addPost = (req, res, next) => { // Middleware permettant la création d'une nouvelle post
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;
  const post = new Post({
    ...postObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`,
    likes: 0, // Initialisation à 0 likes
    dislikes: 0, // Initialisation à 0 dislikes
    usersLiked: [], // Initialisation du tableau vide car personne n'a encore donné son avis
    usersDisliked: [],
  });
  post
    .save() // On sauvegarde la post nouvellement créée
    .then(() => res.status(201).json({ message: "Post enregistrée !" })) // Si tout a bien fonctionné, on renvoie un code 201 (document créé)
    .catch((error) => res.status(400).json({ error: error })); // Sinon erreur 400
};

exports.modifyPost = (req, res, next) => { // Middleware servant à la modification d'une post
  const postObject = req.file
    ? {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : { ...req.body };
  Post.updateOne(
    { _id: req.params.id },
    { ...postObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" })) // Si tout fonctionne, on renvoie un code 200
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => { // Middleware servant à supprimer la post
  Post.findOne({ _id: req.params.id }) // On récupère la post souhaitée grâce à son ID
    .then((post) => {
      const filename = Post.imageUrl.split("/images/")[1]; // On supprime l'image enregistrée
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id }) // On supprime l'objet
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error })); // Si l'id recherché ne donne pas de résultat, on renvoie une erreur 500
};

exports.getOnePost = (req, res, next) => { // Récupération d'une post
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllPosts = (req, res, next) => { // Récupération de toutes les posts
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.ratePost = (req, res, next) => { // Middleware servant à donner un avis sur une post
  let like = req.body.like;

  let userId = req.body.userId; // On prend le userID

  let postId = req.params.id; // On prend l'id de la post

  Post.findOne({ _id: postId }).then((post) => { // On récupère la post à noter
    switch (like) {
      case -1: // L'utilisateur dislike
        Post.updateOne(  // Si un utilisateur met un dislike, alors on incrémente la valeur du nombre de dislikes et on stocke l'id de l'utilisateur
          {
            _id: postId,
          },
          {
            $push: {
              usersDisliked: userId,
            }, // On envoie l'id de l'utilisateur à la BDD
            $inc: {
              dislikes: +1,
            }, // On incrémente le nombre de dislikes de 1
            _id: postId,
          }
        )
          .then(() =>
            res.status(200).json({
              message: "L'utilisateur a disliké la post !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
        break;
      case 0: // L'utilisateur retire son avis
        Post.findOne({
          _id: postId,
        })
          .then((post) => {
            if (Post.usersLiked.includes(userId)) {
              // Si l'utilisateur a liké la post et souhaite annuler son avis
              Post.updateOne(
                {
                  _id: postId,
                },
                {
                  $inc: {
                    likes: -1, // On décrémente le nombre de likes de 1
                  },
                  $pull: {
                    usersLiked: userId, // On retire son id de la BDD
                  },
                  _id: postId,
                }
              )
                .then(() =>
                  res.status(200).json({
                    message: "L'utilisateur n'aime plus la post",
                  })
                )
                .catch((error) =>
                  res.status(400).json({
                    error,
                  })
                );
            }
            if (Post.usersDisliked.includes(userId)) {
              // Si l'utilisateur a disliké la post et souhaite annuler son avis
              Post.updateOne(
                {
                  _id: postId,
                },
                {
                  $inc: {
                    dislikes: -1, // On décrémente le nombre de dislikes de 1
                  },
                  $pull: {
                    usersDisliked: userId, // On retire son ID de la BDD
                  },
                  _id: postId,
                }
              )
                .then(() =>
                  res.status(200).json({
                    message: "Dislike retiré !",
                  })
                )
                .catch((error) =>
                  res.status(400).json({
                    error,
                  })
                );
            }
          })
          .catch((error) =>
            res.status(404).json({
              error,
            })
          );
        break;
      case 1: // L'utilisateur like
        Post.updateOne( // Si un utilisateur met un like, alors on incrémente la valeur du nombre de likes et on stocke l'id de l'utilisateur
          {
            _id: postId,
          },
          {
            $push: {
              usersLiked: userId,
            }, // On envoie l'id de l'utilisateur à la BDD
            $inc: {
              likes: +1,
            }, // On incrémente le nombre de likes de 1
            _id: postId,
          }
        )
          .then(() =>
            res.status(200).json({
              message: "L'utilisateur a liké la post !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
        break;
    }
  });
};
