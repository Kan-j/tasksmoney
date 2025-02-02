import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the IWithdrawRequest interface for the Withdrawal model
export interface IWithdrawRequest extends Document {
  userId: Schema.Types.ObjectId; // Reference to the user
  walletId: Schema.Types.ObjectId; // Reference to the wallet
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Withdraw Request Schema
const withdrawRequestSchema: Schema<IWithdrawRequest> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    walletId: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet', // Reference to the Wallet model
      required: true, // Ensure that a wallet must be associated with a withdrawal
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

// Create the WithdrawRequest model
const WithdrawRequest: Model<IWithdrawRequest> =
  mongoose.models?.WithdrawRequest || mongoose.model<IWithdrawRequest>('WithdrawRequest', withdrawRequestSchema);

export default WithdrawRequest;
