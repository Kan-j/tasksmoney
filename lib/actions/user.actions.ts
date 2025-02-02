"use server"
import Promotion from "../models/Promotion.model";
import RechargeRequest from "../models/RechargeRequest.model";
import User, { IUser } from "../models/User.model";// Adjust the import path as necessary
import { connectToDatabase } from "../mongodb";
import { Types } from "mongoose"; // For ObjectId type validation
import bcrypt from 'bcrypt';
import { revalidatePath } from "next/cache";
import Wallet from "../models/Wallet.model";
import WithdrawRequest from "../models/WithdrawalRequest.model";
import UserTaskProgress from "../models/UserTasksProgress.model";



interface RequestBody {
  email: any;
  password: any;
}

// This function acts as the server action
export async function handleLoginAction(body: RequestBody) {
  // Connect to MongoDB
  await connectToDatabase();

  try {
    // Find user by email
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return { error: "Invalid email or password", status: 401 };
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return { error: "Invalid email or password", status: 401 };
    }

    // Return the user data without the password
    const { password, ...userWithoutPassword } = user.toObject();

    return { data: userWithoutPassword, status: 200 };
  } catch (error: any) {
    return { error: "Internal Server Error: " + error.message, status: 500 };
  }
}

export interface PaginatedUsersResponse {
  users: IUser[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}

// export async function getAllNonAdminUsersPaginated(page: number = 1, limit: number = 10): Promise<PaginatedUsersResponse> {
//   try {

//     await connectToDatabase(); // Connect to MongoDB
    
//     // Validate input parameters
//     const currentPage = Math.max(1, page);
//     const pageSize = Math.max(1, Math.min(limit, 100)); // Limit max to 100 for performance

//     // Calculate the number of users to skip
//     const skip = (currentPage - 1) * pageSize;

//     // Retrieve users who are not admins with pagination
//     const users = await User.find({ isAdmin: false })
//       .skip(skip)
//       .limit(pageSize)
//       .exec();

//     // Get the total number of non-admin users for pagination metadata
//     const totalUsers = await User.countDocuments({ isAdmin: false });

//     // Calculate total pages
//     const totalPages = Math.ceil(totalUsers / pageSize);

//     return {
//       users,
//       totalUsers,
//       totalPages,
//       currentPage,
//     };
//   } catch (error: any) {
//     throw new Error(`Error retrieving non-admin users: ${error.message}`);
//   }
// }

export async function getAllNonAdminUsersPaginated(
  page: number = 1, 
  limit: number = 10, 
  searchQuery: string = ''
): Promise<PaginatedUsersResponse> {
  try {
    await connectToDatabase(); // Connect to MongoDB
    
    // Validate input parameters
    const currentPage = Math.max(1, page);
    const pageSize = Math.max(1, Math.min(limit, 100)); // Limit max to 100 for performance
    const skip = (currentPage - 1) * pageSize;

    // Build the search filter
    const searchFilter = { 
      isAdmin: false,
      ...(searchQuery ? { 
        $or: [ // Search by username or email
          { username: { $regex: searchQuery, $options: 'i' } }, 
          { email: { $regex: searchQuery, $options: 'i' } }
        ] 
      } : {}) 
    };

    // Retrieve users who are not admins, with pagination and optional search
    const users = await User.find(searchFilter)
      .skip(skip)
      .limit(pageSize)
      .exec();

    // Get the total number of matching non-admin users for pagination
    const totalUsers = await User.countDocuments(searchFilter);

    // Calculate total pages
    const totalPages = Math.ceil(totalUsers / pageSize);

    return {
      users: JSON.parse(JSON.stringify(users)),
      totalUsers,
      totalPages,
      currentPage,
    };
  } catch (error: any) {
    throw new Error(`Error retrieving non-admin users: ${error.message}`);
  }
}


export const getUserFinancialSummary = async (userId: string) => {
  try {
    // Check if the userId is valid
    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID");
    }

    await connectToDatabase(); // Connect to MongoDB

    // 1. Get the user's total assets and total commissions, or return default if not found
    const user = await User.findById(userId, "totalAssets totalCommissions");

    // If no user is found, return default values for assets and commissions
    const totalAssets = user?.totalAssets || 0;
    const totalCommissions = user?.totalCommissions || 0;

    // 2. Fetch the last 10 approved recharges for the user, or return an empty array if none
    const approvedRecharges = await RechargeRequest.find({
      userId: userId,
      status: "approved",
    })
      .sort({ createdAt: -1 }) // Sort by latest recharges first
      .limit(10) // Limit to the last 10
      .lean(); // Use lean to return plain JavaScript objects

    // Ensure we return an empty array if no recharges are found
    const last10ApprovedRecharges = approvedRecharges || [];

    // 3. Fetch all active promotions, or return an empty array if none
    const activePromotions = await Promotion.find({ isActive: true }).lean();

    // Ensure we return an empty array if no promotions are found
    const activePromotionsList = activePromotions || [];

    // Return the results, ensuring all fields have defaults if no data is found
    return {
      totalAssets,
      totalCommissions,
      last10ApprovedRecharges: JSON.parse(JSON.stringify(last10ApprovedRecharges)),
      activePromotions: JSON.parse(JSON.stringify(activePromotionsList)),
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
     // Ensure totalAssets is formatted to 2 decimal places
    //  return Number(user.totalAssets || 0.000).toFixed(2);
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



// Fetch the referral code of the current user
export async function getReferralCode(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user.referralCode;
  } catch (error: any) {
    throw new Error(`Failed to fetch referral code: ${error.message}`);
  }
}

// Fetch referred users by the current user
export async function getReferredUsers(userId: string) {
  try {
    await connectToDatabase();

     // Query to find users referred by the current user
     const referredUsers = await User.find({ referredBy: userId })
     .select('username email') // Only return name and email fields, exclude others like password
     .exec();

    return JSON.parse(JSON.stringify(referredUsers));
  } catch (error: any) {
    throw new Error(`Failed to fetch referred users: ${error.message}`);
  }
}


export async function deleteUserAction(userId: string): Promise<void> {
  try {
    await connectToDatabase();
    const deletedUser = await User.findByIdAndDelete(userId);
     // 1. Delete all recharge requests associated with the user
     await RechargeRequest.deleteMany({ userId });

     // 2. Delete all transactions associated with the user (if you have a transactions model)
     await Wallet.deleteMany({ userId });
     await WithdrawRequest.deleteMany({ userId });
     await UserTaskProgress.deleteMany({ userId });
    revalidatePath('/admin/dashboard/users')
    if (!deletedUser) {
      throw new Error("User not found or already deleted.");
    }
  } catch (error:any) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}
