import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Promotion document
export interface IPromotion extends Document {
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Promotion Schema
const promotionSchema: Schema<IPromotion> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Promotion title is required'],
      trim: true,
      maxLength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Promotion description is required'],
      trim: true,
      maxLength: [500, 'Description cannot exceed 500 characters'],
    },
    isActive: {
      type: Boolean,
      default: true, // Promotions are active by default
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
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Middleware to update `updatedAt` whenever the document is modified
promotionSchema.pre<IPromotion>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Define the Promotion model
const Promotion: Model<IPromotion> = mongoose.models?.Promotion || mongoose.model<IPromotion>('Promotion', promotionSchema);

export default Promotion;
