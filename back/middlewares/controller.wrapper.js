/*
On créer une fonction qui pour le moment de renvoie rien
export const controllerWrapper = () => {};

Ensuite on ajoute le fait de renvoyer un middleware, puisque une route à besoin d'un middleware pour fonctionner
export const controllerWrapper = () => async (req, res, next) => {};

Ensuite on ajoute un paramètre controller qui sera la fonction du vrai middleware à executer et l'éxecute dans le middleware anonyme
export const controllerWrapper = (controller) => async (req, res, next) => {
controller(req, res, next);
};

Enfin on ajoute un try catch pour gérer les erreurs
*/

export const controllerWrapper = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (err) {
    console.error(err);

    if(err.name === 'ValidationError'){
        return res.status(400).json({error: err.message});
    }

    res.status(500).json({error: 'Internal Server Error'});
    }
};