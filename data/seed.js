const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../config/db");
const Meal = require("../models/Meal");

const seed = async () => {
  try {
    await connectDB();

    console.log("🌱 Connected to DB");

    await Meal.deleteMany();

    const meals = [
      {
        name: "Chicken Rice Bowl",
        calories: 500,
        ingredients: ["chicken", "rice", "garlic", "spinach"],
        goal: "lose",
        instructions: "1. Cook rice. 2. Grill chicken with garlic. 3. Serve over rice with fresh spinach.",
        prepTime: 20,
        type: "Dinner"
      },
      {
        name: "Egg Tomato Onion Scramble",
        calories: 350,
        ingredients: ["egg", "tomato", "onion"],
        goal: "lose",
        instructions: "1. Chop tomato and onion. 2. Sauté onion until translucent, add tomato. 3. Whisk eggs and pour over veggies. 4. Scramble until cooked.",
        prepTime: 10,
        type: "Breakfast"
      },
      {
        name: "Creamy Garlic Pasta",
        calories: 600,
        ingredients: ["pasta", "garlic", "cream", "parmesan"],
        goal: "gain",
        instructions: "1. Boil pasta. 2. Sauté garlic in butter. 3. Add heavy cream and parmesan. 4. Toss pasta in sauce.",
        prepTime: 15,
        type: "Dinner"
      },
      {
        name: "Beef Stir Fry",
        calories: 550,
        ingredients: ["beef", "broccoli", "soy sauce", "onion", "garlic"],
        goal: "maintain",
        instructions: "1. Slice beef thinly. 2. Stir fry beef in hot wok. 3. Add broccoli, onion, and garlic. 4. Toss with soy sauce.",
        prepTime: 20,
        type: "Dinner"
      },
      {
        name: "Garlic Butter Shrimp",
        calories: 400,
        ingredients: ["shrimp", "garlic", "butter", "lemon"],
        goal: "lose",
        instructions: "1. Melt butter in a pan. 2. Add minced garlic. 3. Sauté shrimp until pink. 4. Squeeze lemon juice over top.",
        prepTime: 10,
        type: "Lunch"
      },
      {
        name: "Loaded Baked Potato",
        calories: 450,
        ingredients: ["potato", "cheese", "bacon", "sour cream"],
        goal: "gain",
        instructions: "1. Bake potato until tender. 2. Slice open and fluff inside. 3. Top with cheese, bacon, and sour cream.",
        prepTime: 45,
        type: "Snack"
      },
      {
        name: "Avocado Toast",
        calories: 300,
        ingredients: ["bread", "avocado", "egg", "salt", "pepper"],
        goal: "maintain",
        instructions: "1. Toast bread. 2. Mash avocado and spread on toast. 3. Top with a fried egg and seasonings.",
        prepTime: 5,
        type: "Breakfast"
      },
      {
        name: "Classic Cheeseburger",
        calories: 700,
        ingredients: ["beef", "bread", "cheese", "lettuce", "tomato", "onion"],
        goal: "gain",
        instructions: "1. Form beef into patties. 2. Grill patties. 3. Add cheese. 4. Assemble burger with veggies.",
        prepTime: 15,
        type: "Dinner"
      },
      {
        name: "Caprese Salad",
        calories: 250,
        ingredients: ["tomato", "mozzarella", "basil", "balsamic"],
        goal: "lose",
        instructions: "1. Slice tomatoes and mozzarella. 2. Arrange on a plate with fresh basil. 3. Drizzle with balsamic glaze.",
        prepTime: 5,
        type: "Snack"
      },
      {
        name: "Chicken Parmesan",
        calories: 650,
        ingredients: ["chicken", "tomato", "cheese", "pasta"],
        goal: "gain",
        instructions: "1. Bread and fry chicken. 2. Top with marinara and cheese. 3. Bake until melted. 4. Serve with pasta.",
        prepTime: 30,
        type: "Dinner"
      },
      {
        name: "Spicy Tuna Roll Bowl",
        calories: 450,
        ingredients: ["tuna", "rice", "avocado", "cucumber", "soy sauce"],
        goal: "maintain",
        instructions: "1. Mix tuna with spicy mayo. 2. Serve over rice with diced avocado and cucumber.",
        prepTime: 10,
        type: "Lunch"
      },
      {
        name: "Greek Yogurt Parfait",
        calories: 200,
        ingredients: ["yogurt", "berries", "honey", "granola"],
        goal: "lose",
        instructions: "1. Layer greek yogurt with berries. 2. Top with granola and a drizzle of honey.",
        prepTime: 5,
        type: "Breakfast"
      }
    ];

    await Meal.insertMany(meals);

    console.log("🌱 Meals inserted into DB:", meals.length);

    process.exit();
  } catch (err) {
    console.log("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seed();