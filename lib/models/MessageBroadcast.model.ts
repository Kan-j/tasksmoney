import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Message Broadcast document
interface IMessageBroadcast extends Document {
  message: string; // The message content for the broadcast
  createdAt: Date;
  updatedAt: Date;
}

// Define the Message Broadcast Schema
const messageBroadcastSchema: Schema<IMessageBroadcast> = new Schema(
  {
    message: {
      type: String,
      required: [true, 'Notification message is required'],
      trim: true,
      maxLength: [1000, 'Message cannot exceed 1000 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Middleware to update `updatedAt` whenever the document is modified
messageBroadcastSchema.pre<IMessageBroadcast>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Define the Message Broadcast model
const MessageBroadcast: Model<IMessageBroadcast> = mongoose.models?.MessageBroadcast || mongoose.model<IMessageBroadcast>('MessageBroadcast', messageBroadcastSchema);

export default MessageBroadcast;
