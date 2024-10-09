"use server";

import CustomerService from "../models/CustomerService.model";
import { connectToDatabase } from "../mongodb";


// Function to update or create Telegram and WhatsApp URLs and return JSON
export async function updateOrCreateCustomerService(
  telegramUrl: string,
  whatsappUrl: string
) {
  try {
    await connectToDatabase()
    // Find existing customer service entry
    const existingRecord = await CustomerService.findOne();

    let updatedRecord;
    if (existingRecord) {
      // Update the existing record with new values
      existingRecord.telegramUrl = telegramUrl;
      existingRecord.whatsappUrl = whatsappUrl;
      updatedRecord = await existingRecord.save();
    } else {
      // Create a new record if none exists
      updatedRecord = await CustomerService.create({ telegramUrl, whatsappUrl });
    }

    // Return success JSON response
    return {
      status: 'success',
      message: 'Customer service information updated successfully.',
      data: JSON.parse(JSON.stringify(updatedRecord)),
    };
  } catch (error:any) {
    // Return error JSON response
    return {
      status: 'error',
      message: 'Failed to update customer service information.',
      error: error.message,
    };
  }
}

// Function to fetch the current customer service data and return JSON
export async function fetchCustomerService() {
  try {
    await connectToDatabase()
    const customerServiceData = await CustomerService.findOne();

    if (customerServiceData) {
      // Return success JSON response
      return {
        status: 'success',
        data: JSON.parse(JSON.stringify(customerServiceData)),
      };
    } else {
      // No data found response
      return {
        status: 'not_found',
        message: 'No customer service data found.',
      };
    }
  } catch (error:any) {
    // Return error JSON response
    return {
      status: 'error',
      message: 'Failed to fetch customer service data.',
      error: error.message,
    };
  }
}
