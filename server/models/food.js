const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const foodSchema = new mongoose.Schema({
  FoodName: {
    type: String,
    required: true,
  },
  FoodProtien: {
    type: String,
    required: true,
  },
  FoodFat: {
    type: String,
    required: true,
  },
  FoodCarbo: {
    type: String,
    required: true,
  },
  FoodFiber: {
    type: String,
    required: true,
  },
  FoodCalorie: {
    type: String,
    required: true,
  },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
