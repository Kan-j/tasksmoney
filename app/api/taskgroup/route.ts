
import TaskGroup from '@/lib/models/TaskGroup.model'; // Adjust the import according to your structure
import { connectToDatabase } from '../../../lib/mongodb';
import { revalidatePath } from 'next/cache';

// Define the handler for creating a task group
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { taskGroupName, totalTasks, earningPerTask, stopPoints } = await request.json();

    // Validate the incoming data
    if (!taskGroupName || typeof taskGroupName !== 'string') {
      return Response.json({ error: 'Invalid task group name' }, { status: 400 });
    }
    if (!totalTasks || typeof totalTasks !== 'number' || totalTasks <= 0) {
      return Response.json({ error: 'Total tasks must be a positive number' }, { status: 400 });
    }
    if (!earningPerTask || typeof earningPerTask !== 'number' || earningPerTask < 0) {
      return Response.json({ error: 'Earning per task must be a non-negative number' }, { status: 400 });
    }
    if (!Array.isArray(stopPoints) || stopPoints.length === 0) {
      return Response.json({ error: 'Stop points must be a non-empty array' }, { status: 400 });
    }
    
    // Validate each stop point
    for (const stop of stopPoints) {
      if (typeof stop.taskNumber !== 'number' || stop.taskNumber <= 0) {
        return Response.json({ error: 'Each stop point must have a valid task number' }, { status: 400 });
      }
      if (typeof stop.paymentAmount !== 'number' || stop.paymentAmount < 0) {
        return Response.json({ error: 'Each stop point must have a non-negative payment amount' }, { status: 400 });
      }
    }

    // Connect to the database
    await connectToDatabase();

    // Create a new task group
    const newTaskGroup = new TaskGroup({
      taskGroupName,
      totalTasks,
      earningPerTask,
      stopPoints,
    });

    // Save the task group to the database
    await newTaskGroup.save();
    revalidatePath('/admin/dashboard/tasks')
    // Return a success response with the created task group
    return Response.json({ taskGroup: newTaskGroup }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task group:', error);
    return Response.json({ error: 'An error occurred while creating the task group' }, { status: 500 });
  }
}
