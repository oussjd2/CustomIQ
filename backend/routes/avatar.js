import express from 'express';
import * as AvatarController from '../controllers/avatar.js';

const router = express.Router();

router.post('/avatars', AvatarController.createAvatar);
router.get('/avatars', AvatarController.getAllAvatars);
router.get('/avatars/:id', AvatarController.getAvatarById);
router.put('/avatars/:id', AvatarController.updateAvatar);
router.delete('/avatars/:id', AvatarController.deleteAvatar);

// New route for generating and saving avatars
router.post('/avatars/generate', AvatarController.generateAndSaveAvatar);

export default router;
