const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  calories: Number,
  goal: String,
});

const mealPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetCalories: Number,
    mealPlan: {
      breakfast: mealSchema,
      lunch: mealSchema,
      dinner: mealSchema,
      snack: mealSchema,
    },
    groceryList: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MealPlan", mealPlanSchema);