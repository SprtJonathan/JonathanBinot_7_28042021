const bcrypt = require("bcrypt"); // Package permettant de chiffrer les mots de passes
const jwt = require("jsonwebtoken"); // JSON Web Token : Jeton d'authentification utilisé afin de ne pas redemander la connexion à chaque requête
const mysql = require('mysql'); // Package permettant de se connecter à la base de données mysql
const helper = require("../helpers/backend.js") // Helper permettant de ne pas répéter certaines requêtes

const validator = require('validator'); // Le validateur permet de vérifier que le format d'email entré est correct

const fs = require("fs"); // Import de fs qui permet d'accéder au file-system (pour l'enregistrement d'images)

const db = require("../config/config"); // Importation de la configuration de la connexion à la BDD
exports.register = (req, res, next) => { // Middleware pour l'inscription
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const profilePicture = `${req.protocol}://${req.get("host")}/images/userProfilePictures/default.png`;
    if (username == null || email == null || fname == null || lname == null || password == null || username == "" || email == "" || fname == "" || lname == "" || password == "") {
        return res.status(400).json({ error: "Champs vides" });
    } else {
        bcrypt
            .hash(password, 10) // Salage du mot de passe 10 fois
            .then((hash) => {
                if (validator.isEmail(req.body.email)) { // Si la forme de l'email est correcte, alors on crée le nouvel utilisateur
                    let sql = "INSERT INTO users (username, fname, lname, email, password, profilePictureUrl) VALUES (?, ?, ?, ?, ?, ?)";     // préparation de la requete SQL
                    let inserts = [username, fname, lname, email, hash, profilePicture];                                                       // utilisation des valeurs à insérer
                    sql = mysql.format(sql, inserts);
                    db.query(sql, (error, result) => {            // Envoi de la requête à la base de données
                        if (!error) {                                               // Si aucune erreur n'est enregistrée
                            res.status(201).json({
                                message: "L'utilisateur a été créé avec succès !",  // Alors, on renvoie un message de confirmation
                            });
                        } else {
                            console.log(error);
                            return res.status(409).json({ error: "Erreur: Cet utilisateur existe déjà !" })      // Erreur: utilisateur déjà existant
                        }
                    });
                }
                else {
                    return res.status(400).json({ error: "Format email incorrect" });
                }
            })

            .catch((error) => res.status(500).json({ error: "Une erreur s'est produite, veuillez réessayer ultérieurement" })); // Si une erreur est retournée, elle provient du serveur, alors on renvoie un code 500
    }
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
        if (err) throw (err);
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password)
                .then(valid => {
                    if (!valid) {
                        console.log("Utilisateur introuvable")
                        return res.status(401).json({ error: "Nom d\'utilisateur ou mot de passe incorrect" });
                    } else {
                        console.log('User connected');
                        res.status(200).json({
                            user: {
                                userId: result[0].userId,
                                username: result[0].username,
                                fname: result[0].fname,
                                lname: result[0].lname,
                                email: result[0].email,
                                profilePictureUrl: result[0].profilePictureUrl,
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

exports.getOneUser = (req, res, next) => { // Middleware permettant la récupération des infos d'un utilisateur d'après son ID
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    console.log("Token : " + token)
    helper.data.findUser(req, res, next, userId)
};

exports.getOneUserNotConnected = (req, res, next) => { // Middleware permettant la récupération des infos d'un utilisateur d'après son ID sans avoir besoin de s'authentifier
    const urlUserId = req.params.id;
    console.log(urlUserId)
    helper.data.findUser(req, res, next, urlUserId)
};

exports.getAllUsers = (req, res, next) => {
    let sql = `SELECT * FROM users`;
    helper.data.sqlRequest(sql, res)
};

exports.deleteAccount = (req, res, next) => { // Middleware pour la suppression du compte
    const errorCode = "400"
    const errorMessage = "Une erreur s'est produite, veuillez réessayer"
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    const roleId = decodedToken.roleId;
    const userProfileId = req.params.id;
    if (roleId == 1 || userId == userProfileId) {
        let sql = `DELETE FROM users WHERE userId = ?`;
        sql = mysql.format(sql, [userProfileId]);
        let selectUser = `SELECT profilePictureUrl FROM users WHERE userId = ?`;
        selectUser = mysql.format(selectUser, [userProfileId]);
        db.query(selectUser, (error, result) => {
            if (error) throw (error);
            const profilePicture = result[0].profilePictureUrl;
            console.log("profil à supprimer : " + userProfileId + "et utilisateur voulant supprimer : " + userId + " admin? " + roleId)
            if (profilePicture != `${req.protocol}://${req.get("host")}/images/userProfilePictures/default.png`) {
                const filename = result[0].profilePictureUrl.split("/images/userProfilePictures/uploads/")[1];
                console.log("Nom du fichier: " + filename);
                fs.unlink(`images/userProfilePictures/uploads/${filename}`, () => {
                    console.log("userFound " + userProfileId)
                    helper.data.sqlRequest(sql, res, errorCode, errorMessage)
                });
            } else {
                console.log("User has default image")
                console.log("userFound " + userProfileId)
                helper.data.sqlRequest(sql, res, errorCode, errorMessage)
            };
        })
    }
}

exports.editProfilePicture = (req, res, next) => {
    const errorCode = "409"
    const errorMessage = "Cet utilisateur existe déjà"
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const roleId = decodedToken.roleId;
    const userId = decodedToken.userId
    const userToEdit = req.params.id;
    const profilePicture = `${req.protocol}://${req.get("host")}/images/userProfilePictures/uploads/${req.file.filename}`;
    const userProfileId = req.params.id;

    if (roleId == 1 || userToEdit == userId) {
        if (profilePicture != `${req.protocol}://${req.get("host")}/images/userProfilePictures/default.png`) {
            let sql = `DELETE FROM users WHERE userId = ?`;
            sql = mysql.format(sql, [userProfileId]);
            let selectUser = `SELECT profilePictureUrl FROM users WHERE userId = ?`;
            selectUser = mysql.format(selectUser, [userToEdit]);
            db.query(selectUser, (error, result) => {
                if (error) throw (error);
                console.log(result[0].profilePictureUrl)
                const filename = result[0].profilePictureUrl.split("/images/userProfilePictures/uploads/")[1];
                console.log("Nom du fichier: " + filename);
                fs.unlink(`images/userProfilePictures/uploads/${filename}`, () => {
                    let sql = `UPDATE users SET profilePictureUrl = ?, lastUpdated = CURRENT_TIMESTAMP WHERE userId = ?;`;
                    sql = mysql.format(sql, [profilePicture, userToEdit]);
                    //console.log(profilePicture)
                    //console.log("profil à éditer : " + userToEdit + "et utilisateur voulant éditer : " + userId + " image? " + profilePicture)
                    helper.data.sqlRequest(sql, res, errorCode, errorMessage)
                });
            })

        } else {
            console.log("User has default image")
            let sql = `UPDATE users SET profilePictureUrl = ?, lastUpdated = CURRENT_TIMESTAMP WHERE userId = ?;`;
            sql = mysql.format(sql, [profilePicture, userToEdit]);
            //console.log(profilePicture)
            //console.log("profil à éditer : " + userToEdit + "et utilisateur voulant éditer : " + userId + " image? " + profilePicture)
            helper.data.sqlRequest(sql, res, errorCode, errorMessage)
        }
    }
}

exports.editAccount = (req, res, next) => { // Middleware pour la modification du compte
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    //const profilePicture = `${req.protocol}://${req.get("host")}/images/userProfilePictures/${req.body.newProfilePicture}`
    //console.log(newProfilePicture)
    if (username == null || email == null || fname == null || lname == null || password == null || username == "" || email == "" || fname == "" || lname == "" || password == "") {
        return res.status(400).json({ error: "Champs vides" });
    } else {
        let savedHash = `SELECT * FROM users WHERE userId = ?`;
        savedHash = mysql.format(savedHash, [userId]);
        console.log("userFound " + userId)
        db.query(savedHash, (err, pass) => {
            bcrypt.compare(password, pass[0].password)
                .then(valid => {
                    console.log(pass)
                    if (!valid) {
                        console.log("User not found")
                        return res.status(400).json({ error: 'Mot de passe incorrect !' });
                    } else {
                        bcrypt
                            .hash(newPassword, 10) // Salage du mot de passe 10 fois
                            .then((hash) => {
                                if (validator.isEmail(req.body.email)) {
                                    let sql = `UPDATE users SET username = ?, fname = ?, lname = ?, email = ?, password = ?, lastUpdated = CURRENT_TIMESTAMP WHERE userId = ?;`;
                                    sql = mysql.format(sql, [username, fname, lname, email, hash, userId]);
                                    console.log(username + " fname " + fname + " lname " + lname + " email " + email + " hash " + hash + " userid " + userId)
                                    db.query(sql, (err, result) => {
                                        console.log(err);
                                        console.log(result);
                                        if (result) {
                                            return res.status(200).json({
                                                message: "Utilisateur modifié"
                                            });
                                        } else {
                                            return res.status(409).json({
                                                error: "Échec de la modification"
                                            });
                                        }
                                    })
                                }
                                else {
                                    return res.status(400).json({ error: "Format email incorrect" });
                                }
                            })
                    }
                })

        }
        )
    }
};

exports.editAccountAdmin = (req, res, next) => { // Middleware pour la modification du compte
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const roleId = decodedToken.roleId;
    const userId = decodedToken.userId
    const userToEdit = req.params.id;
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    //const profilePicture = `${req.protocol}://${req.get("host")}/images/userProfilePictures/${req.body.newProfilePicture}`
    //console.log(newProfilePicture)
    console.log("profil à éditer : " + userToEdit + "et utilisateur voulant éditer : " + userId + " admin? " + roleId)
    if (roleId == 1 || userToEdit == userId) {
        if (username == null || email == null || fname == null || lname == null || username == "" || email == "" || fname == "" || lname == "") {
            return res.status(400).json({ error: "Champs vides" });
        } else {
            if (validator.isEmail(req.body.email)) {
                let sql = `UPDATE users SET username = ?, fname = ?, lname = ?, email = ?, lastUpdated = CURRENT_TIMESTAMP WHERE userId = ?;`;
                sql = mysql.format(sql, [username, fname, lname, email, userToEdit]);
                console.log(username + " fname " + fname + " lname " + lname + " email " + email + " userid " + userToEdit)
                db.query(sql, (err, result) => {
                    console.log(err);
                    console.log(result);
                    if (result) {
                        return res.status(200).json({
                            message: "Utilisateur modifié"
                        });
                    } else {
                        return res.status(409).json({
                            error: "Échec de la modification"
                        });
                    }
                })
            }
            else {
                return res.status(400).json({ error: "Format email incorrect" });
            }
        }

    }
};