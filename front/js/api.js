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