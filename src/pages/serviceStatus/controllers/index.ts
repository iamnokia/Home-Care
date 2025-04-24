import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { COMMENT_PATH } from '../../../routes/path';

export const useMainController = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Step status tracking
  const [currentStepId, setCurrentStepId] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Update service status via API
  const updateServiceStatus = async (status: string) => {
    try {
      const response = await axios.put(
        `https://homecare-pro.onrender.com/service_order/update/${id}`,
        { service_status: status }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating service status:', error);
      throw error;
    }
  };

  // Handle start button click
  const handleStartClick = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setShowStartButton(false);
    
    try {
      // First update status to "Arrived"
      await updateServiceStatus("Arrived");
      setCurrentStepId(1);
      setCompletedSteps([1]);
      
      // Automatically update to "In Progress" after Arrived
      setTimeout(async () => {
        await updateServiceStatus("In Progress");
        setCurrentStepId(2);
        setCompletedSteps([1, 2]);
        setShowCompleteButton(true);
        setIsProcessing(false);
      }, 3000);
    } catch (error) {
      console.error('Error in start process:', error);
      setIsProcessing(false);
      setShowStartButton(true);
    }
  };

  // Handle complete button click
  const handleCompleteClick = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setShowCompleteButton(false);
    
    try {
      // Update status to "Finish"
      await updateServiceStatus("Finished");
      setCompletedSteps([1, 2, 3]);
      setCurrentStepId(3);
      
      // Navigate to comment path after completion
      setTimeout(() => {
        navigate(`${COMMENT_PATH}/${id}`);
      }, 2000);
    } catch (error) {
      console.error('Error in complete process:', error);
      setIsProcessing(false);
      setShowCompleteButton(true);
    }
  };

  // Get status for each step
  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      return 'completed';
    }
    if (currentStepId === stepId) {
      return 'current';
    }
    return 'pending';
  };

  return {
    currentStepId,
    completedSteps,
    showStartButton,
    showCompleteButton,
    isProcessing,
    handleStartClick,
    handleCompleteClick,
    getStepStatus,
  };
};