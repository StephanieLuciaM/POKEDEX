// Charger les variables d'environnement (situées dans le fichier .env)
import "dotenv/config";

// Importer Express
import express from "express";


// Import des modules locaux
//Router



// Créer une app
const app = express();

// Configurer le view engine
app.set("view engine", "ejs"); // Choix du view engine ("ejs")
app.set("views", "./app/views"); // Choix du dossier contenant les vues ("./views")

// Configurer un dossier statique
app.use(express.static("./public"));


// Configurer l'application



// Lancer un serveur
const PORT = process.env.PORT || 3000; // Valeur de rattrapage (fallback) si process.env.PORT === undefined, on lancera par défaut sur le port 3000
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});







