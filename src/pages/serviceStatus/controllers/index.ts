// src/pages/controllers/useMainController.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { COMMENT_PATH } from '../../../routes/path';

// Create a global service lock that can be accessed from anywhere
export const SERVICE_LOCK = {
  isActive: false,
  serviceId: null
};

export const useMainController = (orderId?: string) => {
  const navigate = useNavigate();
  const { id: urlId } = useParams();
  
  // Use the orderId from props if provided, otherwise use the URL param
  const id = orderId || urlId;
  
  // Basic state tracking
  const [currentStepId, setCurrentStepId] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showStartButton, setShowStartButton] = useState(true);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isServiceActive, setIsServiceActive] = useState(false);

  // Check service status on load
  useEffect(() => {
    if (id) {
      const fetchServiceStatus = async () => {
        try {
          const response = await axios.get(`https://homecare-pro.onrender.com/service_order/${id}`);
          const status = response.data.service_status;
          
          if (status === 'Arrived') {
            setCurrentStepId(1);
            setCompletedSteps([1]);
            setShowStartButton(false);
            setShowCompleteButton(false);
            setIsServiceActive(true);
            // Set global service lock
            SERVICE_LOCK.isActive = true;
            SERVICE_LOCK.serviceId = id;
          } else if (status === 'In Progress') {
            setCurrentStepId(2);
            setCompletedSteps([1, 2]);
            setShowStartButton(false);
            setShowCompleteButton(true);
            setIsServiceActive(true);
            // Set global service lock
            SERVICE_LOCK.isActive = true;
            SERVICE_LOCK.serviceId = id;
          } else if (status === 'Finished') {
            setCurrentStepId(3);
            setCompletedSteps([1, 2, 3]);
            setShowStartButton(false);
            setShowCompleteButton(false);
            setIsServiceActive(false);
            // Release global service lock
            SERVICE_LOCK.isActive = false;
            SERVICE_LOCK.serviceId = null;
          }
        } catch (error) {
          console.error('Error fetching service status:', error);
        }
      };
      
      fetchServiceStatus();
    }
  }, [id]);

  // Block navigation when service is active
  useEffect(() => {
    if (!isServiceActive) return;

    // Block attempts to leave the page
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = 'Service is in progress. Are you sure you want to leave?';
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isServiceActive]);

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
    setIsServiceActive(true);
    
    // Set global service lock
    SERVICE_LOCK.isActive = true;
    SERVICE_LOCK.serviceId = id;
    
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
      setIsServiceActive(false);
      
      // Release global service lock on error
      SERVICE_LOCK.isActive = false;
      SERVICE_LOCK.serviceId = null;
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
      setIsServiceActive(false);
      
      // Release global service lock
      SERVICE_LOCK.isActive = false;
      SERVICE_LOCK.serviceId = null;
      
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
    isServiceActive,
    handleStartClick,
    handleCompleteClick,
    getStepStatus,
  };
};