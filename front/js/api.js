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
async function addPokemonToTeam(pokemonId, teamId) {
    try {
        // Requête pour ajouter un Pokémon à une équipe via une route PUT ou PATCH (selon ton backend)
        const response = await fetch(`${apiBaseUrl}/teams/${teamId}/pokemons/${pokemonId}`, {
            method: 'PUT',  // ou 'PATCH' si tu mets à jour la liste des Pokémon
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pokemonId }),
        });

        if (!response.ok) {
            throw new Error("Impossible d'ajouter ce Pokémon à l'équipe.");
        }

        // Retourner le Pokémon ou un message de succès
        const updatedTeam = await response.json();
        return updatedTeam;
    } catch (error) {
        console.error("Erreur lors de l'ajout du Pokémon à l'équipe:", error);
        return null;
    }
}

