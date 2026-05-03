const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { recommendMeals, generateSingleMeal, generatePlan } = require("../controllers/mealController");

/**
 * @swagger
 * tags:
 *   name: Meals
 *   description: Meal recommendation routes
 */

/**
 * @swagger
 * /api/meals/recommend:
 *   post:
 *     summary: Recommend meals based on ingredients
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               ingredients: ["chicken", "rice", "broccoli"]
 *     responses:
 *       200:
 *         description: Recommended meals returned
 */
router.post("/recommend", auth, recommendMeals);

/**
 * @swagger
 * /api/meals/generate:
 *   get:
 *     summary: Generate one smart meal
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Generated meal returned
 */
router.get("/generate", auth, generateSingleMeal);

/**
 * @swagger
 * /api/meals/generate-plan:
 *   get:
 *     summary: Generate daily meal plan
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Generated meal plan returned
 */
router.get("/generate-plan", auth, generatePlan);

module.exports = router;