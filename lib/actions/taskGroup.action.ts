"use server";

import TaskGroup, { ITaskGroup } from "../models/TaskGroup.model";  // Adjust the import path as necessary
import { connectToDatabase } from "../mongodb";



// 1. Get All Task Groups (with Pagination)
export async function getAllTaskGroups() {
  try {
    await connectToDatabase(); // Connect to MongoDB

    const taskGroups = await TaskGroup.find({})
      .sort({ createdAt: -1 }); // Sort by most recent first


    return {
      taskGroups
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch task groups: ${error.message}`);
  }
}



export async function updateTaskGroup(
  taskGroupId: string,
  updateData: {
    taskGroupName?: string;
    totalTasks?: number;
    earningPerTask?: number;
    stopPoints?: { taskNumber: number; paymentAmount: number }[];
  }
) {
  try {
    await connectToDatabase(); // Connect to MongoDB

    const updatedTaskGroup = await TaskGroup.findByIdAndUpdate(taskGroupId, updateData, {
      new: true, // Return the updated document
    });

    if (!updatedTaskGroup) {
      throw new Error('Task group not found');
    }

    return updatedTaskGroup;
  } catch (error: any) {
    throw new Error(`Failed to update task group: ${error.message}`);
  }
}



// 5. Delete a Task Group
export async function deleteTaskGroupAction({taskGroupId}:{taskGroupId:string}) {
  try {
    await connectToDatabase();
    const taskGroup = await TaskGroup.findByIdAndDelete(taskGroupId);

    if (!taskGroup) {
      throw new Error("Task group not found or already deleted");
    }

    return taskGroup;
  } catch (error: any) {
    throw new Error(`Failed to delete task group: ${error.message}`);
  }
}








// 6. Add a Stop Point to an Existing Task Group
export async function addStopPoint(
  taskGroupId: string,
  stopPoint: { taskNumber: number; paymentAmount: number }
) {
  try {
    const taskGroup = await TaskGroup.findById(taskGroupId);

    if (!taskGroup) {
      throw new Error("Task group not found");
    }

    // Add the new stop point
    taskGroup.stopPoints.push(stopPoint);

    await taskGroup.save();

    return taskGroup;
  } catch (error: any) {
    throw new Error(`Failed to add stop point: ${error.message}`);
  }
}

// 7. Remove a Stop Point from a Task Group
export async function removeStopPoint(taskGroupId: string, taskNumber: number) {
  try {
    const taskGroup = await TaskGroup.findById(taskGroupId);

    if (!taskGroup) {
      throw new Error("Task group not found");
    }

    // Remove the stop point based on the task number
    taskGroup.stopPoints = taskGroup.stopPoints.filter(
      (stopPoint) => stopPoint.taskNumber !== taskNumber
    );

    await taskGroup.save();

    return taskGroup;
  } catch (error: any) {
    throw new Error(`Failed to remove stop point: ${error.message}`);
  }
}
