import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import axios from "axios";
import { CarModel } from "../../../models/car";

// Updated Comment interface based on the API response structure
interface CommentModel {
  id: number;
  users_id: number;
  first_name: string;  // Real first name from API
  last_name: string;   // Real last name from API
  employees_id: number;
  message: string;
  rating: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Processed review interface for UI display
interface ProcessedReview {
  id: number;
  rating: number;
  comment: string;
  user: string;
  date: string;
  userId: number;
}

const useMainController = () => {
  const [data, setData] = useState<EmployeeModel[]>([]);
  const [car, setCar] = useState<CarModel[]>([]);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [processedReviews, setProcessedReviews] = useState<ProcessedReview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

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
    // General fallbacks
    'vientiane': 'ວຽງຈັນ',
    'vientiane capital': 'ນະຄອນຫຼວງວຽງຈັນ'
  };

  // Function to translate English category to Lao
  const translateCategoryToLao = (englishCategory: string): string => {
    if (!englishCategory) return 'ອື່ນໆ';
    
    const normalizedCategory = englishCategory.toLowerCase().trim();
    
    // Direct match first
    if (categoryTranslation[normalizedCategory]) {
      return categoryTranslation[normalizedCategory];
    }
    
    // Partial matching for compound categories
    for (const [key, value] of Object.entries(categoryTranslation)) {
      if (normalizedCategory.includes(key) || key.includes(normalizedCategory)) {
        return value;
      }
    }
    
    // If no match found, return the original with a fallback
    return englishCategory || 'ອື່ນໆ';
  };

  // Function to translate English gender to Lao
  const translateGenderToLao = (englishGender: string): string => {
    if (!englishGender) return 'ບໍ່ລະບຸ';
    
    const normalizedGender = englishGender.toLowerCase().trim();
    
    // Direct match
    if (genderTranslation[normalizedGender]) {
      return genderTranslation[normalizedGender];
    }
    
    // Partial matching
    for (const [key, value] of Object.entries(genderTranslation)) {
      if (normalizedGender.includes(key) || key.includes(normalizedGender)) {
        return value;
      }
    }
    
    // If no match found, return the original with a fallback
    return englishGender || 'ບໍ່ລະບຸ';
  };

  // Function to translate English city to Lao
  const translateCityToLao = (englishCity: string): string => {
    if (!englishCity) return 'ວຽງຈັນ';
    
    const normalizedCity = englishCity.toLowerCase().trim();
    
    // Direct match
    if (cityTranslation[normalizedCity]) {
      return cityTranslation[normalizedCity];
    }
    
    // Partial matching
    for (const [key, value] of Object.entries(cityTranslation)) {
      if (normalizedCity.includes(key) || key.includes(normalizedCity)) {
        return value;
      }
    }
    
    // If no match found, return the original
    return englishCity || 'ວຽງຈັນ';
  };

  const handleNaVigate = (path: string) => {
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
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);  
    }
  };

  // Get car data for category ID 5
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

  // Get comments for specific employee
  const handleGetComments = async (): Promise<void> => {
    if (!id) return;
    
    try {
      const res = await axios.get(`https://homecare-pro.onrender.com/comments`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Filter comments for the current employee
      const allComments = Array.isArray(res.data) ? res.data : [res.data];
      const employeeComments = allComments.filter((comment: CommentModel) => 
        comment.employees_id === parseInt(id) && comment.status === 'active'
      );
      
      setComments(employeeComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Set empty array if error occurs
      setComments([]);
    }
  };

  // Process comments into review format for UI display
  const processCommentsToReviews = (commentsData: CommentModel[]): ProcessedReview[] => {
    return commentsData.map((comment) => {
      // Format date to Lao format
      const formatDate = (dateString: string): string => {
        try {
          // Parse the ISO date string
          const date = new Date(dateString);
          
          // Check if date is valid
          if (isNaN(date.getTime())) {
            return 'ວັນທີບໍ່ຖືກຕ້ອງ';
          }
          
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          
          // Lao month names
          const laoMonths = [
            'ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ',
            'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ'
          ];
          
          return `${day} ${laoMonths[month - 1]} ${year}`;
        } catch (error) {
          console.error('Error formatting date:', error);
          return 'ວັນທີບໍ່ຖືກຕ້ອງ';
        }
      };

      // Use real first_name and last_name from API response
      const getUserDisplayName = (firstName: string, lastName: string): string => {
        // Clean and capitalize the names
        const cleanFirstName = firstName?.trim() || '';
        const cleanLastName = lastName?.trim() || '';
        
        // Capitalize first letter of each name
        const capitalizeFirstLetter = (str: string): string => {
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        const formattedFirstName = capitalizeFirstLetter(cleanFirstName);
        const formattedLastName = capitalizeFirstLetter(cleanLastName);
        
        // If both names exist, combine them
        if (formattedFirstName && formattedLastName) {
          return `${formattedFirstName} ${formattedLastName}`;
        }
        
        // If only first name exists
        if (formattedFirstName) {
          return formattedFirstName;
        }
        
        // If only last name exists
        if (formattedLastName) {
          return formattedLastName;
        }
        
        // Fallback if no names are provided
        return `ຜູ້ໃຊ້ງານ ${comment.users_id}`;
      };

      return {
        id: comment.id,
        rating: comment.rating,
        comment: comment.message,
        user: getUserDisplayName(comment.first_name, comment.last_name),
        date: formatDate(comment.created_at),
        userId: comment.users_id
      };
    });
  };

  // Calculate average rating from comments
  const calculateAverageRating = (commentsData: CommentModel[]): number => {
    if (commentsData.length === 0) return 4.5; // Default rating
    
    const totalRating = commentsData.reduce((sum, comment) => sum + comment.rating, 0);
    const average = totalRating / commentsData.length;
    
    // Round to nearest 0.5
    return Math.round(average * 2) / 2;
  };

  // Get service data with all processed information
  const getServiceData = () => {
    const employee = data[0];
    if (!employee) return null;

    // Determine category type with translation
    const getCategoryType = (categoryName: string) => {
      const lowerCaseCategory = categoryName?.toLowerCase() || "";
      if (lowerCaseCategory.includes("ຂົນສົ່ງ") || lowerCaseCategory.includes("moving") || lowerCaseCategory.includes("transport")) {
        return "moving";
      } else if (lowerCaseCategory.includes("ຫ້ອງນ້ຳ") || lowerCaseCategory.includes("bathroom") || lowerCaseCategory.includes("toilet") || lowerCaseCategory.includes("septic")) {
        return "bathroom";
      }
      return "cleaning";
    };

    // Format price
    const formatPrice = (price: string | number) => {
      const numPrice = parseFloat(price.toString());
      return numPrice.toLocaleString() + " ກີບ";
    };

    // Translate gender, category, and city to Lao
    const genderLao = translateGenderToLao(employee.gender);
    const categoryLao = translateCategoryToLao(employee.cat_name);
    const cityLao = translateCityToLao(employee.city);

    // Extract address components
    const addressParts = employee.address ? employee.address.split(',') : [];
    const village = addressParts[0] || "ບ້ານ ໂນນສະຫວ່າງ";

    // Calculate rating from actual comments
    const averageRating = calculateAverageRating(comments);

    // Base service data
    const serviceData = {
      id: employee.id,
      name: employee.cat_name,
      firstName: employee.first_name,
      surname: employee.last_name,
      price: parseFloat(employee.price),
      priceFormatted: formatPrice(employee.price),
      image: employee.avatar || "/api/placeholder/400/300",
      category: categoryLao, // Use Lao translation instead of English
      categoryType: getCategoryType(employee.cat_name),
      gender: genderLao, // Use Lao translation instead of English
      cat_id: employee.cat_id,
      village: village,
      city: cityLao, // Use Lao translation instead of English
      skills: employee.cv || "ຂ້ອຍມີປະສົບການໃນການໃຫ້ບໍລິການ. ຂ້ອຍເຮັດວຽກຢ່າງຂະຫຍັນຂັນແຂ່ງ ແລະ ຮັບຜິດຊອບສູງ.",
      rating: averageRating,
      reviews: processedReviews,
    };

    // Add car details if category ID is 5
    if (employee.cat_id === 5 && car && car.length > 0) {
      const employeeCar = car.find(c => c.emp_id === employee.id);
      
      if (employeeCar) {
        Object.assign(serviceData, {
          carId: employeeCar.id || "N/A",
          carBrand: employeeCar.car_brand || "N/A",
          carModel: employeeCar.model || "N/A",
          licensePlate: employeeCar.license_plate || "N/A",
          carYear: employeeCar.created_at ? new Date(employeeCar.created_at).getFullYear().toString() : "N/A",
          carImage: employeeCar.car_image,
        });
      }
    }

    return serviceData;
  };

  // Process comments when comments data changes
  useEffect(() => {
    const processedReviews = processCommentsToReviews(comments);
    setProcessedReviews(processedReviews);
  }, [comments]);

  // Initial data loading
  useEffect(() => {
    if (id) {
      handleGetDataById();
      handleGetComments();
    }
    handleGetCarByCatId();
  }, [id]);

  return {
    car,
    loading,
    data,
    comments,
    processedReviews,
    handleNaVigate,
    navigate,
    id,
    getServiceData,
    calculateAverageRating: () => calculateAverageRating(comments),
    // Export translation functions for potential use elsewhere
    translateCategoryToLao,
    translateGenderToLao,
    translateCityToLao
  };
};

export default useMainController;