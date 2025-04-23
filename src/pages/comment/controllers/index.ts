import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AlertColor } from "@mui/material/Alert";
import { HOME_PATH, COMMENT_PATH } from "../../../routes/path";
import { Gender } from "../../../enums/gender";

// Interface for service details
export interface ServiceDetail {
  id: string;
  firstName: string;
  surname: string;
  image: string;
  category: string;
  gender: string;
  age: number;
  village: string;
  city: string;
  price: number;
  priceFormatted: string;
  service?: string;
  cat_id?: number;
  // Car details
  carId?: string;
  carBrand?: string;
  carModel?: string;
  carYear?: string;
  licensePlate?: string;
  carImage?: string;
  // Order details
  orderId?: string;
  orderDate?: string;
  orderStatus?: string;
}

// Placeholder data for when API fails but we still want to show UI
export const placeholderData: ServiceDetail[] = [
  {
    id: "placeholder",
    firstName: "ແມ່ບ້ານ",
    surname: "ບໍລິການ",
    image: "/api/placeholder/40/40",
    category: "ແມ່ບ້ານ",
    gender: "ຍິງ",
    age: 21,
    village: "ບ້ານ ໂນນສະຫວ່າງ",
    city: "ວຽງຈັນ",
    price: 250000,
    priceFormatted: "250,000 KIP",
    service: "ແມ່ບ້ານ",
    cat_id: 1
  }
];

const useCommentController = () => {
  // Data state
  const [data, setData] = useState<any[]>([]);
  const [car, setCar] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetail[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  // Billing data for receipt
  const [billingData, setBillingData] = useState({
    customerName: "",
    serviceType: "",
    servicePrice: "",
    totalPrice: "",
    orderDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    receiptNo: `HC-${Math.floor(10000 + Math.random() * 90000)}`
  });
  
  // Comment state
  const [rating, setRating] = useState<number>(3);
  const [comment, setComment] = useState<string>("");
  const [commentError, setCommentError] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success");
  
  // Audio context ref for success sound
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const navigate = useNavigate();
  const { id } = useParams();

  // Create Web Audio Context for success sound
  const createAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // Function to play success sound when comment is submitted
  const playSuccessSound = () => {
    try {
      const audioContext = createAudioContext();
      
      // Create oscillators for a pleasant chord
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      
      // Create gain nodes for volume control
      const gainNode1 = audioContext.createGain();
      const gainNode2 = audioContext.createGain();
      
      // Connect oscillators to gain nodes
      oscillator1.connect(gainNode1);
      oscillator2.connect(gainNode2);
      
      // Connect gain nodes to output
      gainNode1.connect(audioContext.destination);
      gainNode2.connect(audioContext.destination);
      
      // Set oscillator types
      oscillator1.type = "triangle";
      oscillator2.type = "sine";
      
      // Set frequencies for a pleasing sound
      oscillator1.frequency.value = 659.25; // E5
      oscillator2.frequency.value = 783.99; // G5
      
      // Set volume and envelope
      const currentTime = audioContext.currentTime;
      
      gainNode1.gain.setValueAtTime(0, currentTime);
      gainNode2.gain.setValueAtTime(0, currentTime);
      
      gainNode1.gain.linearRampToValueAtTime(0.15, currentTime + 0.1);
      gainNode2.gain.linearRampToValueAtTime(0.1, currentTime + 0.1);
      
      gainNode1.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.2);
      gainNode2.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.5);
      
      // Start and stop oscillators
      oscillator1.start(currentTime);
      oscillator2.start(currentTime + 0.05);
      
      oscillator1.stop(currentTime + 1.2);
      oscillator2.stop(currentTime + 1.5);
    } catch (error) {
      console.error("Error playing success sound:", error);
    }
  };

  // Handle navigation
  const handleNavigate = (path: string): void => {
    navigate(path);
  };

  // Get employee data by ID
  const handleGetDataById = async (): Promise<void> => {
    try {
      setLoading(true);
      // Using the id parameter in the URL
      const res = await axios.get(`https://homecare-pro.onrender.com/employees/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setData(Array.isArray(res.data) ? res.data : [res.data]); // Handle both array and single object responses
      setError(null);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setError("Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };

  // Get car data for moving service (category ID 5)
  const handleGetCarByCatId = async (): Promise<void> => {
    try {
      const res = await axios.get("https://homecare-pro.onrender.com/employees/read_emp_car_employees/5", {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCar(Array.isArray(res.data) ? res.data : [res.data]); // Handle both array and single object responses
    } catch (error) {
      console.error("Error fetching car data:", error);
      // Don't set error state here as car data might be optional
    }
  };

  // Format price with commas
  const formatCurrency = (value: number | string): string => {
    const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " KIP";
  };

  // Generate receipt number
  const generateReceiptNumber = (): string => {
    return `HC-${Math.floor(10000 + Math.random() * 90000)}`;
  };

  // Retry function for when data loading fails
  const retry = (): void => {
    setLoading(true);
    Promise.all([
      handleGetCarByCatId(),
      id ? handleGetDataById() : Promise.resolve(),
      getServiceOrder()
    ]).finally(() => {
      setLoading(false);
    });
  };

  // Handle comment change
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setComment(value);

    // Validate comment
    if (value.length > 500) {
      setCommentError("ຄຳເຫັນຍາວເກີນໄປ (ສູງສຸດ 500 ຕົວອັກສອນ)");
    } else {
      setCommentError("");
    }
  };

  // Handle alert close
  const handleAlertClose = (): void => {
    setAlertOpen(false);
  };

  // Handle download receipt
  const handleDownloadReceipt = (): void => {
    setAlertMessage("ດາວໂຫຼດໃບບິນສຳເລັດແລ້ວ!");
    setAlertSeverity("success");
    setAlertOpen(true);
  };

  // Handle comment submission
  const handleCommentSubmit = async (): Promise<void> => {
    if (comment.trim() === "") {
      setAlertMessage("ກະລຸນາໃສ່ຄຳເຫັນຂອງທ່ານ!");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    try {
      // Prepare comment data for API
      const commentData = {
        user_id: 5, // Using hardcoded user ID as in payment controller
        employees_id: parseInt(id || "0"),
        message: comment.trim(),
        rating: rating,
        status: "active"
      };

      console.log("Creating comment with payload:", commentData);

      // Make API call to submit comment
      const response = await axios.post(
        "https://homecare-pro.onrender.com/comments/create",
        commentData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Comment created successfully:", response.data);

      // Play success sound
      playSuccessSound();

      // Show success message
      setAlertMessage("ສົ່ງຄຳເຫັນສຳເລັດແລ້ວ!");
      setAlertSeverity("success");
      setAlertOpen(true);

      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate(HOME_PATH);
      }, 1500);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setAlertMessage("ເກີດຂໍ້ຜິດພາດໃນການສົ່ງຄຳເຫັນ. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  // Get service order if available
  const getServiceOrder = async (): Promise<void> => {
    try {
      // Get the last order ID from localStorage
      const lastOrderId = localStorage.getItem('lastOrderId');
      
      if (lastOrderId) {
        const res = await axios.get(`https://homecare-pro.onrender.com/service_order/${lastOrderId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const orderData = Array.isArray(res.data) ? res.data[0] : res.data;
        
        if (orderData) {
          // Update service details with order information
          setServiceDetails(prevDetails => {
            return prevDetails.map(detail => ({
              ...detail,
              orderId: orderData.id,
              orderDate: new Date(orderData.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', month: 'short', day: 'numeric' 
              }),
              orderStatus: orderData.service_status
            }));
          });
          
          // Update billing data with order date
          setBillingData(prevBilling => ({
            ...prevBilling,
            orderDate: new Date(orderData.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', month: 'short', day: 'numeric' 
            }),
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching service order:", error);
      // Don't set error state here as order data might be optional
    }
  };

  // Map employee data to service detail format
  useEffect(() => {
    console.log("Data from controller:", data);
    console.log("Car data from controller:", car);
    
    if (data && data.length > 0) {
      const mappedServices = data.map((employee) => {
        // Extract village from address
        let village = 'N/A';
        if (employee.address && typeof employee.address === 'string' && employee.address.trim() !== '') {
          village = employee.address.split(',')[0]?.trim() || employee.address;
        }

        // Format price with commas
        const formatPrice = (price): string => {
          try {
            const numPrice = parseFloat(price);
            return isNaN(numPrice) ? "0 KIP" : numPrice.toLocaleString() + " KIP";
          } catch(e) {
            console.error("Error formatting price:", e);
            return "0 KIP";
          }
        };

        // Calculate age (placeholder)
        const calculateAge = (): number => {
          try {
            const createdDate = new Date(employee.created_at);
            const today = new Date();
            const age = today.getFullYear() - createdDate.getFullYear();
            return age > 0 ? age : 21; // Default to 21 if calculation fails
          } catch (error) {
            console.warn("Error calculating age:", error);
            return 21; // Default age
          }
        };

        // Map gender enum to display text
        let genderText = "ຍິງ"; // Default to female
        try {
          if (employee.gender !== undefined) {
            genderText = employee.gender === Gender.MALE ? "ຊາຍ" : "ຍິງ";
          }
        } catch (error) {
          console.warn("Error processing gender:", error);
        }

        // Safely extract the numeric category ID
        let categoryId: number | undefined;
        try {
          if (employee.cat_id !== undefined) {
            categoryId = typeof employee.cat_id === 'string' 
              ? parseInt(employee.cat_id, 10) 
              : employee.cat_id;
            
            // Check if parsing resulted in NaN
            if (isNaN(categoryId)) {
              categoryId = undefined;
            }
          }
        } catch (error) {
          console.error(`Error parsing cat_id for employee ${employee.id}:`, error);
          categoryId = undefined;
        }

        // Initialize service object with basic information
        const serviceObject: ServiceDetail = {
          id: employee.id || "unknown",
          firstName: employee.first_name || "Unknown",
          surname: employee.last_name || "",
          image: employee.avatar || "/api/placeholder/40/40",
          category: employee.cat_name || "ບໍລິການ",
          gender: genderText,
          age: calculateAge(),
          village: village,
          city: employee.city || "ວຽງຈັນ",
          price: parseFloat(employee.price || "0"),
          priceFormatted: formatPrice(employee.price),
          service: employee.cat_name || "ບໍລິການ",
          cat_id: categoryId,
          // Basic car details from employee (these might be null/undefined)
          carId: employee?.car_id,
          carBrand: employee?.car_brand,
          carModel: employee?.car_model,
          licensePlate: employee?.license_plate,
        };

        // For category ID 5 (moving service), try to find matching car data
        if (categoryId === 5 && car && car.length > 0) {
          // Find car that belongs to this employee
          const employeeCar = car.find(c => c.emp_id === employee.id);
          
          if (employeeCar) {
            // Update with detailed car information
            serviceObject.carId = employeeCar.id || serviceObject.carId;
            serviceObject.carBrand = employeeCar.car_brand || serviceObject.carBrand;
            serviceObject.carModel = employeeCar.model || serviceObject.carModel;
            serviceObject.licensePlate = employeeCar.license_plate || serviceObject.licensePlate;
            serviceObject.carYear = employeeCar.created_at ? 
              new Date(employeeCar.created_at).getFullYear().toString() : undefined;
            serviceObject.carImage = employeeCar.car_image || "/api/placeholder/400/300";
          }
        }

        return serviceObject;
      });

      console.log("Mapped services:", mappedServices);
      setServiceDetails(mappedServices);
      
      // Update billing data based on first employee's information
      if (mappedServices[0]) {
        const firstService = mappedServices[0];
        setBillingData({
          customerName: `${firstService.firstName} ${firstService.surname}`,
          serviceType: firstService.service || firstService.category,
          servicePrice: firstService.priceFormatted,
          totalPrice: firstService.priceFormatted,
          orderDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          receiptNo: generateReceiptNumber()
        });
      }
      
    } else if (error) {
      // Use placeholder data when there's an error
      console.log("Using placeholder data due to error:", error);
      setServiceDetails(placeholderData);
    } else if (!loading && (!data || data.length === 0)) {
      // No data returned, use placeholder
      console.log("No data returned, using placeholder data");
      setServiceDetails(placeholderData);
    }
  }, [data, error, loading, car]);

  // Calculate total whenever service details change
  useEffect(() => {
    const total = serviceDetails.reduce((sum, item) => sum + item.price, 0);
    console.log("Calculated total amount:", total);
    setTotalAmount(total);
  }, [serviceDetails]);

  // Load data when component mounts or ID changes
  useEffect(() => {
    setLoading(true);
    Promise.all([
      handleGetCarByCatId(),
      id ? handleGetDataById() : Promise.resolve(),
      getServiceOrder()
    ]).finally(() => {
      setLoading(false);
    });
  }, [id]);

  return {
    // Data
    serviceDetails,
    billingData,
    loading,
    error,
    totalAmount,
    
    // Comment/Rating state
    rating,
    comment,
    commentError,
    alertOpen,
    alertMessage,
    alertSeverity,
    
    // Functions
    retry,
    setRating,
    handleCommentChange,
    handleAlertClose,
    handleCommentSubmit,
    handleDownloadReceipt,
    formatCurrency,
    generateReceiptNumber,
    navigate
  };
};

export default useCommentController;