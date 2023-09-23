const { Router } = require("express");
const isUser = require("../middlewares/isUser.middleware");
const { likes, getAll } = require("../controllers/like.controller");

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: The Like managing API
 */
/**
/**
 * @swagger
 * /getAll:
 *   get:
 *     summary: Get liked products for the authenticated user.
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Successfully retrieved liked products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 likedProducts:
 *                   type: array
 *                   description: An array of liked products.
 *                   items:
 *                     $ref: '#/components/schemas/Product' # Change this to match your product schema reference
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       500:
 *         description: Internal Server Error.
 */

router.get("/likes", isUser, getAll);

/**
 * @swagger
 * /likes/{product_id}:
 *   post:
 *     summary: Add a like to a product.
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: The ID of the product to like.
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully added a like to the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 createLike:
 *                   type: object
 *                   description: The created like object.
 *       400:
 *         description: Bad Request. Invalid product ID or user not found.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       403:
 *         description: Forbidden. Invalid product ID.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/likes/:product_id", isUser, likes);

module.exports = router;
