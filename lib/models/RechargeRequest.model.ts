import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the IRechargeRequest interface for the Recharge model
export interface IRechargeRequest extends Document {
  userId: Schema.Types.ObjectId;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Recharge Request Schema
const rechargeRequestSchema: Schema<IRechargeRequest> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the RechargeRequest model
const RechargeRequest: Model<IRechargeRequest> = mongoose.models?.RechargeRequest || mongoose.model<IRechargeRequest>('RechargeRequest', rechargeRequestSchema);

export default RechargeRequest;
