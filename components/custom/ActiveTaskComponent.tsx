"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { getActiveTaskForUser, allowUserToProceedFromStop } from '@/lib/actions/usertasks.action'; // Ensure this is pointing to your correct path

const ActiveTaskComponent = ({ userId }: any) => {
  const [activeTask, setActiveTask] = useState<any>(null); // To store user task progress
  const [loading, setLoading] = useState(true); // Track loading state for fetching task
  const [loadingStops, setLoadingStops] = useState<{ [key: number]: boolean }>({}); // Track loading state for each stop

  useEffect(() => {
    // Fetch the active task for the user on component mount
    const fetchActiveTask = async () => {
      setLoading(true);
      try {
        const taskData = await getActiveTaskForUser(userId);
        console.log(taskData);
        setActiveTask(taskData); // Set the task data to state
      } catch (error) {
        console.error('Failed to fetch active task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTask();
  }, [userId]);

  // Handle allowing the user to proceed from a stop
  const handleAllowStop = async (stopNumber: number) => {
    // Set loading state for this specific stop button
    setLoadingStops((prev) => ({ ...prev, [stopNumber]: true }));

    try {
      await allowUserToProceedFromStop(userId, activeTask.taskGroupId, stopNumber);
      // After allowing, refresh the active task to reflect changes
      const updatedTaskData = await getActiveTaskForUser(userId);
      setActiveTask(updatedTaskData);
    } catch (error) {
      console.error('Failed to allow stop:', error);
    } finally {
      // Reset loading state for this specific stop button
      setLoadingStops((prev) => ({ ...prev, [stopNumber]: false }));
    }
  };

  if (loading) {
    return <p>Loading active task...</p>;
  }

  if (!activeTask) {
    return <section className="my-8 px-7 py-6 rounded-lg bg-white"><p>No active task found for this user.</p></section>;
  }

  return (
    <section className="my-8 px-7 py-6 rounded-lg bg-white">
      <section className="">
        <h1 className="font-extrabold mb-3 text-xl">Active Task</h1>
      </section>
      <section className="border px-6 py-6 rounded-lg w-full">
        <section className="flex md:flex-row  flex-col justify-between gap-4 border-b pb-4 w-full">
          <section className="flex flex-col w-full">
            <h1 className="text-lg font-medium mb-4">{activeTask.taskGroupName}</h1>
            <h3 className="text-gray-700 w-4/5">${activeTask.earningPerTask} Earnings per task</h3>
          </section>
          
          <section className="px-4 py-3 rounded-lg bg-white border h-fit min-w-36">
            <h1 className="text-gray-400 font-black">
              <span className="text-gray-950 mb-6">Task {activeTask.tasksCompleted}</span> / {activeTask.totalTasks}
            </h1>
            <p className="text-gray-600 font-bold">{activeTask.completed ? 'Completed' : 'In Progress'}</p>
          </section>
        </section>

        <section className="mt-6 flex flex-col gap-4">
          {activeTask.stopsReached.map((stop: any, index: number) => (
            <div key={index} className="flex justify-between">
              <h1 className="font-semibold">Stop {stop.stopNumber}</h1>
              <Button 
                className={`bg-green-600 ${stop.isAllowedToContinue ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={stop.isAllowedToContinue || loadingStops[stop.stopNumber]} // Disable button if allowed or loading
                onClick={() => handleAllowStop(stop.stopNumber)}
              >
                {loadingStops[stop.stopNumber] ? 'Loading...' : (stop.isAllowedToContinue ? 'Allowed' : 'Allow')}
              </Button>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
};

export default ActiveTaskComponent;
