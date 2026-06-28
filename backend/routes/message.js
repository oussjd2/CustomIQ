import express from 'express';
import * as MessageController from '../controllers/message.js';

const router = express.Router();

// Route to create a new message
router.post('/', MessageController.createMessage);

// Route to get all messages
router.get('/', MessageController.getAllMessages);

// Route to get a message by ID
router.get('/:id', MessageController.getMessageById);

// Route to update a message by ID
router.put('/:id', MessageController.updateMessageById);

// Route to delete a message by ID
router.delete('/:id', MessageController.deleteMessageById);

export default router;

