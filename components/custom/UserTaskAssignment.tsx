'use client';
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { createUserTaskProgress, getTaskGroupsAndUserProgress } from '@/lib/actions/usertasks.action';

const UserTaskAssignment = ({ userId }: any) => {
  const [taskGroups, setTaskGroups] = useState([]); // Store task groups
  const [selectedTaskGroup, setSelectedTaskGroup] = useState<string | null>(null); // Currently selected task group
  const [taskInProgress, setTaskInProgress] = useState(false); // Track if user has incomplete tasks
  const [loading, setLoading] = useState(true); // Loading state for initial data
  const [assigning, setAssigning] = useState(false); // Track assignment process

  // Fetch task groups and check user task progress when the component loads
  useEffect(() => {
    const fetchTaskGroupsAndProgress = async () => {
      setLoading(true);
      try {
        const { taskGroups, userTaskProgress } = await getTaskGroupsAndUserProgress(userId);
        // Set fetched task groups
        setTaskGroups(taskGroups);

        // Check if user has an incomplete task in progress
        if (userTaskProgress && !userTaskProgress.completed) {
          setTaskInProgress(true); // Disable the button if a task is in progress
        } else {
          setTaskInProgress(false); // Enable task assignment if no task is in progress
        }
      } catch (error) {
        console.error('Failed to fetch task groups or user progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskGroupsAndProgress();
  }, [userId]);

  // Update selected task group when user selects a value
  const handleTaskGroupChange = (value: string) => {
    setSelectedTaskGroup(value);
  };

  // Handle the assignment of tasks when button is clicked
  const handleSetTask = async () => {
    if (!selectedTaskGroup) return; // Prevent action if no task group is selected

    setAssigning(true); // Show loading state on the button
    try {
      await createUserTaskProgress(userId, selectedTaskGroup); // Assign task
      alert('Task assigned successfully!');
      
      // Update UI state after successful task assignment
      setTaskInProgress(true); // Mark task as in progress immediately after assignment
    } catch (error) {
      console.error('Failed to assign task:', error);
      alert('Failed to assign task. Please try again.');
    } finally {
      setAssigning(false); // Reset loading state on the button
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading state while fetching data
  }

  return (
    <section className="mt-4 px-7 py-6 rounded-lg bg-white">
      <h1 className="font-extrabold mb-3 text-xl">User tasks</h1>
      <p className="mb-8 text-gray-700">Assign task to user and manage user's task settings</p>

      <Select onValueChange={handleTaskGroupChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a task group" />
        </SelectTrigger>
        <SelectContent>
          {taskGroups.map((taskGroup: any) => (
            <SelectItem key={taskGroup._id} value={taskGroup._id}>
              {taskGroup.taskGroupName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <section className="flex justify-end">
        <Button
          className="mt-5 bg-mainColor hover:bg-mainColorOnHover"
          disabled={taskInProgress || !selectedTaskGroup || assigning}
          onClick={handleSetTask}
        >
          {assigning ? 'Assigning...' : taskInProgress ? 'Task In Progress' : 'Set Task'}
        </Button>
      </section>
    </section>
  );
};

export default UserTaskAssignment;
