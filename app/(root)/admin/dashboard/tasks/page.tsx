// app/tasks/page.tsx

import TaskGroupItem from '@/components/custom/TaskGroupItem';
import { Button } from '@/components/ui/button';
import { getAllTaskGroups } from '@/lib/actions/taskGroup.action';
import Link from 'next/link';
import React from 'react';

const TasksPage = async () => {
  const { taskGroups } = await getAllTaskGroups();

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between gap-4 ">
          <section className="flex flex-col">
            <h1 className="text-2xl font-extrabold mb-4">Manage Tasks</h1>
          </section>

          <Link href="/admin/dashboard/tasks/create"  className="bg-orange-500 flex justify-center items-center h-fit text-white hover:bg-orange-600 px-4 py-2 rounded-md">Create Task</Link>
        </section>
        <h3 className="text-gray-700 w-3/5">Create tasks and manage task settings</h3>
      </section>

      <section className="my-8 w-full">
        <section className="flex flex-col items-center w-full gap-4">
        {taskGroups.length > 0 ? (
          taskGroups.map((taskGroup: any) => (
            <TaskGroupItem
              key={taskGroup._id}
              id={taskGroup._id.toString()}
              taskGroupName={taskGroup.taskGroupName}
              earningPerTask={taskGroup.earningPerTask}
              totalTasks={taskGroup.totalTasks}
              stopPoints={JSON.parse(JSON.stringify(taskGroup.stopPoints))}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">No task groups available.</p> 
        )}
        </section>
      </section>
    </section>
  );
};

export default TasksPage;

