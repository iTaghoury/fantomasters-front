# Fantomasters

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.3.

Fantômasters est une web app full-stack réalisée avec Angular pour le front et un serveur Express ainsi qu'une base de données MongoDB pour le back.

## Le site

L'URL du site est : **https://fantomasters.ew.r.appspot.com/home** (Host par Google Cloud)

Le site donne accès à plusieurs fonctionnalités :

 * l'utilisateur est d'abord amené sur la Home Page (/home) à laquelle il peut retourner à tout instant en cliquant sur le titre du site en haut à gauche. Il peut y voir et gérer sa liste d'amis (ses FantôMates) mais pour cela il doit être connecté ;

 * Pour accéder à la page de login, l'utilisateur peut utiliser le bouton "Connexion" en haut à droite. Une fois sur cette page (/login) s'il ne possède pas de compte, il peut cliquer sur le lien "Pas encore inscrit ?" qui l'amènera vers la page d'inscription (/sign-up). Après avoir rempli un de ces deux formulaires avec les bonnes information, l'utilisateur est connecté et son nom d'utilisateur ainsi que son rôle apparaissent en haut à droite;


 * l'utilisateur peut choisir et modifier son rôle parmi cinq disponibles (Alchimiste, Enchanteur, Espion, Guerrier et Sorcier) pour se faire il doit être connecté, une fois connecté un bouton "Changer de rôle" apparait à côté de son nom d'utilisateur en haut à droite. Les rôles sont rangés par ordre alphabétique dans un tableau et une description de chaque rôle leur est associée, chaque description se termine par une citation en rapport avec le rôle. Chaque citation provient d'un épisode de la série *Kaamelott* ;

 * l'utilisateur peut se déconnecter à tout moment en cliquant sur le bouton "Déconnexion" en haut à droite, il est alors amené sur une autre page (/logout) lui proposant de se reconnecter.





## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
