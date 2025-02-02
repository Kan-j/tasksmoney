import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the IUser interface for the User model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  totalAssets: number;
  totalCommissions: number;
  referredBy?: mongoose.Types.ObjectId; // Optional field for the ID of the referring user
  referralCode: string; // Unique referral code for the user
}

// User Schema
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
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
    },
    isAdmin: {
      type: Boolean,
      default: false, // Initialize with false for new users
    },
    totalAssets: {
      type: Number,
      default: 0, // Initialize with 0 for new users
    },
    totalCommissions: {
      type: Number,
      default: 0, // Initialize with 0 for new users
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to another user (the referrer)
      default: null, // Default to null if no referrer
    },
    referralCode: {
      type: String,
      unique: true, // Ensure each user has a unique referral code
      required: true, // Referral code is mandatory
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the User model
const User: Model<IUser> = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);

export default User;
