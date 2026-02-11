import express from 'express';
import {
  getUsageHistory,
  saveContent,
  getSavedContent,
  updateSavedContent,
  deleteSavedContent,
} from '../controllers/dashboardController.js';

const router = express.Router();

/**
 * @route   GET /api/dashboard/usage-history
 * @desc    Get user's AI tool usage history
 * @access  Private
 */
router.get('/usage-history', getUsageHistory);

/**
 * @route   POST /api/dashboard/saved-content
 * @desc    Save generated content
 * @access  Private
 */
router.post('/saved-content', saveContent);

/**
 * @route   GET /api/dashboard/saved-content
 * @desc    Get user's saved content
 * @access  Private
 */
router.get('/saved-content', getSavedContent);

/**
 * @route   PUT /api/dashboard/saved-content/:id
 * @desc    Update saved content
 * @access  Private
 */
router.put('/saved-content/:id', updateSavedContent);

/**
 * @route   DELETE /api/dashboard/saved-content/:id
 * @desc    Delete saved content
 * @access  Private
 */
router.delete('/saved-content/:id', deleteSavedContent);

export default router;
