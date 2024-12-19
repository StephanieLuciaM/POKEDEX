import { createTeam, getTeams } from "./api.js";

/**
 * Ecouteur d'événement sur le lien de navigation pour ouvrir la page des Teams
 */
export function listenToClickOnNavTeam() {
    const navTeamElement = document.querySelector("#nav-item-team");
    navTeamElement.addEventListener("click", async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut (par exemple, navigation vers un lien)

        // Vider le contenu HTML de la balise main
        const mainElement = document.querySelector("#app");
        mainElement.innerHTML = "";

        await fetchAndDisplayTeams(); // Appel de la fonction pour récupérer et afficher les teams
    });
}

/**
 * Ecouteur d'événement sur le lien de navigation pour Add Team créée
 */
export function listenToClickOnNavAddTeam() {
    const addNavTeamElement = document.querySelector("#nav-item-add-team");

    addNavTeamElement.addEventListener("click", async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut (par exemple, navigation vers un lien)

        // Vider le contenu HTML de la balise main
        const mainElement = document.querySelector("#app");
        mainElement.innerHTML = "";

        // Afficher la modal de création d'une équipe
        await showAddTeamModal();

        
        listenToSubmitOnAddFormTeamModal(); // Appel de la fonction pour récupérer et afficher le formulaire de création d'une équipe
    });
}

async function showAddTeamModal() {
    const modal = document.querySelector("#add_team_modal");

    if (modal) {
        modal.classList.add("is-active");

         // Ajouter l'écouteur d'événement après l'affichage de la modale
        const closeTeamModalElement = modal.querySelector(".close");
        if (closeTeamModalElement) {
            closeTeamModalElement.addEventListener("click", closeAddTeamModal);
        } else {
            console.error("L'élément de fermeture de la modale n'a pas été trouvé.");
        }
    } else {
        console.error("Modal de création d'équipe introuvable.");
    }
}

/**
 * Fonction qui récupère les teams depuis l'API et les affiche dans le DOM
 */
export async function fetchAndDisplayTeams() {
    const teams = await getTeams();

    if (!teams) {
        return;
    }
    for (const team of teams) {
        appTeamContainer(team);
    }
}

/**
 * Ecouteur d'événement submit sur le formulaire de création de Team
 */
export function listenToSubmitOnAddFormTeamModal() {
    const addFormTeamElement = document.querySelector("#form_team_modal");

    // Vérifiez si le formulaire est présent dans le DOM
    if (!addFormTeamElement) {
        console.error("Le formulaire de création d'équipe n'a pas été trouvé.");
        return;
    }

    // Placer un écouteur de soumission sur ce formulaire
    addFormTeamElement.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Récupérer les données du formulaire
        const newTeam = Object.fromEntries(new FormData(addFormTeamElement));

        // Appel API
        const createdTeam = await createTeam(newTeam);

        if (!createdTeam) {
            return;
        }

        // Ajouter l'équipe créée au contenu
        appTeamContainer(createdTeam);

        // Fermer la modal après la création
        closeAddTeamModal();
    });
}

function appTeamContainer(teamData) {
    const template = document.querySelector("#team-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector("[slot='team-template-name']").textContent = teamData.name;
    clone.querySelector("[slot='team-template-description']").textContent = teamData.description;

    const imgElements = clone.querySelectorAll("[slot='pokemon-template-img']");
    // On Vérifie si teamData.pokemons est un tableau avant de l'itérer
    if (Array.isArray(teamData.pokemons) && teamData.pokemons.length > 0) {
        let index = 0;
        for (const pokemon of teamData.pokemons) {
            if (imgElements[index]) {
                imgElements[index].setAttribute('src', `./src/img/${pokemon.id}.webp`);
                imgElements[index].setAttribute('alt', pokemon.name);
                index++;
            }
        }
    } else {
        console.log("Aucun pokémon trouvé pour cette équipe.");
    }
    document.querySelector("#app").appendChild(clone);
}

/**
 * Fonction qui place les écouteurs de click sur les éléments de fermeture des modales
 */
export function listenToClickOnTeamModalClosingElement() {
    const closeTeamModalElement = document.querySelector(".close");

    closeTeamModalElement.addEventListener("click", closeAddTeamModal);
}


function closeAddTeamModal() {
    const modal = document.querySelector("#add_team_modal");
    
    if (modal) {
        modal.classList.remove("is-active"); // Retrait de la classe pour masquer la modale
        
        // Réinitialisation du formulaire à son état initial
        const form = modal.querySelector("form"); // Cible le formulaire à l'intérieur de la modale
        if (form) {
            form.reset(); // Réinitialise les champs du formulaire
        }
        
        fetchAndDisplayTeams();
    }
}




