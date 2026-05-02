const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Auth routes (no auth middleware needed)
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/admin/register:
 *   post:
 *     summary: Register Admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin registered successfully
 */

router.post('/admin/register', authController.registerAdmin);
/**
 * @swagger
 * /auth/admin/login:
 *   post:
 *     summary: Admin Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful (returns JWT,success:true, adminData)
 */

router.post('/admin/login', authController.loginAdmin);
/** 
 * @swagger
 * /auth/student/register:
 *   post:
 *     summary: student register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              regNo:
 *                type:string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               profile:
 *                 type:string
 *     responses:
 *       201:
 *         description:{success:true, message:Student registered successfully}
 */

router.post('/student/register', authController.registerStudent);

/**
 * @swagger
 * /auth/student/login:
 *   post:
 *     summary: student Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful (returns JWT,success:true, adminData)
 */


router.post('/student/login', authController.loginStudent);

module.exports = router;