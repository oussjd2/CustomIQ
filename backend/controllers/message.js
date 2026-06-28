// controllers/messageController.js

import Message from '../models/message.js';

// Controller to create a new message
export function createMessage(req, res) {
  const { id_conversation, type, content } = req.body;
  const message = new Message({ id_conversation, type, content });
  message.save((err, savedMessage) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    } else {
      res.status(201).json(savedMessage);
    }
  });
}

// Controller to get all messages
export function getAllMessages(req, res) {
  Message.find({}, (err, messages) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    } else {
      res.status(200).json(messages);
    }
  });
}

// Controller to get a single message by ID
export function getMessageById(req, res) {
  Message.findById(req.params.id, (err, message) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    } else {
      if (!message) {
        res.status(404).json({ message: 'Message not found' });
      } else {
        res.status(200).json(message);
      }
    }
  });
}

// Controller to update a message by ID
export function updateMessageById(req, res) {
  const { id_conversation, type, content } = req.body;
  Message.findByIdAndUpdate(
    req.params.id,
    { id_conversation, type, content },
    { new: true },
    (err, updatedMessage) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      } else {
        if (!updatedMessage) {
          res.status(404).json({ message: 'Message not found' });
        } else {
          res.status(200).json(updatedMessage);
        }
      }
    }
  );
}

// Controller to delete a message by ID
export function deleteMessageById(req, res) {
  Message.findByIdAndDelete(req.params.id, (err, deletedMessage) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    } else {
      if (!deletedMessage) {
        res.status(404).json({ message: 'Message not found' });
      } else {
        res.status(200).json({ message: 'Message deleted successfully' });
      }
    }
  });
}
