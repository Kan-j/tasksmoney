"use server";
import MessageBroadcast from "../models/MessageBroadcast.model"; // Adjust the import path as necessary

// lib/actions/messageBroadcast.action.ts
import { connectToDatabase } from '@/lib/mongodb'; // Assuming you have a MongoDB connection helper

import { z } from 'zod';

// Define a schema to validate the message field
const schema = z.object({
  message: z.string().nonempty('Message cannot be empty'),
});

export async function createMessageBroadcast(formData: FormData) {
  // Extract and validate form data
  const validatedFields = schema.safeParse({
    message: formData.get('message'),
  });

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Get the validated message
  const { message } = validatedFields.data;

  try {
    // Connect to the database
    await connectToDatabase();

    // Create a new message broadcast entry in the database
    const newBroadcast = await MessageBroadcast.create({
      message,
      createdAt: new Date(),
    });

    console.log('Broadcast created successfully:', newBroadcast);

    // Return success response or redirect
    return { success: true, broadcast: JSON.parse(JSON.stringify(newBroadcast)) };

  } catch (error) {
    console.error('Error creating message broadcast:', error);
    throw new Error('Failed to create broadcast');
  }
}


export async function fetchAllMessageBroadcasts() {
  await connectToDatabase();
  const broadcasts = await MessageBroadcast.find({}).sort({ createdAt: -1 }).exec();
  return JSON.parse(JSON.stringify(broadcasts));
}


export async function deleteMessageBroadcast(id: string) {
  await connectToDatabase();
  const result = await MessageBroadcast.findByIdAndDelete(id);
  
  if (!result) {
    throw new Error("Message broadcast not found");
  }

  // Convert Mongoose document to plain object before returning
  return JSON.parse(JSON.stringify(result)); // Convert to a plain object
}



// 4. Delete a Broadcast Message
export async function deleteBroadcastMessage(id: string) {
  try {
    const deletedBroadcast = await MessageBroadcast.findByIdAndDelete(id);

    if (!deletedBroadcast) {
      throw new Error("Broadcast message not found");
    }

    return { message: "Broadcast message deleted successfully." };
  } catch (error: any) {
    throw new Error(`Failed to delete broadcast message: ${error.message}`);
  }
}
