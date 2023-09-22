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
 * /create-payment-intent:
 *   post:
 *     summary: Create a payment intent
 *     tags:
 *       - Payment
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               id:
 *                 type: string
 *               user_id:
 *                 type: string
 *             required:
 *               - amount
 *               - id
 *               - user_id
 *     responses:
 *       200:
 *         description: Payment was successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 clientSecret:
 *                   type: string
 *       400:
 *         description: Payment Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 */
router.post("/payment", isUser, payment);

/**
 * @swagger
 * /user/payment/{product_id}:
 *   post:
 *     summary: Process a user payment for a product
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: path
 *         name: product_id
 *         description: The ID of the product to purchase
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Payment failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/user/payment/:product_id", isUser, userPayment);

module.exports = router;
