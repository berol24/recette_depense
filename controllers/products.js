const Product = require("../model/produit");

//gestion des recettes

const getAddRecette = (req, res) => {
  const {date_recette, quantite_recette, designation_recette, prix_unitaire_recette } =
    req.body;

 
  const prix_total_recette = parseFloat(
    quantite_recette * prix_unitaire_recette
  ).toFixed(2);

  const date = new Date(date_recette);
  const formattedDate = date.toLocaleDateString();
  
  console.log(formattedDate); 
  

  const product = new Product({
    recette: {
      date_recette : formattedDate,
      quantite_recette: quantite_recette,
      designation_recette: designation_recette,
      prix_unitaire_recette: prix_unitaire_recette,
      prix_total_recette: prix_total_recette,
    },
  });

  // Save the product to the database
  product
    .save()
    .then(() => {
      console.log("Nouveau produit créé avec succès");
      res.redirect("/liste_recettes");
    })
    .catch((error) => {
      console.log(`Erreur lors de l'enregistrement : ${error}`);
      res.redirect("/formulaire_recettes");
    });
};

const listRecette = (req, res) => {
  Product.find({ recette: { $exists: true } })
    .then((recettes) => {
      res.status(200).render("liste_recettes.ejs", { recettes: recettes });
    })
    .catch((error) => {
      console.log("Erreur lors de la récupération des produits: ", error);
      res.status(200).render("accueil.ejs", { recettes: [] });
    });
};

const deleteRecette =  async (req, res) => {

  const id = req.params.id 


    const product = Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).json({ message: "User not found" });
  }else{
    product.then(()=>{
      console.log("element supprimé");
      
      res.redirect("/liste_recettes")
    }).catch((erreur)=>{
      console.log("erreur lors de la supression");
      res.redirect("/liste_recettes")
    })
  }
  
}

const showRecette =  async (req, res) => {
  const id = req.params.id;
  try {
    const recette = await Product.findById(id);
    console.log(recette);

    res.render("show_recette.ejs", { recette: recette });
  } catch (error) {
    console.log(`ce produit n'existe pas${error}`);
    res.redirect("/liste_recettes");
  }
}

const updateRecette =  async (req, res) => {
  const id = req.params.id;
  const {date_recette, quantite_recette, designation_recette, prix_unitaire_recette } = req.body;

  const prix_total_recette = parseFloat(quantite_recette * prix_unitaire_recette).toFixed(2);

  const date = new Date(date_recette);
  const formattedDate = date.toLocaleDateString();
  try {
    const updates = {
      "recette.quantite_recette": quantite_recette,
      "recette.designation_recette": designation_recette,
      "recette.prix_unitaire_recette": prix_unitaire_recette,
      "recette.prix_total_recette": prix_total_recette,
      "recette.date_recette": formattedDate,
    };

    await Product.findByIdAndUpdate(id, updates, { new: true });

    res.redirect("/liste_recettes");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
}


//gestion des dépenses

const getAddDepense = (req, res) => {
  const {date_depense, quantite_depense, designation_depense, prix_unitaire_depense } =
    req.body;

  // Calculate the total price
  const prix_total_depense = parseFloat(
    quantite_depense * prix_unitaire_depense
  ).toFixed(2);

  const date = new Date(date_depense);
  const formattedDate = date.toLocaleDateString();
  
  console.log(formattedDate); 
  

  // Create a new Product instance with all the fields
  const product = new Product({
    depense: {
      date_depense : formattedDate,
      quantite_depense: quantite_depense,
      designation_depense: designation_depense,
      prix_unitaire_depense: prix_unitaire_depense,
      prix_total_depense: prix_total_depense,
    },
  });

  // Save the product to the database
  product
    .save()
    .then(() => {
      console.log("Nouveau produit créé avec succès");
      res.redirect("/liste_depenses");
    })
    .catch((error) => {
      console.log(`Erreur lors de l'enregistrement : ${error}`);
      res.redirect("/formulaire_depenses");
    });
};

const listDepense = (req, res) => {
  Product.find({ depense: { $exists: true } })
    .then((depenses) => {
      res.status(200).render("liste_depenses.ejs", { depenses: depenses });
    })
    .catch((error) => {
      console.log("Erreur lors de la récupération des produits: ", error);
      res.status(200).render("accueil.ejs", { depenses: [] });
    });
};

const deleteDepense =  async (req, res) => {

  const id = req.params.id 

  
    const product = Product.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).json({ message: "User not found" });
  }else{
    product.then(()=>{
      console.log("element supprimé");
      
      res.redirect("/liste_depenses")
    }).catch((erreur)=>{
      console.log("erreur lors de la supression");
      res.redirect("/liste_depenses")
    })
  }
  
}

const showDepense =  async (req, res) => {
  const id = req.params.id;
  try {
    const depense = await Product.findById(id);
    console.log(depense);

    res.render("show_depense.ejs", { depense: depense });
  } catch (error) {
    console.log(`ce produit n'existe pas${error}`);
    res.redirect("/liste_depenses");
  }
}

const updateDepense = async (req, res) => {
  const id = req.params.id;
  const { date_depense, quantite_depense, designation_depense, prix_unitaire_depense } = req.body;

  const prix_total_depense = parseFloat(quantite_depense * prix_unitaire_depense).toFixed(2);

  const date = new Date(date_depense);
  const formattedDate = date.toLocaleDateString();

  try {
    const updates = {
      "depense.quantite_depense": quantite_depense,
      "depense.designation_depense": designation_depense,
      "depense.prix_unitaire_depense": prix_unitaire_depense,
      "depense.prix_total_depense": prix_total_depense,
      "depense.date_depense": formattedDate,
    };

    await Product.findByIdAndUpdate(id, updates, { new: true });

    res.redirect("/liste_depenses");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
}




module.exports = {
  getAddRecette,
  listRecette,
  getAddDepense,
  listDepense,
  deleteRecette,
  deleteDepense,
  showRecette,
  showDepense,
  updateRecette,
  updateDepense

};
