import { Pokemon, Type,  } from "../models/associations.js";
import { sequelize } from "../models/client.js";


export const typeController ={
    async getAll(req, res) {
        const types =await Type.findAll();
        res.json(types)
    },

    async getOneTypeofPokemons(req,res) {
        const{id}= req.params;
        const type = await Type.findByPk(Number(id), {
            include: [
            {
                association: "pokemons",
                //include: "teams",
            },
        ],
        });
        if (!type) return res.status(404).json(`Pas de type à l'id : ${id}`);
        res.status(200).json(type);
        },

}