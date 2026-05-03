const proteins = ["chicken", "beef", "egg", "fish", "tofu", "lentils"];

const carbs = ["rice", "potato", "oats", "bread", "pasta"];

const veggies = ["broccoli", "lettuce", "carrot", "spinach", "cucumber"];

const fats = ["olive oil", "avocado", "nuts"];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const capitalize = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

// =======================================
// SCORE SYSTEM (AI-like ranking logic)
// =======================================
const scoreMeal = (meal, profile) => {
  let score = 50;

  const diff = Math.abs(meal.calories - profile.targetCalories);

  if (diff <= 50) score += 30;
  else if (diff <= 100) score += 15;

  const dislikes = (profile.foodPreferences?.dislikes || []).map((i) =>
    i.toLowerCase()
  );

  const badCount = meal.ingredients.filter((i) =>
    dislikes.includes(i.toLowerCase())
  ).length;

  score -= badCount * 20;

  if (meal.goal === profile.goal) score += 20;

  return Math.max(0, Math.min(100, score));
};

// =======================================
// SINGLE MEAL GENERATOR
// =======================================
const generateMeal = (profile, targetCalories, recentProteins = []) => {
  const availableProteins = proteins.filter(
    (p) => !recentProteins.includes(p)
  );

  const protein =
    availableProteins.length > 0
      ? random(availableProteins)
      : random(proteins);

  const carb = random(carbs);
  const veggie = random(veggies);
  const fat = random(fats);

  const calories = Math.round(
    targetCalories + (Math.floor(Math.random() * 100) - 50)
  );

  return {
    name: `${capitalize(protein)} ${capitalize(carb)} Bowl`,
    ingredients: [protein, carb, veggie, fat],
    calories,
    goal: profile.goal,
  };
};

// =======================================
// DAILY MEAL PLAN
// =======================================
const generateDailyMealPlan = (profile, targetCalories) => {
  const breakfast = generateMeal(profile, Math.round(targetCalories * 0.25));
  const lunch = generateMeal(profile, Math.round(targetCalories * 0.35), [
    breakfast.ingredients[0],
  ]);
  const dinner = generateMeal(profile, Math.round(targetCalories * 0.3), [
    breakfast.ingredients[0],
    lunch.ingredients[0],
  ]);
  const snack = generateMeal(profile, Math.round(targetCalories * 0.1));

  return { breakfast, lunch, dinner, snack };
};

// =======================================
// GROCERY LIST
// =======================================
const generateGroceryList = (mealPlan) => {
  const items = [];

  Object.values(mealPlan).forEach((meal) => {
    items.push(...meal.ingredients);
  });

  return [...new Set(items)].sort();
};

module.exports = {
  generateMeal,
  scoreMeal,
  generateDailyMealPlan,
  generateGroceryList,
};