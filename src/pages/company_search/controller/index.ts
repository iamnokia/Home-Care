// FIXED controller.ts - Enhanced version with proper duplicate prevention
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Define service interface (same as before)
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
  // CRITICAL: Add service order ID for proper tracking
  serviceOrderId?: number;
  employeeId?: number;
}

// Define service order interface from API (same as before)
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
  created_at?: string;
  updated_at?: string;
  service_date?: string;
}

// Define employee interface from API (same as before)
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

// Define city mapping interface (same as before)
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
  
  // CRITICAL: Enhanced blocking of unwanted employees/orders
  const BLOCKED_EMPLOYEES = [
    'ສົມສີ', 'ດດວງສົມພົງ', 'ສົມສີ ດດວງສົມພົງ',
    'som si', 'duang som phong', 'somsi duangsomphong',
    'ສົມພົງ', 'som phong', 'somphong' // Added ສົມພົງ to blocked list
  ];
  
  // ENHANCED: More strict employee blocking
  const isBlockedEmployee = (firstName: string, lastName: string, employeeId?: number): boolean => {
    const fullName = `${firstName} ${lastName}`.toLowerCase().trim();
    const firstNameLower = firstName.toLowerCase().trim();
    const lastNameLower = lastName.toLowerCase().trim();
    
    // Check against blocked names
    const isNameBlocked = BLOCKED_EMPLOYEES.some(blocked => {
      const blockedLower = blocked.toLowerCase().trim();
      return fullName.includes(blockedLower) || 
             firstNameLower.includes(blockedLower) ||
             lastNameLower.includes(blockedLower) ||
             blockedLower.includes(firstNameLower) ||
             blockedLower.includes(lastNameLower);
    });
    
    // CRITICAL: Also block specific employee IDs if known
    const blockedEmployeeIds = [/* Add specific employee IDs to block if needed */];
    const isIdBlocked = employeeId && blockedEmployeeIds.includes(employeeId);
    
    if (isNameBlocked || isIdBlocked) {
      console.warn(`🚫 Blocked employee: ${firstName} ${lastName} (ID: ${employeeId})`);
      return true;
    }
    
    return false;
  };

  // CRITICAL: Enhanced deduplication with multiple criteria
  const deduplicateServices = (services: Service[]): Service[] => {
    console.log(`🔄 Starting enhanced deduplication with ${services.length} services`);
    
    // Sort by date to ensure latest is processed first
    const sortedByDate = services.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Latest first
    });
    
    // ENHANCED: Use multiple criteria for deduplication
    const seenCombinations = new Set<string>();
    const uniqueServices: Service[] = [];
    
    for (const service of sortedByDate) {
      // Create a unique key based on multiple criteria
      const uniqueKey = `${service.serviceOrderId || service.id}_${service.employeeId || 'unknown'}_${service.first_name}_${service.last_name}`;
      
      // CRITICAL: Check if employee is blocked
      if (isBlockedEmployee(service.first_name, service.last_name, service.employeeId)) {
        console.log(`🚫 Skipping blocked employee: ${service.first_name} ${service.last_name}`);
        continue;
      }
      
      // Check if this combination has been seen before
      if (!seenCombinations.has(uniqueKey)) {
        seenCombinations.add(uniqueKey);
        uniqueServices.push(service);
        console.log(`✅ Added unique service: ${service.first_name} ${service.last_name} (Key: ${uniqueKey})`);
      } else {
        console.log(`🔄 Duplicate service skipped: ${service.first_name} ${service.last_name} (Key: ${uniqueKey})`);
      }
    }
    
    console.log(`✅ Enhanced deduplication complete: ${services.length} -> ${uniqueServices.length} services`);
    return uniqueServices;
  };

  // ENHANCED: Stricter service order validation
  const validateServiceOrder = (order: any, currentUserId: number): boolean => {
    // CRITICAL: Strict user ID validation
    const orderUserId = parseInt(order.user_id);
    const currentUserIdInt = parseInt(currentUserId.toString());
    
    console.log(`🔍 Validating Order ${order.service_order_id}: Order User ID = ${orderUserId}, Current User ID = ${currentUserIdInt}`);
    
    // Check user ownership
    if (!order.user_id || isNaN(orderUserId) || orderUserId !== currentUserIdInt) {
      console.warn(`❌ Order ${order.service_order_id} REJECTED: Wrong user. Order belongs to user ${orderUserId}, current user is ${currentUserIdInt}`);
      return false;
    }
    
    // Check if order has valid ID
    if (!order.service_order_id || order.service_order_id <= 0) {
      console.warn(`❌ Order rejected: invalid ID ${order.service_order_id}`);
      return false;
    }
    
    // Check if order has valid employee ID
    if (!order.employees_id || order.employees_id <= 0) {
      console.warn(`❌ Order ${order.service_order_id} rejected: invalid employee ID ${order.employees_id}`);
      return false;
    }
    
    // CRITICAL: Check if employee is blocked
    if (order.employee_first_name && order.employee_last_name) {
      if (isBlockedEmployee(order.employee_first_name, order.employee_last_name, order.employees_id)) {
        console.warn(`❌ Order ${order.service_order_id} rejected: blocked employee ${order.employee_first_name} ${order.employee_last_name}`);
        return false;
      }
    }
    
    // Additional validation: check for reasonable data
    if (!order.amount || order.amount < 0) {
      console.warn(`❌ Order ${order.service_order_id} rejected: invalid amount ${order.amount}`);
      return false;
    }
    
    // ENHANCED: Check if this is a recent order (within last 30 days) to avoid old duplicates
    if (order.created_at) {
      const orderDate = new Date(order.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      if (orderDate < thirtyDaysAgo) {
        console.warn(`❌ Order ${order.service_order_id} rejected: too old (${orderDate.toDateString()})`);
        return false;
      }
    }
    
    console.log(`✅ Order ${order.service_order_id} validated successfully for user ${currentUserIdInt}`);
    return true;
  };

  // ENHANCED: Transform API response with better validation and blocking
  const transformServiceData = async (serviceOrders: ServiceOrder[]): Promise<Service[]> => {
    const accessToken = getAccessToken();
    const currentUserId = getUserId();
    
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    
    if (!currentUserId) {
      throw new Error("User ID not found");
    }
    
    // Ensure token has Bearer prefix
    const authHeader = accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`;
    
    // ENHANCED: Filter and validate orders with stricter criteria
    const validOrders = serviceOrders.filter(order => {
      const isValid = validateServiceOrder(order, currentUserId);
      if (!isValid) {
        console.log(`Filtering out invalid order: ${order.service_order_id}`);
      }
      return isValid;
    });
    
    console.log(`Processing ${validOrders.length} valid orders out of ${serviceOrders.length} total orders`);
    
    // CRITICAL: Remove duplicates based on service_order_id BEFORE processing
    const uniqueValidOrders = validOrders.filter((order, index, self) => {
      const firstIndex = self.findIndex(o => o.service_order_id === order.service_order_id);
      if (firstIndex !== index) {
        console.log(`🔄 Removing duplicate order ID ${order.service_order_id} at index ${index}`);
        return false;
      }
      return true;
    });
    
    console.log(`After removing duplicate order IDs: ${uniqueValidOrders.length} orders`);
    
    // Process each unique valid service order
    const transformedServices = await Promise.all(
      uniqueValidOrders.map(async (order: any) => {
        try {
          // Handle potentially missing or undefined fields with better defaults
          const serviceOrderId = parseInt(order.service_order_id) || 0;
          const employeeId = parseInt(order.employees_id) || 0;
          const categoryId = parseInt(order.cat_id) || 1;
          const cityCode = order.city || "XAYSETHA";
          const amount = parseFloat(order.amount) || 0;
          const serviceStatus = order.service_status || "not start";
          const rating = order.rating ? parseInt(order.rating) : 0;
          
          // Date handling (same as before)
          let serviceDate = "";
          let actualCreatedAt = "";
          
          if (order.created_at && order.created_at.trim() !== '') {
            actualCreatedAt = order.created_at.trim();
            serviceDate = actualCreatedAt;
          } else if (order.service_date && order.service_date.trim() !== '') {
            actualCreatedAt = order.service_date.trim();
            serviceDate = actualCreatedAt;
          } else if (order.updated_at && order.updated_at.trim() !== '') {
            actualCreatedAt = order.updated_at.trim();
            serviceDate = actualCreatedAt;
          } else {
            console.warn(`⚠️ No valid date found for order ${serviceOrderId}, using current time`);
            actualCreatedAt = new Date().toISOString();
            serviceDate = actualCreatedAt;
          }
          
          serviceDate = validateAndCorrectDate(serviceDate, serviceOrderId);
          console.log(`📅 Order ${serviceOrderId} final corrected date: ${serviceDate}`);
          
          // Fetch employee data with enhanced validation
          let employeeData: Partial<Employee> = {};
          let isValidEmployee = false;
          
          if (employeeId > 0) {
            try {
              const empResponse = await axios.get(
                `${API_BASE_URL}/employees/${employeeId}`,
                {
                  headers: {
                    "Accept": "application/json",
                    "Authorization": authHeader
                  },
                  timeout: 10000
                }
              );
              
              if (empResponse.data && empResponse.status === 200) {
                // CRITICAL: Check if employee is blocked before using data
                const empFirstName = empResponse.data.first_name || "";
                const empLastName = empResponse.data.last_name || "";
                
                if (isBlockedEmployee(empFirstName, empLastName, employeeId)) {
                  console.warn(`🚫 Skipping blocked employee in order ${serviceOrderId}: ${empFirstName} ${empLastName}`);
                  return null; // Return null to filter out this service
                }
                
                isValidEmployee = validateEmployeeForOrder(empResponse.data, serviceOrderId, employeeId);
                if (isValidEmployee) {
                  employeeData = empResponse.data;
                } else {
                  console.error(`❌ Order ${serviceOrderId}: Using fallback employee data due to validation failure`);
                }
              }
            } catch (error) {
              console.error(`❌ Error fetching employee ${employeeId} for order ${serviceOrderId}:`, error);
              return null; // Skip this service if we can't get employee data
            }
          }
          
          // Determine service category information (same as before)
          const categoryInfo = serviceCategories[categoryId as keyof typeof serviceCategories] || 
                              { name: "ບໍລິການອື່ນໆ", icon: "Category", engName: "Other" };
          
          const isVehicle = categoryId === 5;
          
          // Handle vehicle-specific fields
          const carBrand = order.car_brand && order.car_brand.trim() !== '' ? order.car_brand : "";
          const carModel = order.model && order.model.trim() !== '' ? order.model : "";
          const licensePlate = order.license_plate && order.license_plate.trim() !== '' ? order.license_plate : "";
          
          // Use employee data with proper fallbacks and gender translation
          const empFirstName = employeeData.first_name || "ບໍ່ລະບຸ";
          const empLastName = employeeData.last_name || "";
          const empGender = translateGender(employeeData.gender || "");
          const empAddress = employeeData.address || "ບ້ານ ບໍ່ລະບຸ";
          const empCity = employeeData.city || cityCode;
          const empOccupation = employeeData.occupation || categoryInfo.engName;
          const empService = employeeData.service || getServiceDescription(categoryId);
          
          // Enhanced avatar handling
          let empAvatar = "/api/placeholder/40/40";
          if (employeeData.avatar && employeeData.avatar.trim() !== '') {
            empAvatar = employeeData.avatar;
          }
          
          // CRITICAL: Create service object with enhanced tracking
          const service: Service = {
            id: serviceOrderId, // Use service order ID as primary ID
            serviceOrderId: serviceOrderId, // Track service order ID separately
            employeeId: employeeId, // Track employee ID separately
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
            service.carBrand = carBrand || "Toyota";
            service.carModel = carModel || "Hiace";
            service.licensePlate = licensePlate || "ກຂ 0000";
            service.carId = `M${String(serviceOrderId).padStart(3, '0')}`;
            service.carYear = "2020";
          }
          
          return service;
        } catch (error) {
          console.error(`Error transforming service order ${order.service_order_id}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null results and return valid services
    const validServices = transformedServices.filter((service): service is Service => service !== null);
    
    console.log(`✅ Final valid services after blocking and validation: ${validServices.length}`);
    return validServices;
  };

  // ENHANCED: Fetch service orders with better error handling and duplicate prevention
  const fetchServiceOrders = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const accessToken = getAccessToken();
      const currentUserId = getUserId();
      
      if (!accessToken) {
        throw new Error("Authentication token missing. Please log in again.");
      }
      
      if (!currentUserId) {
        throw new Error("User ID not found. Please log in again.");
      }
      
      console.log(`🔍 Fetching service orders for user ID: ${currentUserId}`);
      
      // CRITICAL: Try user-specific endpoint first to avoid cross-user contamination
      let response;
      try {
        response = await axios.get(
          `${API_BASE_URL}/service_order/user/${currentUserId}`,
          {
            headers: {
              "Accept": "application/json",
              "Authorization": accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            timeout: 15000,
            params: {
              user_id: currentUserId,
              limit: 50, // Limit to prevent too much data
              order_by: 'created_at',
              order_direction: 'DESC'
            }
          }
        );
        console.log(`✅ Successfully used user-specific endpoint`);
      } catch (userEndpointError) {
        console.log(`⚠️ User-specific endpoint failed, trying general endpoint`);
        response = await axios.get(
          `${API_BASE_URL}/service_order/get_my_service_order`,
          {
            headers: {
              "Accept": "application/json",
              "Authorization": accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`,
              "Content-Type": "application/json"
            },
            timeout: 15000
          }
        );
      }
      
      console.log("API Response:", response.data);
      
      if (response.data && response.status === 200) {
        let serviceData: any[] = [];
        
        // Handle different response structures
        if (Array.isArray(response.data)) {
          serviceData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          serviceData = response.data.data;
        } else if (response.data.orders && Array.isArray(response.data.orders)) {
          serviceData = response.data.orders;
        } else if (response.data.data) {
          serviceData = [response.data.data];
        } else {
          serviceData = [response.data];
        }
        
        console.log(`Raw service data count: ${serviceData.length}`);
        
        // ENHANCED: Additional pre-filtering to prevent duplicates
        const preFilteredData = serviceData.filter((item, index, self) => {
          // Remove duplicates based on service_order_id
          const firstIndex = self.findIndex(i => i.service_order_id === item.service_order_id);
          if (firstIndex !== index) {
            console.log(`🔄 Pre-filtering duplicate service_order_id: ${item.service_order_id}`);
            return false;
          }
          
          // Basic validation
          return item && 
                 typeof item === 'object' && 
                 item.service_order_id && 
                 item.user_id && 
                 parseInt(item.user_id) === currentUserId;
        });
        
        console.log(`Pre-filtered service data count: ${preFilteredData.length}`);
        
        if (preFilteredData.length > 0) {
          // Transform API data to our service format
          const transformedServices = await transformServiceData(preFilteredData);
          
          console.log(`Transformed services count: ${transformedServices.length}`);
          
          // ENHANCED: Apply deduplication with multiple criteria
          const uniqueServices = deduplicateServices(transformedServices);
          
          console.log(`Unique services after enhanced deduplication: ${uniqueServices.length}`);
          
          // Sort services by date (latest first)
          const sortedServices = uniqueServices.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            
            if (isNaN(dateA) && isNaN(dateB)) return 0;
            if (isNaN(dateA)) return 1;
            if (isNaN(dateB)) return -1;
            
            return dateB - dateA;
          });
          
          setAllServices(sortedServices);
          setServices(sortedServices.slice(0, Math.min(5, sortedServices.length)));
          setShowLessVisible(false);
          setVisibleCount(Math.min(5, sortedServices.length));
          
          // Show success message
          if (sortedServices.length > 0) {
            console.log(`✅ Successfully loaded ${sortedServices.length} unique services`);
          }
        } else {
          console.log("No valid service data found for current user");
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
        console.log("Invalid API response structure");
        setAllServices([]);
        setServices([]);
        setError("ບໍ່ສາມາດໂຫລດຂໍ້ມູນປະຫວັດການບໍລິການໄດ້");
      }
    } catch (error) {
      console.error("Error fetching service orders:", error);
      
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data;
        console.log("API Error Details:", errorResponse);
        
        if (error.response?.status === 401 || error.response?.status === 403) {
          setError("ກະລຸນາເຂົ້າສູ່ລະບົບອີກຄັ້ງເພື່ອເບິ່ງປະຫວັດການບໍລິການ");
          
          Swal.fire({
            title: "ເຂົ້າສູ່ລະບົບອີກຄັ້ງ",
            text: "ກະລຸນາເຂົ້າສູ່ລະບົບອີກຄັ້ງເພື່ອດຳເນີນການຕໍ່",
            icon: "warning",
            confirmButtonColor: "#611463",
            confirmButtonText: "ຕົກລົງ",
          });
        } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          setError("ການເຊື່ອມຕໍ່ໃຊ້ເວລາເກີນກຳນົດ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ");
        } else {
          setError("ບໍ່ສາມາດໂຫລດຂໍ້ມູນປະຫວັດການບໍລິການໄດ້");
        }
      } else {
        setError("ເກີດຂໍ້ຜິດພາດທີ່ບໍ່ຄາດຄິດ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ");
      }
      
      setAllServices([]);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // [Include all other helper functions from the original code - cities, serviceCategories, etc.]
  const cities: City[] = [
    { en: 'CHANTHABULY', lo: 'ຈັນທະບູລີ' },
    { en: 'SIKHOTTABONG', lo: 'ສີໂຄດຕະບອງ' },
    { en: 'XAYSETHA', lo: 'ໄຊເສດຖາ' },
    { en: 'SISATTANAK', lo: 'ສີສັດຕະນາກ' },
    { en: 'NAXAITHONG', lo: 'ນາຊາຍທອງ' },
    { en: 'XAYTANY', lo: 'ໄຊທານີ' },
    { en: 'HADXAIFONG', lo: 'ຫາດຊາຍຟອງ' }
  ];
  
  const serviceCategories = {
    1: { name: 'ທໍາຄວາມສະອາດ', icon: 'CleaningServices', engName: 'Cleaner' },
    2: { name: 'ສ້ອມແປງໄຟຟ້າ', icon: 'ElectricalServices', engName: 'Electrician' },
    3: { name: 'ສ້ອມແປງແອ', icon: 'AcUnit', engName: 'AC Technician' },
    4: { name: 'ສ້ອມແປງນ້ໍາປະປາ', icon: 'Plumbing', engName: 'Plumber' },
    5: { name: 'ແກ່ເຄື່ອງ', icon: 'LocalShipping', engName: 'Transportation' },
    6: { name: 'ດູດສ້ວມ', icon: 'Wc', engName: 'Bathroom Specialist' },
    7: { name: 'ກໍາຈັດປວກ', icon: 'PestControl', engName: 'Pest Control' }
  };
  
  const genderTranslation = {
    'male': 'ຊາຍ',
    'female': 'ຍິງ',
    'other': 'ອື່ນໆ',
    'Male': 'ຊາຍ',
    'Female': 'ຍິງ',
    'MALE': 'ຊາຍ',
    'FEMALE': 'ຍິງ',
    'man': 'ຊາຍ',
    'woman': 'ຍິງ'
  };
  
  const translateGender = (gender: string): string => {
    if (!gender) return 'ບໍ່ລະບຸ';
    return genderTranslation[gender as keyof typeof genderTranslation] || 'ບໍ່ລະບຸ';
  };
  
  const getLoCity = (enCity: string): string => {
    const city = cities.find(c => c.en === enCity);
    return city ? city.lo : enCity;
  };
  
  const isVehicleService = (categoryId: number): boolean => {
    return categoryId === 5;
  };
  
  const formatPrice = (price: number): string => {
    if (typeof price !== 'number' || isNaN(price)) {
      return "ບໍ່ລະບຸ";
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ກີບ";
  };
  
  const formatDate = (dateString: string): string => {
    if (!dateString) return "ບໍ່ລະບຸ";
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return "ບໍ່ລະບຸ";
      }
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        timeZone: 'Asia/Vientiane'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "ບໍ່ລະບຸ";
    }
  };
  
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
  
  const getAccessToken = (): string | null => {
    try {
      let token = localStorage.getItem("accessToken");
      if (token && token.trim() !== '') {
        return token;
      }
      
      const authTokenStr = localStorage.getItem("authToken");
      if (authTokenStr) {
        const authToken = JSON.parse(authTokenStr);
        if (authToken && authToken.accessToken) {
          return authToken.accessToken;
        }
      }
      
      const userDataStr = localStorage.getItem("userData");
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        if (userData && userData.token) {
          return userData.token;
        }
      }
      
      token = localStorage.getItem("token") || localStorage.getItem("userToken");
      if (token && token.trim() !== '') return token;
      
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  };
  
  const getUserId = (): number | null => {
    try {
      let userId = null;
      let source = "";
      
      const userDataStr = localStorage.getItem("userData");
      if (userDataStr && userDataStr.trim() !== '') {
        const userData = JSON.parse(userDataStr);
        if (userData && userData.id) {
          userId = parseInt(userData.id);
          source = "userData";
        }
      }
      
      if (!userId) {
        const userInfoStr = localStorage.getItem("userInfo");
        if (userInfoStr && userInfoStr.trim() !== '') {
          const userInfo = JSON.parse(userInfoStr);
          if (userInfo && userInfo.id) {
            userId = parseInt(userInfo.id);
            source = "userInfo";
          }
        }
      }
      
      if (!userId) {
        const idStr = localStorage.getItem("userId") || localStorage.getItem("user_id");
        if (idStr && idStr.trim() !== '' && !isNaN(parseInt(idStr))) {
          userId = parseInt(idStr);
          source = "direct userId";
        }
      }
      
      if (!userId) {
        const authTokenStr = localStorage.getItem("authToken");
        if (authTokenStr && authTokenStr.trim() !== '') {
          const authToken = JSON.parse(authTokenStr);
          if (authToken && authToken.user && authToken.user.id) {
            userId = parseInt(authToken.user.id);
            source = "authToken";
          }
        }
      }
      
      console.log(`🆔 User ID found: ${userId} (source: ${source})`);
      
      if (!userId || userId <= 0) {
        console.error(`❌ Invalid user ID: ${userId}`);
        return null;
      }
      
      return userId;
    } catch (error) {
      console.error("❌ Error getting user ID:", error);
      return null;
    }
  };

  const validateAndCorrectDate = (dateStr: string, orderId: number): string => {
    if (!dateStr) return new Date().toISOString();
    
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      const oneWeekFuture = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
      
      if (date < oneYearAgo) {
        console.warn(`⚠️ Order ${orderId}: Date too old (${dateStr}), using current time`);
        return now.toISOString();
      }
      
      if (date > oneWeekFuture) {
        console.warn(`⚠️ Order ${orderId}: Date in future (${dateStr}), using current time`);
        return now.toISOString();
      }
      
      return date.toISOString();
    } catch (error) {
      console.error(`❌ Order ${orderId}: Invalid date format (${dateStr}), using current time`);
      return new Date().toISOString();
    }
  };

  const validateEmployeeForOrder = (empData: any, orderId: number, expectedEmpId: number): boolean => {
    if (!empData || !empData.id) {
      console.warn(`⚠️ Order ${orderId}: No employee data found for employee ID ${expectedEmpId}`);
      return false;
    }
    
    if (parseInt(empData.id) !== expectedEmpId) {
      console.error(`❌ Order ${orderId}: Employee ID mismatch! Expected ${expectedEmpId}, got ${empData.id}`);
      return false;
    }
    
    console.log(`✅ Order ${orderId}: Employee data validated for ${empData.first_name} ${empData.last_name}`);
    return true;
  };

  // [Include all other functions from original code - updateRating, loadMore, showLess, etc.]
  const updateRating = async (serviceId: number, rating: number): Promise<void> => {
    try {
      if (!serviceId || serviceId <= 0) {
        throw new Error("Invalid service ID");
      }
      
      if (!rating || rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }
      
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        throw new Error("Authentication token missing");
      }
      
      const authHeader = accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`;
      
      const response = await axios.put(
        `${API_BASE_URL}/service_order/rating/${serviceId}`,
        { rating },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader
          },
          timeout: 10000
        }
      );
      
      if (response.status === 200) {
        setServices(prevServices => 
          prevServices.map(service => 
            service.id === serviceId ? { ...service, rating } : service
          )
        );
        
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
      } else {
        throw new Error("Failed to update rating");
      }
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
  
  const loadMore = (): void => {
    const newVisibleCount = Math.min(visibleCount + 5, allServices.length);
    setVisibleCount(newVisibleCount);
    
    if (newVisibleCount > 5) {
      setShowLessVisible(true);
    }
    
    setServices(allServices.slice(0, newVisibleCount));
    
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
  
  const showLess = (): void => {
    setVisibleCount(5);
    setServices(allServices.slice(0, 5));
    setShowLessVisible(false);
  };
  
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
    translateGender,
    fetchServiceOrders,
    updateRating,
    loadMore,
    showLess,
    hasMoreToLoad
  };
};

export default useMainController;