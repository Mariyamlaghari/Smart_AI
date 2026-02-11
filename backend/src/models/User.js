import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // Don't return password by default
    },
    avatar: {
      type: String,
      default: null, // URL to avatar image (Cloudinary)
    },
    stripeCustomerId: {
      type: String,
      unique: true,
      sparse: true,
    },
    profileCompletion: {
      percentage: {
        type: Number,
        default: 0,
      },
      steps: {
        profilePicture: { type: Boolean, default: false },
        phoneNumber: { type: Boolean, default: false },
        bio: { type: Boolean, default: false },
      },
    },
    phoneNumber: String,
    bio: String,
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'starter', 'pro', 'enterprise'],
        default: 'free',
      },
      credits: {
        type: Number,
        default: 10,
      },
      creditsReset: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
      startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    },
    apiUsage: {
      articleWriter: { type: Number, default: 0 },
      blogTitleGenerator: { type: Number, default: 0 },
      imageGeneration: { type: Number, default: 0 },
      backgroundRemoval: { type: Number, default: 0 },
      objectRemoval: { type: Number, default: 0 },
      resumeReviewer: { type: Number, default: 0 },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpire: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Method to get public user data
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.verificationToken;
  delete user.passwordResetToken;
  return user;
};

const User = mongoose.model('User', userSchema);
export default User;
