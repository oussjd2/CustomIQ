// routes/chatbotRoutes.js
import express from 'express';
import * as ChatbotController from '../controllers/chatbot.js';

const router = express.Router();

// Route for creating a new chatbot
router.post('/', ChatbotController.createChatbot);

// Route for getting all chatbots
router.get('/', ChatbotController.getAllChatbots);

// Route for getting a chatbot by ID
router.get('/:id', ChatbotController.getChatbotById);

// Route for updating a chatbot by ID
router.put('/:id', ChatbotController.updateChatbot);

// Route for deleting a chatbot by ID
router.delete('/:id', ChatbotController.deleteChatbot);

export default router;


