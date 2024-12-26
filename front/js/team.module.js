import { createTeam, getTeams, editTeam, addPokemonToTeam, deletePokemonToTeam } from "./api.js";
import { closeAddTeamModal, closeEditTeamModal, closePkmDetailModal } from "./utils.js";


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


/**
 * Ecouteur d'événement submit sur le formulaire d'édition de liste
 */
export function listenToSubmitOnEditTeamForm() {
    // on récupere le formulaire de la modal #form_edit_team_modal
    const editTeamFormElement = document.querySelector("#form_edit_team_modal");


    // on vérifie si le formulaire existe
    if (!editTeamFormElement) {
        console.error("Le formulaire d'édition de l'équipe n'a pas été trouvé.");
        return;
    }
    // on place un écouteur de soumission sur ce form
    editTeamFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

      // récuperer les informations du formulaire
    const editedTeam = Object.fromEntries(new FormData(editTeamFormElement));

      // envoyer la demande de modification à l'API
    const updatedTeam = await editTeam(editedTeam);

      // soit j'ai obtenu "null", soit la team modifiée
    if (!updatedTeam) {
        console.error("Échec de la mise à jour de l'équipe.");
        return;
    }

      // mettre à jour l'affichage pour refleter la data
      // je dois récuperer la bonne team pour modifier son nom dans mon interface
    const teamToEditElement = document.querySelector(`[data-id='${updatedTeam.id}'] [slot='team-template-name']`);
    if (teamToEditElement) {
        teamToEditElement.textContent = updatedTeam.name;

          // fermer et reset la modal
    closeEditTeamModal();

    } else {
        console.error("L'élément de l'équipe à modifier n'a pas été trouvé.");
    }


    
    });
}


/**
 * Fonction d'écouteur d'événements pour le formulaire d'ajout de Pokémon à une équipe
 */
export function listenToAddPokemonToTeam() {
    // Sélectionner le formulaire d'ajout de Pokémon à une équipe
    const formAddPkmTeamElement = document.querySelector("#form_add_pkm_team");

    // Vérifier si le formulaire existe
    if (!formAddPkmTeamElement) {
        console.error("Le formulaire d'ajout de Pokémon à une équipe n'a pas été trouvé.");
        return;
    }

    // Ajouter un événement pour la soumission du formulaire
    formAddPkmTeamElement.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêcher le rechargement de la page à la soumission du formulaire

        // Récupérer l'ID du Pokémon depuis un champ caché (mis à jour dynamiquement)
        const pokemonId = formAddPkmTeamElement.querySelector(".pkm-id").value;

        // Vérifier si pokemonId est défini et valide
        if (!pokemonId) {
            console.error("L'ID du Pokémon est manquant ou invalide.");
            return;
        }

        // Récupérer l'ID de l'équipe sélectionnée dans le menu déroulant
        const teamId = formAddPkmTeamElement.querySelector(".select").value;

        // Vérifier si teamId est valide
        if (!teamId) {
            console.error("L'ID de l'équipe est manquant.");
            return;
        }

        // Appel API pour ajouter le Pokémon à l'équipe
        const updatedTeam = await addPokemonToTeam(pokemonId, teamId);

        // Vérifier si l'ajout a réussi
        if (!updatedTeam || !updatedTeam.pokemons || updatedTeam.pokemons.length === 0) {
            console.error("L'ajout du Pokémon à l'équipe a échoué ou l'équipe n'a pas de Pokémon.");
            return;
        }
        

        // Afficher l'équipe mise à jour
        appTeamContainer(updatedTeam); // Mettre à jour l'affichage de l'équipe

        // Fermer la modale ou effectuer une autre action (si nécessaire)
        closePkmDetailModal();    
    });

    // Écouteur pour le bouton "Delete"
    const deleteButton = formAddPkmTeamElement.querySelector(".btn_dlt_team");
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const pokemonId = formAddPkmTeamElement.querySelector(".pkm-id").value;
        const teamId = formAddPkmTeamElement.querySelector(".select").value;

        if (!pokemonId || !teamId) {
            console.error("ID du Pokémon ou de l'équipe manquant.");
            return;
        }

        // Appel API pour supprimer un Pokémon de l'équipe
        const success = await deletePokemonToTeam(pokemonId, teamId);

        if (!success) {
            console.error("Échec de la suppression du Pokémon de l'équipe.");
            return;
        }

        console.log("Pokémon supprimé de l'équipe avec succès !");

        // Recharge l'affichage des équipes
        await fetchAndDisplayTeams();

         // Fermer la modale ou effectuer une autre action (si nécessaire)
        closePkmDetailModal();

    });

}

/**
 * Fonction pour mettre à jour dynamiquement l'ID du Pokémon dans le formulaire
 * @param {string} pokemonId - L'ID du Pokémon à ajouter à l'équipe
 */
export function setPokemonIdForModal(pokemonId) {
    // Vérifiez si l'ID du Pokémon est valide avant de mettre à jour le champ caché
    if (!pokemonId) {
        console.error("ID du Pokémon invalide ou non défini.");
        return;
    }

    const hiddenInput = document.querySelector(".pkm-id");
    if (hiddenInput) {
        hiddenInput.value = pokemonId;  // Met à jour la valeur de l'ID du Pokémon dans le formulaire
    } else {
        console.error("Champ caché pour l'ID du Pokémon introuvable.");
    }
}

// Exemple d'appel de la fonction setPokemonIdForModal avec un Pokémon spécifique
// Cette fonction peut être appelée lorsqu'on ouvre la modale de détails d'un Pokémon
// setPokemonIdForModal(pokemonId);



function appTeamContainer(teamData) {
    const template = document.querySelector("#team-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector("[slot='team-template-name']").textContent = teamData.name;
    clone.querySelector("[slot='team-template-description']").textContent = teamData.description;
    clone.querySelector("[slot='team-id']").dataset.id = teamData.id;

    const imgElements = clone.querySelectorAll("[slot='pokemon-template-img']");
    
    // Vérification si des Pokémon existent dans l'équipe
    if (Array.isArray(teamData.pokemons) && teamData.pokemons.length > 0) {
        for (let index = 0; index < teamData.pokemons.length; index++) {
            if (imgElements[index]) {
                const pokemon = teamData.pokemons[index];
                imgElements[index].setAttribute('src', `./src/img/${pokemon.id}.webp`);
                imgElements[index].setAttribute('alt', pokemon.name);
            }
        }
    } // Sinon, on ne fait rien, les images restent vides

    // Ajouter l'événement d'édition
    const editButton = clone.querySelector(".btnModalTeam");
    if (editButton) {
        editButton.addEventListener("click", () => {
            openEditTeamModal(teamData);
        });
    }

    // Ajouter le clone au DOM
    document.querySelector("#app").appendChild(clone);
}


/**
 * Fonction qui place les écouteurs de click sur les éléments de fermeture des modales
 */
export function listenToClickOnTeamModalClosingElement() {
    const closeTeamModalElement = document.querySelector(".close");

    closeTeamModalElement.addEventListener("click", closeAddTeamModal);
}


// Fonction qui permet d'ouvrir la modale d'édition d'une équipe
function openEditTeamModal(teamData) {
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

        // Ajouter l'écouteur pour fermer la modale
        const closeTeamModalElement = editTeamModal.querySelector(".close");
        if (closeTeamModalElement) {
            closeTeamModalElement.addEventListener("click", closeEditTeamModal);
        } else {
            console.error("L'élément de fermeture de la modale n'a pas été trouvé.");
        }
    } else {
        console.error("Modal de modification d'équipe introuvable.");
    }
}



