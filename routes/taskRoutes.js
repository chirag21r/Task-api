const express = require('express');
const { body, param } = require('express-validator');
const { 
  createTask, 
  getUserTasks, 
  updateTask, 
  deleteTask,
  getAllTasks 
} = require('../controllers/taskController');

const router = express.Router();

// Validation middleware
const validateCreateTask = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed'),
  body('userId')
    .isMongoId()
    .withMessage('Invalid user ID format')
];

const validateUpdateTask = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed')
];

const validateTaskId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid task ID format')
];

const validateUserId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format')
];

// Routes
router.post('/', validateCreateTask, createTask);
router.get('/', getAllTasks); // Bonus: Get all tasks
router.put('/:id', validateTaskId, validateUpdateTask, updateTask);
router.delete('/:id', validateTaskId, deleteTask);

module.exports = router;