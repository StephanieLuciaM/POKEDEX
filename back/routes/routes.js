import { Router } from "express";
import { pokemonController } from "../controllers/pokemon.controller.js";
import { controllerWrapper } from "../middlewares/controller.wrapper.js";




export const router = new Router();

router.route('/pokemons')
    .get(
        controllerWrapper(
        pokemonController.getAll
    )
    );

    router.route('/pokemons/:id(\\d+)')
    .get(controllerWrapper(pokemonController.getOne));