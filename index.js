const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);

    return Recipe.deleteMany()
  })
  .then(() => {

    // const newRecipe = [{
    //   title: "Pizza margarita",
    //   level: "Easy Peasy",
    //   ingredients: ["pomodoro sauce", "cheese"],
    //   dishType: "main_course",
    //   duration: 40,
    //   cuisine: "Italian"
    // }]

    // return Recipe.create(newRecipe)
  })
  .then(() => {
    // console.log(result[0].title);

    return Recipe.insertMany(data)
  })
  .then(result => {
    data.forEach((e) => {
      console.log(e.title)
    })

    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { returnDdocument: 'after' })
  })
  .then(() => {
    console.log("success message!")

    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(() => {
    console.log("success message 2!")

    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
