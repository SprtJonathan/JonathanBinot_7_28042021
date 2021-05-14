const bcrypt = require("bcrypt"); // Package permettant de chiffrer les mots de passes
const jwt = require("jsonwebtoken"); // JSON Web Token : Jeton d'authentification utilisé afin de ne pas redemander la connexion à chaque requête
const mysql = require('mysql'); // Package permettant de se connecter à la base de données mysql

const validator = require('validator'); // Le validateur permet de vérifier que le format d'email entré est correct

const db = require("../config/config"); // Importation de la configuration de la connexion à la BDD

exports.register = (req, res, next) => { // Middleware pour l'inscription
    const email = req.body.email;
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const password = req.body.password;

    bcrypt
        .hash(password, 10) // Salage du mot de passe 10 fois
        .then((hash) => {
            if (validator.isEmail(req.body.email)) { // Si la forme de l'email est correcte, alors on crée le nouvel utilisateur
                let sql = "INSERT INTO users (username, fname, lname, email, password) VALUES (?, ?, ?, ?, ?)";     // préparation de la requete SQL
                let inserts = [username, fname, lname, email, hash];                                                       // utilisation des valeurs à insérer
                sql = mysql.format(sql, inserts);
                const register = db.query(sql, (error, user) => {            // envoi de la requête a la base de données
                    if (!error) {                                               // si aucune erreur après la requête
                        res.status(201).json({                                  // on retourne
                            message: "L'utilisateur a été créé avec succès !",  // on renvoi un message de confirmation
                            token: jwt.sign(                                    // fonction sign qui prend les données que nous allons encoder à l'intérieur du token
                                { userId: user.insertId, accessLevel: 0 },     // création d'un objet avec le UserId et le niveau d'acces pour être sur de la correspondance
                                process.env.JWT_TOKEN,              // clé secrète pour l'encodage
                                { expiresIn: process.env.JWT_EXPIRATION }       // configuration de l'expiration du token
                            )
                        });
                    } else {
                        console.log(error);
                        return res.status(409).json({ error: "Cet utilisateur existe déjà !" })      // erreur utilisateur déjà existant
                    }
                });
            }
            else {
                return res.status(400).json({ error: "Format email incorrect" });
            }
        })

        .catch((error) => res.status(500).json({ error })); // Si une erreur est retournée, elle provient du serveur, alors on renvoie un code 500
};

exports.login = (req, res, next) => { // Middleware pour la connexion
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) { throw 'Champs vides' }
    let sql = `SELECT * FROM users WHERE email= ?`

    db.query(sql, email, (err, result) => {
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    } else {
                        console.log('User connected');
                        res.status(200).json({
                            user: {
                                userId: result[0].userId,
                                username: result[0].username,
                                fname: result[0].fname,
                                lname: result[0].lname,
                                role: result[0].role
                            },
                            token: jwt.sign(
                                { userId: result[0].userId, role: result[0].role },
                                process.env.JWT_TOKEN,
                                { expiresIn: 'JWT_TOKEN' }
                            )
                        });
                        console.log(user);
                    }
                })
                .catch(error => res.status(500).json({ error }));
        }
    })
};