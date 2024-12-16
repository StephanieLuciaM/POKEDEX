// Charger les variables d'environnement (situées dans le fichier .env)
import "dotenv/config";

// Importer Express
import express from "express";


// Import des modules locaux
//Router
import { router } from "./routes/routes.js";




// Créer une app
const app = express();



// BodyParser permettant d'interpréter des donénes fourni dans un POST, un PATCH ou un PUT, en tant que JSON. Ces données seront stockées dans req.body
app.use(express.json());

app.use(router);



// Lancer un serveur
const PORT = process.env.PORT || 3000; // Valeur de rattrapage (fallback) si process.env.PORT === undefined, on lancera par défaut sur le port 3000
app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`);
});







