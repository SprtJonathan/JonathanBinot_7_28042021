const bcrypt = require("bcrypt"); // Package permettant de chiffrer les mots de passes
const jwt = require("jsonwebtoken"); // JSON Web Token : Jeton d'authentification utilisé afin de ne pas redemander la connexion à chaque requête
const mysql = require('mysql'); // Package permettant de se connecter à la base de données mysql

const validator = require('validator'); // Le validateur permet de vérifier que le format d'email entré est correct

const db = require("../config/config"); // Importation de la configuration de la connexion à la BDD

exports.register = (req, res, next) => { // Middleware pour l'inscription
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt
        .hash(password, 10) // Salage du mot de passe 10 fois
        .then((hash) => {
            if (validator.isEmail(req.body.email)) { // Si la forme de l'email est correcte, alors on crée le nouvel utilisateur
                let sql = "INSERT INTO users (username, fname, lname, email, password) VALUES (?, ?, ?, ?, ?)";     // préparation de la requete SQL
                let inserts = [username, fname, lname, email, hash];                                                       // utilisation des valeurs à insérer
                sql = mysql.format(sql, inserts);
                db.query(sql, (error, user) => {            // Envoi de la requête à la base de données
                    if (!error) {                                               // Si aucune erreur n'est enregistrée
                        res.status(201).json({
                            message: "L'utilisateur a été créé avec succès !",  // Alors, on renvoie un message de confirmation
                            user: {
                                userId: user.userId,
                                username: user.username,
                                fname: user.fname,
                                lname: user.lname,
                                email: user.email,
                                profilePictureUrl: user.pp,
                                roleId: user.roleId
                            },
                            token: jwt.sign({
                                userId: user.userId,
                                roleId: user.roleId
                            },
                                process.env.JWT_TOKEN,
                                { expiresIn: process.env.JWT_EXPIRATION }
                            )
                        });
                    } else {
                        console.log(error);
                        return res.status(409).json({ error: "Cet utilisateur existe déjà !" })      // Erreur: utilisateur déjà existant
                    }
                });

            }
            else {
                return res.status(400).json({ error: "Format email incorrect" });
            }
        })

        .catch((error) => res.status(500).json({ message: error })); // Si une erreur est retournée, elle provient du serveur, alors on renvoie un code 500
};

exports.login = (req, res, next) => { // Middleware pour la connexion
    const credentials = req.body.credentials;
    const password = req.body.password;
    let sql = `SELECT * FROM users WHERE email = ?`;
    if (validator.isEmail(credentials)) {
        sql = `SELECT * FROM users WHERE email = ?`;
    } else {
        sql = `SELECT * FROM users WHERE username = ?`;
    }
    sql = mysql.format(sql, [credentials]);

    db.query(sql, (err, result) => {
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        console.log("User not found")
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    } else {
                        console.log('User connected');
                        res.status(200).json({
                            user: {
                                userId: result[0].userId,
                                username: result[0].username,
                                fname: result[0].fname,
                                lname: result[0].lname,
                                email: result[0].email,
                                profilePictureUrl: result[0].pp,
                                roleId: result[0].roleId
                            },
                            token: jwt.sign({
                                userId: result[0].userId,
                                roleId: result[0].roleId
                            },
                                process.env.JWT_TOKEN,
                                { expiresIn: process.env.JWT_EXPIRATION }
                            )
                        });
                    }
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            console.log("user not found")
            return res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect !' });
        }

    })

};

exports.getOneUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    let sql = `SELECT * FROM users WHERE userId = ?`;
    sql = mysql.format(sql, [userId])
    console.log("Token : " + token);
    console.log(decodedToken);
    console.log("User ID : " + userId)
    db.query(sql, (err, result) => {
        console.log(result);
        if (result != null) {
            return res.status(200).json({
                user: {
                    userId: result.userId,
                }

            });
        } else {
            console.log("user not found")
            return res.status(401).json({ error: 'Utilisateur introuvable !' });
        }

    })
};

exports.getAllUsers = (req, res, next) => {
    let sql = `SELECT * FROM users WHERE userId = ?`;
    db.query(sql, (err, result)
        .then((users) => res.status(200).json({
            users
        }))
        .catch((err) => res.status(401).json({
            err
        })));
};

exports.deleteAccount = (req, res, next) => { // Middleware pour la suppression du compte
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    console.log(userId)
    let sql = `DELETE FROM users WHERE userId = ?`;
    sql = mysql.format(sql, [userId]);
    console.log("userFound " + userId)
    db.query(sql, (err, result) => {

        if (err) throw err;
        res.send(result);

    })
};