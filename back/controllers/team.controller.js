import { Team } from "../models/associations.js";
import { sequelize } from "../models/client.js";


export const teamController ={
    async getAll(req,res){
        const teams =await Team.findAll({
            include: [
                {
                    association: 'pokemons', // L'alias défini dans les associations
                },
            ],
        });
        res.json(teams)
    },

    async create(req, res) {
        try {
            const inputData = req.body;
    
            // Validation des données
            if (!inputData.name) {
                return res.status(400).json({ error: 'Missing name' });
            }
    
            // Création de l'équipe
            const team = await Team.create({
                name: inputData.name,
                description: inputData.description || null,
            });
    
            // Si des Pokémon sont fournis, je les associe à l'équipe
            //Cette condition vérifie deux choses :

            //inputData.pokemonIds
            //Vérifie que pokemonIds existe et qu'il n'est pas null ou undefined (valeurs "falsy" en JavaScript). Si pokemonIds est undefined ou null, la condition retournera directement false.
            //Array.isArray(inputData.pokemonIds)
            //Vérifie que pokemonIds est bien un tableau (comme [1, 2, 3]).

            if (inputData.pokemonIds && Array.isArray(inputData.pokemonIds)) {
                await team.setPokemons(inputData.pokemonIds); // Gestion via la table de liaison
            } //`setPokemons` méthode de Sequelize qui permet de gérer les associations entre une équipe et ses Pokémon en mettant à jour automatiquement la table de liaison (ajout, suppression, ou remplacement des relations existantes).
    
            // Réponse avec l'équipe créée
            res.status(201).json(team);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async update(req, res, next){
        const { id } = req.params;
        const {name} = req.body;

        // Recherche de l'équipe avec l'ID
        const team = await Team.findByPk(id);
        if(!team){
            return res.status(404).json({error: 'The team s name not found'});
        }
        
        // Mise à jour du nom de l'équipe (on ne met à jour que le 'name' ici)
        await team.update({name});
    
        res.json(team);
        },
    
        async getOneTeamofPokemons (req, res) {
            const { id } = req.params;
            const team = await Team.findByPk(Number(id), {
                include: [
                {
                    association: "pokemons",
                    include: "types",
                },
            ],
            });
            if (!team) return res.status(404).json(`Pas de team à l'id : ${id}`);
            res.status(200).json(team);
        }
        

};

