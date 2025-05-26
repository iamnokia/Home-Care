import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import axios from "axios";
import { CarModel } from "../../../models/car";

// Define comment model based on the API response
interface CommentModel {
  id: number;
  users_id: number;
  employees_id: number;
  rating: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Define rating summary for each employee
interface EmployeeRating {
  employeeId: number;
  averageRating: number;
  totalComments: number;
}

const useMainController = () => {
  const [data, setData] = useState<EmployeeModel[]>([]);
  const [car, setCar] = useState<CarModel[]>([]);
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [employeeRatings, setEmployeeRatings] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNaVigate = (path: string) => {
    navigate(path);
  };

  const handleGetAllData = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.get("https://homecare-pro.onrender.com/employees/read_employees", {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setData(res.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetCarByCatId = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.get("https://homecare-pro.onrender.com/employees/read_emp_car_employees/5", {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCar(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error("Error fetching car data:", error);
    } finally {
      setLoading(false);
    }
  };

  // New function to fetch comments and calculate ratings
  const handleGetComments = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await axios.get("https://homecare-pro.onrender.com/comments", {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const commentsData: CommentModel[] = Array.isArray(res.data) ? res.data : [res.data];
      setComments(commentsData);
      
      // Calculate average ratings for each employee
      const ratingsMap = calculateEmployeeRatings(commentsData);
      setEmployeeRatings(ratingsMap);
      
      console.log("Comments fetched:", commentsData);
      console.log("Employee ratings calculated:", ratingsMap);
      
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Set empty map if there's an error
      setEmployeeRatings(new Map());
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate average ratings per employee
  const calculateEmployeeRatings = (comments: CommentModel[]): Map<string, number> => {
    const ratingsMap = new Map<string, number>();
    const employeeStats = new Map<string, { totalRating: number; count: number }>();

    // Filter active comments and group by employee
    comments
      .filter(comment => comment.status === 'active' && comment.rating > 0)
      .forEach(comment => {
        const employeeId = String(comment.employees_id);
        const currentStats = employeeStats.get(employeeId) || { totalRating: 0, count: 0 };
        
        employeeStats.set(employeeId, {
          totalRating: currentStats.totalRating + comment.rating,
          count: currentStats.count + 1
        });
      });

    // Calculate average ratings
    employeeStats.forEach(({ totalRating, count }, employeeId) => {
      const averageRating = Math.round((totalRating / count) * 10) / 10; // Round to 1 decimal place
      const starRating = Math.min(5, Math.max(1, Math.round(averageRating))); // Convert to 1-5 star rating
      ratingsMap.set(employeeId, starRating);
    });

    return ratingsMap;
  };

  // Function to get rating for a specific employee
  const getEmployeeRating = (employeeId: string | number): number => {
    const rating = employeeRatings.get(String(employeeId));
    return rating || 5; // Default to 5 stars if no rating found
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        handleGetAllData(),
        handleGetCarByCatId(),
        handleGetComments()
      ]);
    };

    fetchAllData();
  }, []);

  return {
    car,
    loading,
    data,
    comments,
    employeeRatings,
    getEmployeeRating,
    handleNaVigate,
    navigate,
  };
};

export default useMainController;