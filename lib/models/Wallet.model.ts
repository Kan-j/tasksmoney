import mongoose, { Schema, Document, Model } from 'mongoose';


// Wallet interface
export interface IWallet extends Document {
  userId: mongoose.Schema.Types.ObjectId; // Reference to the user
  exchangeName: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

// Wallet Schema
const walletSchema: Schema<IWallet> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    exchangeName: {
      type: String,
      required: [true, 'Exchange name is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Wallet address is required'],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Create the Wallet model
const Wallet: Model<IWallet> = mongoose.models?.Wallet || mongoose.model<IWallet>('Wallet', walletSchema);

export default Wallet;
