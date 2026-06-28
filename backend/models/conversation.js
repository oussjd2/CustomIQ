import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const conversationSchema = new Schema({
  chatbotId: {
    type: Schema.Types.ObjectId,
    ref: 'Chatbot', // Reference to the Chatbot model if needed
    required: true
  },
  dialogflowConversationId: {
    type: String,
    required: true
  },
  userId: { // This now refers to the custom user_id in the User model
    type: String, // Adjusted to String to match the user_id in User model
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default model("Conversation", conversationSchema);
