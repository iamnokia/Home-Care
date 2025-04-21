import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import { CarModel } from "../../../models/car";
import axios from "axios";
import { Gender } from "../../../enums/gender";
import { SERVICE_STATUS_PATH } from "../../../routes/path";
import { AlertColor } from "@mui/material/Alert";

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
  
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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

  // Handle payment submission
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

    // Prepare data for API call
    try {
      setSuccessDialogOpen(true); // Show loading dialog while processing

      // Get employee data
      const employeeId = locations[0]?.id;
      const categoryId = locations[0]?.cat_id;
      
      // Hard-coded user ID - in a real app, this would come from authentication
      const userId = 5;
      
      // Get address ID from localStorage or use default
      const addressId = localStorage.getItem('selectedAddressId') || 7;
      
      // Create the service order payload
      const serviceOrderPayload = {
        user_id: userId,
        employees_id: employeeId,
        cat_id: categoryId,
        address_users_detail_id: addressId,
        amount: totalAmount,
        payment_status: "paid" // Can be "paid" since this is the payment page
      };

      console.log("Creating service order with payload:", serviceOrderPayload);

      // Make API call to create service order
      const response = await axios.post(
        "https://homecare-pro.onrender.com/service_order/create",
        serviceOrderPayload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Service order created successfully:", response.data);

      // Keep the success dialog open for a moment
      setTimeout(() => {
        setSuccessDialogOpen(false);
        
        // Store order ID in localStorage for later reference
        if (response.data && response.data.id) {
          localStorage.setItem('lastOrderId', response.data.id);
        }
        
        // Navigate to status page
        navigate(SERVICE_STATUS_PATH);
      }, 3000);
    } catch (error) {
      // Close success dialog if there's an error
      setSuccessDialogOpen(false);
      
      console.error("Error creating service order:", error);
      
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
    id
  };
};

export default useMainController;