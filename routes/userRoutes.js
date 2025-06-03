const express = require('express');
const { body, param } = require('express-validator');
const { createUser, getAllUsers, getUserById } = require('../controllers/userController');

const router = express.Router();

// Validation middleware
const validateCreateUser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
];

const validateUserId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format')
];

// Routes
router.post('/', validateCreateUser, createUser);
router.get('/', getAllUsers);
router.get('/:id', validateUserId, getUserById);
const { getUserTasks } = require('../controllers/taskController');

// Add this route to userRoutes.js
router.get('/:id/tasks', validateUserId, getUserTasks);


module.exports = router;
