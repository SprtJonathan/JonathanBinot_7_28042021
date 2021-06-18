-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 17 juin 2021 à 19:42
-- Version du serveur :  8.0.25
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`s
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `commentId` int NOT NULL AUTO_INCREMENT,
  `postId` int UNSIGNED DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `writtenOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentId`),
  UNIQUE KEY `commentId_UNIQUE` (`commentId`),
  KEY `fk_commnents_userId_idx` (`userId`),
  KEY `fk_comments_postId_idx` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`commentId`, `postId`, `userId`, `comment`, `writtenOn`, `lastUpdated`) VALUES
(40, 203, 215, '<p>Merci pour ce partage !</p><p>Vous nous aidez grandement !</p>', '2021-06-17 09:52:40', '2021-06-17 09:52:59'),
(41, 206, 179, '<p>Merci pour cette introduction !</p>', '2021-06-17 11:55:02', '2021-06-17 11:55:02'),
(43, 200, 214, '<p>Bien vu ! C\'est vrai que c\'est tentant !</p>', '2021-06-17 13:40:31', '2021-06-17 13:40:31'),
(44, 200, 179, '<p>Oh très intéressant !</p>', '2021-06-17 13:40:49', '2021-06-17 13:40:49'),
(45, 210, 215, '<p><strong>Bonjour </strong>!</p>', '2021-06-17 14:43:44', '2021-06-17 14:43:44');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `postId` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `creationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modificationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`postId`),
  UNIQUE KEY `postid_UNIQUE` (`postId`),
  KEY `userId_idx` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=220 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`postId`, `userId`, `title`, `content`, `creationDate`, `modificationDate`) VALUES
(200, 213, 'Petit partage plaisir', '<p>Ce n\'est qu\'en partageant et passant le mot qu\'il sera possible de faire évoluer le média de la VR !</p><p> <a href=\"https://www.reddit.com/r/virtualreality/comments/o0h0ex/bethesdas_next_rpg_starfield_was_shown_off_at_e3/\" rel=\"noopener noreferrer\" target=\"_blank\">(2) Bethesda\'s next RPG, Starfield, was shown off at E3. Want it to support VR like SkyrimVR and FalloutVR? Read this post! : virtualreality (reddit.com)</a></p><p><br></p><iframe title=\"Post reddit partagé\" class=\"ql-video\" id=\"reddit-embed\" src=\"https://www.redditmedia.com/r/virtualreality/comments/o0h0ex/bethesdas_next_rpg_starfield_was_shown_off_at_e3/?ref_source=embed&amp;ref=share&amp;embed=true\" sandbox=\"allow-scripts allow-same-origin allow-popups\" scrolling=\"yes\" frameborder=\"0\" width=\"100%\" height=\"528\"></iframe>', '2021-06-16 10:06:32', '2021-06-17 13:39:57'),
(201, 213, 'Offre d\'emploi', '<p>Petit partage d\'une offre d\'emploi si vous souhaitez partager à vos contacts : <a href=\"https://www.reddit.com/r/vuejs/comments/o0ol6l/looking_for_vuejs_consultant_part_time_remote/\" rel=\"noopener noreferrer\" target=\"_blank\">(2) Vue.js - The progressive Javascript framework (reddit.com)</a></p><p><br></p><p><br></p><iframe title=\"Post reddit partagé\" class=\"ql-video\" id=\"reddit-embed\" src=\"https://www.redditmedia.com/r/vuejs/comments/o0ol6l/looking_for_vuejs_consultant_part_time_remote/?ref_source=embed&amp;ref=share&amp;embed=true\" sandbox=\"allow-scripts allow-same-origin allow-popups\" scrolling=\"yes\" frameborder=\"0\" width=\"100%\" height=\"528\"></iframe>', '2021-06-16 10:07:29', '2021-06-17 13:38:46'),
(203, 213, 'Post reddit', '<p><a href=\"https://www.reddit.com/r/vuejs/comments/o0q91f/what_is_the_syntax_for_displaying_hyphenated_api/\" rel=\"noopener noreferrer\" target=\"_blank\">(2) What is the syntax for displaying hyphenated API paths? : vuejs (reddit.com)</a> Voici un petit post concernant un problème rencontré hier. Je vous le partage ici si ça peut aider</p><iframe title=\"Post reddit partagé\" class=\"ql-video\" id=\"reddit-embed\" src=\"https://www.redditmedia.com/r/vuejs/comments/o0q91f/what_is_the_syntax_for_displaying_hyphenated_api/?ref_source=embed&amp;ref=share&amp;embed=true\" sandbox=\"allow-scripts allow-same-origin allow-popups\" scrolling=\"yes\" frameborder=\"0\" width=\"100%\" height=\"528\"></iframe>', '2021-06-16 10:13:04', '2021-06-17 13:37:51'),
(206, 215, 'Bonjour et bienvenue', '<p>Bonjour à tous et à toutes.</p><p><br></p><p>Bienvenue sur le réseau social de Groupomania !</p><p><br></p><p>Une fois votre inscription faite, vous avez la possibilité d\'écrire des posts visibles à tous, et de les commenter. Si vous vous êtes trompés dans la rédaction du post ou que vous souhaitez revenir dessus, vous avez la possibilité de l\'éditer en cliquant sur le bouton d\'edition (le crayon), ou de le supprimer en cliquant sur la corbeille. Les commentaires fonctionnent de la même manière.</p><p><br></p><p>Vous avez également la possibilité de partager des articles reddit dans vos posts. Pour ce faire, copiez-collez simplement le lien dans la zone de texte, ou utilisez le bouton lien hypertexte (l\'image de chaîne sur la barre d\'outils) afin d\'ajouter un lien à un mot ou une phrase. <a href=\"https://www.reddit.com/r/windows/comments/o1bcu0/how_much_code_from_old_versions_of_windows_is/\" rel=\"noopener noreferrer\" target=\"_blank\">Comme ceci.</a></p><p><br></p><p>Vous disposez également d\'une page de profil publique accessible à tous mais modifiable uniquement par vous, ou les administrateurs du site.</p><p><br></p><p>En espérant que cette première version vous conviendra !</p><iframe title=\"Post reddit partagé\" class=\"ql-reddit\" id=\"reddit-embed\" src=\"https://www.redditmedia.com/r/windows/comments/o1bcu0/how_much_code_from_old_versions_of_windows_is/?ref_source=embed&amp;ref=share&amp;embed=true\" sandbox=\"allow-scripts allow-same-origin allow-popups\" scrolling=\"yes\" frameborder=\"0\" width=\"100%\" height=\"528\"></iframe>', '2021-06-17 11:30:02', '2021-06-17 14:42:27'),
(210, 179, 'Bonjour à tous et à toutes', '<p>Bonjour chers collègues,</p><p><br></p><p>Je suis gratifiedsheep, je découvre ce réseau tout comme vous !</p><p><br></p><p>Bonne journée !</p>', '2021-06-17 13:54:25', '2021-06-17 19:24:59');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profilePictureUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` int NOT NULL DEFAULT '0',
  `createdOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastUpdated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `userId_UNIQUE` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=224 DEFAULT CHARSET=utf8mb4 COMMENT='Table contenant les informations des utilisateurs';

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`userId`, `username`, `fname`, `lname`, `email`, `password`, `profilePictureUrl`, `roleId`, `createdOn`, `lastUpdated`) VALUES
(177, 'blackfox964', 'Black', 'Fox', 'blackfox@groupomania.com', '$2b$10$HZXIzSDVflkVUskw7Cth1.uo99iWL/hmK6wppJsmZ64D29sSKLA.6', 'http://localhost:3000/images/userProfilePictures/uploads/Illuminati_triangle_eye.png1623406510355.png', 0, '2021-06-02 17:16:42', '2021-06-11 12:15:10'),
(178, 'YellowCow', 'Yellow', 'Cow', 'yellowcow@groupomania.com', '$2b$10$jvcTtajPAoSb4pmN3Pxvg.lmi8vAPdkWBfq/txaaZrcEh1b8OnnIC', 'http://localhost:3000/images/userProfilePictures/uploads/controller.png1623619493912.png', 0, '2021-06-02 18:45:41', '2021-06-13 23:24:53'),
(179, 'gratifiedsheep', 'Gratified', 'Sheep', 'gratifiedsheep@groupomania.com', '$2b$10$Fs4C7hDmhhNsLxqAQW8wsOpRL1uOyzWBNwju2yX9QPI1ZQT2FoJU2', 'http://localhost:3000/images/userProfilePictures/uploads/Uganda_knuckkles.png1623406492668.png', 0, '2021-06-03 15:03:09', '2021-06-14 13:27:29'),
(213, 'exquisitejellyfish322', 'exquisite', 'jellyfish', 'exquisitejellyfish@groupomania.com', '$2b$10$iMzP2QbxAjwKYTGB29UWHuJpJF7B9aSbT5m5P9vWn41.jgJdfbYyi', 'http://localhost:3000/images/userProfilePictures/uploads/LowPolyBackgroundBtoC.png1623754488835.png', 0, '2021-06-15 12:46:21', '2021-06-15 12:54:48'),
(214, 'SprtJonathan', 'Jonathan', 'Binot', 'jonathanbinot@gmail.com', '$2b$10$zO6Il2Kb5Qs5lL43BAl/g.qarwjtyUL2Yicrc1zZk3utMMpLzTkxy', 'http://localhost:3000/images/userProfilePictures/uploads/SpartFR.png1623929241282.png', 1, '2021-06-15 22:42:19', '2021-06-17 13:27:21'),
(215, 'Admin', 'Service', 'RH', 'service.rh@groupomania.com', '$2b$10$eWenEcBEpnR6NOmfn8N1Q.Hb4ZHKxuuz4gT8ElP5jI9mHeJti7mLa', 'http://localhost:3000/images/userProfilePictures/default.png', 1, '2021-06-17 09:50:38', '2021-06-17 09:50:38'),
(216, 'greenlion871', 'Green', 'Lion', 'greenlion@groupomania.com', '$2b$10$kBOb2tNf7k3WhHex7pW75uY5zSxEySgG/WEAo9yWNhmgJ7moIv5Za', 'http://localhost:3000/images/userProfilePictures/default.png', 0, '2021-06-17 13:26:12', '2021-06-17 13:26:12'),
(217, 'closedrobot523', 'Closed', 'Robot', 'closedrobot@groupomania.com', '$2b$10$pRxQj61Tbxo2.2SWTeN1n.yeAZwlABOozNtySSI1x/uBZaJQ0ecrC', 'http://localhost:3000/images/userProfilePictures/default.png', 0, '2021-06-17 13:26:55', '2021-06-17 13:26:55'),
(218, 'capablecat', 'Capable', 'Cat', 'capablecat@groupomania.com', '$2b$10$FoSiA2rXJN3lZaJZF7t5BOEXq7.QxwAzhavRXeg7X0rYuSesyffD2', 'http://localhost:3000/images/userProfilePictures/uploads/Discord_PP_2.png1623937799029.png', 0, '2021-06-17 14:14:22', '2021-06-17 15:49:59'),
(219, 'sinistermustang', 'Sinister', 'Mustang', 'sinistermustang@groupomania.com', '$2b$10$ObaOWSa/uNv65lRq26f96.vnETlb9DLqpaVvNE5eze13tlLSC1NKG', 'http://localhost:3000/images/userProfilePictures/uploads/Seehna.jpeg1623939285123.jpg', 0, '2021-06-17 16:14:12', '2021-06-17 16:15:25'),
(220, 'whitecat676', 'white', 'cat', 'whitecat@groupomania.com', '$2b$10$qtM1RaNo3DVXlBGBAepVaeE/VozXkvvysMF/KvoPf4HuvY1Wb9T.G', 'http://localhost:3000/images/userProfilePictures/default.png', 0, '2021-06-17 16:40:08', '2021-06-17 16:40:08'),
(221, 'openedfox680', 'opened', 'fox', 'openedfox@groupomania.com', '$2b$10$GSKfBG2Eg3NT4eis8ZQfm.pZBC9B6MUxmWVEkZpaG3zI7ZoJW8ppq', 'http://localhost:3000/images/userProfilePictures/default.png', 0, '2021-06-17 17:04:22', '2021-06-17 17:04:22'),
(222, 'extendedrobot402', 'extended', 'robot', 'extendedrobot@groupomania.com', '$2b$10$52exAsTOdFlUXVRAUmXqu.GD03gaGcTWvNQNcDN6r6d4ge5r8wxJO', 'http://localhost:3000/images/userProfilePictures/default.png', 0, '2021-06-17 17:05:27', '2021-06-17 17:05:27'),
(223, 'orangealien825', 'orange', 'alien', 'orangealien@groupomania.com', '$2b$10$FpJea/E9kHhQnWDdraSRhejkcs5isvLEmEZlrd5XfSOj76cBMtzxu', 'http://localhost:3000/images/userProfilePictures/default.png', 0, '2021-06-17 17:06:02', '2021-06-17 17:06:02');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comments_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `FK_posts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
