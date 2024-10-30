// controllers/ConversationController.js

import Conversation from '../models/conversation.js';

// Controller to create a new conversation
export function createConversation(req, res) {
  const { userId, chatbotId, messages } = req.body;
  const conversation = new Conversation({ userId, chatbotId, messages });
  conversation.save()
    .then(newConversation => {
      res.status(201).json(newConversation);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server Error', error: err.message });
    });
}

// Controller to get all conversations
export function getAllConversations(req, res) {
  Conversation.find()
    .then(conversations => {
      res.json(conversations);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server Error', error: err.message });
    });
}

// Controller to get a single conversation by ID
export function getConversationById(req, res) {
  Conversation.findById(req.params.id)
    .then(conversation => {
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
      res.json(conversation);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server Error', error: err.message });
    });
}

// Controller to update a conversation
export function updateConversation(req, res) {
  const { userId, chatbotId, messages } = req.body;
  Conversation.findByIdAndUpdate(
    req.params.id,
    { userId, chatbotId, messages },
    { new: true }
  )
    .then(updatedConversation => {
      if (!updatedConversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
      res.json(updatedConversation);
    })
    .catch(err => {
      res.status(500).json({ message: 'Server Error', error: err.message });
    });
}

// Controller to delete a conversation
export function deleteConversation(req, res) {
  Conversation.findByIdAndDelete(req.params.id)
    .then(deletedConversation => {
      if (!deletedConversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }
      res.json({ message: 'Conversation deleted' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Server Error', error: err.message });
    });
}
