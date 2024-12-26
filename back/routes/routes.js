import { Router } from "express";
import { pokemonController } from "../controllers/pokemon.controller.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";
import { teamController } from "../controllers/team.controller.js";
import { typeController } from "../controllers/type.controller.js";




export const router = new Router();

router.route('/pokemons')
    .get(
        controllerWrapper(
        pokemonController.getAll
    )
    );

    router.route('/pokemons/:id(\\d+)')
    .get(controllerWrapper(pokemonController.getOne));


    router.route('/teams/:team_id/pokemons/:pokemon_id')
    .put(controllerWrapper(teamController.addPokemon))
    .delete(controllerWrapper(teamController.removePokemon));
    
//** EQUIPES */
    router.route('/teams')
        .post(controllerWrapper(teamController.create))
        .get(controllerWrapper(teamController.getAll));
    
    router.route('/teams/:id(\\d+)')
        .patch(controllerWrapper(teamController.update));

    // afin d'ajouter un pokemon à une équipe
    router.get('/team/:id(\\d+)/pokemons', controllerWrapper(teamController.getOneTeamofPokemons));


//**TYPES */
    router.route('/types')
    .get(
        controllerWrapper(
        typeController.getAll
    )
    );
    router.route('/types/:id(\\d+)')
    .get(controllerWrapper(typeController.getOneTypeofPokemons));
