/* 
Activité : gestion des contacts
*/

/*

J'ai volontairement décidé de creer mon objet Personne de cette façon, tout simplement par préférence personnelle.

Et j'ai rajouté une option permettant d'éffacer un contact car je trouve qu'elle va de paire avec la fonction d'ajout de contact.

*/

// Création de l'objet Personne 
function Personne (){
    
    this.init = function (prenom, nom){
        this.prenom = prenom;
        this.nom = nom;
    }
    
    this.presentation = function (){
        console.log("Nom : " + this.nom + ", prénom : " + this.prenom);
    }
    
}

function returnContactList(){
    console.log("Voici la liste de tous vos contacts :");
    contacts.forEach(function(contact){
        contact.presentation();
    });
}


function addNewContact(){
    // Quel est le prénom du nouveau contact ? 
    var prenom = prompt("Entrez le prénom du nouveau contact : ");
    
    // Quel est le nom du nouveau contact ? 
    var nom = prompt("Entrez le nom du nouveau contact : ");
    
    // On vient instancier le nouveau contact en tant qu'objet
    var contact = new Personne;
    contact.init(prenom,nom);
    
    // Puis on le rajoute à notre tableau de contacts
    contacts.push(contact);
    
    // Message de confirmation
    console.log("Le contact a bien été ajouté");
}

function deleteContact(){
    // Quel est le prénom du nouveau contact à supprimer ? 
    var prenom = prompt("Entrez le prénom du contact à supprimer : ");
    
    // Quel est le nom du contact à supprimer ? 
    var nom = prompt("Entrez le nom du contact à supprimer : ");
    
    // Passe a true si le contact recherché a été trouvé et a bien été éffacé
    var retourReponse = "";
    
    // On va chercher si la personne est dans notre liste de contact et recuperer sa position dans le tableau Contacts
    var trouver = contacts.findIndex(function(element,index){
        return element.nom === nom && element.prenom === prenom;
    });
    
    if(trouver !== -1){
        // Demande de confirmation avant la suppression
        if(confirm("Etes-vous sur de vouloir supprimer définitivement " + prenom + " " + nom + " de votre liste de contact ?")){
            contacts.splice(trouver, 1);
            retourReponse = "Le contact a bien été supprimé"; 
        }else{
            retourReponse = "Annulation de la suppression du contact";
        }
    }else{
        retourReponse = "Le contact ne fait pas parti de votre liste";   
    }
    return retourReponse;
}


// Voici nos 2 conctats par défaut
var contact1 = new Personne
contact1.init("Carole","Lévisse"); 
var contact2= new Personne
contact2.init("Mélodie","Nelsonne"); 

// Le tableau contacts, contenant la liste de nos contacts
var contacts = [contact1, contact2]; 

// Tant que le booléen continer est sur true, on reste dans la boucle
var continuer = true;

// Message du début souhaitant la bienvenue
console.log("Bienvenue dans le gestionnaire des contacts !")

// Boucle principale jusqu'é ce que l'utilisateur quitte en écrivant 0
while(continuer){
    
    // Affichage du menu
    console.log("1 : Lister les contacts");
    console.log("2 : Ajouter un contact");
    console.log("3 : Supprimer un contact");
    console.log("0 : Quitter");
    
    var reponse = prompt("Choississez une option :");
    
    // Évaluation de la réponse et action en conséquence
    switch (reponse){
        case "0":
            continuer = false;
            break;
        case "1":
            returnContactList();
            break;
        case "2":
            addNewContact();
            break;
        case "3":
            console.log(deleteContact());  
            break;
        default:
            console.log("Je n'ai pas compris votre choix, merci de recommencer");
            break;
    }
    
    // Saut de ligne pour la présentation
    console.log("");
    
}

// Fin du programme 
console.log("Au revoir !");