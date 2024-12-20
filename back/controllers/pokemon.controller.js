import { Pokemon } from "../models/associations.js";
import { sequelize } from "../models/client.js";


export const pokemonController ={
    async getAll(req,res){
        const pokemons =await Pokemon.findAll();
        res.json(pokemons)
    },

    async getOne(req,res) {
        const{id}= req.params;
        const pokemon = await Pokemon.findByPk(id);
        if(!pokemon){
            return res.status(404).json({error: 'Pokemon not found'});
            }
        
            res.json(pokemon);
        },


};


