/* 
Manipulation du DOM
*/

// Gestion de la fin du chargement de la page web
window.addEventListener("load", function(){

    // Données pré-enregistrées 
    var listeLiens = [
        {
            titre: "So Foot",
            url: "http://sofoot.com",
            auteur: "yann.usaille"
        },
        {
            titre: "Guide d'autodéfense numérique",
            url: "http://guide.boum.org",
            auteur: "paulochon"
        },
        {
            titre: "L'encyclopédie en ligne Wikipedia",
            url: "http://Wikipedia.org",
            auteur: "annie.zette"
        }
    ];

    // Crée et renvoie un élément DOM affichant les données d'un lien
    // Le paramètre lien est un objet JS représentant un lien
    function creerElementLien(lien) {
        var titreLien = document.createElement("a");
        titreLien.href = lien.url;
        titreLien.style.color = "#428bca";
        titreLien.style.textDecoration = "none";
        titreLien.style.marginRight = "5px";
        titreLien.appendChild(document.createTextNode(lien.titre));

        var urlLien = document.createElement("span");
        urlLien.appendChild(document.createTextNode(lien.url));

        // Cette ligne contient le titre et l'URL du lien
        var ligneTitre = document.createElement("h4");
        ligneTitre.style.margin = "0px";
        ligneTitre.appendChild(titreLien);
        ligneTitre.appendChild(urlLien);

        // Cette ligne contient l'auteur
        var ligneDetails = document.createElement("span");
        ligneDetails.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

        var divLien = document.createElement("div");
        divLien.classList.add("lien");
        divLien.appendChild(ligneTitre);
        divLien.appendChild(ligneDetails);

        return divLien;
    }

    var contenu = document.getElementById("contenu");
    // Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
    listeLiens.forEach(function (lien) {
        var elementLien = creerElementLien(lien);
        contenu.appendChild(elementLien);
    });

    /* MES FONCTIONS */ 

    // A chaque appel de cette fonction clic, on renvoie vers le switch et on annule l'evenement du clic
    function clic(e){
        swicthView();
        e.preventDefault();
    }

    // Fonction utile pour simultanément cacher et afficher les blocs désirés 
    function swicthView(){
        if(document.getElementById("form").hasAttribute("hidden")){
            document.getElementById("button").setAttribute("hidden","");
            document.getElementById("form").removeAttribute("hidden");
        }else{
            document.getElementById("form").setAttribute("hidden","");
            document.getElementById("button").removeAttribute("hidden");
        }
    }

    /* MES VARIABLES */ 

    // Initialisation des balises 
    var para = document.createElement("p");
    var bouton = document.createElement("button");

    // Modifications 
    para.id = "paragraphe";
    bouton.textContent = "Ajouter un lien";
    bouton.id = "button";
    bouton.style.padding = "0 10px";

    // Insertion
    para.appendChild(bouton); // ajout du bouton au paragraphe 
    contenu.insertAdjacentHTML("afterbegin",para.outerHTML); // ajout du paragraphe a la page

     // Ajout de l'evenement sur le bouton "Ajouter un lien"
    document.getElementById("button").addEventListener("click",clic);

    /* FORMULAIRE */ 

    // Creation du formulaire
    var form = document.createElement("form");
    // création des éléments du formulaire
    var formName = document.createElement("input");
    var formTitre = document.createElement("input");
    var formLien = document.createElement("input");
    var formSubmit = document.createElement("input");

    // Modificatoin des éléments
    form.id = "form";
    formName.id = "formName";
    formName.setAttribute('type',"text");
    formName.setAttribute('name',"auteurNom");
    formName.setAttribute("required", "");
    formName.setAttribute("placeholder", "Entrez votre nom");
    formName.style.marginRight = "10px";
    formTitre.id = "formTitre";
    formTitre.setAttribute('type',"text");
    formTitre.setAttribute('name',"titreLien");
    formTitre.setAttribute("required", "");
    formTitre.setAttribute("placeholder", "Entrez le titre du lien");
    formTitre.setAttribute("size", "30px");
    formTitre.style.marginRight = "10px";
    formLien.id = "formLien";
    formLien.setAttribute('type',"text");
    formLien.setAttribute('name',"UrlLien");
    formLien.setAttribute("required", "");
    formLien.setAttribute("placeholder", "Entrez l'URL du lien");
    formLien.setAttribute("size", "30px");
    formLien.style.marginRight = "10px";
    formSubmit.id = "formButton";
    formSubmit.setAttribute('type',"submit");
    formSubmit.setAttribute('value',"Ajouter");

    // Insertions 
    form.appendChild(formName); // Ajout des éléments au formulaire
    form.appendChild(formTitre);
    form.appendChild(formLien);
    form.appendChild(formSubmit);
    document.getElementById("paragraphe").appendChild(form); // Ajout du formulaire a la page

    // On cache le formulaire au chargement de la page
    document.getElementById("form").setAttribute("hidden","");

    // Ajout d'un evenement sur le bouton "Ajouter"
    // On traite toutes les informations saisies par l'utilisateur
    document.getElementById("form").addEventListener("submit", function (e) {
        // On stocke toutes les valeurs saisies dans la variable result
        var result = document.querySelector("form");
        // Recupération des valeurs du formulaire
        var resultAuteur = result.elements.auteurNom.value;
        var resultTitre = result.elements.titreLien.value;
        var resultLien = result.elements.UrlLien.value;
        
        // vérification du lien entrez par l'utilisateur
        // il doit commencer par http:// ou https://
        var regexLien = /^(http:\/\/|https:\/\/)/;
        if(!regexLien.test(resultLien)){
            resultLien = "http://"+resultLien;
        }

        // Formatage du nouvelle élément a ajouter
        var nouveauLien = [
            {
                titre: resultTitre,
                url: resultLien,
                auteur: resultAuteur
            }
        ];

        var nouveauElementLien = creerElementLien(nouveauLien[0]);
        contenu.insertBefore(nouveauElementLien,document.getElementsByClassName("lien")[0]);

        // Vide le formulaire de toutes les entrées 
        document.getElementById("form").reset();

        // On revient sur le bouton "Ahouter un lien"
        swicthView();

        e.preventDefault(); // Annulation de l'envoi des données

        /* MESSAGE DE VALIDATION */
        var valid = document.createElement("p");
        valid.id = "validation";
        valid.textContent = "Le lien \"" + resultTitre +"\” a bien été ajouté.";
        valid.style.backgroundColor = "rgb(214,236,246)";
        valid.style.color = "rgb(53,113,152)";
        valid.style.padding = "15px";

        // Ajout de message de validation a la page 
        document.getElementById("contenu").insertAdjacentHTML("afterbegin",valid.outerHTML);
        
        // Puis suppression apres 2 secondes 
        setTimeout(function () {
            document.getElementById("validation").remove();
        }, 2000);

    });

});