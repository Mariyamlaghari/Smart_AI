import mongoose from 'mongoose';

const savedContentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toolName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    metadata: {
      type: Map,
      of: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    tags: [String],
  },
  { timestamps: true }
);

savedContentSchema.index({ userId: 1, createdAt: -1 });

const SavedContent = mongoose.model('SavedContent', savedContentSchema);
export default SavedContent;
