/* 
Jeu de devinette
*/

console.log("Bienvenue dans ce jeu de devinette !");

// Décommentez pour afficher la réponse 
console.log("(La solution est " + solution + ")");

// Configuration des parametres pour les parties
var nouvellePartie = true;
var nombreDePartie = 0;
var gagne = 0;
var perdu = 0;

// Tant que le joueur veut jouer, la boucle continue
while(nouvellePartie){

	// Quelques variables pour configurer la partie 
	var nombreDessai = 6;
	var tentativeRestante = nombreDessai;

	// Le chiffre mystere est compris entre ces 2 variables
	var chiffreMystereDebut = 1;
	var chiffreMystereFin = 100;

	// Cette ligne génère aléatoirement un nombre entre les valeurs donnés ci-dessus
	var solution = Math.floor(Math.random() * chiffreMystereFin) + chiffreMystereDebut;

	// J'ai choisi une boucle for car on connait le nombre d'itération, défini par la variable nombreDessai (sauf dans le cas ou le chiffre est trouvé avant, on quitte la boucle)
	for (var i = 1; i<=nombreDessai ; i++){
	    
		var resultat = "";
	    
	    // On vient demander le chiffre au joueur
	    var reponse = prompt("Trouverez-vous le nombre mystère, défini entre " +chiffreMystereDebut+ " et " +chiffreMystereFin+ ". Quelle est votre tentative ?");

		tentativeRestante = nombreDessai-i;

	    // Quelques vérifications sur la réponse fourni

	    // Pas de réponse fourni
	    if(reponse === ""){
	    	resultat = "Essayez au moins de mettre un nombre /!\\ Attention plus que " + tentativeRestante + " tentive(s)";
	    }
	    // Clique sur le bouton "Annuler"
	    else if (reponse === null){
	    	resultat = "Vous abandonnez déjà :( Pourtant il vous reste " + tentativeRestante + " tentive(s)";
	    }
		// Pas un nombre 
	    else if(isNaN(Number(reponse))){
	    	resultat = "Vous devez trouvez un nombre /!\\ Attention plus que " + tentativeRestante + " tentive(s)";
	    }
	    // On élimine les nombres qui ne sont pas compris entre 1 et 100
	    else if((reponse <chiffreMystereDebut) || (reponse >chiffreMystereFin)){
			resultat = "Le chiffre mystere est un entier compris entre 1 et 100 /!\\ Courage vous avez encore " + tentativeRestante + " tentive(s)";
	    }

	    // Si la variable resultat n'est pas vide, nous avons rencontré une erreur que nous affichons au joueur
	    if(resultat !== ""){
	    	// Est-ce la derniere chance ?? 
	    	if(tentativeRestante == 0){
	    		resultat = "Perdu... La solution était "+ solution;
	    		nombreDePartie++;
	    		perdu++;
	    	}
	    	console.log(resultat);
	    	continue;
	    }

	    // Arrivé ici on est sur d'avoir un chiffre dans l'intervalle voulu
	    // Comparaison avec notre chiffre mystere

	    // Premier cas, le joueur à trouvé notre chiffre mystere
	    if (reponse == solution){
	    	resultat = "Bravo ! La solution était " + solution +" ! ";
	    	resultat += " Vous avez trouvé en " + i + " essai(s)";
	    	nombreDePartie++;
	    	gagne++;
	    	console.log(resultat);
	    	break;
	    }
	    // Deuxieme cas, le chiffre donné est supérieur à notre chiffre mystere
	    else if(reponse > solution) resultat = reponse + " est trop grand";
	    // Troisieme et dernier cas possible, le chiffre donné est plus petit que notre chiffre mystere
	    else resultat = reponse + " est trop petit";


    	// Est-ce la derniere chance ?? 
    	if(tentativeRestante == 0){
	    	resultat = "Perdu... La solution était "+ solution;
    		nombreDePartie++;
    		perdu++;
    	}
    	console.log(resultat);
    	continue;

	}

	alert("Voici votre score: partie joué " +nombreDePartie+ ", dont " + gagne + " victoire(s) et " +perdu+ " défaite(s).");

	// Allez on en referais bien une petite derniere ?? :)
	while(true){
		
		var rejouer = prompt("Voulez-vous rejouer, tapez \"oui\" pour rejouer ou \"non\" pour quitter");
		
		if(rejouer === "oui"){
			nouvellePartie = true;
			break;
		}else if(rejouer ==="non"){
			nouvellePartie = false;
			break;
		}else{
			alert("Je n'ai pas compris votre choix");
		}
	}
	
}