"use server";

import Wallet, { IWallet } from "../models/Wallet.model";  // Adjust the import path as necessary
import { connectToDatabase } from "../mongodb"; // Assuming you have a connectToDatabase function

export async function createWallet({
  userId,
  exchangeName,
  address,
}: {
  userId: string;
  exchangeName: string;
  address: string;
}): Promise<{ message: string; data?: IWallet }> {
  // Validate input
  if (!userId || !exchangeName || !address) {
    throw new Error("Missing required fields: userId, exchangeName, or address");
  }

  try {
    await connectToDatabase(); // Ensure the database connection

    // Check if the wallet already exists for this user with the same address
    const existingWallet = await Wallet.findOne({ userId, address });

    if (existingWallet) {
      throw new Error("Wallet with this address already exists for the user");
    }

    // Create the new wallet
    const newWallet = await Wallet.create({
      userId,
      exchangeName,
      address,
    });

    return {
      message: "Wallet created successfully",
      data: JSON.parse(JSON.stringify(newWallet)), // Optional: Serialize the result
    };
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw new Error("Server error, please try again later");
  }
}



// Function to get all wallets associated with a specific user
export async function getUserWallets(userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    await connectToDatabase(); // Ensure database connection

    // Find all wallets associated with the given userId
    const wallets = await Wallet.find({ userId }).exec();

    // If no wallets found, return a message or empty array
    if (!wallets || wallets.length === 0) {
      return { message: 'No wallets found', data: [] };
    }

    return { message: 'Wallets retrieved successfully', data: JSON.parse((JSON.stringify(wallets))) };
  } catch (error) {
    console.error('Error fetching wallets:', error);
    throw new Error('Server error, please try again later');
  }
}



// 3. Update a Wallet
export async function updateWallet(walletId: string, exchangeName?: string, address?: string) {
  try {
    const updateData: Partial<IWallet> = {};
    if (exchangeName) updateData.exchangeName = exchangeName;
    if (address) updateData.address = address;

    const updatedWallet = await Wallet.findByIdAndUpdate(
      walletId,
      updateData,
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedWallet) {
      throw new Error("Wallet not found");
    }

    return updatedWallet;
  } catch (error: any) {
    throw new Error(`Failed to update wallet: ${error.message}`);
  }
}

// 4. Delete a Wallet
export async function deleteWallet(walletId: string) {
  try {
    const deletedWallet = await Wallet.findByIdAndDelete(walletId);

    if (!deletedWallet) {
      throw new Error("Wallet not found");
    }

    return { message: "Wallet deleted successfully." };
  } catch (error: any) {
    throw new Error(`Failed to delete wallet: ${error.message}`);
  }
}

// 5. Get a Specific Wallet by ID
export async function getWalletById(walletId: string) {
  try {
    const wallet = await Wallet.findById(walletId);

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    return wallet;
  } catch (error: any) {
    throw new Error(`Failed to fetch wallet: ${error.message}`);
  }
}
