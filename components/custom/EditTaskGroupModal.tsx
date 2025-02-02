'use client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IoRefreshCircle } from 'react-icons/io5';
import { FiEdit3 } from 'react-icons/fi';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

// Define the form schema using Zod
const editTaskGroupSchema = z.object({
  taskGroupName: z.string().nonempty({ message: 'Task group name is required' }),
  totalTasks: z.number().positive({ message: 'Total tasks must be a positive number' }),
  earningPerTask: z.number().positive({ message: 'Earning per task must be a positive number' }),
  stopPoints: z.array(z.object({
    taskNumber: z.number().positive(),
    paymentAmount: z.number().positive()
  })),
});

// Type for form values
type EditTaskGroupFormValues = z.infer<typeof editTaskGroupSchema>;

interface EditTaskGroupModalProps {
  id: string;
  taskGroupName: string;
  totalTasks: number;
  earningPerTask: number;
  stopPoints: Array<{ taskNumber: number; paymentAmount: number }>;
}

const EditTaskGroupModal: React.FC<EditTaskGroupModalProps> = ({
  id,
  taskGroupName,
  totalTasks,
  earningPerTask,
  stopPoints: initialStopPoints,
}) => {
  // Form State
  const [stopPoints, setStopPoints] = useState(initialStopPoints);
  const [loading, setLoading] = useState(false); // Loading state
  const pathname = usePathname();
  const router = useRouter();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditTaskGroupFormValues>({
    resolver: zodResolver(editTaskGroupSchema),
    defaultValues: {
      taskGroupName,
      totalTasks,
      earningPerTask,
      stopPoints: initialStopPoints,
    },
  });

  // Handle form submission
  const onSubmit = async (data: EditTaskGroupFormValues) => {
    setLoading(true); // Set loading state to true
    try {
      const response = await fetch(`/api/taskgroup/edit?id=${id}&pathname=${encodeURIComponent(pathname)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskGroupName: data.taskGroupName,
          totalTasks: data.totalTasks,
          earningPerTask: data.earningPerTask,
          stopPoints: data.stopPoints.map((stop) => ({
            taskNumber: stop.taskNumber,
            paymentAmount: stop.paymentAmount,
          })),
        }),
      });

      if (!response.ok) {
        toast.error('Failed to update task group');
      }
      window.location.reload();
      toast.success("Task Group Edited")
    //   router.push(pathname);
    } catch (error) {
      console.error('Error updating task group:', error);
      toast.error('Failed to update Task Group.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle changes for stop points dynamically
  const handleStopPointChange = (index: number, field: 'taskNumber' | 'paymentAmount', value: string) => {
    const updatedStopPoints = [...stopPoints];
    updatedStopPoints[index] = {
      ...updatedStopPoints[index],
      [field]: Number(value), // Ensure the value is a number
    };
    setStopPoints(updatedStopPoints);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <FiEdit3 className="text-gray-500" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-6 sm:max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Edit Task Group</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="col-span-2">
              <h1 className="mb-2 text-sm font-bold">Task Group Name</h1>
              <Input
                placeholder="Task group name"
                {...register('taskGroupName')}
                className={errors.taskGroupName ? 'border-red-500' : ''}
              />
              {errors.taskGroupName && (
                <p className="text-red-500 text-sm">{errors.taskGroupName.message}</p>
              )}
            </div>

            <div className="col-span-2 md:col-span-1">
              <h1 className="mb-2 text-sm font-bold">Total Tasks</h1>
              <Input
                placeholder="Total number of tasks"
                {...register('totalTasks', { valueAsNumber: true })}
                className={errors.totalTasks ? 'border-red-500' : ''}
              />
              {errors.totalTasks && (
                <p className="text-red-500 text-sm">{errors.totalTasks.message}</p>
              )}
            </div>

            <div className="col-span-2 md:col-span-1">
              <h1 className="mb-2 text-sm font-bold">Earning Per Task</h1>
              <Input
                placeholder="Earnings per task"
                step="0.01" // Allows decimals up to two places
                min="0"     // Set the minimum value if needed
                {...register('earningPerTask', { valueAsNumber: true })}
                className={errors.earningPerTask ? 'border-red-500' : ''}
              />
              {errors.earningPerTask && (
                <p className="text-red-500 text-sm">{errors.earningPerTask.message}</p>
              )}
            </div>

            {stopPoints.map((stop, index) => (
                <section key={index} className='grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2 md:flex-row'>
                  <div className="col-span-2 md:col-span-1">
                  <h1 className="mb-2 text-sm font-bold">Task Number</h1>
                  <Input
                    placeholder="Task number"
                    value={stop.taskNumber}
                    onChange={(e) => handleStopPointChange(index, 'taskNumber', e.target.value)}
                    className={errors.stopPoints?.[index]?.taskNumber ? 'border-red-500' : ''}
                  />
                  {errors.stopPoints?.[index]?.taskNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.stopPoints[index]?.taskNumber?.message}
                    </p>
                  )}
                </div>
                <div className="col-span-2 md:col-span-1">
                  <h1 className="mb-2 text-sm font-bold">Payment Amount</h1>
                  <Input
                    placeholder="Payment amount"
                    step="0.01" // Allows decimals up to two places
                    min="0"     // Set the minimum value if needed
                    value={stop.paymentAmount}
                    onChange={(e) => handleStopPointChange(index, 'paymentAmount', e.target.value)}
                    className={errors.stopPoints?.[index]?.paymentAmount ? 'border-red-500' : ''}
                  />
                  {errors.stopPoints?.[index]?.paymentAmount && (
                    <p className="text-red-500 text-sm">
                      {errors.stopPoints[index]?.paymentAmount?.message}
                    </p>
                  )}
                </div>
                </section>
            ))}
          </section>

          <DialogFooter className="flex justify-between mt-8">
            <Button type="submit" className="bg-mainColor w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="loader"></span> {/* Add your loading spinner here */}
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskGroupModal;
