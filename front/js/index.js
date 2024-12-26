import { fetchAndDisplayPokemons,
        listenToClickOnModalClosingPkmDetail, 
        listenToClickOnNavHome } from "./pokemon.module.js";

import { fetchAndDisplayTeams, 
        listenToClickOnNavTeam,
        listenToClickOnNavAddTeam, 
        listenToClickOnTeamModalClosingElement, 
        listenToSubmitOnEditTeamForm,
        listenToAddPokemonToTeam} from "./team.module.js";

console.log("pokedex fire");

export function init() {
    // Initialisation des Pokémons
    fetchAndDisplayPokemons();
    listenToClickOnModalClosingPkmDetail();
    listenToClickOnNavHome();
    
    // Initialisation des Teams
    fetchAndDisplayTeams();
    listenToClickOnNavTeam();
    listenToClickOnNavAddTeam();  // Appel de la fonction d'écoute pour "Add Team"
    listenToClickOnTeamModalClosingElement();
    listenToSubmitOnEditTeamForm();
    listenToAddPokemonToTeam();
   
;}
