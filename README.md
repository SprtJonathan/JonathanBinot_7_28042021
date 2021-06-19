# JonathanBinot_7_28042021
## Projet 7 du parcours développeur web d'OpenClassrooms

## Prérequis :

Afin de pouvoir installer et faire fonctionner l'application, vous devrez avoir Node, npm et mySQL installés sur votre ordinateur.

## Installation :

Afin de pouvoir faire fonctionner l'application, il vous faudra :
- Cloner le repository 
- Exécuter `npm install` dans les dossiers backend et frontend
- Le port utilisé par le backend est le port `3000`
- Le port utilisé par le frontend est le port `8080`
- Le port utilisé par la base de données est le port `3306`
- Pour démarrer le frontend, exécuter la commande `npm run serve` à l'intérieur du dossier
- Pour démarrer le backend, exécuter la commande `node server` dans le dossier backend
- Afin de pouvoir vous connecter à la base de données, il vous faudra copier le fichier `P7_02_.env` de l'archive contenant les livrables dans le dossier backend et le renommer en `.env`.

- Pour faciliter la création de la base de données, un script est fourni dans le dossier principal du repository : `groupomania_script.sql`
- Afin de pouvoir l'utiliser, il faudra créer une base de données nommée `groupomania`, avec comme moteur de stockage `INNODB` et comme encodage `utf8mb4` avec interclassement `utf8mb4_unicode_ci`
- Créer un utilisateur nommé `tableEditor`, lui assigner le mot de passe disponible dans fichier .env pour la variable `DB_EDITOR_PASS` et lui octroyer tous les droits sur la base de données. Sinon, il faudra remplacer les identifiants en modifiant les variables `DB_EDITOR_NAME` et `DB_EDITOR_PASS` dans le `.env`
- Une fois la base de données et l'utilisateur créés, importer le script `groupomania_script.sql` dans la base de données avec la commande `mysql -u tableEditor -p groupomania < groupomania_script.sql` ou `SOURCE` ou en utilisant un outil de gestion tel que phpMyAdmin
- Une fois le script correctement importé, le site devrait être fonctionnel

## Consultation du site :

Si tout fonctionne correctement, le site sera accessible à l'adresse suivante `http://localhost:8080/`.
