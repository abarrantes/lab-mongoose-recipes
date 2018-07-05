const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeAppDB')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title       : {type: String, required: false, unique: true},
  level       : {type: String, required: false, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients : {type: Array},
  cousine     : {type: String, required: false},
  dishType    : {type: String, enum:['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image       : {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration    : {type: Number, min:0},
  creator     : {type: String},
  created     : {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe',recipeSchema);

Recipe.findOneAndUpdate({name:"Rigatoni alla Genovese"},
{ 
  duration   : 100
}
)
  .then((Recipe) => { console.log('The recipe updated: ', Recipe) })
  .catch((err) => { console.log('An error happened:', err) });


// Recipe.insertMany(data)
//   .then((Recipe) => { console.log('The user is saved and its value is: ', Recipe) })
//   .catch((err) => { console.log('An error happened:', err) });

// Recipe.create({ 
//   title       : 'tacos',
//   level       : 'Easy Peasy',
//   ingredients : ['tortillas','Carne'],
//   cousine     : 'mexican',
//   dishType    : 'Snack',
//   image       : 'https://vignette.wikia.nocookie.net/apocalypserisingmanual/images/d/dd/Taco.jpg/revision/latest?cb=20170823134716',
//   duration    : 10,
//   creator     : 'Andrey'
// })
//   .then((Recipe) => { console.log('The user is saved and its value is: ', Recipe) })
//   .catch((err) => { console.log('An error happened:', err) });

// title. Type String. It should be required and unique.
// level. Type String. Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM 😉)
// ingredients. Type Array.
// cousine. Type String. Should be required.
// dishType. Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
// image. Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
// duration. Type Number. Min value should be 0.
// creator. Type String
// created. Type Date. By default today