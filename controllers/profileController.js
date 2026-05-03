const Profile = require("../models/Profile");
const {
  calculateBMI,
  calculateWater,
  calculateCalories,
  getFoodsToAvoid,
} = require("../utils/calculations");

// CREATE OR UPDATE PROFILE
const upsertProfile = async (req, res) => {
  try {
    const { age, gender, weight, height, goal } = req.body;

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      Object.assign(profile, { age, gender, weight, height, goal });
    } else {
      profile = new Profile({ user: req.user.id, age, gender, weight, height, goal });
    }

    await profile.save();

    res.json({
      success: true,
      profile,
      healthStats: {
        bmi: calculateBMI(weight, height),
        water: calculateWater(weight),
        calories: calculateCalories(weight, height, age, gender, goal),
        foodsToAvoid: getFoodsToAvoid(goal),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET PROFILE
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// TOGGLE FAVORITE
const toggleFavorite = async (req, res) => {
  try {
    const { mealId } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    
    if (profile.favorites.includes(mealId)) {
      profile.favorites = profile.favorites.filter(id => id.toString() !== mealId.toString());
    } else {
      profile.favorites.push(mealId);
    }
    await profile.save();
    
    res.json({ success: true, favorites: profile.favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET FAVORITES
const getFavorites = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('favorites');
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.json({ success: true, favorites: profile.favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE GROCERY CHECKLIST
const updateGroceryChecklist = async (req, res) => {
  try {
    const { checkedItems } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    
    profile.groceryChecklist = checkedItems || [];
    await profile.save();
    res.json({ success: true, groceryChecklist: profile.groceryChecklist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { upsertProfile, getProfile, toggleFavorite, getFavorites, updateGroceryChecklist };