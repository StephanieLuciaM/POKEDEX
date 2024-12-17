// Charger les variables d'environnement (situées dans le fichier .env)
import "dotenv/config";

// Importer Express
import express from "express";

//sécutité
import cors from "cors";

// Import des modules locaux
//Router
import { router } from "./routes/routes.js";




// Créer une app
const app = express();

// module CORS : spécifier qui peut acceder à l'api
app.use(cors({
    // origin: ["monfront1.com, monfront2.fr"]
    origin: "*" // * = autoriser tout le monde (pas une bonne pratique, mais en local, c'est tres bien !)
  }));

// BodyParser permettant d'interpréter des donénes fourni dans un POST, un PATCH ou un PUT, en tant que JSON. Ces données seront stockées dans req.body
app.use(express.json());

app.use(router);



// Lancer un serveur
const PORT = process.env.PORT || 3000; // Valeur de rattrapage (fallback) si process.env.PORT === undefined, on lancera par défaut sur le port 3000
app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`);
});







