import {apiBaseUrl} from "../js/config.js";

export async function getPokemons() {
    try {
        const httpResponse = await fetch(`${apiBaseUrl}/pokemons`);
    
        // on test httpResponse.ok
        if (! httpResponse.ok) {
          // si pas ok, ça signifie erreur 400 ou 500
            console.log(httpResponse);
            return null;
        }
    
        const pokemons = await httpResponse.json();
    
        return pokemons;
        
    } catch (error) {
        // serveur down
        console.error("API non acccessible...", error);
        openErrorModal("Une erreur s'est produite... veuillez rééssayer dans quelques minutes");
    }
}

export async function getTeams() {
    try {
        const httpResponse = await fetch(`${apiBaseUrl}/teams`);
    
        // on test httpResponse.ok
        if (! httpResponse.ok) {
          // si pas ok, ça signifie erreur 400 ou 500
            console.log(httpResponse);
            return null;
        }
    
        const teams = await httpResponse.json();
    
        return teams;
        
    } catch (error) {
        // serveur down
        console.error("API non acccessible...", error);
        openErrorModal("Une erreur s'est produite... veuillez rééssayer dans quelques minutes");
    }
}


export async function createTeam(teamData) {
    try {
      // on fait un appel API pour enregistrer la nouvelle carte
    const httpResponse = await fetch(`${apiBaseUrl}/teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamData),
    });

    if (! httpResponse.ok) {
        return null;
    }

    const createdTeam = await httpResponse.json();
    return createdTeam;

    } catch (error) {
      // serveur down
    console.log("API non acccessible...", error);
    }
    }

    export async function editTeam(teamData) {
        try {
            // Récupérer l'id de la team à modifier
            const { id } = teamData;
    
            // Supprimer la clé 'id' car elle ne doit pas être envoyée dans le corps de la requête
            delete teamData.id;
            //const { id: teamId, ...teamUpdateData } = teamData;
            //Cela permet de séparer id du reste des données de l'équipe. teamId contiendra l'ID, mais ce n'est pas envoyé dans le corps de la requête. Les autres propriétés de teamData (comme name) seront contenues dans teamUpdateData.
    
            // Appel API
            const httpResponse = await fetch(`${apiBaseUrl}/teams/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(teamData), // On envoie l'objet contenant les données à mettre à jour
            });
    
            // Est-ce que j'obtiens une réponse valide/exploitable ?
            if (!httpResponse.ok) {
                return null;
            }
    
            const editedTeam = await httpResponse.json();
            console.log("Équipe modifiée avec succès:", editedTeam);
            return editedTeam;
            
        } catch (error) {
            // Serveur down
            console.log("API non accessible...", error);
        }
    }
    

/**
 * Fonction pour ajouter un Pokémon existant à une équipe
 */
export async function addPokemonToTeam(pokemonId, teamId) {
    try {
        // Requête pour ajouter un Pokémon à une équipe via une route PUT
        const response = await fetch(`${apiBaseUrl}/teams/${teamId}/pokemons/${pokemonId}`, {
            method: 'PUT',  // Utilisation de PUT pour ajouter un Pokémon à l'équipe
            headers: {
                'Content-Type': 'application/json',
            },
            // Pas besoin de 'body' ici, car les informations sont dans l'URL
        });

        if (!response.ok) {
            const errorDetails = await response.json();  // Extraire les détails de l'erreur du serveur si disponible
            throw new Error(errorDetails.error || "Impossible d'ajouter ce Pokémon à l'équipe.");
        }

        // Retourner l'équipe mise à jour ou un message de succès
        const updatedTeam = await response.json();
        return updatedTeam;
    } catch (error) {
        console.error("Erreur lors de l'ajout du Pokémon à l'équipe:", error);
        return null;
    }
}

/**
 * Fonction pour supprimer un Pokémon existant à une équipe
 */
export async function deletePokemonToTeam(pokemonId, teamId) {
    try {
        // Requête pour supprimer un Pokémon à une équipe via une route DELETE
        const response = await fetch(`${apiBaseUrl}/teams/${teamId}/pokemons/${pokemonId}`, {
            method: 'DELETE',  // Utilisation de DELETE pour supprimer un Pokémon à l'équipe
            headers: {
                'Content-Type': 'application/json',
            },
            // Pas besoin de 'body' ici, car les informations sont dans l'URL
        });

        if (!response.ok) {
            return null;
        }

       // la ressource a bien été supprimée
        return true;

    } catch (error) {
         // serveur down
        console.log("API non acccessible...", error);
    }
}


