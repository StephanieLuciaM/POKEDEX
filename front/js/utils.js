import { fetchAndDisplayTeams } from "./team.module.js";



/**
   * Fonction qui permet de fermer la modale ouverte
   */
export function closePkmDetailModal() {
    //on cible la modale avec l'ID et la classe is-active
    const pkmModalElement = document.querySelector("#pkm_detail.is-active"); 
     
if (pkmModalElement) {
    pkmModalElement.classList.remove("is-active");
      // Redirection vers les équipes après fermeture
    // Réinitialisation du formulaire à son état initial
    const form = pkmModalElement.querySelector("form"); // Cible le formulaire à l'intérieur de la modale
    if (form) {
        form.reset(); // Réinitialise les champs du formulaire
    }

    fetchAndDisplayTeams();
}
        
}

// Fonction pour fermer la modale

export function closeAddTeamModal() {
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


export function closeEditTeamModal() {
    const editTeamModal = document.querySelector("#edit_team_modal");
    
    if (editTeamModal) {
        // Cache la modale
    editTeamModal.classList.remove('is-active');; // Retrait de la classe pour masquer la modale
        
        // Réinitialisation du formulaire à son état initial
        const form = editTeamModal.querySelector("form"); // Cible le formulaire à l'intérieur de la modale
        if (form) {
            form.reset(); // Réinitialise les champs du formulaire
        }

        fetchAndDisplayTeams();
    }
}
