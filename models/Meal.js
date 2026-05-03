const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  ingredients: [String],
  goal: String,
  instructions: String,
  prepTime: Number,
  type: String
});

module.exports = mongoose.model("Meal", mealSchema);