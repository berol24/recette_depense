const mongoose = require("mongoose");
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;  // Récupérer l'URI de la variable d'environnement

if (!MONGO_URI) {
  throw new Error('Veuillez définir la variable d\'environnement MONGO_URI dans votre fichier .env.local');
}

// connexion à la base de données
mongoose
  .connect(
    MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connection avec mongoDB effectué avec succès");
  })
  .catch((error) => {
    console.log(`erreur lors de la connection à la base de données${error}`);
  });

// Schema de données
const Schema = mongoose.Schema;

const recetteSchema = new Schema({
  quantite_recette: { type: Number, required: true },
  designation_recette: { type: String, required: true },
  prix_unitaire_recette: { type: Number , required: true},
  prix_total_recette: { type: Number, required: true },
  date_recette: { type: String, required: true }
});

const depenseSchema = new Schema({
  quantite_depense: { type: Number , required: true},
  designation_depense: { type: String , required: true},
  prix_unitaire_depense: { type: Number , required: true},
  prix_total_depense: { type: Number , required: true},
  date_depense: { type: String, required: true }
});

const productSchema = new Schema({
  recette: recetteSchema,  // Sous-document pour recette
  depense: depenseSchema   // Sous-document pour dépense
});

// Creation du model de données

const Product = mongoose.model("Product", productSchema); // on donne un nom et on ajoute à côté le schema

module.exports = Product;
