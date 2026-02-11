import express from 'express';
import {
  updateProfile,
  uploadProfilePicture,
  getProfile,
} from '../controllers/profileController.js';
import { authenticateToken } from '../middleware/auth.js';
import { uploadProfilePictureMiddleware } from '../middleware/upload.js';

const router = express.Router();

/**
 * @route   GET /api/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/', authenticateToken, getProfile);

/**
 * @route   PUT /api/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/', authenticateToken, updateProfile);

/**
 * @route   POST /api/profile/upload-picture
 * @desc    Upload profile picture
 * @access  Private
 */
router.post(
  '/upload-picture',
  authenticateToken,
  uploadProfilePictureMiddleware,
  uploadProfilePicture
);

export default router;
