const { Router } = require("express");
const { payment, userPayment } = require("../controllers/payment.controller");
const isUser = require("../middlewares/isUser.middleware");

const router = new Router();
/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: The Payment managing API
 */
/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Process a payment and add the amount to the user's balance.
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: The amount to be paid.
 *               id:
 *                 type: string
 *                 description: The payment method ID.
 *               user_id:
 *                 type: string
 *                 description: The ID of the user making the payment.
 *     responses:
 *       200:
 *         description: Successfully processed the payment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 success:
 *                   type: boolean
 *                   description: Indicates whether the payment was successful.
 *                 clientSecret:
 *                   type: string
 *                   description: The client secret of the payment intent.
 *       400:
 *         description: Bad Request. Invalid payment details or user not found.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/payment", isUser, payment);

/**
 * @swagger
 * /user/payment/{product_id}:
 *   post:
 *     summary: Process a payment for a product and deduct the amount from the user's balance.
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: The ID of the product to purchase.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully processed the payment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad Request. Invalid product ID, user not found, or insufficient balance.
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       404:
 *         description: Not Found. Product or user not found.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/user/payment/:product_id", isUser, userPayment);

module.exports = router;
