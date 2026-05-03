const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { upsertProfile, getProfile } = require("../controllers/profileController");

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile routes
 */

/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Create or update profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               goal:
 *                 type: string
 *             example:
 *               age: 20
 *               gender: "female"
 *               weight: 60
 *               height: 165
 *               goal: "lose"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
router.post("/", auth, upsertProfile);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned
 */
router.get("/", auth, getProfile);
/**
 * @swagger
 * /api/profile/favorites:
 *   post:
 *     summary: Add meal to favorites
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mealId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Meal added to favorites
 *   get:
 *     summary: Get favorite meals
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Favorite meals returned
 */
router.post("/favorites", auth, require("../controllers/profileController").toggleFavorite);
router.get("/favorites", auth, require("../controllers/profileController").getFavorites);
router.post("/grocery", auth, require("../controllers/profileController").updateGroceryChecklist);

module.exports = router;