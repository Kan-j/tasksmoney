import { connectToDatabase } from '@/lib/mongodb'; // Adjust the import according to your structure
import TaskGroup from '@/lib/models/TaskGroup.model'; // Adjust the import according to your structure
import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

// Define the handler for updating a task group
export async function PUT(request: NextRequest) {
  try {
    // const { searchParams } = new URL(request.url);
    // const taskGroupId = searchParams.get('id');
    const searchParams = request.nextUrl.searchParams
    const taskGroupId = searchParams.get('id')

    // Validate taskGroupId
    if (!taskGroupId) {
      return Response.json({ error: 'Task group ID is required' }, { status: 400 });
    }

    // Parse the request body to extract updateData
    const updateData: {
      taskGroupName?: string;
      totalTasks?: number;
      earningPerTask?: number;
      stopPoints?: { taskNumber: number; paymentAmount: number }[];
    } = await request.json();

    // Validate the incoming update data
    if (updateData.taskGroupName && typeof updateData.taskGroupName !== 'string') {
      return Response.json({ error: 'Invalid task group name' }, { status: 400 });
    }
    if (updateData.totalTasks && (typeof updateData.totalTasks !== 'number' || updateData.totalTasks <= 0)) {
      return Response.json({ error: 'Total tasks must be a positive number' }, { status: 400 });
    }
    if (updateData.earningPerTask && (typeof updateData.earningPerTask !== 'number' || updateData.earningPerTask < 0)) {
      return Response.json({ error: 'Earning per task must be a non-negative number' }, { status: 400 });
    }
    if (updateData.stopPoints && !Array.isArray(updateData.stopPoints)) {
      return Response.json({ error: 'Stop points must be an array' }, { status: 400 });
    }

    // Validate each stop point if they are provided
    if (updateData.stopPoints) {
      for (const stop of updateData.stopPoints) {
        if (typeof stop.taskNumber !== 'number' || stop.taskNumber <= 0) {
          return Response.json({ error: 'Each stop point must have a valid task number' }, { status: 400 });
        }
        if (typeof stop.paymentAmount !== 'number' || stop.paymentAmount < 0) {
          return Response.json({ error: 'Each stop point must have a non-negative payment amount' }, { status: 400 });
        }
      }
    }

    // Connect to the database
    await connectToDatabase();

    // Update the task group using the provided taskGroupId and updateData
    const updatedTaskGroup = await TaskGroup.findByIdAndUpdate(taskGroupId, updateData, {
      new: true, // Return the updated document
    });
 

    if (!updatedTaskGroup) {
      return Response.json({ error: 'Task group not found' }, { status: 404 });
    }
    revalidatePath('/admin/dashboard/tasks')
    // Return the updated task group
    return Response.json({ taskGroup: updatedTaskGroup }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating task group:', error);
    return Response.json({ error: 'An error occurred while updating the task group' }, { status: 500 });
  }
}
