import { getPokemons } from "./api.js";
import { closePkmDetailModal } from "./utils.js";



/**
 * Ecouteur d'événement sur le lien de navigation pour ouvrir la page Home des pokemons */
export function listenToClickOnNavHome() {
    const navHomeElement = document.querySelector("#nav-item-home");
    //console.log(navTeamElement);
    navHomeElement.addEventListener("click", async (event) => {
        
        event.preventDefault(); // Empêche le comportement par défaut (par exemple, navigation vers un lien)

        // Vider le contenu HTML de la balise main
        const mainElement = document.querySelector("#app");
        mainElement.innerHTML = "";

        await fetchAndDisplayPokemons(); // Appel de la fonction pour récupérer et afficher les teams
    });

}

/**
 * Fonction qui ajoute un pokemon à une  team du DOM
 * @param {Object} pokemon { id, name, hp, atk, atk_spe, def_spe, speed }
 */
export function addPokemontoTeam(pokemon) {
    const { id, name, hp, atk, atk_spe, def_spe, speed, TeamId } = pokemon;
    
    const teamContent = document.querySelector(`[data-id='${TeamId}'] .imgContainer`);
    const template = document.querySelector("#pokemon-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector("[slot='pokemon-template-name']").textContent = name;
    clone.querySelector("[slot='pokemon-template-img']").src = pokemon.imgUrl;  // Ajout de l'image du Pokémon (par exemple, image URL)

    // Ajout des attributs personnalisés, comme ID ou d'autres données si nécessaire
    clone.querySelector("[slot='card']").dataset.id = id;
    clone.querySelector("[slot='card']").dataset.hp = hp; 
    clone.querySelector("[slot='card']").dataset.atk = atk;
    clone.querySelector("[slot='card']").dataset.atk_spe = atk_spe;
    clone.querySelector("[slot='card']").dataset.def_spe = def_spe;
    clone.querySelector("[slot='card']").dataset.speed = speed;

    // event listener pour supprimer une carte
    //clone.querySelector("[slot='delete-card-btn']").addEventListener("click", async () => {
    ///const isDeleted = await deleteCard(card);
      //if (! isDeleted) {
        //return;
      //}
      //document.querySelector(`[slot='card'][data-id='$//{card.id}']`).remove();

   // });

    // event listener pour editer un pokemon
    clone.querySelector("button btn_add_team").addEventListener("click", () => {
        fetchAndDisplayTeams(pokemon);

    teamContent.appendChild(clone);
})
};

/**
* Fonction qui récupère les pokemons depuis l'API et les affiche dans le DOM
*/
export async function fetchAndDisplayPokemons() {
    const pokemons = await getPokemons();

    // pour chaque chaque pokemon récupéré
    if (!pokemons) {
        return;
    }
    for (const pokemon of pokemons) {
        appPkmContainer(pokemon);
    }
}


function appPkmContainer(pokemonData){
    const template = document.querySelector("#pokemon-template");
    // cloner le contenu du template
    const clone = template.content.cloneNode(true);
    clone.querySelector("[slot='pokemon-template-name']").textContent = pokemonData.name;
    clone.querySelector("[slot='pokemon-template-img']").setAttribute('src', `./src/img/${pokemonData.id}.webp`);

        // Ajouter un événement au bouton "Voir les détails"
        const oppenPkmButtonElement =  clone.querySelector("#open_pkm_detail_exemple");
        oppenPkmButtonElement.addEventListener("click", () => {
            openPkmDetailModal(pokemonData);
        });
            
    const pokemonContainerElement = document.querySelector("#app");
    pokemonContainerElement.appendChild(clone);
}


/**
 * Fonction qui ouvre la modale d'ouverture des détails d'un POkemon
 */
function openPkmDetailModal(pokemonData) {
    // on récupere la modale 
    const openpmkDetailModalElement = document.querySelector("#open-pkm-detail-modal");

    console.log(openpmkDetailModalElement);

    // Mettre à jour les informations de la modale avec les données du Pokémon
    openpmkDetailModalElement.querySelector(".pkm_name").textContent = pokemonData.name;
    openpmkDetailModalElement.querySelector(".pkm_img_modal").setAttribute('src', `./src/img/${pokemonData.id}.webp`);

    // Mise à jour 
    openpmkDetailModalElement.querySelector(".pokemon-hp").textContent = pokemonData.atk || "N/A";
    openpmkDetailModalElement.querySelector(".pokemon-def").textContent = pokemonData.def || "N/A";
    openpmkDetailModalElement.querySelector(".pokemon-atk_spe").textContent = pokemonData.atk_spe || "N/A";
    openpmkDetailModalElement.querySelector(".pokemon-def_spe").textContent = pokemonData.def_spe || "N/A";
    openpmkDetailModalElement.querySelector(".pokemon-speed").textContent = pokemonData.speed || "N/A";

    // Afficher la modale
    const pkmDetailModal = document.querySelector("#pkm_detail");
    pkmDetailModal.classList.add("is-active"); 

    

}

/**
 * Fonction qui place les écouteurs de click sur les éléments de fermeture des modales
 */
export function listenToClickOnModalClosingPkmDetail() {
    const closePkmModalButtonsElements = document.querySelectorAll(".close");
    
    // pour chacun des boutons
    for (const button of closePkmModalButtonsElements) {
      // placer sur ces boutons un écouteur de click
    button.addEventListener("click", closePkmDetailModal);
    }
}
    
