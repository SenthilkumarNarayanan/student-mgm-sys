const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Check if controller functions exist
console.log('Admin Controller functions available:', Object.keys(adminController));

// Check each required function
const requiredFunctions = [
    'enrollStudent', 'blockStudent', 'unblockStudent', 'updateLeaveStatus',
    'getAllLeaves', 'createNotification', 'deleteNotification', 
    'getAllAdminNotifications', 'getAllStudents'
];

requiredFunctions.forEach(fn => {
    if (typeof adminController[fn] !== 'function') {
        console.error(`❌ Missing function: ${fn}`);
        throw new Error(`adminController.${fn} is not a function`);
    } else {
        console.log(`✅ Found function: ${fn}`);
    }
});

// Apply auth middleware
router.use(authMiddleware.protect);
router.use(authMiddleware.adminOnly);

// Routes
/**
 * @swagger
 * /admin/student_enroll:
 *   post:
 *     summary: Enroll a new student
 *     tags: [Admin]
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
 *     responses:
 *       201:
 *         description: Student enrolled successfully. Login credentials have been sent to their email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 regNo:
 *                   type: string
 */
router.post('/student_enroll', adminController.enrollStudent);
/**
 * @swagger
 * /admin/block/:studentId:
 *   put:
 *     summary: Block student
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Student blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 name:
 *                   type: string
 *                 regNo:
 *                   type: string
 */
router.put('/block/:studentId', adminController.blockStudent);
/**
 * @swagger
 * /admin/unblock/:studentId:
 *   put:
 *     summary: Unblock student
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               
 *     responses:
 *       200:
 *         description: Student unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 name:
 *                   type: string
 *                 regNo:
 *                   type: string
 */
router.put('/unblock/:studentId', adminController.unblockStudent);
/**
 * @swagger
 * /admin/leave/{leaveId}:
 *   put:
 *     summary: Update leave status (Approve/Reject)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: leaveId
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *     responses:
 *       200:
 *         description: Leave status updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Leave not found
 */

router.put('/leave/:leaveId', adminController.updateLeaveStatus);

/**
 * @swagger
 * /admin/leaves:
 *   get:
 *     summary: Get all leave requests
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all leaves
 */

router.get('/leaves', adminController.getAllLeaves);
/**
 * @swagger
 * /admin/notification:
 *   post:
 *     summary: Create a notification
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification created
 *       400:
 *         description: Missing fields
 */

router.post('/notification', adminController.createNotification);
/**
 * @swagger
 * /admin/notification/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted
 *       404:
 *         description: Notification not found
 */

router.delete('/notification/:id', adminController.deleteNotification);

/**
 * @swagger
 * /admin/notification:
 *   get:
 *     summary: Get all admin notifications
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */

router.get('/notification', adminController.getAllAdminNotifications);
/**
 * @swagger
 * /admin/students:
 *   get:
 *     summary: Get all students
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 */

router.get('/students', adminController.getAllStudents);

console.log('✅ Admin routes loaded successfully');
module.exports = router;