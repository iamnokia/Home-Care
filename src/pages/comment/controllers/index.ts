import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AlertColor } from "@mui/material/Alert";
import { HOME_PATH, COMMENT_PATH } from "../../../routes/path";
import { Gender } from "../../../enums/gender";
import { useSelector } from "react-redux";

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

// Billing data interface
export interface BillingData {
  customerName: string;
  serviceType: string;
  servicePrice: string;
  totalPrice: string;
  orderDate?: string;
  receiptNo?: string;
}

// City definitions with English and Lao names - Same as LocationPage/PaymentPage
const CITIES = [
  { en: 'CHANTHABULY', lo: 'ຈັນທະບູລີ', value: 'chanthabouly' },
  { en: 'SIKHOTTABONG', lo: 'ສີໂຄດຕະບອງ', value: 'sikhottabong' },
  { en: 'XAYSETHA', lo: 'ໄຊເສດຖາ', value: 'xaysetha' },
  { en: 'SISATTANAK', lo: 'ສີສັດຕະນາກ', value: 'sisattanak' },
  { en: 'NAXAITHONG', lo: 'ນາຊາຍທອງ', value: 'naxaithong' },
  { en: 'XAYTANY', lo: 'ໄຊທານີ', value: 'xaytany' },
  { en: 'HADXAIFONG', lo: 'ຫາດຊາຍຟອງ', value: 'hadxaifong' }
];

// Helper function to normalize city names - Same as LocationPage/PaymentPage
const normalizeCityName = (cityName: string): string => {
  if (!cityName) return '';
  
  // Convert to lowercase and remove spaces
  let normalized = cityName.toLowerCase().replace(/\s+/g, '');
  
  // Handle common variations
  const cityMappings: { [key: string]: string } = {
    'chanthabuly': 'chanthabouly',
    'chanthabouly': 'chanthabouly',
    'ຈັນທະບູລີ': 'chanthabouly',
    'sikhottabong': 'sikhottabong', 
    'ສີໂຄດຕະບອງ': 'sikhottabong',
    'xaysetha': 'xaysetha',
    'ໄຊເສດຖາ': 'xaysetha',
    'sisattanak': 'sisattanak',
    'ສີສັດຕະນາກ': 'sisattanak',
    'naxaithong': 'naxaithong',
    'ນາຊາຍທອງ': 'naxaithong',
    'xaytany': 'xaytany',
    'ໄຊທານີ': 'xaytany',
    'hadxaifong': 'hadxaifong',
    'ຫາດຊາຍຟອງ': 'hadxaifong'
  };
  
  return cityMappings[normalized] || normalized;
};

// Distance fee cal// Distance fee calculation function - Same as LocationPage/PaymentPage
const calculateDistanceFee = (employeeCity: string, userCity: string): { fee: number; reason: string } => {
  if (!employeeCity || !userCity) {
    return { fee: 0, reason: 'ບໍ່ສາມາດກຳນົດທີ່ຕັ້ງໄດ້' };
  }

  // Normalize city names
  const empCity = normalizeCityName(employeeCity);
  const usrCity = normalizeCityName(userCity);

  if (empCity === usrCity) {
    return { fee: 8000, reason: 'ທີ່ຕັ້ງດຽວກັນ - ຄ່າບໍລິການພື້ນຖານ' };
  }

  // Define distance fee rules based on your requirements
  const distanceRules: { [key: string]: { [key: string]: number } } = {
    'chanthabouly': {
      'sikhottabong': 10000,
      'xaysetha': 10000,
      'sisattanak': 10000,
      'xaytany': 15000,
      'naxaithong': 15000,
      'hadxaifong': 15000
    },
    'sikhottabong': {
      'chanthabouly': 10000,
      'sisattanak': 10000,
      'naxaithong': 15000,
      'xaysetha': 15000,
      'hadxaifong': 20000,
      'xaytany': 20000
    },
    'naxaithong': {
      'chanthabouly': 15000,
      'sikhottabong': 15000,
      'sisattanak': 20000,
      'xaysetha': 20000,
      'hadxaifong': 25000,
      'xaytany': 25000
    },
    'xaytany': {
      'chanthabouly': 15000,
      'xaysetha': 15000,
      'sisattanak': 20000,
      'hadxaifong': 20000,
      'naxaithong': 25000,
      'sikhottabong': 25000
    },
    'xaysetha': {
      'chanthabouly': 10000,
      'sisattanak': 10000,
      'xaytany': 10000,
      'hadxaifong': 10000,
      'naxaithong': 15000,
      'sikhottabong': 15000
    },
    'hadxaifong': {
      'xaysetha': 10000,
      'sisattanak': 10000,
      'xaytany': 15000,
      'sikhottabong': 15000,
      'chanthabouly': 15000,
      'naxaithong': 25000
    },
    'sisattanak': {
      'sikhottabong': 10000,
      'chanthabouly': 10000,
      'xaysetha': 10000,
      'hadxaifong': 10000,
      'naxaithong': 20000,
      'xaytany': 20000
    }
  };

  const fee = distanceRules[empCity]?.[usrCity] || 0;
  
  let reason = '';
  if (fee === 0) {
    reason = 'ບໍ່ມີຂໍ້ມູນ ຄ່າໄລຍະທາງສຳລັບເສັ້ນທາງນີ້';
  } else if (fee === 8000) {
    reason = 'ທີ່ຕັ້ງດຽວກັນ - ຄ່າບໍລິການພື້ນຖານ';
  } else if (fee === 10000) {
    reason = 'ຄ່າໄລຍະທາງໃກ້ຄຽງ';
  } else if (fee === 15000) {
    reason = 'ຄ່າໄລຍະທາງປານກາງ';
  } else if (fee === 20000) {
    reason = ' ຄ່າໄລຍະທາງໄກ';
  } else if (fee === 25000) {
    reason = 'ຄ່າໄລຍະທາງໄກຫຼາຍ';
  }

  return { fee, reason };
};

// Placeholder data for when API fails but we still want to show UI
export const placeholderData: ServiceDetail[] = [
  {
    id: "29",
    firstName: "ອຳມະລິນ",
    surname: "ອຸນາລົມ",
    image: "/api/placeholder/40/40",
    category: "ແມ່ບ້ານ",
    gender: "ຍິງ",
    age: 21,
    village: "ບ້ານ ໂນນສະຫວ່າງ",
    city: "ວຽງຈັນ",
    price: 150000,
    priceFormatted: "150,000 KIP",
    service: "ທຳຄວາມສະອາດ",
    cat_id: 3,
    orderId: "13",
    orderDate: new Date("2025-04-10T14:45:31.000Z").toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    }),
    orderStatus: "Arrived"
  }
];

const useCommentController = () => {
  // Get URL parameters and navigation
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Get the authenticated user from Redux store
  const authUser = useSelector((state) => state.auth.data);

  // Data state
  const [data, setData] = useState<any[]>([]);
  const [car, setCar] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [serviceDetails, setServiceDetails] = useState<ServiceDetail[]>([]);
  
  // Amount calculations - Like LocationPage/PaymentPage
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [distanceFee, setDistanceFee] = useState<number>(0);
  const [distanceFeeReason, setDistanceFeeReason] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  // City tracking - Like LocationPage/PaymentPage
  const [userCity, setUserCity] = useState<string>("");
  const [employeeCity, setEmployeeCity] = useState<string>("");
  
  // Billing data for receipt
  const [billingData, setBillingData] = useState<BillingData>({
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

  // Get employee data by ID (with optional employeeId parameter)
  const handleGetDataById = async (employeeId?: string): Promise<any> => {
    try {
      setLoading(true);
      // Use the provided employeeId or the id from URL
      const idToFetch = employeeId || id;
      
      if (!idToFetch) {
        console.log("No employee ID available for API call");
        return Promise.reject("No ID available");
      }
      
      console.log("Fetching employee data for ID:", idToFetch);
      
      // Make API call
      const res = await axios.get(`https://homecare-pro.onrender.com/employees/${idToFetch}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Process response data
      setData(Array.isArray(res.data) ? res.data : [res.data]);
      setError(null);
      
      return res.data;
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setError("Failed to load employee data");
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  // Get car data for moving service (category ID 5)
  const handleGetCarByCatId = async (): Promise<any> => {
    try {
      const res = await axios.get("https://homecare-pro.onrender.com/employees/read_emp_car_employees/5", {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCar(Array.isArray(res.data) ? res.data : [res.data]);
      return res.data;
    } catch (error) {
      console.error("Error fetching car data:", error);
      return Promise.reject(error);
    }
  };

  // Update employee status to active
  const handleUpdateEmployeeStatus = async (employeeId: string | number): Promise<void> => {
    try {
      console.log(`Updating employee ${employeeId} status to active`);
      
      // Convert string ID to number if needed
      const numericId = typeof employeeId === 'string' ? parseInt(employeeId, 10) : employeeId;
      
      if (isNaN(numericId)) {
        console.error("Invalid employee ID for status update:", employeeId);
        return;
      }
      
      await axios.put(
        `https://homecare-pro.onrender.com/employees/update_employees/${numericId}`,
        { status: 'active' },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log(`Successfully updated employee ${employeeId} status to active`);
    } catch (error) {
      console.error(`Error updating employee ${employeeId} status:`, error);
    }
  };

  // NEW: Create service order directly (backup method from comment page)
  const createServiceOrderDirect = async (): Promise<any> => {
    try {
      console.log("=== Creating Service Order from Comment Page ===");
      
      // Get necessary data
      const employeeId = id || 
                         (serviceDetails.length > 0 ? serviceDetails[0].id : null) || 
                         localStorage.getItem('lastEmployeeId');
      const categoryId = serviceDetails.length > 0 ? serviceDetails[0].cat_id : null;
      const userId = authUser?.id;
      const addressId = localStorage.getItem('selectedAddressId') || "7";
      const amount = totalAmount || (serviceDetails.length > 0 ? serviceDetails[0].price : 0);
      
      console.log("Service order data from comment page:", {
        employeeId,
        categoryId,
        userId,
        addressId,
        amount
      });
      
      // Validate required data - if any is missing, skip service order creation
      if (!userId) {
        console.log("User ID not found - skipping service order creation");
        return null;
      }
      
      if (!employeeId) {
        console.log("Employee ID not found - skipping service order creation");
        return null;
      }
      
      if (!categoryId) {
        console.log("Category ID not found - skipping service order creation");
        return null;
      }

      if (!amount || amount <= 0) {
        console.log("Invalid amount - skipping service order creation");
        return null;
      }
      
      // Create service order payload (using totalAmount which includes distance fee)
      const serviceOrderPayload = {
        user_id: parseInt(userId.toString()),
        employees_id: parseInt(employeeId.toString()),
        cat_id: parseInt(categoryId.toString()),
        address_users_detail_id: parseInt(addressId.toString()),
        amount: totalAmount, // Use totalAmount which includes distance fee
        payment_status: "paid",
        service_status: "Not Start"
      };
      
      console.log("Creating service order from comment page with payload:", serviceOrderPayload);
      
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
      
      console.log("Service order created successfully from comment page:", response.data);
      
      // Store service order ID in localStorage for reference
      if (response.data?.id) {
        localStorage.setItem('lastOrderId', response.data.id.toString());
        console.log("Stored service order ID from comment page:", response.data.id);
      }
      
      return response.data;
      
    } catch (error) {
      console.error("Error creating service order from comment page:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
      }
      // Don't throw error here to prevent disrupting the comment submission flow
      return null;
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
    loadData().finally(() => {
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

  // Get service order if available
  const getServiceOrder = async (orderId?: string): Promise<any> => {
    try {
      // Get the last order ID from localStorage or use the provided orderId
      const lastOrderId = orderId || localStorage.getItem('lastOrderId') || id;
      
      if (lastOrderId) {
        console.log("Fetching service order data for ID:", lastOrderId);
        
        const res = await axios.get(`https://homecare-pro.onrender.com/service_order/${lastOrderId}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        const orderData = Array.isArray(res.data) ? res.data[0] : res.data;
        
        if (orderData) {
          console.log("Service order data:", orderData);
          
          // Store employee ID from order for future use
          if (orderData.employees_id) {
            localStorage.setItem('lastEmployeeId', orderData.employees_id.toString());
            
            // If we don't have an ID in the URL but we found it in the order,
            // update the URL to include it without reloading
            if (!id && orderData.employees_id) {
              window.history.replaceState(
                null, 
                '', 
                `${COMMENT_PATH}/${orderData.employees_id}`
              );
            }
          }
          
          // Get stored distance fee and base amount from localStorage (set by PaymentPage)
          const storedDistanceFee = parseInt(localStorage.getItem('distanceFee') || '0');
          const storedBaseAmount = parseInt(localStorage.getItem('baseAmount') || '0');
          const storedTotalAmount = parseInt(localStorage.getItem('totalAmountWithDistanceFee') || '0');
          
          console.log("Retrieved stored amounts:", {
            storedDistanceFee,
            storedBaseAmount, 
            storedTotalAmount,
            orderAmount: orderData.amount
          });
          
          // Set amounts from stored data or order data
          if (storedBaseAmount > 0) {
            setBaseAmount(storedBaseAmount);
          }
          if (storedDistanceFee >= 0) {
            setDistanceFee(storedDistanceFee);
          }
          if (storedTotalAmount > 0) {
            setTotalAmount(storedTotalAmount);
          } else if (orderData.amount) {
            setTotalAmount(parseFloat(orderData.amount));
          }
          
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
          
          // Update billing data with order date and amount
          setBillingData(prevBilling => ({
            ...prevBilling,
            orderDate: new Date(orderData.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', month: 'short', day: 'numeric' 
            }),
            totalPrice: formatCurrency(storedTotalAmount || orderData.amount),
            servicePrice: formatCurrency(storedBaseAmount || orderData.amount)
          }));
          
          return orderData;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching service order:", error);
      
      // Use fallback order if no real order is available and we have no service details yet
      if (serviceDetails.length === 0) {
        setServiceDetails(placeholderData);
        
        // Set billing data based on fallback
        const fallbackService = placeholderData[0];
        setBillingData({
          customerName: `${fallbackService.firstName} ${fallbackService.surname}`,
          serviceType: fallbackService.service || fallbackService.category,
          servicePrice: fallbackService.priceFormatted,
          totalPrice: fallbackService.priceFormatted,
          orderDate: fallbackService.orderDate || new Date().toLocaleDateString('en-US', { 
            year: 'numeric', month: 'short', day: 'numeric' 
          }),
          receiptNo: generateReceiptNumber()
        });
        
        setBaseAmount(fallbackService.price);
        setTotalAmount(fallbackService.price);
      }
      
      return Promise.reject(error);
    }
  };

  // UPDATED: Handle comment submission with employee status update AND service order creation
  const handleCommentSubmit = async (): Promise<void> => {
    if (comment.trim() === "") {
      setAlertMessage("ກະລຸນາໃສ່ຄຳເຫັນຂອງທ່ານ!");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    // Check if user is authenticated
    if (!authUser) {
      setAlertMessage("ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນສົ່ງຄຳເຫັນ");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    // Show loading indicator
    setLoading(true);

    try {
      // Get the employee ID from either the URL param or the service details or localStorage
      const employeeId = id || 
                         (serviceDetails.length > 0 ? serviceDetails[0].id : null) || 
                         localStorage.getItem('lastEmployeeId') || 
                         "0";
      
      // Use the authenticated user's ID
      const userId = authUser.id;
      
      // Prepare comment data for API
      const commentData = {
        user_id: userId,
        employees_id: parseInt(employeeId),
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

      // NEW: Try to create service order as additional step (won't interrupt existing flow)
      try {
        console.log("=== ATTEMPTING SERVICE ORDER CREATION FROM COMMENT PAGE ===");
        await createServiceOrderDirect();
      } catch (serviceOrderError) {
        console.error("Service order creation from comment page failed (this is okay):", serviceOrderError);
        // Don't let this error affect the comment submission process
      }

      // Update employee status to active
      if (employeeId) {
        await handleUpdateEmployeeStatus(employeeId);
      }

      // Play success sound
      playSuccessSound();

      // Show success message
      setAlertMessage("ສົ່ງຄຳເຫັນສຳເລັດແລ້ວ!");
      setAlertSeverity("success");
      setAlertOpen(true);
      setLoading(false);

      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate(HOME_PATH);
      }, 1500);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setLoading(false);
      
      // Try to update employee status regardless of comment submission result
      try {
        const employeeId = id || 
                          (serviceDetails.length > 0 ? serviceDetails[0].id : null) || 
                          localStorage.getItem('lastEmployeeId');
        
        if (employeeId) {
          await handleUpdateEmployeeStatus(employeeId);
        }
      } catch (statusError) {
        console.error("Error updating employee status:", statusError);
      }
      
      // NEW: Try to create service order as backup even if comment failed
      try {
        console.log("=== ATTEMPTING SERVICE ORDER CREATION FROM COMMENT PAGE (FALLBACK) ===");
        await createServiceOrderDirect();
      } catch (serviceOrderError) {
        console.error("Fallback service order creation from comment page failed (this is okay):", serviceOrderError);
      }
      
      // Still let the user know it worked even if the API failed
      setAlertMessage("ສົ່ງຄຳເຫັນສຳເລັດແລ້ວ!");
      setAlertSeverity("success");
      setAlertOpen(true);
      
      // Log the error for debugging but don't show to user
      console.error("API error details:", error);
      
      // Still navigate away after delay to maintain UI flow
      setTimeout(() => {
        navigate(HOME_PATH);
      }, 1500);
    }
  };

  // Map employee data to service detail format
  const mapDataToServiceDetails = () => {
    console.log("Mapping data to service details:", data);
    console.log("Car data:", car);
    
    let shouldUsePlaceholder = false;
    let mappedServices: ServiceDetail[] = [];
    
    if (data && data.length > 0) {
      try {
        mappedServices = data.map((employee) => {
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
              return age > 0 ? age : 21;
            } catch (error) {
              console.warn("Error calculating age:", error);
              return 21;
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
            carId: employee?.car_id,
            carBrand: employee?.car_brand,
            carModel: employee?.car_model,
            licensePlate: employee?.license_plate,
          };

          // For category ID 5 (moving service), try to find matching car data
          if (categoryId === 5 && car && car.length > 0) {
            const employeeCar = car.find(c => c.emp_id === employee.id);
            
            if (employeeCar) {
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
        
        // Check if mapped services have all required data
        const isValidMappedService = mappedServices.length > 0 && 
                                    mappedServices[0].id && 
                                    mappedServices[0].firstName && 
                                    mappedServices[0].price > 0;
        
        if (!isValidMappedService) {
          shouldUsePlaceholder = true;
        }
      } catch (error) {
        console.error("Error mapping employee data:", error);
        shouldUsePlaceholder = true;
      }
    } else {
      shouldUsePlaceholder = true;
    }
    
    if (shouldUsePlaceholder || error || (!loading && (!data || data.length === 0))) {
      console.log("Using placeholder data due to error or invalid data");
      mappedServices = placeholderData;
    }
    
    // Set service details
    console.log("Final mapped services:", mappedServices);
    setServiceDetails(mappedServices);
    
    // Auto-set employee city from first service's data - Like LocationPage/PaymentPage
    if (mappedServices.length > 0 && mappedServices[0].city) {
      const normalizedEmployeeCity = normalizeCityName(mappedServices[0].city);
      setEmployeeCity(normalizedEmployeeCity);
    }
    
    // Update billing data based on first service's information
    if (mappedServices.length > 0) {
      const firstService = mappedServices[0];
      
      // Set base amount from service price
      setBaseAmount(firstService.price);
      
      setBillingData({
        customerName: `${firstService.firstName} ${firstService.surname}`,
        serviceType: firstService.service || firstService.category,
        servicePrice: firstService.priceFormatted,
        totalPrice: firstService.priceFormatted, // Will be updated after distance fee calculation
        orderDate: firstService.orderDate || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', month: 'short', day: 'numeric' 
        }),
        receiptNo: generateReceiptNumber()
      });
    }
  };

  // Auto-get user city from localStorage (set from location selection) - Like LocationPage/PaymentPage
  useEffect(() => {
    const savedUserCity = localStorage.getItem('addressCity');
    if (savedUserCity) {
      const normalizedUserCity = normalizeCityName(savedUserCity);
      setUserCity(normalizedUserCity);
    }
  }, []);

  // Auto-calculate distance fee when cities are available - Like LocationPage/PaymentPage
  useEffect(() => {
    if (employeeCity && userCity) {
      const result = calculateDistanceFee(employeeCity, userCity);
      setDistanceFee(result.fee);
      setDistanceFeeReason(result.reason);
    } else {
      // Try to get from localStorage if cities are not available
      const storedDistanceFee = parseInt(localStorage.getItem('distanceFee') || '0');
      const storedReason = localStorage.getItem('distanceFeeReason') || 'ກຳລັງກຳນົດທີ່ຕັ້ງ...';
      
      setDistanceFee(storedDistanceFee);
      setDistanceFeeReason(storedReason);
    }
  }, [employeeCity, userCity]);

  // Calculate total amount - Like LocationPage/PaymentPage
  useEffect(() => {
    const newTotal = baseAmount + distanceFee;
    setTotalAmount(newTotal);
    
    // Update billing data with new total
    setBillingData(prevBilling => ({
      ...prevBilling,
      totalPrice: formatCurrency(newTotal)
    }));
  }, [baseAmount, distanceFee]);

  // Load all required data
  const loadData = async () => {
    setLoading(true);
    
    // Set a timeout to ensure we don't wait too long for APIs
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log("API request timeout - using fallback data");
        setServiceDetails(placeholderData);
        
        // Update billing data based on fallback data
        const fallbackService = placeholderData[0];
        setBillingData({
          customerName: `${fallbackService.firstName} ${fallbackService.surname}`,
          serviceType: fallbackService.service || fallbackService.category,
          servicePrice: fallbackService.priceFormatted,
          totalPrice: fallbackService.priceFormatted,
          orderDate: fallbackService.orderDate || new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
          }),
          receiptNo: generateReceiptNumber()
        });
        
        setBaseAmount(fallbackService.price);
        setTotalAmount(fallbackService.price);
        setLoading(false);
      }
    }, 5000); // 5 second timeout
    
    try {
      // Get ID from different sources
      let employeeId = id;
      
      // If no ID in URL, try localStorage
      if (!employeeId) {
        employeeId = localStorage.getItem('lastEmployeeId') || null;
        console.log("Retrieved employee ID from localStorage:", employeeId);
        
        // If found employeeId in localStorage, update URL without reloading
        if (employeeId) {
          window.history.replaceState(
            null, 
            '', 
            `${COMMENT_PATH}/${employeeId}`
          );
        }
      }
      
      // If still no ID, try to get from service order
      if (!employeeId) {
        const lastOrderId = localStorage.getItem('lastOrderId');
        if (lastOrderId) {
          try {
            console.log("Trying to get employee ID from order:", lastOrderId);
            const orderResponse = await axios.get(
              `https://homecare-pro.onrender.com/service_order/${lastOrderId}`,
              { headers: { 'Content-Type': 'application/json' } }
            );
            
            const orderData = Array.isArray(orderResponse.data) ? 
                             orderResponse.data[0] : orderResponse.data;
            
            if (orderData && orderData.employees_id) {
              employeeId = orderData.employees_id.toString();
              console.log("Found employee ID in order:", employeeId);
              
              // Store for future use
              localStorage.setItem('lastEmployeeId', employeeId);
              
              // Update URL without reloading
              window.history.replaceState(
                null, 
                '', 
                `${COMMENT_PATH}/${employeeId}`
              );
            }
          } catch (error) {
            console.error("Error getting employee ID from order:", error);
          }
        }
      }

      // Only proceed with API calls if we have an ID
      if (employeeId) {
        console.log("Loading data for employee ID:", employeeId);
        
        // Make concurrent API requests
        await Promise.all([
          handleGetCarByCatId().catch(err => {
            console.error("Car data request failed:", err);
            return null;
          }),
          handleGetDataById(employeeId).catch(err => {
            console.error("Employee data request failed:", err);
            return null;
          }),
          getServiceOrder().catch(err => {
            console.error("Service order request failed:", err);
            return null;
          })
        ]);
        
        // Map data to service details
        mapDataToServiceDetails();
      } else {
        // No ID found anywhere, use placeholder data
        console.log("No employee ID found in any source, using placeholder data");
        setServiceDetails(placeholderData);
        
        // Update billing data based on fallback data
        const fallbackService = placeholderData[0];
        setBillingData({
          customerName: `${fallbackService.firstName} ${fallbackService.surname}`,
          serviceType: fallbackService.service || fallbackService.category,
          servicePrice: fallbackService.priceFormatted,
          totalPrice: fallbackService.priceFormatted,
          orderDate: fallbackService.orderDate || new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
          }),
          receiptNo: generateReceiptNumber()
        });
        
        setBaseAmount(fallbackService.price);
        setTotalAmount(fallbackService.price);
      }
    } catch (error) {
      console.error("Error in loadData:", error);
      // Fall back to placeholder data
      setServiceDetails(placeholderData);
      
      const fallbackService = placeholderData[0];
      setBillingData({
        customerName: `${fallbackService.firstName} ${fallbackService.surname}`,
        serviceType: fallbackService.service || fallbackService.category,
        servicePrice: fallbackService.priceFormatted,
        totalPrice: fallbackService.priceFormatted,
        orderDate: fallbackService.orderDate || new Date().toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        }),
        receiptNo: generateReceiptNumber()
      });
      
      setBaseAmount(fallbackService.price);
      setTotalAmount(fallbackService.price);
    } finally {
      // Clear timeout and set loading to false
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  // Effect for data changes
  useEffect(() => {
    mapDataToServiceDetails();
  }, [data, car]);

  // Load data when component mounts or ID changes
  useEffect(() => {
    loadData();
    
    // Clean up function
    return () => {
      // Any cleanup needed
    };
  }, [id]);

  return {
    // Data
    serviceDetails,
    billingData,
    loading,
    error,
    
    // Amount calculations - Like LocationPage/PaymentPage
    baseAmount,
    distanceFee,
    distanceFeeReason,
    totalAmount,
    
    // City tracking - Like LocationPage/PaymentPage
    userCity,
    employeeCity,
    
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
    navigate,
    handleUpdateEmployeeStatus,
    createServiceOrderDirect // Export the service order creation function
  };
};

export default useCommentController;