// controller.ts
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Define service interface
export interface Service {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  city: string;
  occupation: string;
  category: string;
  price: number;
  avatar: string;
  rating: number;
  service: string;
  date: string;
  status: string;
  // Vehicle-specific fields
  carImage?: string;
  carId?: string;
  carBrand?: string;
  carModel?: string;
  licensePlate?: string;
  carYear?: string;
}

// Define service order interface from API
export interface ServiceOrder {
  service_order_id: number;
  user_id: number;
  employees_id: number;
  cat_id: number;
  address_users_detail_id: number;
  amount: number;
  payment_status: string;
  service_status: string;
  car_brand?: string;
  model?: string;
  license_plate?: string;
  rating?: number | null;
}

// Define employee interface from API
export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  city: string;
  occupation: string;
  category: string;
  avatar: string;
  service: string;
}

// Define city mapping interface
export interface City {
  en: string;
  lo: string;
}

const useMainController = () => {
  const API_BASE_URL = "https://homecare-pro.onrender.com";
  
  // States
  const [services, setServices] = useState<Service[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(5);
  const [showLessVisible, setShowLessVisible] = useState<boolean>(false);
  
  // City mapping data
  const cities: City[] = [
    { en: 'CHANTHABULY', lo: 'ຈັນທະບູລີ' },
    { en: 'SIKHOTTABONG', lo: 'ສີໂຄດຕະບອງ' },
    { en: 'XAYSETHA', lo: 'ໄຊເສດຖາ' },
    { en: 'SISATTANAK', lo: 'ສີສັດຕະນາກ' },
    { en: 'NAXAITHONG', lo: 'ນາຊາຍທອງ' },
    { en: 'XAYTANY', lo: 'ໄຊທານີ' },
    { en: 'HADXAIFONG', lo: 'ຫາດຊາຍຟອງ' }
  ];
  
  // Service category mapping (id to name)
  const serviceCategories = {
    1: { name: 'ທໍາຄວາມສະອາດ', icon: 'CleaningServices', engName: 'Cleaner' },
    2: { name: 'ສ້ອມແປງໄຟຟ້າ', icon: 'ElectricalServices', engName: 'Electrician' },
    3: { name: 'ສ້ອມແປງແອ', icon: 'AcUnit', engName: 'AC Technician' },
    4: { name: 'ສ້ອມແປງນ້ໍາປະປາ', icon: 'Plumbing', engName: 'Plumber' },
    5: { name: 'ແກ່ເຄື່ອງ', icon: 'LocalShipping', engName: 'Transportation' },
    6: { name: 'ດູດສ້ວມ', icon: 'Wc', engName: 'Bathroom Specialist' },
    7: { name: 'ກໍາຈັດປວກ', icon: 'PestControl', engName: 'Pest Control' }
  };
  
  // Helper function to translate city from EN to LO
  const getLoCity = (enCity: string): string => {
    const city = cities.find(c => c.en === enCity);
    return city ? city.lo : enCity;
  };
  
  // Helper function to check if a service is vehicle-based
  const isVehicleService = (categoryId: number): boolean => {
    return categoryId === 5; // Transportation service
  };
  
  // Helper function to format price with commas
  const formatPrice = (price: number): string => {
    if (typeof price !== 'number' || isNaN(price)) {
      return "ບໍ່ລະບຸ";
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ກີບ";
  };
  
  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get service description based on category ID
  const getServiceDescription = (catId: number): string => {
    switch (catId) {
      case 1: return "ທຳຄວາມສະອາດທົ່ວໄປ";
      case 2: return "ຕິດຕັ້ງອຸປະກອນໄຟຟ້າ";
      case 3: return "ສ້ອມແປງແອໃນບ້ານ";
      case 4: return "ແກ້ໄຂລະບົບນ້ຳປະປາ";
      case 5: return "ຂົນສົ່ງເຄື່ອງຫຍ້າຍບ້ານ";
      case 6: return "ດູດສ້ວມ ທຳຄວາມສະອາດຫ້ອງນ້ຳ";
      case 7: return "ກຳຈັດປວກແລະສັດຕູພືດ";
      default: return "ບໍລິການທົ່ວໄປ";
    }
  };
  
  // Get access token from localStorage
  const getAccessToken = (): string | null => {
    // Method 1: Direct access token (most common)
    let token = localStorage.getItem("accessToken");
    if (token) {
      // The token should be used with "Bearer " prefix
      return token;
    }
    
    // Method 2: Auth token object
    try {
      const authTokenStr = localStorage.getItem("authToken");
      if (authTokenStr) {
        const authToken = JSON.parse(authTokenStr);
        if (authToken && authToken.accessToken) {
          return authToken.accessToken;
        }
      }
    } catch (error) {
      console.error("Error parsing auth token:", error);
    }
    
    // Try other possible token storage formats
    token = localStorage.getItem("token") || localStorage.getItem("userToken");
    if (token) return token;
    
    return null;
  };
  
  // Get user ID from localStorage
  const getUserId = (): number | null => {
    let userId = null;
    
    // Method 1: User data object
    try {
      const userDataStr = localStorage.getItem("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        if (userData && userData.id) {
          userId = parseInt(userData.id);
        }
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    
    // Method 2: User info object
    if (!userId) {
      try {
        const userInfoStr = localStorage.getItem("userInfo");
        if (userInfoStr) {
          const userInfo = JSON.parse(userInfoStr);
          if (userInfo && userInfo.id) {
            userId = parseInt(userInfo.id);
          }
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
    
    // Method 3: Direct user ID
    if (!userId) {
      const idStr = localStorage.getItem("userId") || localStorage.getItem("user_id");
      if (idStr && !isNaN(parseInt(idStr))) {
        userId = parseInt(idStr);
      }
    }
    
    return userId;
  };
  
  // Transform API response to Service objects
  const transformServiceData = async (serviceOrders: ServiceOrder[]): Promise<Service[]> => {
    const accessToken = getAccessToken();
    
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    
    // Ensure token has Bearer prefix
    const authHeader = accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`;
    
    // Process each service order
    const transformedServices = await Promise.all(
      serviceOrders.map(async (order: any) => {
        try {
          // Handle potentially missing or undefined fields
          const serviceId = typeof order.service_order_id === 'number' ? order.service_order_id : 0;
          const userId = typeof order.user_id === 'number' ? order.user_id : 0;
          const employeeId = typeof order.employees_id === 'number' ? order.employees_id : 0;
          const categoryId = typeof order.cat_id === 'number' ? order.cat_id : 1; // Default to category 1
          const addressId = typeof order.address_users_detail_id === 'number' ? order.address_users_detail_id : 0;
          const cityCode = order.city || "XAYSETHA"; // Default city
          const amount = typeof order.amount === 'number' ? order.amount : 0;
          const paymentStatus = order.payment_status || "pending";
          const serviceStatus = order.service_status || "not start";
          const rating = typeof order.rating === 'number' ? order.rating : 0;
          
          // Fetch employee data if we have a valid employee ID
          let employeeData: Partial<Employee> = {};
          
          if (employeeId > 0) {
            try {
              const empResponse = await axios.get(
                `${API_BASE_URL}/employees/${employeeId}`,
                {
                  headers: {
                    "Accept": "application/json",
                    "Authorization": authHeader
                  }
                }
              );
              
              if (empResponse.data) {
                employeeData = empResponse.data;
              }
            } catch (error) {
              console.error(`Error fetching employee ${employeeId}:`, error);
            }
          }
          
            // Determine service category information
          const categoryInfo = serviceCategories[categoryId as keyof typeof serviceCategories] || 
                              { name: "ບໍລິການອື່ນໆ", icon: "Category", engName: "Other" };
          
          // Check if this is a vehicle service (category 5)
          const isVehicle = categoryId === 5;
          
          // Handle vehicle-specific fields
          const carBrand = order.car_brand || "";
          const carModel = order.model || "";
          const licensePlate = order.license_plate || "";
          
          // Get date or use current date as fallback
          const serviceDate = order.service_date || new Date().toISOString().split('T')[0];
          
          // Use employee data or provide defaults
          const empFirstName = employeeData.first_name || "ບໍ່ລະບຸ";
          const empLastName = employeeData.last_name || "";
          const empGender = employeeData.gender || "ຊາຍ";
          const empAddress = employeeData.address || "ບ້ານ ບໍ່ລະບຸ";
          const empCity = employeeData.city || cityCode;
          const empOccupation = employeeData.occupation || categoryInfo.engName;
          const empAvatar = employeeData.avatar || "/api/placeholder/40/40";
          const empService = employeeData.service || getServiceDescription(categoryId);
          
          // Create service object with available data and default fallbacks
          const service: Service = {
            id: serviceId,
            first_name: empFirstName,
            last_name: empLastName,
            gender: empGender,
            address: empAddress,
            city: empCity,
            occupation: empOccupation,
            category: categoryInfo.name,
            price: amount,
            avatar: empAvatar,
            rating: rating,
            service: empService,
            date: serviceDate,
            status: serviceStatus
          };
          
          // Add vehicle-specific fields if applicable
          if (isVehicle) {
            service.carImage = "/api/placeholder/400/300";
            service.carBrand = carBrand || "Toyota"; // Default brand
            service.carModel = carModel || "Hiace"; // Default model
            service.licensePlate = licensePlate || "ກຂ 0000";
            service.carId = `M${String(serviceId).padStart(3, '0')}`;
            service.carYear = "2020"; // Default year
          }
          
          return service;
        } catch (error) {
          console.error(`Error transforming service:`, error);
          
          // Return a default service object on error
          return {
            id: 0,
            first_name: "ບໍ່ລະບຸ",
            last_name: "",
            gender: "ຊາຍ",
            address: "ບ້ານ ບໍ່ລະບຸ",
            city: "XAYSETHA",
            occupation: "Other",
            category: "ບໍລິການອື່ນໆ",
            price: 0,
            avatar: "/api/placeholder/40/40",
            rating: 0,
            service: "ບໍລິການທົ່ວໄປ",
            date: new Date().toISOString().split('T')[0],
            status: "Pending"
          };
        }
      })
    );
    
    return transformedServices;
  };
  
  // Fetch service orders from API
  const fetchServiceOrders = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        throw new Error("Authentication token missing");
      }
      
      // Make the API request with the token - ensure Bearer prefix is added
      const response = await axios.get(
        `${API_BASE_URL}/service_order/get_my_service_order`,
        {
          headers: {
            "Accept": "application/json",
            "Authorization": accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`
          }
        }
      );
      
      console.log("API Response:", response.data); // Debug log
      
      // Process API response
      if (response.data) {
        // Check if the data is wrapped in a 'data' property
        const serviceData = response.data.data 
          ? (Array.isArray(response.data.data) ? response.data.data : [response.data.data])
          : (Array.isArray(response.data) ? response.data : [response.data]);
        
        if (serviceData.length > 0) {
          // Transform API data to our service format
          const transformedServices = await transformServiceData(serviceData);
          
          // Sort services by date (latest first)
          const sortedServices = transformedServices.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          
          setAllServices(sortedServices);
          // Initialize services with the first 5 (or fewer if there are less than 5)
          setServices(sortedServices.slice(0, Math.min(5, sortedServices.length)));
          // Set show less button visibility based on total count
          setShowLessVisible(false);
        } else {
          // No service data found - show alert and set empty array
          console.log("No service data found");
          setAllServices([]);
          setServices([]);
          
          Swal.fire({
            title: "ແຈ້ງເຕືອນ",
            text: "ທ່ານຍັງບໍ່ມີຂໍ້ມູນປະຫວັດການບໍລິການເທື່ອ",
            icon: "info",
            confirmButtonColor: "#611463",
            confirmButtonText: "ຕົກລົງ",
          });
        }
      } else {
        // Empty response
        console.log("Empty API response");
        setAllServices([]);
        setServices([]);
        
        Swal.fire({
          title: "ແຈ້ງເຕືອນ",
          text: "ທ່ານຍັງບໍ່ມີຂໍ້ມູນປະຫວັດການບໍລິການເທື່ອ",
          icon: "info",
          confirmButtonColor: "#611463",
          confirmButtonText: "ຕົກລົງ",
        });
      }
    } catch (error) {
      console.error("Error fetching service orders:", error);
      
      // Check if error is due to authentication
      if (axios.isAxiosError(error)) {
        // Extract error message for better debugging
        const errorResponse = error.response?.data;
        console.log("API Error Details:", errorResponse);
        
        if (error.response?.status === 401 || 
            (errorResponse && 
             (errorResponse.error === "Access denied: No token provided" || 
              errorResponse.message === "Invalid token"))) {
          setError("ກະລຸນາເຂົ້າສູ່ລະບົບອີກຄັ້ງເພື່ອເບິ່ງປະຫວັດການບໍລິການ");
          
          Swal.fire({
            title: "ເຂົ້າສູ່ລະບົບອີກຄັ້ງ",
            text: "ກະລຸນາເຂົ້າສູ່ລະບົບອີກຄັ້ງເພື່ອດຳເນີນການຕໍ່",
            icon: "warning",
            confirmButtonColor: "#611463",
            confirmButtonText: "ຕົກລົງ",
          });
        } else {
          setError("ບໍ່ສາມາດໂຫລດຂໍ້ມູນປະຫວັດການບໍລິການໄດ້");
          
          Swal.fire({
            title: "ຜິດພາດ",
            text: "ບໍ່ສາມາດໂຫລດຂໍ້ມູນປະຫວັດການບໍລິການໄດ້",
            icon: "error",
            confirmButtonColor: "#611463",
            confirmButtonText: "ຕົກລົງ",
          });
        }
      } else {
        // Other types of errors
        setError("ບໍ່ສາມາດໂຫລດຂໍ້ມູນປະຫວັດການບໍລິການໄດ້");
        setAllServices([]);
        setServices([]);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Update rating for a service
  const updateRating = async (serviceId: number, rating: number): Promise<void> => {
    try {
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        throw new Error("Authentication token missing");
      }
      
      // Ensure token has Bearer prefix
      const authHeader = accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`;
      
      // Make API call to update rating
      await axios.put(
        `${API_BASE_URL}/service_order/rating/${serviceId}`,
        { rating },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader
          }
        }
      );
      
      // Update local state for visible services
      setServices(prevServices => 
        prevServices.map(service => 
          service.id === serviceId ? { ...service, rating } : service
        )
      );
      
      // Also update in the allServices array
      setAllServices(prevAllServices => 
        prevAllServices.map(service => 
          service.id === serviceId ? { ...service, rating } : service
        )
      );
      
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "ອັບເດດຄະແນນສຳເລັດແລ້ວ",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error updating rating:", error);
      
      Swal.fire({
        title: "ຜິດພາດ",
        text: "ບໍ່ສາມາດອັບເດດຄະແນນໄດ້",
        icon: "error",
        confirmButtonColor: "#611463",
        confirmButtonText: "ຕົກລົງ",
      });
    }
  };
  
  // Show more services (pagination)
  const loadMore = (): void => {
    const newVisibleCount = visibleCount + 5;
    setVisibleCount(newVisibleCount);
    
    if (newVisibleCount > 5) {
      setShowLessVisible(true);
    }
    
    // Update services to show more
    setServices(allServices.slice(0, newVisibleCount));
    
    // If we've shown all services, inform the user
    if (newVisibleCount >= allServices.length) {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "ສະແດງຂໍ້ມູນທັງໝົດແລ້ວ",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  
  // Show fewer services
  const showLess = (): void => {
    setVisibleCount(5);
    setServices(allServices.slice(0, 5));
    setShowLessVisible(false);
  };
  
  // Check if there are more services to load
  const hasMoreToLoad = (): boolean => {
    return visibleCount < allServices.length;
  };
  
  // Load services when component mounts
  useEffect(() => {
    fetchServiceOrders();
  }, []);
  
  return {
    services,
    allServices,
    loading,
    error,
    visibleCount,
    showLessVisible,
    isVehicleService,
    formatPrice,
    formatDate,
    getLoCity,
    fetchServiceOrders,
    updateRating,
    loadMore,
    showLess,
    hasMoreToLoad
  };
};

export default useMainController;