'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoRefreshCircle } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


// Define Zod schema for validation
const taskGroupSchema = z.object({
  taskGroupName: z.string().min(1, 'Task group name is required'),
  totalTasks: z.number().min(1, 'Total tasks must be a positive number'),
  earningPerTask: z.number().min(0, 'Earning per task must be a positive number'),
  stopPoints: z
    .array(
      z.object({
        taskNumber: z.number().min(1, 'Task number must be a positive number'),
        paymentAmount: z.number().min(0, 'Payment amount must be a positive number'),
      })
    )
    .min(1, 'At least one stop point is required'),
});

// Define form values interface based on Zod schema
type TaskGroupFormValues = z.infer<typeof taskGroupSchema>;

const CreateTask: React.FC = () => {
  // Setup useForm with zodResolver
  const router= useRouter()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskGroupFormValues>({
    resolver: zodResolver(taskGroupSchema),
    defaultValues: {
      taskGroupName: '',
      totalTasks: 0,
      earningPerTask: 0,
      stopPoints: [{ taskNumber: 1, paymentAmount: 0 }],
    },
  });

  // Handle dynamic stopPoints array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stopPoints',
  });

  // Submit handler
  const onSubmit = async (data: TaskGroupFormValues) => {
    try {
      const response = await fetch('/api/taskgroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskGroupName: data.taskGroupName,
          totalTasks: Number(data.totalTasks),
          earningPerTask: Number(data.earningPerTask),
          stopPoints: data.stopPoints.map((sp: any) => ({
            taskNumber: Number(sp.taskNumber),
            paymentAmount: Number(sp.paymentAmount),
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error || 'Failed to create task group'}`);
       
        return;
      }

      const result = await response.json();
      toast.success('Task Group created successfully!');
      router.push('/admin/dashboard/tasks')
      reset(); // Reset the form
    } catch (error:any) {
      console.error('Error creating task group:', error);
      toast.error(error.message)
    }
  };

  // Reset form function
  const handleReset = () => {
    reset();
  };

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between gap-4">
          <section className="flex flex-col">
            <h1 className="text-2xl font-extrabold mb-4">Task Detail</h1>
          </section>
          <Link href="/admin/dashboard/tasks"  className="bg-gray-500 flex justify-center items-center h-fit text-white hover:bg-gray-600 px-4 py-2 rounded-md">Back</Link>
        </section>
        <h3 className="text-gray-700 w-3/5">Create tasks and manage task settings</h3>
      </section>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="my-6">
          <section className="border px-9 py-6 bg-white rounded-lg">
            <h1 className="font-extrabold mb-3">Task settings</h1>
            <p className="mt-2 text-gray-600">
              Create balance update prompts at key points to help users continue their task submissions.
            </p>

            <article className="flex flex-col gap-6 mt-8">
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <h1 className="mb-2 text-sm font-bold">Task Set Name</h1>
                  <Input placeholder="Task A" {...register('taskGroupName')} />
                  {errors.taskGroupName && <p className="text-red-500">{errors.taskGroupName.message}</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <h1 className="mb-2 text-sm font-bold">Total Tasks</h1>
                  <Input
                    type="number"
                    placeholder="Total number of tasks"
                    {...register('totalTasks', {
                      setValueAs: (value) => (value ? parseInt(value, 10) : 0), // Convert to number
                    })}
                  />
                  {errors.totalTasks && <p className="text-red-500">{errors.totalTasks.message}</p>}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <h1 className="mb-2 text-sm font-bold">Earning Per Task</h1>
                  <Input
                    type="number"
                    placeholder="Amount earned per submission"
                    step="0.01" // Allows decimals up to two places
                    min="0"     // Set the minimum value if needed
                    {...register('earningPerTask', {
                      setValueAs: (value) => (value ? parseFloat(value) : 0), // Convert to number
                    })}
                  />
                  {errors.earningPerTask && <p className="text-red-500">{errors.earningPerTask.message}</p>}
                </div>

                {fields.map((stop, index) => (
                  <section key={stop.id}  className='grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2 md:flex-row' >
                    <div className='col-span-2 md:col-span-1'>
                      <h1 className="mb-2 text-sm font-bold">Task Number</h1>
                      <Input
                        type="number"
                        placeholder="Task number for notification"
                        {...register(`stopPoints.${index}.taskNumber`, {
                          setValueAs: (value) => (value ? parseInt(value, 10) : 0), // Convert to number
                        })}
                      />
                      {errors.stopPoints?.[index]?.taskNumber && (
                        <p className="text-red-500">{errors.stopPoints[index]?.taskNumber?.message}</p>
                      )}
                    </div>

                    <div className='col-span-2 md:col-span-1'>
                      <h1 className="mb-2 text-sm font-bold">Amount</h1>
                      <Input
                        type="number"
                        step="0.01" // Allows decimals up to two places
                        min="0"     // Set the minimum value if needed
                        placeholder="Amount for this stop"
                        {...register(`stopPoints.${index}.paymentAmount`, {
                          setValueAs: (value) => (value ? parseFloat(value) : 0), // Convert to number
                        })}
                      />
                      {errors.stopPoints?.[index]?.paymentAmount && (
                        <p className="text-red-500">{errors.stopPoints[index]?.paymentAmount?.message}</p>
                      )}
                    </div>

                    <Button variant="secondary" className='col-span-2' onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </section>
                ))}

                <div className="col-span-2 flex justify-center mt-4 gap-6">
                  <Button type="button" variant="secondary" onClick={() => append({ taskNumber: 1, paymentAmount: 0 })}>
                    Add Stop Point
                  </Button>
                </div>

                <div className="col-span-2 flex justify-center mt-4 gap-6">
                  <Button type="submit" className="w-full bg-mainColor hover:bg-mainColorOnHover">
                    Create Task Group
                  </Button>

                  <Button variant={'secondary'} className="w-full hover:bg-gray-300" onClick={handleReset}>
                    <span className="mr-2">
                      <IoRefreshCircle size={24} />
                    </span>
                    Reset
                  </Button>
                </div>
              </section>
            </article>
          </section>
        </section>
      </form>
    </section>
  );
};

export default CreateTask;
