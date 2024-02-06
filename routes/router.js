const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllers');
const service = require('../service/service');

// Frontend routes using service methods for rendering pages

// Home page route
router.get('/', service.main);

// Sign-in page route
router.get('/signin', service.login);

// User authentication route
router.post('/authenticate', service.userAuthenticate);

// User home page route
router.get('/user_home', service.user_home);

// Admin home page route
router.get('/admin_home', service.admin_home);

// Route to display the new task creation page
router.get('/new_task', service.new_task);

// Route to display the task update page 
router.get('/update_task', service.taskUpdate);

// Route to trigger task deletion
router.get('/delete_task', service.taskDelete);

// Error page for sign-in issues
router.get('/signin_err', service.signinErr);

// Error page for sign-up issues
router.get('/signup_err', service.signupErr);

/// API endpoints for user management ///

// API endpoint for creating a new user
router.post('/api/user/create', controller.signup);

/// API endpoints for task management ///

// API endpoint to find a task by ID or get all tasks
router.get('/api/task', controller.find);

// API endpoint for creating a new task
router.post('/api/task/create', controller.create_task);

// API endpoint for updating an existing task by ID
router.put('/api/task/:id', controller.updateTask);

// API endpoint for deleting a task by ID
router.delete('/api/task/delete/:id', controller.deleteTask);

module.exports = router;
