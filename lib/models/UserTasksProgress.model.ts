import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the IUserTaskProgress interface
export interface IUserTaskProgress extends Document {
  userId: Schema.Types.ObjectId;
  taskGroupId: Schema.Types.ObjectId;
  tasksCompleted: number;
  totalEarned: number;
  stopsReached: { stopNumber: number; amount: number, isAllowedToContinue: boolean }[];
  completed: boolean;
  assignmentCycle: number; // Track how many times this task group has been assigned to the user
}

// User Task Progress Schema
const userTaskProgressSchema: Schema<IUserTaskProgress> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    taskGroupId: {
      type: Schema.Types.ObjectId,
      ref: 'TaskGroup', // Reference to the Task Group
      required: true,
    },
    tasksCompleted: {
      type: Number,
      default: 0, // Track how many tasks the user has completed
    },
    totalEarned: {
      type: Number,
      default: 0, // Track total earnings from tasks and milestones
    },
    stopsReached: [
      {
        stopNumber: {
          type: Number,
        },
        amount: {
          type: Number,
        },
        isAllowedToContinue:{
          type: Boolean,
          default: false,
        }
      },
    ],
    completed: {
      type: Boolean,
      default: false, // Mark the task group as completed once all tasks are done
    },
    assignmentCycle: {
      type: Number,
      default: 1, // Start with cycle 1 for the first assignment, increment on reassignment
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the UserTaskProgress model
const UserTaskProgress: Model<IUserTaskProgress> = mongoose.models?.UserTaskProgress || mongoose.model<IUserTaskProgress>('UserTaskProgress', userTaskProgressSchema);

export default UserTaskProgress;
