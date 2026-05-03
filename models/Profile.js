const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: Number,
    gender: String,
    weight: Number,
    height: Number,
    goal: {
      type: String,
      enum: ["lose", "maintain", "gain"],
    },
    foodPreferences: {
      likes: [String],
      dislikes: [String],
    },
    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal"
    }],
    groceryChecklist: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);