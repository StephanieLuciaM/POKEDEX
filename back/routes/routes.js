import { Router } from "express";
import { pokemonController } from "../controllers/pokemon.controller.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";
import { teamController } from "../controllers/team.controller.js";




export const router = new Router();

router.route('/pokemons')
    .get(
        controllerWrapper(
        pokemonController.getAll
    )
    );

    router.route('/pokemons/:id(\\d+)')
    .get(controllerWrapper(pokemonController.getOne));

//** EQUIPES */
    router.route('/teams')
        .post(controllerWrapper(teamController.create))
        .get(controllerWrapper(teamController.getAll));