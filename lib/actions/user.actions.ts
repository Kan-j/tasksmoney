"use server"
import Promotion from "../models/Promotion.model";
import RechargeRequest from "../models/RechargeRequest.model";
import User, { IUser } from "../models/User.model";// Adjust the import path as necessary
import { connectToDatabase } from "../mongodb";
import { Types } from "mongoose"; // For ObjectId type validation
import bcrypt from 'bcrypt';


export interface PaginatedUsersResponse {
  users: IUser[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}

export async function getAllNonAdminUsersPaginated(page: number = 1, limit: number = 10): Promise<PaginatedUsersResponse> {
  try {

    await connectToDatabase(); // Connect to MongoDB
    
    // Validate input parameters
    const currentPage = Math.max(1, page);
    const pageSize = Math.max(1, Math.min(limit, 100)); // Limit max to 100 for performance

    // Calculate the number of users to skip
    const skip = (currentPage - 1) * pageSize;

    // Retrieve users who are not admins with pagination
    const users = await User.find({ isAdmin: false })
      .skip(skip)
      .limit(pageSize)
      .exec();

    // Get the total number of non-admin users for pagination metadata
    const totalUsers = await User.countDocuments({ isAdmin: false });

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / pageSize);

    return {
      users,
      totalUsers,
      totalPages,
      currentPage,
    };
  } catch (error: any) {
    throw new Error(`Error retrieving non-admin users: ${error.message}`);
  }
}


// Define the server action to fetch the necessary data for a particular user
export const getUserFinancialSummary = async (userId: string) => {
  try {
    // Check if the userId is valid
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    await connectToDatabase(); // Connect to MongoDB
    // 1. Get the user's total assets and total commissions
    const user = await User.findById(userId, "totalAssets totalCommissions");

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Fetch the last 10 approved recharges for the user
    const approvedRecharges = await RechargeRequest.find({
      userId: userId,
      status: "approved",
    })
      .sort({ createdAt: -1 }) // Sort by latest recharges first
      .limit(10) // Limit to the last 10
      .lean(); // Use lean to return plain JavaScript objects

    // 3. Fetch all active promotions
    const activePromotions = await Promotion.find({ isActive: true }).lean();

    // Return the results
    return {
      totalAssets: user.totalAssets,
      totalCommissions: user.totalCommissions,
      last10ApprovedRecharges: JSON.parse(JSON.stringify(approvedRecharges)),
      activePromotions: JSON.parse(JSON.stringify(activePromotions)),
    };
  } catch (error) {
    console.error("Error fetching user financial summary:", error);
    throw new Error("Failed to retrieve user financial summary");
  }
};



export const getUserProfile = async (userId: string) => {
  await connectToDatabase();

  try {
    const user = await User.findById(userId).select('totalAssets'); // Fetch only the balance
    if (!user) {
      throw new Error('User not found');
    }
    return user.totalAssets; // Return the user's balance
  } catch (error: any) {
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }
};


export const updateUserBalance = async (userId: string, newBalance: number) => {
  await connectToDatabase();

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.totalAssets = newBalance; // Update the balance
    await user.save(); // Save the updated user document

    return user.totalAssets; // Return the new balance
  } catch (error: any) {
    throw new Error(`Failed to update user balance: ${error.message}`);
  }
};


export const resetUserPassword = async (userId: string) => {
  await connectToDatabase() // Ensure you're connected to the database

  try {
    // Find the user by their ID
    const user = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    // Hash the new password
    const newPassword = 'qwertyuiop@123'
    const hashedPassword = await bcrypt.hash(newPassword, 10) // Hash the password

    // Reset the user's password to the hashed value
    user.password = hashedPassword
    await user.save() // Save the updated user

    return { success: true }
  } catch (error) {
    console.error('Error resetting password:', error)
    throw new Error('Failed to reset password')
  }
}


export const changePassword = async (userId: string, newPassword: string) => {
  try {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Find the user and update the password
    const user = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true } // Return the updated document
    );

    // Check if user was found and updated
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    return { success: true, message: 'Password reset successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error resetting password' };
  }
};
