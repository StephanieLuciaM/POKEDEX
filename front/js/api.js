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
            const { id: teamId, ...teamUpdateData } = teamData;
            //Cela permet de séparer id du reste des données de l'équipe. teamId contiendra l'ID, mais ce n'est pas envoyé dans le corps de la requête. Les autres propriétés de teamData (comme name) seront contenues dans teamUpdateData.
    
            // Appel API
            const httpResponse = await fetch(`${apiBaseUrl}/teams/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(teamUpdateData), // On envoie l'objet contenant les données à mettre à jour
            });
    
            // Est-ce que j'obtiens une réponse valide/exploitable ?
            if (!httpResponse.ok) {
                return null;
            }
    
            const editedTeam = await httpResponse.json();
            return editedTeam;
            
        } catch (error) {
            // Serveur down
            console.log("API non accessible...", error);
        }
    }
    
