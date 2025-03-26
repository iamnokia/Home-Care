import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeModel } from "../../../models/employee";
import axios from "axios";
import { CarModel } from "../../../models/car";

const useMainController = () => {
  const [data, setData] = useState<EmployeeModel[]>([]);
  const [car, setCar] = useState<CarModel[]>([])
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
          // 'Access-Control-Allow-Origin': '*',
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
      // Using the id parameter in the URL
      const res = await axios.get("https://homecare-pro.onrender.com/employees/read_emp_car_employees/5", {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCar(Array.isArray(res.data) ? res.data : [res.data]); // Handle both array and single object responses
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    handleGetAllData();
    handleGetCarByCatId();
  }, []);
  return {
    car,
    loading,
    data,
    handleNaVigate,
    navigate,
  };
};
export default useMainController;