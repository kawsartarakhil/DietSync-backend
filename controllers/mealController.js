const Meal = require("../models/Meal");
const Profile = require("../models/Profile");
const { calculateCalories } = require("../utils/calculations");
const {
  generateMeal,
  scoreMeal,
  generateDailyMealPlan,
  generateGroceryList,
} = require("../utils/mealGenerator");

// 🍽️ Recommend meals
const recommendMeals = async (req, res) => {
  try {
    const { ingredients = [] } = req.body;

    if (!Array.isArray(ingredients)) {
      return res.status(400).json({
        success: false,
        message: "Ingredients must be an array",
      });
    }

    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found. Please create a profile first.",
      });
    }

    const calorieData = calculateCalories(
      profile.weight,
      profile.height,
      profile.age,
      profile.gender,
      profile.goal
    );

    profile.targetCalories = calorieData.calorieTarget;

    const meals = await Meal.find({});

    const userIngredients = ingredients.map((i) => i.toString().toLowerCase().trim());

    const results = meals.map((meal) => {
      const mealIngredients = meal.ingredients.map((i) => i.toLowerCase());
      const matched = mealIngredients.filter((i) => userIngredients.includes(i));
      const missing = mealIngredients.filter((i) => !userIngredients.includes(i));

      return {
        ...meal.toObject(),
        matchScore: Math.round((matched.length / mealIngredients.length) * 100),
        smartScore: scoreMeal(meal, profile),
        matchedIngredients: matched,
        missingIngredients: missing,
      };
    });

    results.sort((a, b) => b.matchScore - a.matchScore || b.smartScore - a.smartScore);

    res.json({
      success: true,
      bestMatch: results[0] || null,
      meals: results,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const generateSingleMeal = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found. Please create a profile first.",
      });
    }

    const calorieData = calculateCalories(
      profile.weight,
      profile.height,
      profile.age,
      profile.gender,
      profile.goal
    );

    const meals = await Meal.find({});
    if (meals.length === 0) throw new Error("No meals in database");
    
    // Pick random meal
    const meal = meals[Math.floor(Math.random() * meals.length)];

    res.json({ success: true, meal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const generatePlan = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found. Please create a profile first.",
      });
    }

    const calorieData = calculateCalories(
      profile.weight,
      profile.height,
      profile.age,
      profile.gender,
      profile.goal
    );

    const allMeals = await Meal.find({});
    if (allMeals.length === 0) throw new Error("No meals in database");
    
    const breakfasts = allMeals.filter(m => m.type === 'Breakfast');
    const lunches = allMeals.filter(m => m.type === 'Lunch');
    const dinners = allMeals.filter(m => m.type === 'Dinner');
    const snacks = allMeals.filter(m => m.type === 'Snack');
    
    const getRandom = (arr) => arr.length ? arr[Math.floor(Math.random() * arr.length)] : allMeals[Math.floor(Math.random() * allMeals.length)];
    
    const mealPlan = {
      breakfast: getRandom(breakfasts),
      lunch: getRandom(lunches),
      dinner: getRandom(dinners),
      snack: getRandom(snacks)
    };

    const allIngredients = [
      ...(mealPlan.breakfast.ingredients || []),
      ...(mealPlan.lunch.ingredients || []),
      ...(mealPlan.dinner.ingredients || []),
      ...(mealPlan.snack.ingredients || [])
    ];
    
    const groceryList = [...new Set(allIngredients)].sort();

    res.json({
      success: true,
      mealPlan,
      groceryList,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { recommendMeals, generateSingleMeal, generatePlan };