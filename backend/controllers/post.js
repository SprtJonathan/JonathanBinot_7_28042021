const db = require("../config/config"); // Importation de la configuration de la connexion à la BDD

exports.getAllPosts = (req, res, _next) => {
    let sql = `SELECT posts.postId, posts.userId, posts.title, posts.content, posts.creationDate, posts.modificationDate, user.username FROM posts INNER JOIN users ON posts.userId = user.userId ORDER BY creationDate`
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

exports.getOnePost = (req, res, next) => {
    let sql = `SELECT * FROM posts WHERE postId=?`;
    let id = req.params.id;

    db.query(sql, id, (err, result) => {
        if (err) throw (err);
        res.send(result);
    })
}

exports.createPost = (req, res, next) => {
    let title = req.body.title;
    let content = req.body.content;
    let userId = req.body.userId;
    let sql = `INSERT INTO post (title, content, userId, creationDate ) VALUES (?,?,?,CURRENT_TIMESTAMP)`;

    db.query(sql, [title, content, userId], (err, result) => {
        if (err) throw (err);
        res.status(201).json({ message: "Post créé!" });
    });
}

exports.modifyPost = (req, res, next) => {
    let postId = req.params.id;
    let title = req.body.title;
    let content = req.body.content;
    let sql = `UPDATE posts SET content= ?, title= ? WHERE postId= ?`;

    db.query(sql, [content, title, postId], (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}


exports.deletePost = (req, res, next) => {
    let postId = req.params.id;
    let sql = `DELETE FROM posts WHERE postId= ?`;

    db.query(sql, postId, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
}