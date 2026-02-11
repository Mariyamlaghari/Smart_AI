import AIToolUsage from '../models/AIToolUsage.js';
import User from '../models/User.js';
import { articleWriterService } from '../services/ArticleWriterService.js';
import { blogTitleGeneratorService } from '../services/BlogTitleGeneratorService.js';
import { imageGenerationService } from '../services/ImageGenerationService.js';
import { imageProcessingService } from '../services/ImageProcessingService.js';
import { resumeReviewerService } from '../services/ResumeReviewerService.js';

/**
 * Article Writer Controller
 */
export const generateArticle = async (req, res) => {
  try {
    const startTime = Date.now();
    const { prompt, tone, wordLimit, language } = req.body;
    const userId = req.userId;

    // Check user credits
    const user = await User.findById(userId);
    if (user.subscription.credits < 1) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient credits',
      });
    }

    // Generate article
    const result = await articleWriterService.generateArticle(prompt, {
      tone,
      wordLimit,
      language,
    });

    // Deduct credits
    user.subscription.credits -= 1;
    user.apiUsage.articleWriter += 1;
    await user.save();

    // Log usage
    const usage = new AIToolUsage({
      userId,
      toolName: 'articleWriter',
      inputData: { prompt, tone, wordLimit, language },
      outputData: { article: result.article },
      creditsUsed: 1,
      status: 'success',
      executionTime: Date.now() - startTime,
      ipAddress: req.ip,
    });
    await usage.save();

    res.json({
      success: true,
      data: result,
      creditsRemaining: user.subscription.credits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Article generation failed',
      error: error.message,
    });
  }
};

/**
 * Blog Title Generator Controller
 */
export const generateBlogTitles = async (req, res) => {
  try {
    const { topic, count = 5 } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (user.subscription.credits < 1) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient credits',
      });
    }

    const result = await blogTitleGeneratorService.generateTitles(topic, count);

    user.subscription.credits -= 1;
    user.apiUsage.blogTitleGenerator += 1;
    await user.save();

    const usage = new AIToolUsage({
      userId,
      toolName: 'blogTitleGenerator',
      inputData: { topic, count: count.toString() },
      outputData: { titles: JSON.stringify(result.titles) },
      creditsUsed: 1,
      status: 'success',
    });
    await usage.save();

    res.json({
      success: true,
      data: result,
      creditsRemaining: user.subscription.credits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Title generation failed',
      error: error.message,
    });
  }
};

/**
 * Image Generation Controller
 */
export const generateImage = async (req, res) => {
  try {
    const { prompt, style, dimensions, quality } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (user.subscription.credits < 5) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient credits (requires 5)',
      });
    }

    const result = await imageGenerationService.generateImage(prompt, {
      style,
      dimensions,
      quality,
    });

    user.subscription.credits -= 5;
    user.apiUsage.imageGeneration += 1;
    await user.save();

    const usage = new AIToolUsage({
      userId,
      toolName: 'imageGeneration',
      inputData: { prompt, style, dimensions, quality },
      outputData: { imageUrl: result.imageUrl },
      creditsUsed: 5,
      status: 'success',
    });
    await usage.save();

    res.json({
      success: true,
      data: result,
      creditsRemaining: user.subscription.credits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Image generation failed',
      error: error.message,
    });
  }
};

/**
 * Background Removal Controller
 */
export const removeBackground = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (user.subscription.credits < 2) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient credits',
      });
    }

    const result = await imageProcessingService.removeBackground(imageUrl);

    user.subscription.credits -= 2;
    user.apiUsage.backgroundRemoval += 1;
    await user.save();

    const usage = new AIToolUsage({
      userId,
      toolName: 'backgroundRemoval',
      inputData: { imageUrl },
      outputData: { processedUrl: result.processedUrl },
      creditsUsed: 2,
      status: 'success',
    });
    await usage.save();

    res.json({
      success: true,
      data: result,
      creditsRemaining: user.subscription.credits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Background removal failed',
      error: error.message,
    });
  }
};

/**
 * Object Removal Controller
 */
export const removeObject = async (req, res) => {
  try {
    const { imageUrl, coordinates } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (user.subscription.credits < 3) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient credits',
      });
    }

    const result = await imageProcessingService.removeObject(imageUrl, coordinates);

    user.subscription.credits -= 3;
    user.apiUsage.objectRemoval += 1;
    await user.save();

    const usage = new AIToolUsage({
      userId,
      toolName: 'objectRemoval',
      inputData: { imageUrl, coordinates: JSON.stringify(coordinates) },
      outputData: { processedUrl: result.processedUrl },
      creditsUsed: 3,
      status: 'success',
    });
    await usage.save();

    res.json({
      success: true,
      data: result,
      creditsRemaining: user.subscription.credits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Object removal failed',
      error: error.message,
    });
  }
};

/**
 * Resume Reviewer Controller
 */
export const reviewResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (user.subscription.credits < 2) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient credits',
      });
    }

    const result = await resumeReviewerService.reviewResume(resumeText, jobDescription);

    user.subscription.credits -= 2;
    user.apiUsage.resumeReviewer += 1;
    await user.save();

    const usage = new AIToolUsage({
      userId,
      toolName: 'resumeReviewer',
      inputData: { resumeLength: resumeText.length.toString() },
      outputData: { score: result.score.toString() },
      creditsUsed: 2,
      status: 'success',
    });
    await usage.save();

    res.json({
      success: true,
      data: result,
      creditsRemaining: user.subscription.credits,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Resume review failed',
      error: error.message,
    });
  }
};
