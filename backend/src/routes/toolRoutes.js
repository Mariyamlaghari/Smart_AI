import express from 'express';
import {
  generateArticle,
  generateBlogTitles,
  generateImage,
  removeBackground,
  removeObject,
  reviewResume,
} from '../controllers/aiToolsController.js';

const router = express.Router();

/**
 * @route   POST /api/tools/article-writer
 * @desc    Generate article using AI
 * @access  Private
 */
router.post('/article-writer', generateArticle);

/**
 * @route   POST /api/tools/blog-titles
 * @desc    Generate blog titles
 * @access  Private
 */
router.post('/blog-titles', generateBlogTitles);

/**
 * @route   POST /api/tools/image-generation
 * @desc    Generate image from text
 * @access  Private
 */
router.post('/image-generation', generateImage);

/**
 * @route   POST /api/tools/background-removal
 * @desc    Remove background from image
 * @access  Private
 */
router.post('/background-removal', removeBackground);

/**
 * @route   POST /api/tools/object-removal
 * @desc    Remove object from image
 * @access  Private
 */
router.post('/object-removal', removeObject);

/**
 * @route   POST /api/tools/review-resume
 * @desc    Review resume and provide feedback
 * @access  Private
 */
router.post('/review-resume', reviewResume);

export default router;
