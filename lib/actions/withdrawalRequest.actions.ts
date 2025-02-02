"use server";

import WithdrawRequest, { IWithdrawRequest } from "../models/WithdrawalRequest.model"; // Adjust the import path as necessary
import { connectToDatabase } from "../mongodb";
import Wallet from "../models/Wallet.model";
import User from "../models/User.model";
import mongoose from "mongoose";



// 2. Get Withdraw Requests for a User (with Pagination)
export async function getUserWithdrawRequests(userId: string, page: number = 1, limit: number = 10) {
  try {
    await connectToDatabase();

    const withdrawRequests = await WithdrawRequest.find({ userId })
      .populate('walletId', 'exchangeName address') // Populate the wallet details (exchange name, address)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalCount = await WithdrawRequest.countDocuments({ userId });

    return {
      withdrawRequests: JSON.parse(JSON.stringify(withdrawRequests)),
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch withdrawal requests: ${error.message}`);
  }
}


export async function createWithdrawalRequest({ walletId, amount }: any) {
  // Ensure the input data is valid
  if (!walletId || !amount || isNaN(amount)) {
    throw new Error("Invalid input data");
  }

  try {
    // Ensure the database connection
    await connectToDatabase();

    // Check if the wallet exists
    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      throw new Error("Wallet not found");
    }

    // Create the withdrawal request
    const newWithdrawalRequest = await WithdrawRequest.create({
      walletId: walletId,
      userId: wallet.userId, // Assuming the Wallet model has a userId reference
      amount: amount,
      status: "pending", // You can set an initial status (e.g., pending)
    });

    return { message: "Withdrawal request created successfully", data: JSON.parse(JSON.stringify(newWithdrawalRequest)) };
  } catch (error) {
    console.error("Error creating withdrawal request:", error);
    throw new Error("Server error, please try again later");
  }
}




// 3. Get All Withdraw Requests (Admin - with Pagination)
export async function getAllWithdrawRequests(page: number = 1, limit: number = 10) {
  try {
    await connectToDatabase();

    const withdrawRequests = await WithdrawRequest.find({})
      .populate({
        path: 'walletId', // Populate wallet details
        select: 'address exchangeName', // Select only the wallet address from the Wallet model
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by most recent first

    const totalCount = await WithdrawRequest.countDocuments();

    return {
      withdrawRequests: JSON.parse(JSON.stringify(withdrawRequests)),
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch all withdraw requests: ${error.message}`);
  }
}

// 4. Approve a Withdraw Request (Admin)

export async function approveWithdrawRequest(withdrawRequestId: string) {
  await connectToDatabase();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the withdraw request by ID
    const withdrawRequest = await WithdrawRequest.findById(withdrawRequestId).session(session);

    if (!withdrawRequest) {
      throw new Error("Withdraw request not found");
    }

    // Ensure the request is still pending
    if (withdrawRequest.status !== 'pending') {
      throw new Error("Only pending requests can be approved");
    }

    // Find the user associated with the withdraw request
    const user = await User.findById(withdrawRequest.userId).session(session);

    if (!user) {
      throw new Error("User not found for this withdraw request");
    }

    // Ensure the user has sufficient assets to withdraw
    if (user.totalAssets < withdrawRequest.amount) {
      throw new Error("Insufficient assets to approve the withdrawal");
    }

    // Deduct the amount from the user's total assets
    user.totalAssets -= withdrawRequest.amount;

    // Update withdraw request status to approved
    withdrawRequest.status = 'approved';

    // Save both the updated user and the withdraw request within the transaction
    await user.save({ session });
    await withdrawRequest.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    return JSON.parse(JSON.stringify(withdrawRequest));
  } catch (error: any) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    throw new Error(`Failed to approve withdraw request: ${error.message}`);
  } finally {
    session.endSession(); // End the session
  }
}



export async function rejectWithdrawRequest(withdrawRequestId: string) {
  await connectToDatabase();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the withdraw request by ID
    const withdrawRequest = await WithdrawRequest.findById(withdrawRequestId).session(session);

    if (!withdrawRequest) {
      throw new Error("Withdraw request not found");
    }

    // Ensure the request is still pending
    if (withdrawRequest.status !== 'pending') {
      throw new Error("Only pending requests can be rejected");
    }

    // Update withdraw request status to rejected
    withdrawRequest.status = 'rejected';

    // Save the updated withdraw request within the transaction
    await withdrawRequest.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    return JSON.parse(JSON.stringify(withdrawRequest));
  } catch (error: any) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    throw new Error(`Failed to reject withdraw request: ${error.message}`);
  } finally {
    session.endSession(); // End the session
  }
}

// 6. Get a Specific Withdraw Request by ID (Admin or User)
export async function getWithdrawRequestById(withdrawRequestId: string) {
  try {
    const withdrawRequest = await WithdrawRequest.findById(withdrawRequestId);

    if (!withdrawRequest) {
      throw new Error("Withdraw request not found");
    }

    return withdrawRequest;
  } catch (error: any) {
    throw new Error(`Failed to fetch withdraw request: ${error.message}`);
  }
}
