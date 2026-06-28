import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const chatbotSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  chatbot_url: {
    type: String,
    required: true
  }
});

export default model("chatbots", chatbotSchema);