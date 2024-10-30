// models/avatar.js

import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const avatarSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  avatar_url: {
    type: String,
    required: true
  }
});

export default model("avatars", avatarSchema);
