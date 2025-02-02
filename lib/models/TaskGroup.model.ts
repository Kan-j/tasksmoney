import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the ITaskGroup interface
export interface ITaskGroup extends Document {
  taskGroupName: string;
  totalTasks: number;
  earningPerTask: number;
  stopPoints: { taskNumber: number; paymentAmount: number }[];  // Each stop point requires a payment
}

// Task Group Schema
const taskGroupSchema: Schema<ITaskGroup> = new Schema(
  {
    taskGroupName: {
      type: String,
      required: true
    },
    totalTasks: {
      type: Number,
      required: true,
    },
    earningPerTask: {
      type: Number,
      required: true,
    },
    stopPoints: [
      {
        taskNumber: {
          type: Number,
          required: true,
        },
        paymentAmount: {
          type: Number,
          required: true,  // Amount the user must pay at this stop point
        },
      },
    ],
  },
  {
    timestamps: true,  // Automatically manage createdAt and updatedAt fields
  }
);

// Create the TaskGroup model
const TaskGroup: Model<ITaskGroup> = mongoose.models?.TaskGroup || mongoose.model<ITaskGroup>('TaskGroup', taskGroupSchema);

export default TaskGroup;
