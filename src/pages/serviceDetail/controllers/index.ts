import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import axios from "axios";
import { CarModel } from "../../../models/car";

// Comment interface based on the API response structure
interface CommentModel {
  id: number;
  users_id: number;
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
      // Format date to Lao format (you might want to adjust this)
      const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        // Lao month names
        const laoMonths = [
          'ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ',
          'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ'
        ];
        
        return `${day} ${laoMonths[month - 1]} ${year}`;
      };

      // Generate user display name (you might want to fetch actual user data)
      const generateUserName = (userId: number): string => {
        // This is a placeholder - you might want to fetch actual user names from a users API
        const userPrefixes = ['ນາງ', 'ທ້າວ', 'ນາງສາວ'];
        const userNames = [
          'ກອນນະລີ', 'ສົມສະໄໝ', 'ວັນນິດາ', 'ສີສະຫວ່າງ', 'ພອນທິບ', 
          'ມາລາວັນ', 'ສຸວັນນາ', 'ບົວລ້ຽວ', 'ເພັດດາວ', 'ອັນສອນ'
        ];
        
        const prefixIndex = userId % userPrefixes.length;
        const nameIndex = userId % userNames.length;
        
        return `${userPrefixes[prefixIndex]} ${userNames[nameIndex]}`;
      };

      return {
        id: comment.id,
        rating: comment.rating,
        comment: comment.message,
        user: generateUserName(comment.users_id),
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

    // Determine category type
    const getCategoryType = (categoryName: string) => {
      const lowerCaseCategory = categoryName?.toLowerCase() || "";
      if (lowerCaseCategory.includes("ຂົນສົ່ງ") || lowerCaseCategory.includes("moving")) {
        return "moving";
      } else if (lowerCaseCategory.includes("ຫ້ອງນ້ຳ") || lowerCaseCategory.includes("bathroom")) {
        return "bathroom";
      }
      return "cleaning";
    };

    // Format price
    const formatPrice = (price: string | number) => {
      const numPrice = parseFloat(price.toString());
      return numPrice.toLocaleString() + " KIP";
    };

    // Determine gender text
    const genderText = employee.gender === "male" ? "ຊາຍ" : "ຍິງ";

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
      category: employee.cat_name,
      categoryType: getCategoryType(employee.cat_name),
      gender: genderText,
      cat_id: employee.cat_id,
      village: village,
      city: employee.city || "ວຽງຈັນ",
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
    calculateAverageRating: () => calculateAverageRating(comments)
  };
};

export default useMainController;