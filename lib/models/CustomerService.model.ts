import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the CustomerService document
export interface ICustomerService extends Document {
  telegramUrl: string;
  whatsappUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the CustomerService Schema
const customerServiceSchema: Schema<ICustomerService> = new Schema(
  {
    telegramUrl: {
      type: String,
      required: true,
      unique: true, // Ensure the telegramUrl is unique
      trim: true,
    },
    whatsappUrl: {
      type: String,
      required: true,
      unique: true, // Ensure the whatsappUrl is unique
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt fields
  }
);

// Middleware to update `updatedAt` whenever the document is modified
customerServiceSchema.pre<ICustomerService>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Create and export the CustomerService model
const CustomerService: Model<ICustomerService> = 
  mongoose.models.CustomerService || 
  mongoose.model<ICustomerService>('CustomerService', customerServiceSchema);

export default CustomerService;
