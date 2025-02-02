import { deleteTaskGroupAction } from "@/lib/actions/taskGroup.action";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const taskGroupId = searchParams.get('id')

  
    if (!taskGroupId) {
      return Response.json({ error: 'Task group ID is required' }, { status: 400 });
    }
  
    try {
      await deleteTaskGroupAction({taskGroupId});
      return Response.json({ message: 'Task group deleted successfully' });
    } catch (error: any) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }