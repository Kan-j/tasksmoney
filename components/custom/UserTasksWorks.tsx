"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../ui/select';
import StarsRatingComponent from './StarsRatingComponent';
import { getActiveTaskForUser, getRandomProductForTask, updateTaskProgress } from '@/lib/actions/usertasks.action';
import Image from 'next/image';
import Confetti from 'react-confetti';
import BalanceUpdateModal from './BalancedUpdateModal';
 

const UserTasksWorks = ({ userId }: any) => {
  const [product, setProduct] = useState<any>(null); // Store current product
  const [activeTask, setActiveTask] = useState<any>(null); // Store user task progress
  const [earningPerTask, setEarningPerTask] = useState<any>(null); // Store user task progress
  const [selectedReview, setSelectedReview] = useState<string | null>(null); // Store selected review
  const [taskGroupId, setTaskGroupId] = useState<string | null>(null); // Store task group ID
  const [loading, setLoading] = useState(true); // For loading states
  const [error, setError] = useState<string | null>(null); // For error handling
  const [isSubmitting, setIsSubmitting] = useState(false); // For review submission loading state
  const [showModal, setShowModal] = useState(false); // For showing the modal
  const [modalMessage, setModalMessage] = useState<any>(''); // Store the modal message
  const [tasksCompleted, setTasksCompleted] = useState(false); // State for task completion
  const [noActiveTasks, setNoActiveTasks] = useState(false); // State for no active tasks

  // Fetch user task progress and next product
  const fetchTaskAndProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      const taskData = await getActiveTaskForUser(userId);

      if (!taskData) {
        // No active tasks case
        setNoActiveTasks(true);
        setLoading(false);
        return;
      }

      setActiveTask(taskData);
      setEarningPerTask(taskData.earningPerTask);
      setTaskGroupId(taskData.taskGroupId);

      if (taskData.tasksCompleted === taskData.totalTasks) {
        setTasksCompleted(true); // Mark tasks as completed if all are done
      } else {
        const nextProduct = await getRandomProductForTask();
        setProduct(nextProduct);
      }
    } catch (err) {
      setError('Failed to fetch product or task data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskAndProduct();
  }, [userId]);

  // Handle submit review
  const handleSubmitReview = async () => {
    if (!selectedReview) {
      alert('Please select a review.');
      return;
    }

    setIsSubmitting(true); // Start submission loading

    try {
      const response = await updateTaskProgress({
        userId: userId,
        taskGroupId: taskGroupId,
        earningPerTask: earningPerTask,
        totalTasks: activeTask.totalTasks
      });

      if (response.status === 'stop') {
        setModalMessage(response.message);
        setShowModal(true);
        return; // Stop execution here if user needs to update their balance
      }

      if (response.status === 'continue') {
        setSelectedReview(null);
        await fetchTaskAndProduct();
      } else if (response.status === 'completed') {
        setTasksCompleted(true); // Set task completion state
      }
    } catch (error: any) {
      setError('Failed to update task progress.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateBalance = () => {
    console.log('Redirecting to balance update...');
    setShowModal(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="flex flex-col w-full md:w-10/12 lg:w-8/12">
      {tasksCompleted ? (
        <section className="flex flex-col items-center justify-center mt-20">
          <Confetti width={window.innerWidth} height={window.innerHeight} /> {/* Confetti Animation */}
          <h1 className="text-4xl font-extrabold text-green-600 mb-4">Congratulations!</h1>
          <p className="text-lg text-gray-700 mb-6">You have completed all your tasks.</p>
          <p className="text-lg text-gray-600 mb-6">No active tasks are available at the moment.</p>
          
        </section>
      ) : noActiveTasks ? (
        <section className="flex flex-col  mt-20">
          <section className="flex justify-between gap-4 mb-8">
            <section className="flex flex-col">
              <h1 className="text-2xl font-extrabold mb-4">Tasks</h1>
              <h3 className="text-gray-700 w-4/5">
                The system will auto-refresh the commission for each product and add it to your current balance.
              </h3>
            </section>
            <section className="px-4 py-3 rounded-lg bg-white border h-fit min-w-36">
              <h1 className="text-lg text-gray-400 font-black">
                <span className="text-gray-950 mb-6">No Tasks</span>
              </h1>
              <p className="text-gray-600 font-bold">Available</p>
            </section>
          </section>
          <h1 className="text-xl font-semibold text-gray-700 mb-4">No Active Tasks Available</h1>
          <p className="text-lg text-gray-600 mb-6">There are no tasks available for you at the moment. Please check back later.</p>
          
        </section>
      ) : (
        <section className="flex flex-col mb-7">
          <section className="flex md:flex-row flex-col justify-between gap-4">
            <section className="flex flex-col">
              <h1 className="text-2xl font-extrabold mb-4">Tasks</h1>
              <h3 className="text-gray-700 md:w-4/5 w-full">
                The system will auto-refresh the commission for each product and add it to your current balance.
              </h3>
            </section>
            <section className="px-4 py-3 rounded-lg bg-white border h-fit min-w-36">
              <h1 className="text-lg text-gray-400 font-black">
                <span className="text-gray-950 mb-6">Task {activeTask.tasksCompleted}</span> / {activeTask.totalTasks}
              </h1>
              <p className="text-gray-600 font-bold">Completed</p>
            </section>
          </section>

          <section className="my-8 w-full">
            <section className="flex flex-col items-center">
              <section className="md:w-8/12 w-full flex flex-col justify-center bg-white px-10 py-5 rounded-lg mb-4">
                <div className="bg-gray-100 relative px-4 py-4 flex justify-center rounded-lg mb-4">
                  <div className="absolute top-2 right-2 text-sm bg-white text-black px-3 py-1 rounded-full border border-gray-300 font-bold">
                    {activeTask.tasksCompleted} / {activeTask.totalTasks}
                  </div>
                  <Image src={product.images[0]} alt={product.title} className="aspect-4/3" width={200} height={400} />
                </div>

                <h1 className="text-lg text-gray-700 font-semibold">{product.title}</h1>

                <section className="flex flex-row">
                  <StarsRatingComponent rating={product.rating} />
                </section>

                <section className="flex justify-between w-full items-center text-sm mt-2 text-gray-600">
                  <h1>Price</h1>
                  <h1>Commission</h1>
                </section>

                <section className="flex justify-between text-gray-700 text-xl mt-1 mb-2">
                  <h1>${product.price}</h1>
                  <h1>${earningPerTask}</h1> {/* Example commission logic */}
                </section>

                <Select onValueChange={(value) => setSelectedReview(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a review" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.reviews.map((review: any, index: number) => (
                      <SelectItem key={index} value={review.comment}>
                        {review.comment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  className="mt-5 bg-mainColor hover:bg-mainColorOnHover"
                  onClick={handleSubmitReview}
                  disabled={isSubmitting} // Disable the button while submitting
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </section>
            </section>
          </section>

          {showModal && (
            <BalanceUpdateModal
              message={modalMessage}
              onClose={handleCloseModal}
              onUpdateBalance={handleUpdateBalance}
            />
          )}
        </section>
      )}
    </section>
  );
};

export default UserTasksWorks;
