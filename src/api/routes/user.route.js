const { Router } = require("express");
const {
  register,
  login,
  verify,
  getAll,
  getOne,
} = require("../controllers/user.controller");
const router = new Router();


/**
 * @swagger
 * tags:
 *   name: User
 *   description: The Auth managing API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a user.
 *         fullname:
 *           type: string
 *           description: The full name of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         balance:
 *           type: number
 *           description: The balance of the user's account.
 *       example:
 *         id: abc123
 *         fullname: John Doe
 *         username: johndoe
 *         email: johndoe@example.com
 *         balance: 100.0
 */

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Get all users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User' # Replace with the actual User schema reference
 *       404:
 *         description: Not Found. No users found.
 *       500:
 *         description: Internal Server Error.
 */

router.get("/auth", getAll);

/**
 * @swagger
 * /auth/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 user:
 *                   $ref: '#/components/schemas/User' # Replace with the actual User schema reference
 *       400:
 *         description: Bad Request. Invalid user ID.
 *       404:
 *         description: Not Found. User not found.
 *       500:
 *         description: Internal Server Error.
 */

router.get("/auth/:id", getOne);

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user and send a verification code via email.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The full name of the user.
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Successfully registered and sent verification code via email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad Request. Validation error.
 *       404:
 *         description: Not Found. User already exists.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/auth/signup", register);

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Log in and authenticate a user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       201:
 *         description: Successfully logged in and authenticated the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A welcome message.
 *                 token:
 *                   type: string
 *                   description: The JWT token for the authenticated user.
 *       400:
 *         description: Bad Request. Invalid username or password or validation error.
 *       404:
 *         description: Not Found. User not found or invalid password.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/auth/signin", login);

/**
 * @swagger
 * /auth/signup/verify:
 *   post:
 *     summary: Verify and create a new user account.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verification:
 *                 type: string
 *                 description: The verification code to confirm the account.
 *     responses:
 *       201:
 *         description: Successfully verified and created a new user account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 token:
 *                   type: string
 *                   description: The JWT token for the newly created user.
 *       400:
 *         description: Bad Request. Invalid verification code or validation error.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/auth/signup/verify", verify);

module.exports = router;
