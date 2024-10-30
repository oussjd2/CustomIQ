// controllers/avatarController.js

import User from '../models/user.js';
import Avatar from '../models/avatar.js'; // Ensure this import is correct
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: "REDACTED_OPENAI_API_KEY",
});

export async function generateAndSaveAvatar(req, res) {
    const validUserId = "65ea12c6c265a514927f6f4a"; // Hardcoded user ID for testing
    const { description } = req.body;

    try {
        const user = await User.findById(validUserId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Assuming you want to use DALL-E 2 for image generation based on the context
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: description,
            n: 1,
            size: "1024x1024",
        });

        // Adjust according to the actual response structure
        // This is an assumed structure based on your given documentation snippet
        const avatarUrl = response.data[0].url;

        const newAvatar = new Avatar({
            user_id: validUserId,
            avatar_url: avatarUrl,
            name: description,
        });

        await newAvatar.save();
        user.avatar_url = avatarUrl;
        await user.save();
        res.json({ message: "Avatar generated successfully", avatar: newAvatar });
    } catch (error) {
        console.error("Failed to generate avatar:", error);
        res.status(500).json({ error: "Failed to generate avatar" });
    }
}





export function createAvatar(req, res) {
  const newAvatar = new Avatar(req.body);

  newAvatar.save()
    .then(newAvatar => {
      res.status(200).json(newAvatar);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
}

export function getAllAvatars(req, res) {
  Avatar.find()
    .then(avatars => {
      res.status(200).json(avatars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

export function getAvatarById(req, res) {
  Avatar.findById(req.params.id)
    .then(avatar => {
      if (!avatar) {
        res.status(404).json({ message: 'Avatar not found' });
      } else {
        res.status(200).json(avatar);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

export function updateAvatar(req, res) {
  Avatar.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedAvatar => {
      if (!updatedAvatar) {
        res.status(404).json({ message: 'Avatar not found' });
      } else {
        res.status(200).json(updatedAvatar);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

export function deleteAvatar(req, res) {
  Avatar.findByIdAndDelete(req.params.id)
    .then(deletedAvatar => {
      if (!deletedAvatar) {
        res.status(404).json({ message: 'Avatar not found' });
      } else {
        res.status(200).json({ message: 'Avatar deleted successfully' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
}

