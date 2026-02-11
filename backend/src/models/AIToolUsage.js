import mongoose from 'mongoose';

const aiToolUsageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toolName: {
      type: String,
      enum: [
        'articleWriter',
        'blogTitleGenerator',
        'imageGeneration',
        'backgroundRemoval',
        'objectRemoval',
        'resumeReviewer',
      ],
      required: true,
    },
    inputData: {
      type: Map,
      of: String,
      required: true,
    },
    outputData: {
      type: Map,
      of: String,
    },
    creditsUsed: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
    error: String,
    executionTime: Number, // in milliseconds
    ipAddress: String,
  },
  { timestamps: true }
);

// Index for faster queries
aiToolUsageSchema.index({ userId: 1, createdAt: -1 });
aiToolUsageSchema.index({ toolName: 1, createdAt: -1 });

const AIToolUsage = mongoose.model('AIToolUsage', aiToolUsageSchema);
export default AIToolUsage;
