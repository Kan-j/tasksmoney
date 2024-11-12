"use server"
import mongoose from "mongoose";
import UserTaskProgress from "../models/UserTasksProgress.model";
import { connectToDatabase } from "../mongodb";
import TaskGroup from "../models/TaskGroup.model";
import products from '@/lib/data/products.json'
import User from "../models/User.model";
import { getUserProfile } from "./user.actions";

export async function createUserTaskProgress(userId: string, taskGroupId: string) {
  await connectToDatabase();

  try {
    // Find the latest progress for this user and task group
    const existingProgress = await UserTaskProgress.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      taskGroupId: new mongoose.Types.ObjectId(taskGroupId),
    }).sort({ createdAt: -1 }); // Get the most recent progress

    // Fetch the task group details, including stop points
    const taskGroup = await TaskGroup.findById(taskGroupId);

    if (!taskGroup) {
      throw new Error('Task group not found');
    }

    // If the user already has completed progress for the task group, increment assignmentCycle
    if (existingProgress && existingProgress.completed) {
      existingProgress.assignmentCycle += 1;
      existingProgress.tasksCompleted = 0; // Reset task completion for the new cycle
      existingProgress.totalEarned = 0; // Reset task completion for the new cycle
      existingProgress.completed = false; // Mark as incomplete
      // Populate the stopsReached with the stop points from the TaskGroup
      existingProgress.stopsReached = taskGroup.stopPoints.map((stop: any) => ({
        stopNumber: stop.taskNumber,
        amount: stop.paymentAmount,
        isAllowedToContinue: false, // Initial state, admin will set this to true later
      }));

      await existingProgress.save();
      return JSON.parse(JSON.stringify(existingProgress));
    }

    // If no existing progress or task is incomplete, create new UserTaskProgress
    if (!existingProgress) {
      const newTaskProgress = new UserTaskProgress({
        userId: new mongoose.Types.ObjectId(userId),
        taskGroupId: new mongoose.Types.ObjectId(taskGroupId),
        tasksCompleted: 0,
        totalEarned: 0,
        completed: false,
        assignmentCycle: 1, // Initial assignment cycle
        // Populate the stopsReached with the stop points from the TaskGroup
        stopsReached: taskGroup.stopPoints.map((stop: any) => ({
          stopNumber: stop.taskNumber,
          amount: stop.paymentAmount,
          isAllowedToContinue: false, // Initial state, admin will set this to true later
        })),
      });

      await newTaskProgress.save();
      return JSON.parse(JSON.stringify(newTaskProgress));
    }

    // If the user already has an incomplete task group, return an error
    throw new Error('User already has an incomplete task in this task group');
  } catch (error: any) {
    throw new Error(`Failed to create user task progress: ${error.message}`);
  }
}


export const getActiveTaskForUser = async (userId: string) => {
  await connectToDatabase(); // Ensure you're connected to the DB

  try {
    // Find the latest active task for the user
    const activeTaskProgress = await UserTaskProgress.findOne({
      userId: userId,
      completed: false, // Ensure the task is not completed
    })
    .sort({ createdAt: -1 }) // Get the latest task progress if there are multiple
    .populate('taskGroupId'); // Populate the related TaskGroup details

    if (!activeTaskProgress) {
      return;
    }

    // Extract task group and populate the stop points
    const taskGroup = await TaskGroup.findById(activeTaskProgress.taskGroupId);

    if (!taskGroup) {
      throw new Error('Task group not found');
    }


    // Prepare response data
    const responseData = {
      taskGroupId: `${taskGroup._id}`,
      taskGroupName: taskGroup.taskGroupName,
      totalTasks: taskGroup.totalTasks,
      earningPerTask: taskGroup.earningPerTask,
      tasksCompleted: activeTaskProgress.tasksCompleted,
      completed: activeTaskProgress.completed,
      stopsReached: activeTaskProgress.stopsReached.map((stop: any) => ({
        stopNumber: stop.stopNumber,
        amount: stop.amount,
        isAllowedToContinue: stop.isAllowedToContinue,
      })),
    };

    return responseData;
  } catch (error: any) {
    console.error('Error fetching active task:', error);
    throw new Error(`Failed to fetch active task: ${error.message}`);
  }
};

export const allowUserToProceedFromStop = async (userId: string, activeTaskId: string, stopNumber: number) => {
  await connectToDatabase(); // Ensure you're connected to the DB

  try {
    // Find the user's task progress for the specific task group
    const activeTaskProgress = await UserTaskProgress.findOne({
      userId: userId,
      completed: false, // Ensure the task is not completed
    })
    .sort({ createdAt: -1 }) 


    if (!activeTaskProgress) {
      throw new Error('No task progress found for this user and task group');
    }

    // Find the specific stop in the stopsReached array
    const stopIndex = activeTaskProgress.stopsReached.findIndex(stop => stop.stopNumber === stopNumber);

    if (stopIndex === -1) {
      throw new Error('Stop not found in the user task progress');
    }

    // Check if the user is already allowed to proceed
    if (activeTaskProgress.stopsReached[stopIndex].isAllowedToContinue) {
      throw new Error('User is already allowed to proceed from this stop');
    }

    // Update the isAllowedToContinue flag for the specified stop
    activeTaskProgress.stopsReached[stopIndex].isAllowedToContinue = true;

    // Save the updated task progress
    await activeTaskProgress.save();

    // Prepare the response data, including the updated task progress
    const responseData = {
      message: `User allowed to proceed from Stop ${stopNumber}`,
      
    };

    return responseData;
  } catch (error: any) {
    console.error('Error allowing user to proceed from stop:', error);
    throw new Error(`Failed to allow user to proceed from stop: ${error.message}`);
  }
};


export async function getTaskGroupsAndUserProgress(userId: string) {
  await connectToDatabase();

  try {
    // Fetch all TaskGroups
    const taskGroups = await TaskGroup.find({});

    // Check if the user has any incomplete task progress
    const userTaskProgress = await UserTaskProgress.findOne({
      userId,
      completed: false, // Find incomplete tasks
    });

    return {
      taskGroups:JSON.parse(JSON.stringify(taskGroups)),
      userTaskProgress:JSON.parse(JSON.stringify(userTaskProgress)),
    };
  } catch (error: any) {
    throw new Error(`Failed to fetch task groups or user progress: ${error.message}`);
  }
}



// Main Deal
// export const getRandomProductForTask = async () => {
//   // Ensure the range of products is between 1 and 150
//   const maxProductId = 160;

//   // Get a random product index between 1 and maxProductId (inclusive)
//   const randomIndex = Math.floor(Math.random() * maxProductId);

//   // Fetch the product based on the random index
//   // Ensure we don't go out of bounds of the products array
//   if (randomIndex < products.length) {
//     return products[randomIndex];
//   }

//   // Fallback in case the random index is out of range
//   throw new Error('Product out of range');
// };


// Modification here::

export const getRandomProductForTask = async (userId: string) => {
  try {
    // Step 1: Fetch the user's totalAssets using the `getUserProfile` function
    const totalAssets = await getUserProfile(userId);
    
    if (totalAssets === undefined || totalAssets === null) {
      throw new Error('Total assets not found for the user');
    }

    // Step 2: Determine the price range based on totalAssets
    let minPrice = 10;
    let maxPrice = totalAssets;

    if (totalAssets > 0 && totalAssets <= 800) {
      maxPrice = totalAssets; // Range: 0 to totalAssets
    } else if (totalAssets > 800 && totalAssets <= 2000) {
      minPrice = 800;
      maxPrice = totalAssets; // Range: 800 to totalAssets
    } else if (totalAssets > 2000 && totalAssets <= 5000) {
      minPrice = 2000;
      maxPrice = totalAssets; // Range: 2000 to totalAssets
    } else if (totalAssets > 5000 && totalAssets <= 10000) {
      minPrice = 5000;
      maxPrice = totalAssets; // Range: 5000 to totalAssets
    } else if (totalAssets > 10000) {
      minPrice = 10000;
      maxPrice = totalAssets; // Range: 10000 to totalAssets
    }

    // Step 3: Get a random price within the determined range and round to 2 decimal places
    const randomPrice = (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);

    // Step 4: Check for the user's active task and if it is at a stop point
    const activeTask = await getActiveTaskForUser(userId);
    if (activeTask) {
      const stopPoint = activeTask.stopsReached.find(
        stop => stop.stopNumber === activeTask.tasksCompleted + 1
      );

      if (stopPoint && !stopPoint.isAllowedToContinue) {
        // Modify the product price if the task is at a stop point
        return {
          ...products[Math.floor(Math.random() * products.length)],
          price: (totalAssets + stopPoint.amount).toFixed(2),
        };
      }
    }

    // Step 5: Return a product with the modified price
    const selectedProduct = products[Math.floor(Math.random() * products.length)];
    return {
      ...selectedProduct,
      price: parseFloat(randomPrice), // Ensure the price is in number format with 2 decimals
    };
  } catch (error: any) {
    console.error(`Error fetching product for task: ${error.message}`);
    throw new Error(`Failed to fetch product for task: ${error.message}`);
  }
};



export const getReferrer = async (userId: string) => {
  try {
    // Ensure the database connection
    await connectToDatabase();

    // Find the user and populate the 'referredBy' field to get referrer details
    const user = await User.findById(userId).populate('referredBy', 'name email');

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the user has a referrer
    const referrer = user.referredBy;

    if (!referrer) {
      return { message: 'This user has no referrer.', id: null };
    }

    // Return referrer details
    return {
      id: referrer._id,
    };
  } catch (error) {
    console.error('Error fetching referrer:', error);
    throw new Error('Failed to fetch referrer information');
  }
};


const updateReferrerEarningsForEveryTask = async (referrerId: any, earningPerTask: number) => {
  let referrerEarning = earningPerTask * 0.2;

  // If this is the first task group and first task, proceed to update referrer earnings
  await updateReferrerEarnings(referrerId, referrerEarning);
};



export const updateReferrerEarnings = async (referrerId: string, earnings: number) => {
  try {
    // Find the referrer by ID
    const referrer = await User.findById(referrerId);

    if (!referrer) {
      console.log('Referrer not found.');
      return { success: false, message: 'Referrer not found.' };
    }


    referrer.totalAssets += earnings
    referrer.totalCommissions += earnings

    // Save the updated referrer record
    await referrer.save();

    console.log(`Referrer's earnings updated. New total earnings: ${referrer.totalAssets}`);

    return { success: true, message: 'Referrer earnings updated successfully.' };
  } catch (error) {
    console.error('Error updating referrer earnings:', error);
    return { success: false, message: 'Failed to update referrer earnings.' };
  }
};


export const updateTaskProgress = async ({userId, taskGroupId, earningPerTask, totalTasks}: any) => {

  // Connect to the database
  await connectToDatabase();
  
  // Find the user's task progress and populate the task group
  const userTaskProgress = await UserTaskProgress.findOne({ userId, taskGroupId });
  
  const user = await User.findById(userId);

  // If no task progress is found, throw an error
  if (!userTaskProgress) {
    throw new Error('Task progress not found');
  }

  // Check if user has reached a stop point
  const stopPoint = userTaskProgress.stopsReached.find(stop => stop.stopNumber === userTaskProgress.tasksCompleted + 1);
  if (stopPoint && !stopPoint.isAllowedToContinue) {
    // If the user is at a stop point and is not allowed to continue, return a stop status
    return { status: 'stop', message: `You're almost there! Please update your balance with ${stopPoint.amount} USDT to continue submitting tasks since your balance is not enough to review this current product` };
  }


  
  if (userTaskProgress.tasksCompleted < totalTasks) {
    // Increment task completion and earnings only if tasksCompleted is less than totalTasks
    userTaskProgress.tasksCompleted += 1;
    userTaskProgress.totalEarned += earningPerTask;

    // Update user earnings
    if (user) {
      user.totalAssets += earningPerTask;
      user.totalCommissions += earningPerTask;
      await user.save();
    }
    
    // If the user completes all tasks, mark as completed
    if (userTaskProgress.tasksCompleted === totalTasks) {
      userTaskProgress.completed = true;
    }

    // Save the task progress
    await userTaskProgress.save();

    // If referrer exists and this is the first task, update referrer earnings
    const referrer = await getReferrer(userId);
    if (referrer.id !== null) {
      await updateReferrerEarningsForEveryTask(referrer.id, earningPerTask);
    }

    return { status: 'continue', userTaskProgress: JSON.parse(JSON.stringify(userTaskProgress)) };

  } else {
    // If tasksCompleted is equal to totalTasks, return a message that tasks are already completed
    return { status: 'completed', message: 'All tasks have been completed.' };
  }
};

export const getNegativeBalance = async (userId: string) => {
  // Connect to the database
  await connectToDatabase();

  // Find the user's task progress where `completed` is `false`
  const userTaskProgress = await UserTaskProgress.findOne({ userId, completed: false });

  // If no task progress is found, return a default response
  if (!userTaskProgress) {
    return { isAvailable: false, amount: 0 };
  }

  // Check if the user has reached a stop point based on tasks completed
  const stopPoint = userTaskProgress.stopsReached.find(
    stop => stop.stopNumber === userTaskProgress.tasksCompleted + 1
  );

  // If a stop point exists and is not allowed to continue, return the stop point amount and isAvailable status
  if (stopPoint && !stopPoint.isAllowedToContinue) {
    return { isAvailable: true, amount: stopPoint.amount };
  }

  // If no stop point is found, return a default response
  return { isAvailable: false, amount: 0 };
};

