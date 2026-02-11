import User from '../models/User.js';

/**
 * Update user profile
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, phoneNumber, bio } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update fields
    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.bio = bio;

    // Update profile completion
    user.profileCompletion.percentage = calculateProfileCompletion(user);
    
    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    });
  }
};

/**
 * Upload profile picture
 */
export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // In a real app, upload to Cloudinary
    // For now, we'll store the file path
    user.avatar = req.file.path || req.file.filename;
    user.profileCompletion.steps.profilePicture = true;
    user.profileCompletion.percentage = calculateProfileCompletion(user);

    await user.save();

    res.json({
      success: true,
      message: 'Profile picture updated successfully',
      data: {
        avatar: user.avatar,
        profileCompletion: user.profileCompletion,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to upload profile picture',
      error: error.message,
    });
  }
};

/**
 * Get user profile
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message,
    });
  }
};

/**
 * Calculate profile completion percentage
 */
const calculateProfileCompletion = (user) => {
  let completed = 1; // Email is always complete
  let total = 4; // name, email, phone, avatar

  if (user.name) completed++;
  if (user.phoneNumber) completed++;
  if (user.avatar) completed++;

  return Math.round((completed / total) * 100);
};

export default {
  updateProfile,
  uploadProfilePicture,
  getProfile,
};
