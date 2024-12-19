import { createTeam, getTeams, editTeam } from "./api.js";
import { closeAddTeamModal, closeEditTeamModal } from "./utils.js";


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


// Fonction qui permet d'ouvrir la modale d'édition d'une équipe
async function openEditTeamModal(teamData) {
    const editTeamModal = document.querySelector("#edit_team_modal");

        // récuperer le nom actuel (il a pu etre modifié)

const currentName = document.querySelector(`[data-id='${teamData.id}'] [slot='team-template-name']`).textContent;


  // remettre le nom actuel de la team dans le champ nom
  editTeamModal.querySelector("#edit-team-name").value = currentName;

  // mettre dans le champ caché, l'id de la liste courante
  editTeamModal.querySelector("#edit-team-id").value = teamData.id;

  if (editTeamModal) {
    // Affiche la modale
    editTeamModal.classList.add('is-active');
     editTeamModal.querySelector("input").focus();

        /*/ Récupère le champ pour le nom de l'équipe
        const currentName  = editTeamModal.querySelector("#edit-team-name");

        // Remplir le champ avec le nom de l'équipe
        if (nameInput) {
            nameInput.value = teamData.name; // Remplir le champ de nom avec le nom de l'équipe
        }

        // Ajouter l'écouteur pour fermer la modale
        const closeTeamModalElement = editTeamModal.querySelector(".close");
        if (closeTeamModalElement) {
            closeTeamModalElement.addEventListener("click", closeEditTeamModal);
        } else {
            console.error("L'élément de fermeture de la modale n'a pas été trouvé.");
        }*/
    } else {
        console.error("Modal de modification d'équipe introuvable.");
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


         // Ajouter des Pokémon à l'équipe 
        // const pokemons = await getPokemons(); // Récupération des Pokémon disponibles
        //if (pokemons && pokemons.length > 0) {
             // Exemple: on va simplement ajouter les 3 premiers Pokémon disponibles à l'équipe
        //for (let i = 0; i < 3 && i < pokemons.length; i++) {
               //await addPokemonToTeam(pokemons[i], createdTeam.id);
           //}
        //}


        // Ajouter l'équipe créée au contenu
        appTeamContainer(createdTeam);

        // Fermer la modal après la création
        closeAddTeamModal();
    });
}


/**
 * Ecouteur d'événement submit sur le formulaire d'édition de liste
 */
export function listenToSubmitOnEditTeamForm() {
    // on récupere le formulaire de la modal #form_edit_team_modal
    const editTeamFormElement = document.querySelector("#form_edit_team_modal");
    // on place un écouteur de soumission sur ce form
    editTeamFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

      // récuperer les informations du formulaire
    const editedTeam = Object.fromEntries(new FormData(editTeamFormElement));

      // envoyer la demande de modification à l'API
    const updatedTeam = await editTeam(editedTeam);

      // soit j'ai obtenu "null", soit la team modifiée
    if (!updatedTeam) {
        return;
    }

      // mettre à jour l'affichage pour refleter la data
      // je dois récuperer la bonne team pour modifier son nom dans mon interface
    const teamToEditElement = document.querySelector(`[data-id='${updatedTeam.id}'] [slot='team-template-name']`);
    teamToEditElement.textContent = updatedTeam.name;

      // fermer et reset la modal
    closeEditTeamModal();

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
    // Récupération du bouton Administrer et ajout de l'événement pour ouvrir la modale d'édition
    const editButton = clone.querySelector(".btnModalTeam");
    if (editButton) {
        editButton.addEventListener("click", (event) => {
            // Appeler la fonction pour ouvrir la modale d'édition et remplir les champs
            openEditTeamModal(teamData);
        });
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





