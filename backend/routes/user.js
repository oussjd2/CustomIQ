import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

// Public and user-specific routes
router.get('/users', userController.getAllUsers); // Fetch all users
router.post('/users', userController.createUser); // Create a new user (standard user creation for signup)
router.get('/users/:userId', userController.getUserById); // Get a user by ID
router.put('/users/:userId', userController.updateUserById); // Update a user by ID
router.delete('/users/:userId', userController.deleteUserById); // Delete a user by ID
router.post('/users/login', userController.loginUser); // User login
router.post('/users/request-password-reset', userController.requestPasswordReset); // User requests a password reset
router.post('/users/reset-password', userController.resetPassword); // User resets password

// Admin-specific routes
router.post('/admin/users', userController.createAdminUser); // Admin creates a user with specified role
//router.put('/admin/users/:userId/role', userController.updateRole); // Admin updates the role of a specific user

// Additional routes in userRoutes.js
router.post('/users/:userId/models', userController.addModelUrl); // Add a model URL to a user
router.get('/users/:userId/models', userController.getUserModels); // Retrieve all model URLs submitted by a user

export default router;
