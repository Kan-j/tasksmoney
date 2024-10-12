"use server"

import Promotion from "../models/Promotion.model";
import { z } from 'zod';
import { connectToDatabase } from "../mongodb";
import { revalidatePath } from "next/cache";


// Define a schema for validation
const schema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description cannot exceed 500 characters"),
  isActive: z.string().optional(), // Optional string since checkbox values are submitted as strings
});

export async function createPromotion(formData: FormData) {
  // Extract and validate form data
  const validatedFields = schema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    isActive: formData.get('isActive'), // Fetch the isActive value
  });

  // Return early if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Get the validated data
  const { title, description, isActive } = validatedFields.data;

  try {
    // Connect to the database
    await connectToDatabase();

    // Create a new promotion entry in the database
    const newPromotion = await Promotion.create({
      title,
      description,
      isActive: isActive === 'on', // Convert checkbox value to boolean
    });


    // Return success response or redirect
    return { success: true, promotion: JSON.parse(JSON.stringify(newPromotion)) };

  } catch (error) {
    console.error('Error creating promotion:', error);
    throw new Error('Failed to create promotion');
  }
}


export async function fetchAllPromotions() {
  await connectToDatabase();
  const promotions = await Promotion.find({}).sort({ createdAt: -1 }).exec();; // Fetch all promotions
  return JSON.parse(JSON.stringify(promotions)); // Return the array of promotions
}

export async function deletePromotion(id: string) {
  await connectToDatabase();
  const result = await Promotion.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Promotion not found");
  }
  return  JSON.parse(JSON.stringify(result));
}


export async function togglePromotionActive(id: string, data: { isActive: boolean }) {
  await connectToDatabase();
  const result = await Promotion.findByIdAndUpdate(id, { isActive: data.isActive }, { new: true });
  if (!result) {
    throw new Error("Promotion not found");
  }
  return JSON.parse(JSON.stringify(result));;
}