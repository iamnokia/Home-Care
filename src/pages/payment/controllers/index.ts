// Enhanced useMainController.tsx with correct WhatsApp notification implementation
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import { CarModel } from "../../../models/car";
import axios from "axios";
import { Gender } from "../../../enums/gender";
import { SERVICE_STATUS_PATH } from "../../../routes/path";
import { AlertColor } from "@mui/material/Alert";
import { useSelector } from "react-redux";

// Interface for location data format
export interface Location {
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
}

// Placeholder data for when API fails but we still want to show UI
export const placeholderData: Location[] = [
  {
    id: "placeholder",
    firstName: "ແມ່ບ້ານ",
    surname: "ບໍລິການ",
    image: "https://via.placeholder.com/40",
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

const useMainController = () => {
  // Data state
  const [data, setData] = useState<EmployeeModel[]>([]);
  const [car, setCar] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  // Payment state
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [paymentError, setPaymentError] = useState<string>("");
  const [paymentState, setPaymentState] = useState<"valid" | "insufficient" | "excess">("valid");
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("success");
  
  // Audio context ref for payment sound
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const navigate = useNavigate();
  const { id } = useParams();

  // Get the authenticated user from Redux store
  const authUser = useSelector((state) => state.auth.data);

  // Create Web Audio Context when needed
  const createAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // Function to play success payment sound
  const playPaymentSuccessSound = () => {
    try {
      const audioContext = createAudioContext();
      
      // Create oscillator for "coin" sound
      const playSuccessSound = () => {
        // Create oscillators for a pleasant chord
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const oscillator3 = audioContext.createOscillator();
        
        // Create gain nodes to control volume
        const gainNode1 = audioContext.createGain();
        const gainNode2 = audioContext.createGain();
        const gainNode3 = audioContext.createGain();
        
        // Set initial gain (volume)
        gainNode1.gain.value = 0.2;
        gainNode2.gain.value = 0.15;
        gainNode3.gain.value = 0.1;
        
        // Connect oscillators to gain nodes
        oscillator1.connect(gainNode1);
        oscillator2.connect(gainNode2);
        oscillator3.connect(gainNode3);
        
        // Connect gain nodes to audio output
        gainNode1.connect(audioContext.destination);
        gainNode2.connect(audioContext.destination);
        gainNode3.connect(audioContext.destination);
        
        // Set oscillator types for a pleasant sound
        oscillator1.type = "sine";
        oscillator2.type = "triangle";
        oscillator3.type = "sine";
        
        // Set frequencies for a pleasing chord (C major)
        oscillator1.frequency.value = 523.25; // C5
        oscillator2.frequency.value = 659.25; // E5
        oscillator3.frequency.value = 783.99; // G5
        
        // Schedule gain (volume) changes for fade-out effect
        const currentTime = audioContext.currentTime;
        
        // Attack
        gainNode1.gain.setValueAtTime(0, currentTime);
        gainNode2.gain.setValueAtTime(0, currentTime);
        gainNode3.gain.setValueAtTime(0, currentTime);
        
        gainNode1.gain.linearRampToValueAtTime(0.2, currentTime + 0.1);
        gainNode2.gain.linearRampToValueAtTime(0.15, currentTime + 0.1);
        gainNode3.gain.linearRampToValueAtTime(0.1, currentTime + 0.1);
        
        // Release (fade out)
        gainNode1.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.5);
        gainNode2.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.8);
        gainNode3.gain.exponentialRampToValueAtTime(0.001, currentTime + 2.0);
        
        // Start and stop oscillators
        oscillator1.start(currentTime);
        oscillator2.start(currentTime + 0.05);
        oscillator3.start(currentTime + 0.1);
        
        oscillator1.stop(currentTime + 1.5);
        oscillator2.stop(currentTime + 1.8);
        oscillator3.stop(currentTime + 2.0);
      };
      
      // Play coins falling sound
      const playCoinSound = () => {
        // Duration of the overall sound effect
        const duration = 1.5;
        const numberOfCoins = 6;
        
        for (let i = 0; i < numberOfCoins; i++) {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Randomize frequency a bit for coin-like tinkle effect
            const baseFreq = 2000 + Math.random() * 1000;
            oscillator.frequency.value = baseFreq;
            oscillator.type = "triangle";
            
            // Very short duration for each coin
            const coinTime = audioContext.currentTime;
            gainNode.gain.value = 0.05 + Math.random() * 0.1;
            
            // Fast fade out
            gainNode.gain.exponentialRampToValueAtTime(0.001, coinTime + 0.15);
            
            oscillator.start(coinTime);
            oscillator.stop(coinTime + 0.15);
          }, i * (duration / numberOfCoins) * 300); // Stagger the coin sounds
        }
      };
      
      // Play success sound first, then coins sound
      playSuccessSound();
      setTimeout(playCoinSound, 300);
      
    } catch (error) {
      console.error("Error playing payment sound:", error);
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
      // Using the id parameter in the URL
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

  // Retry function for when data loading fails
  const retry = (): void => {
    setLoading(true);
    Promise.all([
      handleGetCarByCatId(),
      id ? handleGetDataById() : Promise.resolve()
    ]).finally(() => {
      setLoading(false);
    });
  };

  // Get maximum allowed payment
  const getMaximumAllowedPayment = (): number => {
    return totalAmount * 1.0;
  };

  // Handle payment amount change with validation
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setPaymentAmount(value);

      // Validate payment amount
      const enteredAmount = parseInt(value) || 0;
      const maximumAllowed = getMaximumAllowedPayment();
      
      if (enteredAmount < totalAmount) {
        setPaymentError("ຈຳນວນເງິນບໍ່ພຽງພໍ");
        setPaymentState("insufficient");
      } else if (enteredAmount > maximumAllowed) {
        setPaymentError("ຈຳນວນເງິນຫຼາຍເກີນໄປ");
        setPaymentState("excess");
      } else {
        setPaymentError("");
        setPaymentState("valid");
      }
    }
  };

  // Handle alert close
  const handleAlertClose = (): void => {
    setAlertOpen(false);
  };

  // Update employee status to inactive
  const handleUpdateEmployeeStatus = async (employeeId: string | number): Promise<void> => {
    try {
      console.log(`Updating employee ${employeeId} status to inactive`);
      
      // Convert string ID to number if needed
      const numericId = typeof employeeId === 'string' ? parseInt(employeeId, 10) : employeeId;
      
      if (isNaN(numericId)) {
        console.error("Invalid employee ID for status update:", employeeId);
        return;
      }
      
      await axios.put(
        `https://homecare-pro.onrender.com/employees/update_employees/${numericId}`,
        { status: 'inactive' },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log(`Successfully updated employee ${employeeId} status to inactive`);
    } catch (error) {
      console.error(`Error updating employee ${employeeId} status:`, error);
      // Don't throw error here to prevent disrupting the payment flow
    }
  };


  // Get selected location from localStorage
const getSelectedLocationId = () => {
  try {
    // Get the JSON string from localStorage
    const selectedLocationStr = localStorage.getItem('selectedLocation');
    
    if (!selectedLocationStr) {
      console.error("No selected location found in localStorage");
      return null;
    }
    
    // Parse the JSON string to an object
    const selectedLocation = JSON.parse(selectedLocationStr);
    
    // Extract the ID
    return selectedLocation.id;
  } catch (error) {
    console.error("Error retrieving selected location ID:", error);
    return null;
  }
};

// Usage example

  // COMPLETELY REWRITTEN: Send WhatsApp notification and create service order
  const sendWhatsAppNotification = async (): Promise<any> => {
    try {
      const locationId = getSelectedLocationId();
      
      // Get employee phone number from data
      const employeePhone = data[0]?.tel;
      
      if (!employeePhone) {
        console.error("Missing employee phone number for WhatsApp notification");
        throw new Error("Employee phone number not found");
      }
      
      // The backend only expects the 'to' field with the employee's phone number
      const whatsappPayload = {
        to: employeePhone
      };
      
      // Make the API call to send WhatsApp and create service order in one step
      const response = await axios.post(
        `https://homecare-pro.onrender.com/service_order/whatsapp/${locationId}`,
        whatsappPayload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("WhatsApp notification sent and service order created:", response.data);
      
      // Return the response data which should include the created service order
      return response.data;
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      throw error; // Re-throw to allow handling in the payment function
    }
  };

  // COMPLETELY REWRITTEN: Handle payment submission
  const handlePaymentSubmit = async (): Promise<void> => {
    const enteredAmount = parseInt(paymentAmount) || 0;

    // Validate payment amount
    if (enteredAmount < totalAmount) {
      setAlertMessage("ກະລຸນາໃສ່ຈຳນວນເງິນໃຫ້ພຽງພໍ!");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    if (enteredAmount > getMaximumAllowedPayment()) {
      setAlertMessage("ຈຳນວນເງິນຫຼາຍເກີນໄປ! ກະລຸນາກວດສອບຈຳນວນເງິນຂອງທ່ານ.");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }

    // Check if user is authenticated
    if (!authUser) {
      setAlertMessage("ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນດຳເນີນການຊຳລະເງິນ");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    // Show loading dialog
    setSuccessDialogOpen(true);

    try {
      // Get employee ID from locations
      const employeeId = locations[0]?.id;
      
      if (!employeeId) {
        throw new Error("Employee ID not found");
      }
      
      // Play the payment success sound
      playPaymentSuccessSound();
      
      // Call the WhatsApp notification API which also creates the service order
      const orderResponse = await sendWhatsAppNotification();
      
      // Get the created service order ID from the response
      const serviceOrderId = orderResponse?.service_order?.id;
      
      // Update employee status to inactive
      if (employeeId) {
        await handleUpdateEmployeeStatus(employeeId);
      }
      
      // Store service order ID in localStorage for reference
      if (serviceOrderId) {
        localStorage.setItem('lastOrderId', serviceOrderId.toString());
      }
      
      // Keep success dialog open briefly before navigating
      setTimeout(() => {
        setSuccessDialogOpen(false);
        navigate(`/service-status/${id}`);
      }, 3000);
    } catch (error) {
      // Close success dialog if there's an error
      setSuccessDialogOpen(false);
      
      console.error("Error processing payment:", error);
      
      // FALLBACK METHOD: If WhatsApp notification fails, try to create order directly
      if (error.message?.includes("WhatsApp")) {
        try {
          setAlertMessage("ບໍ່ສາມາດສົ່ງແຈ້ງເຕືອນ WhatsApp ໄດ້, ກຳລັງສ້າງການບໍລິການໂດຍກົງ...");
          setAlertSeverity("warning");
          setAlertOpen(true);
          
          // Get necessary IDs
          const employeeId = locations[0]?.id;
          const categoryId = locations[0]?.cat_id;
          const userId = authUser.id;
          const addressId = localStorage.getItem('selectedAddressId') || "7";
          
          // Create service order directly
          const serviceOrderPayload = {
            user_id: userId,
            employees_id: employeeId,
            cat_id: categoryId,
            address_users_detail_id: addressId,
            amount: totalAmount,
            payment_status: "paid",
            service_status: "Not Start"
          };
          
          console.log("Creating service order directly with payload:", serviceOrderPayload);
          
          const response = await axios.post(
            "https://homecare-pro.onrender.com/service_order/create",
            serviceOrderPayload,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          
          console.log("Service order created directly:", response.data);
          
          // Update employee status
          if (employeeId) {
            await handleUpdateEmployeeStatus(employeeId);
          }
          
          // Store order ID
          if (response.data?.id) {
            localStorage.setItem('lastOrderId', response.data.id.toString());
          }
          
          // Navigate to status page
          setTimeout(() => {
            navigate(`/service-status/${id}`);
          }, 2000);
          
          return;
        } catch (fallbackError) {
          console.error("Error in fallback order creation:", fallbackError);
        }
      }
      
      // Show error message
      setAlertMessage("ເກີດຂໍ້ຜິດພາດໃນການສ້າງຄຳສັ່ງ. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  // Map employee data to location format
  useEffect(() => {
    console.log("Data from controller:", data);
    console.log("Car data from controller:", car);
    
    if (data && data.length > 0) {
      const mappedLocations = data.map((employee) => {
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

        // Initialize location object with basic information
        const locationObject: Location = {
          id: employee.id || "unknown",
          firstName: employee.first_name || "Unknown",
          surname: employee.last_name || "",
          image: employee.avatar || "https://via.placeholder.com/40",
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
            locationObject.carId = employeeCar.id || locationObject.carId;
            locationObject.carBrand = employeeCar.car_brand || locationObject.carBrand;
            locationObject.carModel = employeeCar.model || locationObject.carModel;
            locationObject.licensePlate = employeeCar.license_plate || locationObject.licensePlate;
            locationObject.carYear = employeeCar.created_at ? 
              new Date(employeeCar.created_at).getFullYear().toString() : undefined;
            locationObject.carImage = employeeCar.car_image || "https://via.placeholder.com/400/300";
          }
        }

        return locationObject;
      });

      console.log("Mapped locations:", mappedLocations);
      setLocations(mappedLocations);
    } else if (error) {
      // Use placeholder data when there's an error
      console.log("Using placeholder data due to error:", error);
      setLocations(placeholderData);
    } else if (!loading && (!data || data.length === 0)) {
      // No data returned, use placeholder
      console.log("No data returned, using placeholder data");
      setLocations(placeholderData);
    }
  }, [data, error, loading, car]);

  // Calculate total whenever locations change
  useEffect(() => {
    const total = locations.reduce((sum, item) => sum + item.price, 0);
    console.log("Calculated total amount:", total);
    setTotalAmount(total);
    
    // Set initial payment amount to match total
    setPaymentAmount(total.toString());
    
    // Set initial payment state
    setPaymentState("valid");
  }, [locations]);

  // Load data when component mounts or ID changes
  useEffect(() => {
    setLoading(true);
    Promise.all([
      handleGetCarByCatId(),
      id ? handleGetDataById() : Promise.resolve()
    ]).finally(() => {
      setLoading(false);
    });
  }, [id]);

  return {
    // Data
    car,
    data,
    loading,
    error,
    locations,
    totalAmount,
    
    // Payment
    paymentAmount,
    paymentError,
    paymentState,
    successDialogOpen,
    alertOpen,
    alertMessage,
    alertSeverity,
    
    // Functions
    retry,
    handleNavigate,
    navigate,
    formatCurrency,
    handlePaymentAmountChange,
    handleAlertClose,
    handlePaymentSubmit,
    playPaymentSuccessSound,
    handleUpdateEmployeeStatus, 
    sendWhatsAppNotification,
    id
  };
};

export default useMainController;