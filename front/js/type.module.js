import { getTypes, loadPokemonsForType } from "./api.js";



/**
 * Ecouteur d'événement sur le lien de navigation pour ouvrir la page des types */
export function listenToClickOnNavTypes() {
    const navTypesElement = document.querySelector("#nav-item-type");
    //console.log(navTeamElement);
    navTypesElement.addEventListener("click", async (event) => {
        
        event.preventDefault(); // Empêche le comportement par défaut (par exemple, navigation vers un lien)

        // Vider le contenu HTML de la balise main
        const mainElement = document.querySelector("#app");
        mainElement.innerHTML = "";

        await fetchAndDisplayTypes(); // Appel de la fonction pour récupérer et afficher les teams
    });
}


/**
* Fonction qui récupère les types depuis l'API et les affiche dans le DOM
*/
export async function fetchAndDisplayTypes() {
    const types = await getTypes();

    // pour chaque chaque type récupéré
    if (!types) {
        return;
    }
    for (const type of types) {
        appTypeContainer(type);
    }
}


function appTypeContainer(typesData) {
    // Vérifier si le bouton pour ce type existe déjà
    const existingButton = document.querySelector(`#type-${typesData.name}`);
    
    // Si le bouton existe déjà, ne pas en ajouter un autre
    if (existingButton) {
        return;
    }

    // Sélectionner le template original
    const template = document.querySelector("#type-template");

    // Cloner le contenu du template
    const buttonClone = template.content.cloneNode(true);

    // Remplir les données dynamiques
    const nameSpan = buttonClone.querySelector("[slot='type-template-name']");
    nameSpan.textContent = typesData.name;

    // Appliquer la couleur au bouton
    const buttonElement = buttonClone.querySelector("[slot='type-id']");
    buttonElement.style.backgroundColor = typesData.color;

    // Ajouter un ID unique pour pouvoir le vérifier plus tard
    buttonElement.id = `type-${typesData.name}`;


    // Ajouter un événement au bouton pour charger les Pokémon associés
    buttonElement.addEventListener("click", () => {
        loadPokemonsForType(typesData.id); // L'ID du type est utilisé pour charger les Pokémon
    });


    // Ajouter le clone au DOM
    document.querySelector("#app").appendChild(buttonClone);
}

