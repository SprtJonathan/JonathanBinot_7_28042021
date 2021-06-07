const db = require('../config/config');

exports.getAllComments = (req, res, _next) => {
	let sql = `SELECT * FROM comments ORDER BY writtenOn DESC`
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(result);
	})
}

exports.getOnePostComments = (req, res, _next) => {
	let sql = `SELECT comments.commentId, comments.postId, comments.comment, comments.userId, comments.writtenOn, comments.lastUpdated, users.username, users.roleId FROM comments INNER JOIN users ON comments.userId = users.userId WHERE postId=?`;
	let postId = req.params.id;

	db.query(sql, postId, (err, result) => {
		if (err) throw (err);
		res.send(result);
	})
}

exports.getOneComment = (req, res, _next) => {
	let sql = `SELECT * FROM comments INNER JOIN users ON comments.userId = users.userId WHERE commentId=?;`;
	let postId = req.params.id;

	db.query(sql, postId, (err, result) => {
		if (err) throw (err);
		res.send(result);
	})
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

	db.query(sql, [comment, id], (err, result) => {
		if (err) throw err;
		res.send(result);
	})
}


exports.deleteComment = (req, res, _next) => {
	let id = req.params.id;
	let sql = `DELETE FROM comments WHERE commentId= ?;`;

	db.query(sql, id, (err, result) => {
		if (err) throw err;
		res.send(result);
	})
}