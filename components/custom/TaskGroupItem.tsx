import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiTrash2 } from 'react-icons/fi';
import EditTaskGroupModal from './EditTaskGroupModal'; 
import DeleteTaskGroupButton from './DeleteTaskGroupButton';

interface TaskGroupItemProps {
  id: string;
  taskGroupName: string;
  earningPerTask: number;
  totalTasks: number;
  stopPoints: Array<{ taskNumber: number; paymentAmount: number }>;
}

const TaskGroupItem: React.FC<TaskGroupItemProps> = ({ id, taskGroupName, earningPerTask, totalTasks, stopPoints }) => {
  return (
    <section className="w-full">
      <Card className="relative border border-gray-300">
        {/* Card Content */}
        <CardHeader className="pb-0">
          <CardTitle className="text-xl font-bold">{taskGroupName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <CardDescription className="text-gray-500 mt-4">
            ${earningPerTask} Earnings per task
          </CardDescription>
        </CardContent>

        {/* Action Icons (Edit/Delete) */}
        <div className="flex justify-end items-center p-4 space-x-2">
          {/* <Button variant="ghost" size="sm">
            <FiTrash2 className="text-gray-500" size={20} />
          </Button> */}
          <DeleteTaskGroupButton id={id.toString()} />

          {/* Edit Button opens Edit Modal */}
          <EditTaskGroupModal
            id={id}
            taskGroupName={taskGroupName}
            totalTasks={totalTasks}
            earningPerTask={earningPerTask}
            stopPoints={stopPoints}
          />
        </div>
      </Card>
    </section>
  );
};

export default TaskGroupItem;
