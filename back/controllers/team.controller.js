import { Team } from "../models/associations.js";
import { sequelize } from "../models/client.js";


export const teamController ={
    async getAll(req,res){
        const teams =await Team.findAll();
        res.json(teams)
    },
    async create(req,res){
        try{
        const inputData = req.body;
        if(!inputData.name){
            // le status 400 est une erreur utilisateur, meme pour une erreur on répond en json
            // On oubli pas de return pour interrompre la fonction après la réponse, et ne pas faire d'instruction inutiles ou non voulues.
            return res.status(400).json({error: 'Missing name'});
            }
            const user = await Team.create(inputData);
            res.status(201).json(user);
        }catch(err){
            // Dans le cas d'un serreur de l'application (ici un souci de connexion avec la BDD) on renvoi un status 500. Afin que l'utilisateur soit au courant que ce n'est pas de sa faute.
            console.error(err);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
};

