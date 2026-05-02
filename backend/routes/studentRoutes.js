const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all student routes
router.use(authMiddleware.protect);
router.use(authMiddleware.studentOnly);
/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student APIs
 */


// Student routes
/**
 * @swagger
 * /student/profile:
 *   put:
 *     summary: Update student profile
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Student not found
 */

router.put('/profile', studentController.updateStudentProfile);
/**
 * @swagger
 * /student/leave:
 *   post:
 *     summary: Apply for leave
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reason
 *               - fromDate
 *               - toDate
 *             properties:
 *               reason:
 *                 type: string
 *               fromDate:
 *                 type: string
 *                 format: date
 *               toDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Leave applied successfully
 *       400:
 *         description: Missing required fields
 */

router.post('/leave', studentController.applyLeave);

/**
 * @swagger
 * /student/leave:
 *   get:
 *     summary: Get student leave history
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of student leaves
 */

router.get('/leave', studentController.getMyLeaves);
/**
 * @swagger
 * /student/notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */


router.get('/notifications', studentController.getAllNotifications);

module.exports = router;