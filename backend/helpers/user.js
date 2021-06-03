const mysql = require('mysql'); // Package permettant de se connecter à la base de données mysql
const db = require("../config/config"); // Importation de la configuration de la connexion à la BDD

let userHelper = {

    findUser: function (req, res, next, id) {
        let sql = `SELECT * FROM users WHERE userId = ?`;
        sql = mysql.format(sql, [id])
        //console.log("Token : " + token);
        //console.log(decodedToken);
        console.log("User ID : " + id)
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send(result[0]);
            //console.log(result);
        })
    }
}

exports.data = userHelper;