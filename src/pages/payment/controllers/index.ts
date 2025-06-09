// Enhanced useMainController.tsx for PaymentPage with distance fee calculation and Lao translations
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import { CarModel } from "../../../models/car";
import axios from "axios";
import { Gender } from "../../../enums/gender";
import { SERVICE_STATUS_PATH } from "../../../routes/path";
import { AlertColor } from "@mui/material/Alert";
import { useSelector } from "react-redux";

// Interface for location data format with Lao translations
export interface Location {
  id: string;
  firstName: string;
  surname: string;
  image: string;
  category: string;
  categoryLao: string;
  gender: string;
  genderLao: string;
  age: number;
  village: string;
  city: string;
  cityLao: string;
  price: number;
  priceFormatted: string;
  service?: string;
  serviceLao?: string;
  cat_id?: number;
  // Car details
  carId?: string;
  carBrand?: string;
  carModel?: string;
  carYear?: string;
  licensePlate?: string;
  carImage?: string;
}

// City definitions with English and Lao names
const CITIES = [
  { en: 'CHANTHABULY', lo: 'ຈັນທະບູລີ', value: 'chanthabouly' },
  { en: 'SIKHOTTABONG', lo: 'ສີໂຄດຕະບອງ', value: 'sikhottabong' },
  { en: 'XAYSETHA', lo: 'ໄຊເສດຖາ', value: 'xaysetha' },
  { en: 'SISATTANAK', lo: 'ສີສັດຕະນາກ', value: 'sisattanak' },
  { en: 'NAXAITHONG', lo: 'ນາຊາຍທອງ', value: 'naxaithong' },
  { en: 'XAYTANY', lo: 'ໄຊທານີ', value: 'xaytany' },
  { en: 'HADXAIFONG', lo: 'ຫາດຊາຍຟອງ', value: 'hadxaifong' }
];

// Translation mappings - English to Lao
const categoryTranslation: Record<string, string> = {
  'cleaning': 'ທຳຄວາມສະອາດ',
  'electrical': 'ສ້ອມແປງໄຟຟ້າ',
  'aircon': 'ສ້ອມແປງແອອາກາດ',
  'air conditioning': 'ສ້ອມແປງແອອາກາດ',
  'plumbing': 'ສ້ອມແປງປະປາ',
  'moving': 'ແກ່ເຄື່ອງ',
  'transportation': 'ແກ່ເຄື່ອງ',
  'relocation': 'ແກ່ເຄື່ອງ',
  'bathroom': 'ດູດສ້ວມ',
  'toilet': 'ດູດສ້ວມ',
  'septic': 'ດູດສ້ວມ',
  'pest': 'ກຳຈັດປວກ',
  'pest control': 'ກຳຈັດປວກ',
  'extermination': 'ກຳຈັດປວກ',
  'house cleaning': 'ທຳຄວາມສະອາດ',
  'home cleaning': 'ທຳຄວາມສະອາດ',
  'electrical repair': 'ສ້ອມແປງໄຟຟ້າ',
  'electrical service': 'ສ້ອມແປງໄຟຟ້າ',
  'air conditioner repair': 'ສ້ອມແປງແອອາກາດ',
  'ac repair': 'ສ້ອມແປງແອອາກາດ',
  'plumbing repair': 'ສ້ອມແປງປະປາ',
  'water pipe repair': 'ສ້ອມແປງປະປາ',
  'moving service': 'ແກ່ເຄື່ອງ',
  'delivery': 'ແກ່ເຄື່ອງ',
  'septic cleaning': 'ດູດສ້ວມ',
  'sewage cleaning': 'ດູດສ້ວມ',
  'other': 'ອື່ນໆ',
  'general': 'ທົ່ວໄປ'
};

// Gender translation mapping - English to Lao
const genderTranslation: Record<string, string> = {
  'male': 'ຊາຍ',
  'female': 'ຍິງ',
  'man': 'ຊາຍ',
  'woman': 'ຍິງ',
  'men': 'ຊາຍ',
  'women': 'ຍິງ',
  'boy': 'ຊາຍ',
  'girl': 'ຍິງ',
  'm': 'ຊາຍ',
  'f': 'ຍິງ',
  'other': 'ອື່ນໆ',
  'unknown': 'ບໍ່ລະບຸ'
};

// City translation mapping - English to Lao (Vientiane Districts)
const cityTranslation: Record<string, string> = {
  'chanthabuly': 'ຈັນທະບູລີ',
  'chanthabouly': 'ຈັນທະບູລີ',
  'sikhottabong': 'ສີໂຄດຕະບອງ',
  'xaysetha': 'ໄຊເສດຖາ',
  'sisattanak': 'ສີສັດຕະນາກ',
  'naxaithong': 'ນາຊາຍທອງ',
  'xaytany': 'ໄຊທານີ',
  'hadxaifong': 'ຫາດຊາຍຟອງ',
  'vientiane': 'ວຽງຈັນ',
  'vientiane capital': 'ນະຄອນຫຼວງວຽງຈັນ'
};

// Translation functions
const translateCategoryToLao = (englishCategory: string): string => {
  if (!englishCategory) return 'ອື່ນໆ';
  
  const normalizedCategory = englishCategory.toLowerCase().trim();
  
  if (categoryTranslation[normalizedCategory]) {
    return categoryTranslation[normalizedCategory];
  }
  
  for (const [key, value] of Object.entries(categoryTranslation)) {
    if (normalizedCategory.includes(key) || key.includes(normalizedCategory)) {
      return value;
    }
  }
  
  return englishCategory || 'ອື່ນໆ';
};

const translateGenderToLao = (englishGender: string): string => {
  if (!englishGender) return 'ບໍ່ລະບຸ';
  
  const normalizedGender = englishGender.toLowerCase().trim();
  
  if (genderTranslation[normalizedGender]) {
    return genderTranslation[normalizedGender];
  }
  
  for (const [key, value] of Object.entries(genderTranslation)) {
    if (normalizedGender.includes(key) || key.includes(normalizedGender)) {
      return value;
    }
  }
  
  return englishGender || 'ບໍ່ລະບຸ';
};

const translateCityToLao = (englishCity: string): string => {
  if (!englishCity) return 'ວຽງຈັນ';
  
  const normalizedCity = englishCity.toLowerCase().trim();
  
  if (cityTranslation[normalizedCity]) {
    return cityTranslation[normalizedCity];
  }
  
  for (const [key, value] of Object.entries(cityTranslation)) {
    if (normalizedCity.includes(key) || key.includes(normalizedCity)) {
      return value;
    }
  }
  
  return englishCity || 'ວຽງຈັນ';
};

// Helper function to normalize city names
const normalizeCityName = (cityName: string): string => {
  if (!cityName) return '';
  
  let normalized = cityName.toLowerCase().replace(/\s+/g, '');
  
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

// Distance fee calculation function
const calculateDistanceFee = (employeeCity: string, userCity: string): { fee: number; reason: string } => {
  if (!employeeCity || !userCity) {
    return { fee: 0, reason: 'ບໍ່ສາມາດກຳນົດທີ່ຕັ້ງໄດ້' };
  }

  const empCity = normalizeCityName(employeeCity);
  const usrCity = normalizeCityName(userCity);

  if (empCity === usrCity) {
    return { fee: 8000, reason: 'ທີ່ຕັ້ງດຽວກັນ - ຄ່າບໍລິການພື້ນຖານ' };
  }

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

// Placeholder data with Lao translations
export const placeholderData: Location[] = [
  {
    id: "placeholder",
    firstName: "ແມ່ບ້ານ",
    surname: "ບໍລິການ",
    image: "https://via.placeholder.com/40",
    category: "Cleaning",
    categoryLao: "ທຳຄວາມສະອາດ",
    gender: "Female",
    genderLao: "ຍິງ",
    age: 21,
    village: "ບ້ານ ໂນນສະຫວ່າງ",
    city: "Vientiane",
    cityLao: "ວຽງຈັນ",
    price: 250000,
    priceFormatted: "250,000 ກິບ",
    service: "Cleaning",
    serviceLao: "ທຳຄວາມສະອາດ",
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
  
  // Amount calculations
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [distanceFee, setDistanceFee] = useState<number>(0);
  const [distanceFeeReason, setDistanceFeeReason] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  
  // City tracking
  const [userCity, setUserCity] = useState<string>("");
  const [employeeCity, setEmployeeCity] = useState<string>("");
  
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
      const res = await axios.get(`https://homecare-pro.onrender.com/employees/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setData(Array.isArray(res.data) ? res.data : [res.data]);
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
      setCar(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  // Format price with commas
  const formatCurrency = (value: number | string): string => {
    const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ກີບ";
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
    }
  };

  // Get selected location from localStorage
  const getSelectedLocationId = () => {
    try {
      const selectedLocationStr = localStorage.getItem('selectedLocation');
      
      if (!selectedLocationStr) {
        console.error("No selected location found in localStorage");
        return null;
      }
      
      const selectedLocation = JSON.parse(selectedLocationStr);
      return selectedLocation.id;
    } catch (error) {
      console.error("Error retrieving selected location ID:", error);
      return null;
    }
  };

  // Send WhatsApp notification and create service order
  const sendWhatsAppNotification = async (): Promise<any> => {
    try {
      const locationId = getSelectedLocationId();
      const employeePhone = data[0]?.tel;
      
      if (!employeePhone) {
        console.error("Missing employee phone number for WhatsApp notification");
        throw new Error("Employee phone number not found");
      }
      
      const whatsappPayload = {
        to: employeePhone
      };
      
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
      return response.data;
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
      throw error;
    }
  };

  // Handle payment submission
  const handlePaymentSubmit = async (): Promise<void> => {
    const enteredAmount = parseInt(paymentAmount) || 0;

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

    if (!authUser) {
      setAlertMessage("ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນດຳເນີນການຊຳລະເງິນ");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    setSuccessDialogOpen(true);

    try {
      const employeeId = locations[0]?.id;
      
      if (!employeeId) {
        throw new Error("Employee ID not found");
      }
      
      playPaymentSuccessSound();
      
      const orderResponse = await sendWhatsAppNotification();
      const serviceOrderId = orderResponse?.service_order?.id;
      
      if (employeeId) {
        await handleUpdateEmployeeStatus(employeeId);
      }
      
      if (serviceOrderId) {
        localStorage.setItem('lastOrderId', serviceOrderId.toString());
      }
      
      localStorage.setItem('totalAmountWithDistanceFee', totalAmount.toString());
      localStorage.setItem('distanceFee', distanceFee.toString());
      localStorage.setItem('baseAmount', baseAmount.toString());
      
      setTimeout(() => {
        setSuccessDialogOpen(false);
        navigate(`/service-status/${id}`);
      }, 3000);
    } catch (error) {
      setSuccessDialogOpen(false);
      
      console.error("Error processing payment:", error);
      
      if (error.message?.includes("WhatsApp")) {
        try {
          setAlertMessage("ບໍ່ສາມາດສົ່ງແຈ້ງເຕືອນ WhatsApp ໄດ້, ກຳລັງສ້າງການບໍລິການໂດຍກົງ...");
          setAlertSeverity("warning");
          setAlertOpen(true);
          
          const employeeId = locations[0]?.id;
          const categoryId = locations[0]?.cat_id;
          const userId = authUser.id;
          const addressId = localStorage.getItem('selectedAddressId') || "7";
          
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
          
          if (employeeId) {
            await handleUpdateEmployeeStatus(employeeId);
          }
          
          if (response.data?.id) {
            localStorage.setItem('lastOrderId', response.data.id.toString());
          }
          localStorage.setItem('totalAmountWithDistanceFee', totalAmount.toString());
          localStorage.setItem('distanceFee', distanceFee.toString());
          localStorage.setItem('baseAmount', baseAmount.toString());
          
          setTimeout(() => {
            navigate(`/service-status/${id}`);
          }, 2000);
          
          return;
        } catch (fallbackError) {
          console.error("Error in fallback order creation:", fallbackError);
        }
      }
      
      setAlertMessage("ເກີດຂໍ້ຜິດພາດໃນການສ້າງຄຳສັ່ງ. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  // Map employee data to location format with translations
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
            return isNaN(numPrice) ? "0 ກີບ" : numPrice.toLocaleString() + " ກີບ";
          } catch(e) {
            console.error("Error formatting price:", e);
            return "0 ກິບ";
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

        // Translate gender, category, and city to Lao
        const genderLao = translateGenderToLao(employee.gender || "");
        const categoryLao = translateCategoryToLao(employee.cat_name || "");
        const cityLao = translateCityToLao(employee.city || "");

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

        // Initialize location object with translations
        const locationObject: Location = {
          id: employee.id || "unknown",
          firstName: employee.first_name || "Unknown",
          surname: employee.last_name || "",
          image: employee.avatar || "https://via.placeholder.com/40",
          category: employee.cat_name || "ບໍລິການ",
          categoryLao: categoryLao,
          gender: employee.gender || "ບໍ່ລະບຸ",
          genderLao: genderLao,
          age: calculateAge(),
          village: village,
          city: employee.city || "ວຽງຈັນ",
          cityLao: cityLao,
          price: parseFloat(employee.price || "0"),
          priceFormatted: formatPrice(employee.price),
          service: employee.cat_name || "ບໍລິການ",
          serviceLao: categoryLao,
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
      
      // Auto-set employee city from first location data
      if (mappedLocations.length > 0 && mappedLocations[0].city) {
        const normalizedEmployeeCity = normalizeCityName(mappedLocations[0].city);
        setEmployeeCity(normalizedEmployeeCity);
      }
    } else if (error) {
      console.log("Using placeholder data due to error:", error);
      setLocations(placeholderData);
    } else if (!loading && (!data || data.length === 0)) {
      console.log("No data returned, using placeholder data");
      setLocations(placeholderData);
    }
  }, [data, error, loading, car]);

  // Auto-get user city from localStorage
  useEffect(() => {
    const savedUserCity = localStorage.getItem('addressCity');
    if (savedUserCity) {
      const normalizedUserCity = normalizeCityName(savedUserCity);
      setUserCity(normalizedUserCity);
    }
  }, []);

  // Calculate base amount whenever locations change
  useEffect(() => {
    const base = locations.reduce((sum, item) => sum + item.price, 0);
    setBaseAmount(base);
  }, [locations]);

  // Auto-calculate distance fee when cities are available
  useEffect(() => {
    if (employeeCity && userCity) {
      const result = calculateDistanceFee(employeeCity, userCity);
      setDistanceFee(result.fee);
      setDistanceFeeReason(result.reason);
    } else {
      setDistanceFee(0);
      setDistanceFeeReason('ກຳລັງກຳນົດທີ່ຕັ້ງ...');
    }
  }, [employeeCity, userCity]);

  // Calculate total amount
  useEffect(() => {
    setTotalAmount(baseAmount + distanceFee);
  }, [baseAmount, distanceFee]);

  // Set initial payment amount to match total when total changes
  useEffect(() => {
    if (totalAmount > 0) {
      setPaymentAmount(totalAmount.toString());
      setPaymentState("valid");
    }
  }, [totalAmount]);

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
    
    // Amount calculations
    baseAmount,
    distanceFee,
    distanceFeeReason,
    totalAmount,
    
    // City tracking
    userCity,
    employeeCity,
    
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
    id,
    
    // Export translation functions
    translateCategoryToLao,
    translateGenderToLao,
    translateCityToLao
  };
};

export default useMainController;