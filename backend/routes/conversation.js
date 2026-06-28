import express from 'express';
import * as conversationController from '../controllers/conversation.js';

const router = express.Router();

// Route to create a new conversation
router.post('/', conversationController.createConversation);

// Route to get all conversations
router.get('/', conversationController.getAllConversations);

// Route to get a conversation by ID
router.get('/:id', conversationController.getConversationById);

// Route to update a conversation by ID
router.put('/:id', conversationController.updateConversation);

// Route to delete a conversation by ID
router.delete('/:id', conversationController.deleteConversation);

export default router;
