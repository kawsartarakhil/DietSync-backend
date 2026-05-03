const mongoose = require("mongoose");

const generatedMealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    ingredients: [String],
    calories: Number,
    goal: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("GeneratedMeal", generatedMealSchema);