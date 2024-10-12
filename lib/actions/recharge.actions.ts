"use server";

import RechargeRequest from "../models/RechargeRequest.model"; // Adjust the import path as necessary
import mongoose from "mongoose";
import { connectToDatabase } from "../mongodb";
import User from "../models/User.model";
import { revalidatePath } from "next/cache";



// Server action to handle recharge requests
export async function rechargeUser({ userId, amount }: { userId: string; amount: number }) {
  if (!userId || !amount || isNaN(amount)) {
    throw new Error('Invalid input data');
  }

  try {
    await connectToDatabase(); // Ensure database connection

    // Create a new recharge request with 'pending' status
    const newRechargeRequest = await RechargeRequest.create({
      userId,
      amount,
      status: 'pending',
    });

    return {status: 'success', message: 'Recharge request created', data: JSON.parse(JSON.stringify(newRechargeRequest)) };
  } catch (error) {
    console.error('Error creating recharge request:', error);
    throw new Error('Server error, please try again later');
  }
}





// 2. Get Recharge Requests for a User (with Pagination)
export async function getUserRechargeRequests(
  userId: string,
  page: number = 1,
  limit: number = 15
) {
  try {
    await connectToDatabase();
    const rechargeRequests = await RechargeRequest.find({ userId })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by most recent first

    const totalCount = await RechargeRequest.countDocuments({ userId });
    return {
      rechargeRequests: JSON.parse(JSON.stringify(rechargeRequests)),
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch recharge requests: ${error.message}`);
  }
}


export async function getAllRechargeRequests(page: number = 1, limit: number = 10) {
  try {
    await connectToDatabase();

    const rechargeRequests = await RechargeRequest.find({})
      .populate({
        path: 'userId', // Populate user details if needed
        select: 'email', // Select specific user fields
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by most recent first

    const totalCount = await RechargeRequest.countDocuments();

    return {
      rechargeRequests: JSON.parse(JSON.stringify(rechargeRequests)),
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch all recharge requests: ${error.message}`);
  }
}

// 4. Approve a Recharge Request (Admin)
export async function approveRechargeRequest(rechargeRequestId: string) {
  await connectToDatabase();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the recharge request by ID
    const rechargeRequest = await RechargeRequest.findById(rechargeRequestId).session(session);

    if (!rechargeRequest) {
      throw new Error("Recharge request not found");
    }

    // Ensure the request is still pending
    if (rechargeRequest.status !== 'pending') {
      throw new Error("Only pending requests can be approved");
    }

    // Find the user associated with the recharge request
    const user = await User.findById(rechargeRequest.userId).session(session);

    if (!user) {
      throw new Error("User not found for this recharge request");
    }

    // Add the recharge amount to the user's total assets
    user.totalAssets += rechargeRequest.amount;

    // Update the recharge request status to approved
    rechargeRequest.status = 'approved';

    // Save both the updated user and the recharge request within the transaction
    await user.save({ session });
    await rechargeRequest.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    return JSON.parse(JSON.stringify(rechargeRequest));
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(`Failed to approve recharge request: ${error.message}`);
  } finally {
    session.endSession();
  }
}


// 5. Reject a Recharge Request (Admin)
export async function rejectRechargeRequest(rechargeRequestId: string) {
  await connectToDatabase();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the recharge request by ID
    const rechargeRequest = await RechargeRequest.findById(rechargeRequestId).session(session);

    if (!rechargeRequest) {
      throw new Error("Recharge request not found");
    }

    // Ensure the request is still pending
    if (rechargeRequest.status !== 'pending') {
      throw new Error("Only pending requests can be rejected");
    }

    // Update the recharge request status to rejected
    rechargeRequest.status = 'rejected';

    // Save the updated recharge request within the transaction
    await rechargeRequest.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    
    return JSON.parse(JSON.stringify(rechargeRequest));
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(`Failed to reject recharge request: ${error.message}`);
  } finally {
    session.endSession();
  }
}

// 6. Get a Specific Recharge Request by ID (Admin or User)
export async function getRechargeRequestById(rechargeRequestId: string) {
  try {
    const rechargeRequest = await RechargeRequest.findById(rechargeRequestId);

    if (!rechargeRequest) {
      throw new Error("Recharge request not found");
    }

    return rechargeRequest;
  } catch (error: any) {
    throw new Error(`Failed to fetch recharge request: ${error.message}`);
  }
}
