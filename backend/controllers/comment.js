const db = require('../config/config');
const helper = require("../helpers/backend.js") // Helper permettant de ne pas répéter les requêtes

exports.getAllComments = (req, res, _next) => {
	let sql = `SELECT * FROM comments ORDER BY writtenOn DESC`

	const errorCode = "400"
	const errorMessage = "Une erreur s'est produite, veuillez réessayer"
	helper.data.sqlRequest(sql, res, errorCode, errorMessage)
}

exports.getOnePostComments = (req, res, _next) => {
	let sql = `SELECT comments.commentId, comments.postId, comments.comment, comments.userId, comments.writtenOn, comments.lastUpdated, users.username, users.roleId FROM comments INNER JOIN users ON comments.userId = users.userId WHERE postId=?`;
	let postId = req.params.id;

	const errorCode = "400"
	const errorMessage = "Une erreur s'est produite, veuillez réessayer"
	helper.data.sqlRequestWithParameters(sql, res, postId, errorCode, errorMessage)
}

exports.getOneComment = (req, res, _next) => {
	let sql = `SELECT * FROM comments INNER JOIN users ON comments.userId = users.userId WHERE commentId=?;`;
	let postId = req.params.id;

	const errorCode = "400"
	const errorMessage = "Une erreur s'est produite, veuillez réessayer"
	helper.data.sqlRequestWithParameters(sql, res, postId, errorCode, errorMessage)
}

exports.createComment = (req, res, _next) => {
	let postId = req.body.postId;
	let comment = req.body.comment;
	let userId = req.body.userId;
	let sql = `INSERT INTO comments ( postId, comment, userId, writtenOn, lastUpdated ) VALUES (?,?,?,NOW(),NOW());`;

	db.query(sql, [postId, comment, userId], (err, result) => {
		if (err) throw (err);
		res.status(201).json({ message: "Commentaire posté !" });
	});
}

exports.modifyComment = (req, res, _next) => {
	let id = req.params.id;
	let comment = req.body.comment;
	let sql = `UPDATE comments SET comment=?, lastUpdated=CURRENT_TIMESTAMP WHERE commentId=?;`;

	const errorCode = "400"
	const errorMessage = "Une erreur s'est produite, veuillez réessayer"
	helper.data.sqlRequestWithParameters(sql, res, [comment, id], errorCode, errorMessage)
}


exports.deleteComment = (req, res, _next) => {
	let id = req.params.id;
	let sql = `DELETE FROM comments WHERE commentId= ?;`;

	const errorCode = "400"
	const errorMessage = "Une erreur s'est produite, veuillez réessayer"
	helper.data.sqlRequestWithParameters(sql, res, id, errorCode, errorMessage)
}