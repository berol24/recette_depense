const express = require("express");
const Product = require("./model/produit");

const {
  getAddRecette,
  listRecette,
  listDepense,
  getAddDepense,
  deleteRecette,
  deleteDepense,
  showRecette,
  showDepense,
  updateRecette,
  updateDepense
} = require("./controllers/products.js");


/// creation de l'application express

const app = express();

const port = 3000;

// Middleware pour la gestion des fichiers statics

app.use(express.static("./public"));

//pour manipuler du json
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// enregistrement de notre moteur ejs
app.set("view engine", "ejs");

/// la gestion des routes de requêtes
app.get("/", (req, res) => {
  res.status(200).render("accueil.ejs");
});

// page de formulaire de recette

app.get("/formulaire_recettes", (req, res) => {
  res.status(200).render("formulaire_recettes.ejs");
});

/// ajouter des recettes
app.post("/add_recette", getAddRecette);

// Affichage de la liste des recettes

app.get("/liste_recettes", listRecette);

// suppression d'une recette

app.get("/delete_recette/:id", deleteRecette);

// afficher une recette

app.get("/show_recette/:id", showRecette);

//modifier une recette
app.post("/update_recette/:id",updateRecette);







//////////////////////////////////////////

// page de formulaire de depense

app.get("/formulaire_depenses", (req, res) => {
  res.status(200).render("formulaire_depenses.ejs");
});

/// ajouter des depenses
app.post("/add_depense", getAddDepense);

// Affichage de la liste des depenses

app.get("/liste_depenses", listDepense);

// // l'ecoute de requête
app.listen(port, () => console.log(`lecture sur le port ${port}`));

// suppression d'une depense

app.get("/delete_depense/:id", deleteDepense);

// afficher une depense

app.get("/show_depense/:id",showDepense);


//modifier une depense
app.post("/update_depense/:id", updateDepense);