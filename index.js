const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    try {
      // const recipe = await Recipe.create(data[0]);
      // console.log(recipe.title);
      const allRecipes = await Recipe.insertMany(data);
      allRecipes.forEach((el) => console.log(el.title));
      const updatedRigatoni = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );

      await Recipe.deleteOne({ title: "Carrot Cake" });

      await mongoose.disconnect();
    } catch (error) {
      console.error(error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
